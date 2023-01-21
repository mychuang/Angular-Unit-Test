import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { LocationService } from "./location.service";

//Angular 有提供專為測試模式使用的 http library，方便我們攔截並模擬 http service。
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// 其他會用到的功能
import { TestBed } from '@angular/core/testing';

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

    //act
    //mockHttp.get.and.returnValue(of(location));

    //assert
    service.getLocation().subscribe({
      next: (res)=>{
        expect(res).toEqual(location);
        done();
      }
    })

    //expect(mockHttp.get).toHaveBeenCalledTimes(1);

    /*
    在單元測試中的執行並不會實際去後端取得資料，
    主要使用 HttpTestingController 物件來模擬 httpClient 物件的行為。
    因此在驗證上會利用 expectOne 方法，來檢查所請求的 URL 是否被請求過一次，
    進而驗證所發送的請求是否使用預期的方法。
    */
    const testRequest = mockHttp.expectOne('http://localhost:3000/Location');
    expect(testRequest.request.method).toBe('GET');

    //最後利用 flush 方法來決定這個請求要傳回什麼樣的結果，這個結果就會是訂閱方法所得到的結果。
    testRequest.flush(location);

  })

  //測試 HTTP 方法之後，還會透過 verify() 方法檢查是否有預期外的請求；
  //因為這個動作會是每個測試 HTTP 的案例完成後執行，所以會在 afterEach 中呼叫這個方法。
  afterEach(()=>{
    mockHttp.verify();
  })

})
