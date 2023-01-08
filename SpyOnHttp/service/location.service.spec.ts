import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { LocationService } from "./location.service";
import { LoggerService } from "./logger.service";

describe('Location service', ()=>{
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockLoggerService: LoggerService;
  let service: LocationService;

  beforeEach(()=>{
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    service = new LocationService(mockLoggerService, mockHttpClient);
  })

  it('should call logger service', ()=>{
    //act
    service.getLocation();

    //expect
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  })

  it('should call logger service', ()=>{
    //act
    service.getLocation();

    //expect
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  })

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

    //act
    mockHttpClient.get.and.returnValue(of(location));

    //expect
    service.getLocation().subscribe({
      next: (res)=>{
        expect(res).toEqual(location);
        done();
      },

      error:()=>{
        done: fail;
      }
    });

    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  })
})

