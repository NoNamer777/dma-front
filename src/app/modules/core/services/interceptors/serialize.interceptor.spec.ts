import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SERIALIZE_INTERCEPTOR_PROVIDER } from '@dma-core/services/interceptors/serialize.interceptor';
import { environment } from '@dma-environment';

describe('SerializeInterceptor', () => {
    let httpTestController: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SERIALIZE_INTERCEPTOR_PROVIDER],
        });

        httpTestController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it(`should remove '_' from object attributes in the request's body`, () => {
        httpClient
            .post(`${environment.baseServerUrl}/rest-resource-location`, {
                _key: 'my-value',
                otherKey: true,
            })
            .subscribe();

        const request = httpTestController.expectOne(`${environment.baseServerUrl}/rest-resource-location`);
        request.flush({});

        expect(request.request.body).toEqual({
            key: 'my-value',
            otherKey: true,
        });
    });

    it('should serialize deeply', () => {
        httpClient
            .post(`${environment.baseServerUrl}/rest-resource-location`, {
                parent: {
                    child: {
                        _key: 1,
                    },
                },
            })
            .subscribe();

        const request = httpTestController.expectOne(`${environment.baseServerUrl}/rest-resource-location`);
        request.flush({});

        expect(request.request.body).toEqual({
            parent: {
                child: {
                    key: 1,
                },
            },
        });
    });

    it('should serialize array values', () => {
        httpClient
            .post(`${environment.baseServerUrl}/rest-resource-location`, {
                parent: [
                    {
                        child: {
                            _key: 1,
                        },
                    },
                    null,
                    undefined,
                    false,
                    'hello',
                ],
            })
            .subscribe();

        const request = httpTestController.expectOne(`${environment.baseServerUrl}/rest-resource-location`);
        request.flush({});

        expect(request.request.body).toEqual({
            parent: [
                {
                    child: {
                        key: 1,
                    },
                },
                null,
                undefined,
                false,
                'hello',
            ],
        });
    });
});
