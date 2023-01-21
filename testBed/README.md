# TestBed

## 寫在前頭

請參考 [isolatedService](../isolatedService/README.md)創建相關服務

- create service

  ```
  ng new isolatedService
  ng g service service/calculator
  ng g service service/logger
  ```

## logger service by TestBed

- implement logger service

  ```typescript
  export class LoggerService {
    messages: string[] = [];
    log(message: string){
      this.messages.push(message);
    }

    clear(){
      this.messages = [];
    }
  }
  ```

- 完善logger service 測試

  ```typescript
  it('should get empty array at begining', ()=>{
    expect(service.messages.length).toBe(0);
  })

  it('should add message when log() is called', ()=>{
    //act
    service.log('test');

    //assert
    expect(service.messages.length).toBe(1);
  })

  it('should clear all message when clear() is called', ()=>{
    //act
    service.log('test');
    service.clear();

    //assert
    expect(service.messages.length).toBe(0);
  })
  ```

- logger service 測試 by TestBed

  ```typescript
  beforeEach(()=>{
    //Angular TestBed 創建模擬的測試模組
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  })
  ```

## calculator service by TestBed

- implement calculator service

  ```typescript
  export class CalculatorService {

    constructor(private service: LoggerService) { }

    add(n1: number, n2: number): number{
      this.service.log('add');
      return n1+n2;
    }

    subtract(n1: number, n2: number): number{
      this.service.log('subtract');
      return n1-n2;
    }
  }
  ```

- 完善 calculator service 測試

  ```typescript
  describe('CalculatorService', ()=>{
    let service: CalculatorService;
    let mockLogService: any;

    beforeEach(()=>{
      mockLogService = jasmine.createSpyObj('LoggerService', ['log']);
      service = new CalculatorService(mockLogService);
    })

    it('should return 1+1=2', ()=>{
      //act
      let returnVar = service.add(1, 1);

      //assert
      expect(returnVar).toBe(2);
      expect(mockLogService.log).toHaveBeenCalledTimes(1);
    })

    it('should return 1-1=0', ()=>{
      //act
      let returnVar = service.subtract(1, 1);

      //assert
      expect(returnVar).toBe(0);
      expect(mockLogService.log).toHaveBeenCalledTimes(1);
    })
  })
  ```

- calculator service 測試 by TestBed

  ```typescript
  describe('CalculatorService', ()=>{
    beforeEach(()=>{
      mockLogService = jasmine.createSpyObj('LoggerService', ['log']);

      TestBed.configureTestingModule({
        providers:[{
          provide: LoggerService,
          useValue: mockLogService
        }]
      });

      service = TestBed.inject(CalculatorService);
    })
  })
  ```

## location service

Refer to [SpyOnHttp](../SpyOnHttp/README.md)創建相關服務

- Create a service & data model

  ```
  ng g service service/location
  cd SpyOnHttp/src/app/
  mkdir model
  cd model
  vi location.ts
  ```

- Impletment data model

  ```typescript
  export interface LOCATION{
    ID: number;
    LOC_CD: string;
    LOC_NAME: string;
    CNTRY_CODE: string;
    STATE: string;
  }
  ```

- Inject HttpClient & data model in service

  ```typescript
  import { HttpClient } from '@angular/common/http';
  import { LOCATION } from '../model/location';

  export class LocationService {

    constructor(private http: HttpClient) { }

    getLocation(){
      return this.http.get<LOCATION[]>('http://localhost:3000/Location');
    }
  }
  ```

## location service unit test

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
    }
  ]
  ```

- Assert & expect

  ```typescript
  it('should return epected location data when getLocation() is called', (done: DoneFn)=>{
    //act
    mockHttp.get.and.returnValue(of(location));

    //assert
    service.getLocation().subscribe({
      next: (res)=>{
        expect(res).toEqual(location);
        done();
      }
    })

    expect(mockHttp.get).toHaveBeenCalledTimes(1);
  })
  ```

## location service unit test by TestBed

- 環境建置

  ```typescript
  //Angular 有提供專為測試模式使用的 http library
  import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

  // 其他會用到的功能
  import { TestBed } from '@angular/core/testing';
  import { HttpClient } from '@angular/common/http';

  describe('LocationService', ()=>{
    let service: LocationService
    //let mockHttp: jasmine.SpyObj<HttpClient>
    let mockHttp: HttpTestingController;

    beforeEach(()=>{
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })

      service = TestBed.inject(LocationService);
      mockHttp = TestBed.inject(HttpTestingController);
    })
  }
  ```

- 撰寫 spec

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
      }
    ]

    //assert
    service.getLocation().subscribe({
      next: (res)=>{
        expect(res).toEqual(location);
        done();
      }
    })

    /*
    在單元測試中的執行並不會實際去後端取得資料，
    主要使用 HttpTestingController 物件來模擬 httpClient 物件的行為。
    */
    const testRequest = mockHttp.expectOne('http://localhost:3000/Location');
    expect(testRequest.request.method).toBe('GET');

    //最後利用 flush 方法來決定這個請求要傳回什麼樣的結果，這個結果就會是訂閱方法所得到的結果。
    testRequest.flush(location);

  })

  //測試 HTTP 方法之後，還會透過 verify() 方法檢查是否有預期外的請求；
  afterEach(()=>{
    mockHttp.verify();
  })
   
  ```


