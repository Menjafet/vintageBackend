/**
 * send mail cliente
 *
 * send mail factura
 *
 */

import { getTestMessageUrl, createTransport, Transporter } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { TbFactura, TbCliente, TbArticulo } from '../models';


export class MyMailService {




  async activate(cliente: TbCliente, token: string) {


    var text = "http://localhost:3001/activar/token/" + token;
    //crear un token de activar
    //insertar como token de activar
    //enviar al correo

    await this.send({
      from: 'chefnodemail@gmail.com',
      to: cliente.sCorreo,
      subject: 'Factura',
      html: text,
    })

  }

  async Recover(cliente: TbCliente, token: string) {


    var text = "http://localhost:3001/Recuperar/token/" + token;
    //crear un token de activar
    //insertar como token de activar
    //enviar al correo

    await this.send({
      from: 'chefnodemail@gmail.com',
      to: cliente.sCorreo,
      subject: 'Factura',
      html: text,
    })



  }

  async invoice(factura: TbFactura, cliente: TbCliente) {

    var fact: TbFactura = factura;
    delete fact._id;
    // delete fact.sCliente;

    var text = JSON.stringify(fact);

    /*factura.aCompras.forEach(element => {
      const elementoCarrito: TbArticulo = plainToClass(TbArticulo, element);
      text.concat(text, `<h3> ${elementoCarrito.sNombre}</h1>`)
    });

    text.concat(text, `<h1> total: ${factura.iTotal}$ </h1>`)*/
    console.log(text)
    await this.send({
      from: 'chefnodemail@gmail.com',
      to: cliente.sCorreo,
      subject: 'Factura',
      html: text,


    })
  }

  async send(correo: Mail.Options) {


    let transporter: Transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: 'chefnodemail@gmail.com',
        pass: 'Net0123456'
      }
    });

    transporter.sendMail(correo, function (error, info) {
      if (error) {
        console.log(error);

      } else {
        console.log('Email sent: ' + info.response);

      }
    });
  }

}
