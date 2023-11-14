import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDepositComponent } from './currency-deposit.component';

describe('CurrencyDepositComponent', () => {
  let component: CurrencyDepositComponent;
  let fixture: ComponentFixture<CurrencyDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
