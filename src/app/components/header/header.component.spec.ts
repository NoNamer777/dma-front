import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { HeaderComponent } from '@components/header/header.component';
import { SidebarService } from '@services/sidebar.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  let component: HeaderComponent;
  let element: HTMLElement;

  let sidebarService: SidebarService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeTestingModule ],
      declarations: [ HeaderComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);

    sidebarService = TestBed.inject(SidebarService);

    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should emit sidebar toggle on btn click',() => {
    const toggleBtn = element.querySelector('#toggle-sidebar-btn') as HTMLButtonElement;
    let btnIcon = toggleBtn.querySelector('fa-icon') as HTMLElement;

    spyOn(component.toggleSidebar, 'emit');
    spyOnProperty(sidebarService, 'opened', 'get').and.returnValue(true);

    expect(component.toggleSidebar.emit).not.toHaveBeenCalled();
    expect(btnIcon.getAttribute('icon')).toBe('bars');

    toggleBtn.click();
    fixture.detectChanges();

    // Try to get the new icon after the toggle had happened.
    btnIcon = toggleBtn.querySelector('fa-icon') as HTMLElement;

    expect(component.toggleSidebar.emit).toHaveBeenCalled();
    expect(btnIcon.getAttribute('icon')).toBe('times');
  });
});
