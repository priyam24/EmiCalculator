import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmiService } from './service/emi-service';
import { EmiCalculationRequest } from './model/EmiCalculationRequest';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  form!: FormGroup;
  emi!: number;
  error!: string;

  errorFlag = false;

  constructor(
    private fb: FormBuilder,
    private emiService: EmiService
  ) {}

  ngOnInit() {
    this.errorFlag = false;
    this.form = this.fb.group({
      loanAmount: [
        '',
        [Validators.required, Validators.min(1)]
      ],
      interestRate: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      loanTermYears: [
        '',
        [Validators.required, Validators.min(1), Validators.max(30)]
      ]
    });
  }

  calculate() {
    this.errorFlag = false;
    this.emi = 0;
    this.error = 'Something went wrong !';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const payload: EmiCalculationRequest = {
      loanAmount: v.loanAmount,
      annualInterestRate: v.interestRate,
      loanTermInMonths: v.loanTermYears
    };

    this.emiService.calculateEmi(payload).subscribe(
      res => this.emi = res.emiAmount,
      (error) => {
        this.errorFlag = true;
        this.error = JSON.stringify(error.error)
      }    
    );
  }

  // Shortcut for template
  get f(): any {
    return this.form ? this.form.controls : {};
  }

}
