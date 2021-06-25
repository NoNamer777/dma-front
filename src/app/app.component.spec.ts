import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { environment } from '@environments/environment';
import { CacheService } from '@services/cache.service';
import { SessionService } from '@services/session.service';
import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@components/header/header.component';
import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { StorageMock } from '@models/storage-mock.model';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  let app: AppComponent;
  let sessionService: SessionService;
  let cacheService: CacheService;

  let mockStorage: StorageMock;
  let httpTester: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatSidenavModule,
        FontAwesomeTestingModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        SidenavComponent,
      ],
      providers: [
        SessionService,
        CacheService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    mockStorage = new StorageMock();
    httpTester = TestBed.inject(HttpTestingController);

    cacheService = TestBed.inject(CacheService);
    sessionService = TestBed.inject(SessionService);

    app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  })

  afterEach(() => {
    mockStorage.reset();
    httpTester.verify();
  })

  it('should create an component instance', () => {
    httpTester.expectOne(`${environment.apiURL}/session/initialize`)
      .flush({ id: 'session-id' }, { headers: { Authorization: 'token' } });

    expect(app).not.toBeNull();
  });
});
