import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { memberFee } from './app.mock';
import { SnackBarService } from './shared/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  private getMemberFee() {
    return memberFee
  }

  getAuctionFee(carCost: number): number {
    const memberFee = this.getMemberFee();
    const item = memberFee.find(d => carCost >= d.from && carCost < d.to);
    if (!item) {
      this.snackBarService.openSnackBar(`Значення для збору аукціону не знайдено (${carCost})`);
      return 0;
    }
    return item.fee + item.internetFee;
  }

  getLotDetails(lot: number) {
    return this.http.get(`https://www.copart.com/public/data/lotdetails/solr/${lot}`);
  }
}
