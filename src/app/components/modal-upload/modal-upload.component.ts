import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  oculto: string; // Para ocultar o mostrar el modal

  constructor() { }

  ngOnInit() {
  }

}
