import { Component } from "@angular/core";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { DynamicDialogRef, DialogService } from "primeng/dynamicdialog";
import { Keepalive } from "@ng-idle/keepalive";
import { Subject } from "rxjs";
import { TimeoutComponent } from "./components/timeout/timeout.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  idleState = "Not started.";
  timedOut = false;
  lastPing?: Date = null;
  timeoutRef: DynamicDialogRef;

  private countDownTimerSubject = new Subject<number>();
  countDownTimer$ = this.countDownTimerSubject.asObservable();

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    // private fireBaseAuthService: FireBaseAuthService,
    private dialogService: DialogService
  ) {
    // sets an idle timeout of 3 minutes, for testing purposes.
    idle.setIdle(7 * 60);

    // sets a timeout period of 30 seconds. after 210 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = "No longer idle.";
      console.log(this.idleState);
      this.timeoutRef.close();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = "Timed out!";
      this.timedOut = true;

      // logout.
      this.timeoutRef.close();
      //   this.fireBaseAuthService.logout();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      this.showTimeOutWarning();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = "You will time out in " + countdown + " seconds!";
      this.countDownTimerSubject.next(countdown);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(5);

    keepalive.onPing.subscribe(() => {
      this.lastPing = new Date();
    });

    // this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }

  showTimeOutWarning() {
    this.timeoutRef = this.dialogService.open(TimeoutComponent, {
      header: "Action required",
      width: "25%",
      contentStyle: { "min-height": "50", overflow: "auto" },
      baseZIndex: 10000,
      data: { countDownTimer: this.countDownTimer$ },
    });

    this.timeoutRef.onClose.subscribe(async (res: any) => {
      // this.reset()
    });
  }
}
