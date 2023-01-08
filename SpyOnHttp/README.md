# SpyOn with HttpClient

## Create a new project

```
ng new SpyOnHttp
ng g service service/location
ng g service service/logger
```

## Quick review SpyOn

- Implement a simple logger service

  ```typescript
  export class LoggerService {
    messages: string[] = [];

    log(message: string){
      this.messages.push(message);
    }
  }
  ```

- Implement a simple logger service unit test

  ```typescript
  describe('logger service', ()=>{
    let service: LoggerService;

    beforeEach(()=>{
      service = new LoggerService();
    })

    it('should get empty array at begining',()=>{
      expect(service.messages.length).toBe(0);
    })

    it('should add message when log() is called', ()=>{
      //act
      service.log('test');

      //assert
      expect(service.messages.length).toBe(1);
    })
  })
  ```

- Implement a simple location service

  ```typescript
  export class LocationService {

    constructor(private servie: LoggerService) { }

    getLocation(){
      this.servie.log('call logger');
    }
  }
  ```

- Implement a simple location service unit test

  ```typescript
  describe('Location service', ()=>{
    let mockLoggerService: LoggerService;
    let service: LocationService;

    beforeEach(()=>{
      //創建 SpyOn 物件, 並監聽該物件的方法
      mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
      service = new LocationService(mockLoggerService);
    })

    it('should call logger service', ()=>{
      //act
      service.getLocation();

      //expect
      expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    })
  })
  ```

## Create a model & json server

- Install json server

  ```
  npm install -g json-server
  ```

  Check intall result

  ```
  json-server -h
  ```

- Edit db.json: 製作假資料

  ```json
  {
    "Location": [
      {
        "ID": 1,
        "LOC_CD": "ATLNZ",
        "LOC_NAME": "LINZ",
        "CNTRY_CODE": "AT",
        "STATE": "OB"
      },
      {
        "ID": 2,
        "LOC_CD": "CHBSL",
        "LOC_NAME": "BASEL",
        "CNTRY_CODE": "CH",
        "STATE": "BS"
      },
      {
        "ID": 3,
        "LOC_CD": "CHFKD",
        "LOC_NAME": "FRENKENDORF",
        "CNTRY_CODE": "CH",
        "STATE": "BL"
      },
      {
        "ID": 4,
        "LOC_CD": "DEBER",
        "LOC_NAME": "BERLIN",
        "CNTRY_CODE": "DE",
        "STATE": "BE"
      }
    ]
  }
  ```

- Run json-server

  ```
  json-server --id ID --watch db.json
  ```

  Check server result: http://localhost:3000/Location

- Create a model which should correspond with db.json 

  ```
  cd SpyOnHttp/src/app/
  mkdir model
  cd model
  vi location.ts
  ```

  ```typescript
  export interface LOCATION{
    ID: number;
    LOC_CD: string;
    LOC_NAME: string;
    CNTRY_CODE: string;
    STATE: string;
  }
  ```

## Inject HttpClient & data model in service

- import HtpClient & data model in location service

  ```typescript
  import { HttpClient } from '@angular/common/http';
  import { LOCATION } from 'src/app/model/location';

  @Injectable({
    providedIn: 'root'
  })
  export class LocationService {
    constructor(private http: HttpClient) { }
  }
  ```

- Implement a simple http get function

  ```typescript
  getLocation(){
    return this.http.get<LOCATION[]>('http://localhost:3000/Location');
  }
  ```

## Implement HttpClient with a service unit test

- Declaire HttpClient in location.service.spec.ts

  ```typescript
  describe('Location service', ()=>{
    //創建 SpyOn 物件
    let mockHttpClient: jasmine.SpyObj<HttpClient>;
    let service: LocationService;

    beforeEach(()=>{
      mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
      service = new LocationService(mockHttpClient);
    })
  })
  ```

- Arrange mock data

  ```typescript
  it('should return epected location data when getLocation() is called', (done: DoneFn)=>{
    //arrange
    let location = [
      {
        "ID": 1,
        "LOC_CD": "ATLNZ",
        "LOC_NAME": "LINZ",
        "CNTRY_CODE": "AT",
        "STATE": "OB"
      },
      {
        "ID": 2,
        "LOC_CD": "CHBSL",
        "LOC_NAME": "BASEL",
        "CNTRY_CODE": "CH",
        "STATE": "BS"
      },
      {
        "ID": 3,
        "LOC_CD": "CHFKD",
        "LOC_NAME": "FRENKENDORF",
        "CNTRY_CODE": "CH",
        "STATE": "BL"
      },
      {
        "ID": 4,
        "LOC_CD": "DEBER",
        "LOC_NAME": "BERLIN",
        "CNTRY_CODE": "DE",
        "STATE": "BE"
      }
    ];
  })
  ```

- Assert

  ```typescript
  //act
  mockHttpClient.get.and.returnValue(of(location));

  //expect
  service.getLocation().subscribe({
    next: (res)=>{
      expect(res).toEqual(location);
      done();
    }
  });

  expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  ```

- Run ng test

  ```
  Statements   : 100% ( 10/10 )
  Branches     : 100% ( 0/0 )
  Functions    : 100% ( 5/5 )
  Lines        : 100% ( 9/9 )
  ```

## 後記

Indeed in this case, we don't need to really run json-server.<p>
Because we use **jasmine.SpyObj<HttpClient>**, it just spy on the HttpClient.get() method; in other words, it just simulate the action of HttpClient.get().<p>
Consquenctly, we don't need to get true data from server. We just neet to test the return value from getLocation() which will suitble with the mock data. 
