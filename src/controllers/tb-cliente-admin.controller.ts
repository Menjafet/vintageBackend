import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import { post, getModelSchemaRef, requestBody, HttpErrors } from "@loopback/rest";
import { TbCliente } from "../models";
import { inject } from '@loopback/core';
import { PasswordHasherBindings } from '../keys';
import { TbClienteRepository } from '../repositories';
import { BcyptHasher } from '../Services/hash.password.bcrypt';
import Validar = require('../Services/Format');

import { ok, err, Result } from 'neverthrow'

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class TbClienteAdminController {
  constructor(
    @repository(TbClienteRepository)
    public tbClienteRepository: TbClienteRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcyptHasher,

  ) { }




  @post('/Admin', {
    responses: {
      '200': {
        description: 'TbCliente model instance',
        content: { 'application/json': { schema: getModelSchemaRef(TbCliente) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TbCliente, {
            title: 'NewTbCliente-Admin',
            exclude: ['_id'],
          }),
        },
      },
    })
    tbCliente: Omit<TbCliente, '_id'>,
  ): Promise<Result<TbCliente, Error>> {
    const verificar = await Validar.isFine(tbCliente);
    if (!verificar.valid) return err(new HttpErrors.UnprocessableEntity(verificar.incident));

    if ((await this
      .tbClienteRepository
      .findOne({
        where: {
          sCorreo: tbCliente.sCorreo
        }
      }))) return err(new HttpErrors.UnprocessableEntity('Ese correo ya existe'));

    //esLint-disable-next-line require-atomic-updates
    tbCliente.sContrasena = await this.hasher.hashPassword(
      tbCliente.sContrasena,
    );


    /*tbCliente.aPermisos = [...this.permisos.Cliente.getArray(), ...this.permisos.Articulo.getArray(),
    ...this.permisos.Categoria.getArray(), ...this.permisos.Factura.getArray(),
    ...this.permisos.Historial.getArray(), ...this.permisos.Receta.getArray(),
    this.permisos.manage.Cliente, this.permisos.manage.Himself, this.permisos.manage.admin];*/
    tbCliente.bAdmin = true;

    const saved = await this.tbClienteRepository.create(tbCliente);
    //delete saved.sContrasena;
    return ok(saved);
  }


}
