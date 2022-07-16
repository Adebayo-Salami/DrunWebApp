import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-chart-widget",
  templateUrl: "./chart-widget.component.html",
  styleUrls: ["./chart-widget.component.scss"],
})
export class ChartWidgetComponent implements OnInit {
  @Input() title: string;
  @Input() chartData: any;
  @Input() colors: any;
  constructor() {}

  ngOnInit(): void {}
}
