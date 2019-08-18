import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  css = '';
  javascript = '';
  options = { maxLines: 1000, printMargin: false };

  onChange(code) {
    console.log("new code", code);
  }


  constructor() { }

  ngOnInit() {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.init(elem, {});
  }

  cambioPalabrasclave(p) {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);
    console.log(palabrasClave.chipsData)
  }

}
