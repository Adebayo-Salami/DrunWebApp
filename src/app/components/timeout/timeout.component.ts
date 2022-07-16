import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Observable } from "rxjs";

@Component({
  selector: "app-timeout",
  templateUrl: "./timeout.component.html",
  styleUrls: ["./timeout.component.scss"],
})
export class TimeoutComponent implements OnInit {
  countDownTimer$: Observable<number>;

  constructor(
    public config: DynamicDialogConfig,
    public timeOutModalRef: DynamicDialogRef
  ) // public fireBaseAuthService: FireBaseAuthService
  {}

  ngOnInit(): void {
    this.countDownTimer$ = this.config.data.countDownTimer;
  }

  logout() {
    this.timeOutModalRef.close();
    // this.fireBaseAuthService.logout();
  }

  closeModal() {
    this.timeOutModalRef.close();
  }
}
