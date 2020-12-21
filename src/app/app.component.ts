import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuelType } from './app.mock';
import { AppService } from './app.service';
import { SnackBarService } from './shared/snack-bar.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private averageDelivery: number = 1650;
  private averagePortFee: number = 1000;
  private averageMyFee: number = 300;
  private carPrice: number = 0;

  formGroup: FormGroup;
  lot: any = null;
  result: number = 0

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackBarService: SnackBarService
  ) {
    this.formGroup = this.formBuilder.group({
      lotNumber: null,
      carPrice: null,
      averageDelivery: this.averageDelivery,
      averagePortFee: this.averagePortFee,
      auctionFee: null,
      myFee: this.averageMyFee,
      customsClearance: null,
    });

    this.formGroup.controls.carPrice.valueChanges.pipe(skip(1)).subscribe((price: string) => {
      this.carPrice = price ? +price : 0;
      this.updateAuctionFee();
      this.cdr.detectChanges();
    });
  }

  get customsClearanceLink(): string {
    let link = '';
    if (this.lot) {
      const yearDiff = new Date().getFullYear() - this.lot.lcy;
      const a_old = yearDiff > 5 ? 2 : 1;
      link = `https://www.mdoffice.com.ua/ru/aMDOAvto.html?a_type_lico=0&a_type=${fuelType[this.lot.ft]}&a_old=${a_old}&a_year=${this.lot.lcy}&CountryCode=840&a_curr=840&Cost=${this.lot.bnp}`;
    }
    return link;
  }

  getLotDetails() {
    const lot = this.formGroup.controls.lotNumber.value;
    this.appService.getLotDetails(lot).subscribe((res: any) => {
      this.lot = res.data.lotDetails;
      this.updateData();
    }, (err) => {
      this.snackBarService.openSnackBar(err.message);
    })
  }

  updateCarPrice() {
    this.carPrice = this.lot.bnp || this.lot.hb;
  }

  updateData() {
    this.updateCarPrice();
    this.updateAuctionFee();
    this.formGroup.controls.carPrice.patchValue(this.carPrice);
    this.cdr.detectChanges();
  }

  updateAuctionFee() {
    const auctionFee = this.appService.getAuctionFee(this.carPrice);
    this.formGroup.controls.auctionFee.patchValue(auctionFee);
  }

  getReuslt() {
    const formValue = this.formGroup.value;
    this.result = +this.lot.bnp + +formValue.averageDelivery + +formValue.averagePortFee + +formValue.auctionFee + +formValue.customsClearance;
  }
}
