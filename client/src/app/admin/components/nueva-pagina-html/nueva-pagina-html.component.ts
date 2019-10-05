import { Component, OnInit } from '@angular/core';

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-nueva-pagina-html',
  templateUrl: './nueva-pagina-html.component.html',
  styleUrls: ['./nueva-pagina-html.component.css']
})
export class NuevaPaginaHtmlComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorConfig = {
    removePlugins: ['MediaEmbed', 'ImageUpload', 'Link']
  }
  public htmlData = ''

  constructor() { }

  ngOnInit() {
    let chip = document.querySelector('.chips');
    let selects = document.querySelectorAll('select');
    let instances = M.FormSelect.init(selects, {});
    let palabrasClave = M.Chips.init(chip, {});
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log(data);
  }

  cambioPalabrasclave(p) {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);
    console.log(palabrasClave.chipsData)
  }

}
