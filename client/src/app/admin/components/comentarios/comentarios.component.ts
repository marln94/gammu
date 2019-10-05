import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  fecha = moment().format('DD/MM/YYYY HH:mm')

  constructor() { }

  ngOnInit() {
  }

}
