import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NJob4UComponent } from './njob4u.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NJob4UComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NJob4UComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontendnjob4u'`, () => {
    const fixture = TestBed.createComponent(NJob4UComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontendnjob4u');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(NJob4UComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to frontendnjob4u!');
  });
});
