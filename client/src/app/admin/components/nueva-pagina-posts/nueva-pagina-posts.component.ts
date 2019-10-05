import { Component, OnInit } from '@angular/core';

import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-nueva-pagina-posts',
  templateUrl: './nueva-pagina-posts.component.html',
  styleUrls: ['./nueva-pagina-posts.component.css']
})
export class NuevaPaginaPostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let selects = document.querySelectorAll('select');
    let instances = M.FormSelect.init(selects, {});
  }

}
