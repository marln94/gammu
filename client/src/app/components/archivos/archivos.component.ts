import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  archivos = [
    {
      nombre: 'paradise',
      ruta: 'paradise_ocean_tropical_blue_palm_beach_coast_sea_emerald_5420x3613.jpg',
      tipo: 'imagen',
      shortcut: {tipo: 'imagen', id: '1nf91837neeyjh'},
      miniatura: 'paradise_ocean_tropical_blue_palm_beach_coast_sea_emerald_5420x3613.jpg'
    },
    {
      nombre: 'cancion',
      ruta: 'hola.mp3',
      tipo: 'audio',
      extension: 'mp3'
    },
    {
      nombre: 'graduacion',
      ruta: 'graduacion.mp4',
      tipo: 'video',
      miniatura: 'lobito.jpg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
