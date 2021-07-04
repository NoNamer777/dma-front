import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { ExceptionResponse, Session } from '@models/entities';

describe('ErrorDialogComponent', () => {

  let fixture: ComponentFixture<ErrorDialogComponent>;

  let errorDialogComponent: ErrorDialogComponent;
  let element: HTMLElement;

  const CLIENT_EXCEPTION = new ExceptionResponse(
    'message',
    'Client',
    new Session(),
    new Date().getTime(),
  );

  const SERVER_EXCEPTION = new ExceptionResponse(
    'message',
    'Client',
    new Session(),
    new Date().getTime(),
    'not found',
    404,
  );

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeTestingModule ],
      declarations: [ ErrorDialogComponent ],
    })
  });

  function initializeComponents(data: ExceptionResponse) {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: { exception: data } });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(ErrorDialogComponent);

    errorDialogComponent = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }

  it('should render the passed client-side exception data', () => {
    initializeComponents(CLIENT_EXCEPTION);

    const header: HTMLHeadingElement | null = element.querySelector('h4');
    const paragraphs: HTMLCollectionOf<HTMLParagraphElement> = element.getElementsByTagName('p');

    expect(header!.innerHTML).toBe(`An ${CLIENT_EXCEPTION.origin}-side exception has occurred`);
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].innerText).toBe(`Message: ${CLIENT_EXCEPTION.message}`);
  });

  it('should render the passed server-side exception data', () => {
    initializeComponents(SERVER_EXCEPTION);

    const header: HTMLHeadingElement | null = element.querySelector('h4');
    const paragraphs: HTMLCollectionOf<HTMLParagraphElement> = element.getElementsByTagName('p');

    expect(header!.innerHTML).toBe(`An ${SERVER_EXCEPTION.origin}-side exception has occurred`);
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[1].innerText).toBe(`Status: ${SERVER_EXCEPTION.status} (${SERVER_EXCEPTION.error})`);
  });
});
