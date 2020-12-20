import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuelType } from './app.mock';
import { AppService } from './app.service';
import { SnackBarService } from './shared/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private averageDelivery: number = 1650;
  private averagePortFee: number = 1000;
  private averageMyFee: number = 800;

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
      lotNumber: 46164150,
      averageDelivery: this.averageDelivery,
      averagePortFee: this.averagePortFee,
      auctionFee: null,
      myFee: this.averageMyFee,
      customsClearance: null,
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
      this.cdr.detectChanges();
    }, (err) => {
      this.snackBarService.openSnackBar(err.message);
    })
  }

  updateData() {
    const auctionFee = this.appService.getAuctionFee(this.lot.bnp);
    this.formGroup.controls.auctionFee.patchValue(auctionFee);
  }

  getReuslt() {
    const formValue = this.formGroup.value;
    this.result = +this.lot.bnp + +formValue.averageDelivery + +formValue.averagePortFee + +formValue.auctionFee + +formValue.customsClearance;
  }
}
