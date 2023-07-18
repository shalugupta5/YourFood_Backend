import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    });
  }

  sendEmail(to: string, subject: string, body: string): Promise<any> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text: body
    };

    return this.transporter.sendMail(mailOptions);
  }
}
