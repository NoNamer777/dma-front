import { SidebarService } from './sidebar.service';
import { TestBed } from '@angular/core/testing';

describe('SidebarService', () => {

  let sidebarService: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SidebarService ],
    });

    sidebarService = TestBed.inject(SidebarService);
  })

  it('should toggle opened state', () => {
    expect(sidebarService.opened).toBe(false);

    sidebarService.toggleSidebar();

    expect(sidebarService.opened).toBe(true);
  });

  it('should coerce opened value to boolean', () => {
    setState(null, false);
    setState(undefined, false);
    setState('', true);
    setState(-1, true);
    setState(0, true);
    setState(1, true);
    setState({ object: 'value' }, true);
    setState({}, true);
  });

  function setState(value: any, expected: boolean): void {
    sidebarService.opened = value;

    expect(sidebarService.opened).toBe(expected);

    // Reset the state to the default value.
    sidebarService.opened = false;
  }
});
