import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( () => this.cargarHospitales() );

  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino ).subscribe( hospitales => this.hospitales = hospitales );

  }

  cargarHospitales() {

    this._hospitalService.cargarHospitales( this.desde ).subscribe( (resp: any) => {

        if ( this.desde >= resp.total ) {
          this.desde -= 5;
          return this.cargarHospitales();
        }

        this.hospitales = resp.hospitales;

    });

  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital ).subscribe();

  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: "¿Esta seguro?",
      text: "Esta a punto de borrar a " + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {
        this._hospitalService.borrarHospital( hospital._id ).subscribe( () => this.cargarHospitales() );
      }

    });

  }

  crearHospital() {

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor ).subscribe( () => this.cargarHospitales() );

    });

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this._hospitalService.totalHospitales ) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
