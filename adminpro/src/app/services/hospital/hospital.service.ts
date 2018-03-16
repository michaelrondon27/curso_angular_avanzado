import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../service.index';

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url ).map( (resp: any) => {

      this.totalHospitales = resp.total;
      return resp.hospitales;

    });

  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).map( (resp: any) => resp.hospital );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id + '?token='

  }

}
