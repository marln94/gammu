import { Component, OnInit } from '@angular/core';

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorConfig = {
    removePlugins: ['MediaEmbed', 'ImageUpload', 'Link']
  }
  public htmlData = ''

  constructor() { }

  ngOnInit() {
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log(data);
  }

}
