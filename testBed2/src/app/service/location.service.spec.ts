import { LOCATION } from './../model/location';
import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

//Angular 有提供專為測試模式使用的 http library
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LocationService', () => {
  //宣告服務
  let service: LocationService;
  //宣告假的 HttpClient 物件來模擬與驗證程式執行的結果
  let mockHttp: HttpTestingController;
  //宣告資料模型
  let mockOneData: LOCATION;

  beforeEach(() => {
    //透過TestBed注入HttpClientTestingModule
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LocationService);
    mockHttp = TestBed.inject(HttpTestingController);

    //arrange
    mockOneData = {
      "id": 4,
      "LOC_CD": "ATLNZ",
      "LOC_NAME": "LINZ",
      "CNTRY_CODE": "AT",
      "STATE": "OB"
    }
  });

  it('should get LOCATION array data', (done: DoneFn)=>{
    //arrange
    let location = [
      {
        "id": 1,
        "LOC_CD": "ATLNZ",
        "LOC_NAME": "LINZ",
        "CNTRY_CODE": "AT",
        "STATE": "OB"
      },
      {
        "id": 2,
        "LOC_CD": "CHBSL",
        "LOC_NAME": "BASEL",
        "CNTRY_CODE": "CH",
        "STATE": "BS"
      },
      {
        "id": 3,
        "LOC_CD": "CHFKD",
        "LOC_NAME": "FRENKENDORF",
        "CNTRY_CODE": "CH",
        "STATE": "BL"
      }
    ]

    //act
    service.getLocation().subscribe({
      next: (res)=>{
        expect(res).toEqual(location);
        done();
      }
    })

    //assert
    const testRequest = mockHttp.expectOne('http://localhost:3000/Location');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(location);

  })

  it('should get single LOCATION data', (done: DoneFn)=>{
    //act
    service.getSingle(mockOneData.id).subscribe({
      next: (res)=>{
        expect(res).toEqual(mockOneData);
        done();
      }
    })

    //assert
    const url = 'http://localhost:3000/Location/' + mockOneData.id;
    const testRequest = mockHttp.expectOne(url);
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(mockOneData);

  })

  it('should post single LOCATION data', (done: DoneFn) => {
    //act
    service.postLocation(mockOneData).subscribe({
      next: (res)=>{
        expect(res.id).toBe(mockOneData.id)
        done();
      }
    })

    //assert
    const testRequest = mockHttp.expectOne('http://localhost:3000/Location');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(mockOneData);

    /*除了驗證請求的 HTTP 方法外，也可以驗證請求的 body,
      來確認產品程式在對後端服務發送請求時，所傳送的資訊參數是否正確。*/
    expect(testRequest.request.body).toEqual(mockOneData);
  });

  it('should put single LOCATION data', (done: DoneFn) => {
    //act
    service.putLocation(mockOneData.id).subscribe({
      next: (res)=>{
        expect(res.id).toBe(mockOneData.id)
        done();
      }
    })

    //assert
    const testRequest = mockHttp.expectOne('http://localhost:3000/Location/4');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(mockOneData);
  });

  it('should delete the correct data', (done: DoneFn) => {
    //act
    service.deleteLocation(mockOneData.id).subscribe({
      next: (res)=>{
        expect(res.id).toBe(mockOneData.id)
        done();
      }
    })

    //assert
    const testRequest = mockHttp.expectOne('http://localhost:3000/Location/4');
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(mockOneData);

  });

  afterEach(()=>{
    //檢查是否有預期外的請求
    mockHttp.verify();
  })
});
