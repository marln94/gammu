import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-tema',
  templateUrl: './nuevo-tema.component.html',
  styleUrls: ['./nuevo-tema.component.css']
})
export class NuevoTemaComponent implements OnInit {

  css = '';
  javascript = '';
  options = { maxLines: 1000, printMargin: false };

  onChange(code) {
    console.log("new code", code);
  }

  constructor() { }

  ngOnInit() {
  }

}
