import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get( url ).map( (resp: any) => {

      this.totalMedicos = resp.total;
      return resp;

    });

  }

  buscarMedicos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get.apply( url ).map( (resp: any) => resp.medicos);

  }

  borrarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url ).map( resp => {

      swal('Médico Borrado', 'Médico borrado correctamente', 'success');
      return resp;

    });

  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {

      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put( url , medico ).map( (resp: any) => {

        swal('Médico Actualizado', medico.nombre, 'success');
        return resp.medico;

      });

    } else {

      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico ).map( (resp: any) => {

        swal('Médico Creado', medico.nombre, 'success');
        return resp.medico;

      });

    }


  }

  cargarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).map( (resp: any) => resp.medico );

  }

}
