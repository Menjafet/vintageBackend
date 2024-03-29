import { Model, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Password extends Model {
  @property({
    type: 'string',


    required: true,
  })
  pass: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Password>) {
    super(data);
  }
}

export interface PasswordRelations {
  // describe navigational properties here
}

export type PasswordWithRelations = Password & PasswordRelations;
