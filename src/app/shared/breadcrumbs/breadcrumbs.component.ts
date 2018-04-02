import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'; // Para cambiar título de la página

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta
  ) {

    this.getDAtaRoute()
      .subscribe( data => {
        this.label = data.titulo;
        this.title.setTitle(this.label);

        // Modificamos los metas de la página. Creamos la MetaDefinition
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };

        this.meta.updateTag(metaTag); // Seteammos la MetaDefinition
      });
  }

  // Función que controla las Breadcrumbs dinámicamente (ver en documentación ActivationEnd)
  getDAtaRoute() {
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd)
      .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
      .map( (evento: ActivationEnd) => evento.snapshot.data);
  }

  ngOnInit() {
  }

}
