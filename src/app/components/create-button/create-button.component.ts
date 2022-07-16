import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-create-button",
  templateUrl: "./create-button.component.html",
  styleUrls: ["./create-button.component.scss"],
})
export class CreateButtonComponent implements OnInit {
  @Input() public submittingData: boolean;
  @Input() public submittingLeadData: boolean;
  @Input() public submittingRouteData: boolean;
  @Input() public submittingReturnRouteData: boolean;
  @Input() public disabled: boolean;
  @Input() public label: string;
  @Input() public type: string = "button";
  @Output() public onclick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  clickButton(event) {
    if (!this.disabled) {
      this.onclick.emit(event);
    }
  }
}
