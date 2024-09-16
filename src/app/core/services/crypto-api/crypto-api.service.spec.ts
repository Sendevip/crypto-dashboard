import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CryptoApiService } from './crypto-api.service';
import { CryptoApiRequest } from '../../models/cryptocurrency.model';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('CryptoApiService', () => {
  let service: CryptoApiService;
  let httpMock: HttpTestingController;
  let mockResponse = [{
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price": 59157,
    "market_cap": 1168632882925,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 1242297454225,
    "total_volume": 25728953461,
    "high_24h": 60367,
    "low_24h": 58231,
    "price_change_24h": -921.6761696468384,
    "price_change_percentage_24h": -1.53411,
    "market_cap_change_24h": -17933097318.939453,
    "market_cap_change_percentage_24h": -1.51134,
    "circulating_supply": 19754762,
    "total_supply": 21000000,
    "max_supply": 21000000,
    "ath": 73738,
    "ath_change_percentage": -20.1488,
    "ath_date": "2024-03-14T07:10:36.635Z",
    "atl": 67.81,
    "atl_change_percentage": 86733.051,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2024-09-16T08:28:00.968Z"
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CryptoApiService]
    });

    service = TestBed.inject(CryptoApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch cryptocurrencies with correct parameters', () => {

        
    const requestParams: CryptoApiRequest = {
      currency: 'usd',
      order: 'market_cap_desc',
      perPage: 10,
      page: 1,
    };
  
    // Act
    let actualData: any;
    service.getCryptocurrencies(requestParams).subscribe((data) => {
      actualData = data;
    });
  
    // Assert
    const req = httpMock.expectOne((request) => {
      const urlMatch = request.url === `${environment.cryptoApiUrl}/coins/markets`;
      const params = request.params;
  
      const paramsMatch =
        params.get('vs_currency') === 'usd' &&
        params.get('order') === 'market_cap_desc' &&
        params.get('per_page') === '10' &&
        params.get('page') === '1' &&
        params.get('sparkline') === 'false';
  
      return urlMatch && paramsMatch;
    });
  
    expect(req.request.method).toBe('GET');
  
    // Respond with mock data
    req.flush(mockResponse);
  
    // Verify the service returns the correct data
    expect(actualData).toEqual(mockResponse);
  });

  it('should fetch cryptocurrencies with custom parameters', () => {

  
    const requestParams: CryptoApiRequest = {
      currency: 'eur',
      order: 'volume_desc',
      perPage: 50,
      page: 2,
    };
  
    // Act
    let actualData: any;
    service.getCryptocurrencies(requestParams).subscribe((data) => {
      actualData = data;
    });
  
    // Assert
    const req = httpMock.expectOne((request) => {
      const urlMatch = request.url === `${environment.cryptoApiUrl}/coins/markets`;
      const params = request.params;
  
      const paramsMatch =
        params.get('vs_currency') === 'eur' &&
        params.get('order') === 'volume_desc' &&
        params.get('per_page') === '50' &&
        params.get('page') === '2' &&
        params.get('sparkline') === 'false';
  
      return urlMatch && paramsMatch;
    });
  
    expect(req.request.method).toBe('GET');
  
    // Respond with mock data
    req.flush(mockResponse);
  
    // Verify the service returns the correct data
    expect(actualData).toEqual(mockResponse);
  });
  
  it('should handle errors gracefully', () => {
    const errorMessage = 'Test error';
    const requestParams: CryptoApiRequest = {
      currency: 'usd',
      order: 'market_cap_desc',
      perPage: 10,
      page: 1,
    };
  
    service.getCryptocurrencies(requestParams).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual(errorMessage);
      }
    });
  
    const req = httpMock.expectOne((request) => {
      const urlMatch = request.url === `${environment.cryptoApiUrl}/coins/markets`;
      const paramsMatch =
        request.params.get('vs_currency') === 'usd' &&
        request.params.get('order') === 'market_cap_desc' &&
        request.params.get('per_page') === '10' &&
        request.params.get('page') === '1' &&
        request.params.get('sparkline') === 'false';
      return urlMatch && paramsMatch;
    });
  
    expect(req.request.method).toBe('GET');
  
    // Use req.flush() to simulate an HTTP error response
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });
});



