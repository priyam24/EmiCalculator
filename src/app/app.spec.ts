import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app';
import { EmiService } from './service/emi-service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('App', () => {
  let emiServiceSpy: any;

  beforeEach(async () => {
    emiServiceSpy = jasmine.createSpyObj('EmiService', ['calculateEmi']);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: EmiService, useValue: emiServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

    // --- validation test ---
  it('should mark form invalid for empty fields', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.form.setValue({ loanAmount: '', interestRate: '', loanTermYears: '' });
    app.calculate();

    expect(app.form.invalid).toBeTrue();
    expect(app.emi).toBe(0); 
    expect(app.errorFlag).toBeFalse();
  });

  // --- submission success test ---
  it('should set emi on successful calculation', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    emiServiceSpy.calculateEmi.and.returnValue(of({ emiAmount: 8884.88 }));

    app.form.setValue({ loanAmount: 100000, interestRate: 12, loanTermYears: 12 });
    app.calculate();
    tick();

    expect(emiServiceSpy.calculateEmi).toHaveBeenCalled();
    expect(app.emi).toBe(8884.88);
    expect(app.errorFlag).toBeFalse();
  }));

  // --- submission failure test ---
  it('should set errorFlag on calculation failure', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const errorResponse = { error: 'Server error' };
    emiServiceSpy.calculateEmi.and.returnValue(throwError(() => errorResponse));

    app.form.setValue({ loanAmount: 100000, interestRate: 12, loanTermYears: 12 });
    app.calculate();
    tick();

    expect(app.emi).toBe(0);
    expect(app.errorFlag).toBeTrue();
    expect(app.error).toBe(JSON.stringify(errorResponse.error));
  }));
});
