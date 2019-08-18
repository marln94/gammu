import { Component, OnInit } from '@angular/core';

import * as moment from "moment";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  fecha = moment().format('DD/MM/YYYY HH:mm')

  constructor() { }

  ngOnInit() {
  }

}
