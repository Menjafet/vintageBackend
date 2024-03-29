import { Model, model, property } from '@loopback/repository';


@model({ settings: { strict: false } })
export class Payment extends Model {
  @property({
    type: 'object',
    required: true,
  })
  Factura: object;

  @property({
    type: "string",
    required: true,
  })
  paymentMethodNonce: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
