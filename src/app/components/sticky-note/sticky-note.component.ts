import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-sticky-note",
  templateUrl: "./sticky-note.component.html",
  styleUrls: ["./sticky-note.component.scss"],
})
export class StickyNoteComponent implements OnInit {
  @Input() public messageBody: string = null;
  @Input() public noteTitle: string = null;

  constructor() {}

  ngOnInit(): void {}
}
