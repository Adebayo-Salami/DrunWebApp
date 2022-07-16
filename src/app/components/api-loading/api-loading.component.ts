import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-api-loading",
  templateUrl: "./api-loading.component.html",
  styleUrls: ["./api-loading.component.scss"],
})
export class ApiLoadingComponent implements OnInit {
  @Input() public message: string;
  constructor() {}

  ngOnInit(): void {}
}
