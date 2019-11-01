import { Router } from 'express'
export const entrada = Router()
'use strict';

const nodemailer = require('nodemailer');
const ical = require('ical-generator');
let infoEvent;
let emailError = [];
const emailContent = "<div style='background-color: #F7F7FF;'><h2><span style='color: #0087ff;'>Kitchen Duty Event</span></h2><p><span style='color: #808080;'>Saludos desde RH, </span><br/><br/><span style='color: #808080;'>Por favor acepta esta invitacion a tu calendario de la siguiente manera:</span></p><h3><strong>Desde Aplicacion 'Outlook Desktop'</strong></h3><ol> <li><span style='color: #666;'>Doble Clic en el archivo '<em>event.ics</em>'</span></li><li><span style='color: #666;'>A&ntilde;adir evento al Calendario Aceptar.</span></li><li><span style='color: #666;'>En la siguiente pantalla asegurate de cambiar el Reminder a al menos 5 minutos.</span></li><li><span style='color: #666;'>Click en 'Guardar y Cerrar'/'Save and Close'</span></li></ol><h3><strong>Desde 'Outlook Web'</strong></h3><ol> <li><span style='color: #666;'>Clic en el icono parecido a un calendario con una suma del&nbsp; archivo '<em>event.ics</em>' para a&ntilde;adir automaticamente el evento a tu calendario</span></li><li><span style='color: #666;'>Click en la flecha hacia abajo. Desplegara 3 opciones</span></li><li><span style='color: #666;'>Seleccionar Agregar al Calendario</span></li></ol><p><span style='color: #666;'>Cualquier duda o comentario enviar correo a Recursos Humanos</span></p></div>"

entrada.post('/', (req, res) => {
    const events = req.body;
    let response = postEvents(events);
    return res.status(200).send(response)
})

function postEvents(events) {
    events.forEach((e) => {

        let date;
        let dateStart;
        let dateEnd;
        if (e.shiftam)//Morning
        {
            date = e.start.split('T', 1)
            dateStart = date + "T10:15:00.0600";
            dateEnd = date + "T10:30:00.0600";
        }
        else {//Afternoon
            date = e.start.split('T', 1)
            dateStart = date + "T16:00:00.0600";
            dateEnd = date + "T16:15:00.0600";
        }

        e.title = e.title + "@sciodev.com";
        e.start = dateStart;
        e.end = dateEnd;

        
        sendEmail(changeInfoEvent(e));

    });
    if(emailError.length == 0)
        emailError.push({status: 200});


    return emailError;
}

function changeInfoEvent(event) {
    return infoEvent = {
        start: event.start,
        end: event.end,
        summary: "Kitchen Duty",
        description: "",//emailContent,
        location: "Kitchen",
        from: "KitchenDutyNoReply@sciodev.com",
        to: {
            required: event.title //Destinatario
        },
        subject: "KitchenDuty Event"
        
        
    };
}

const account = {
    server: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    user: "AKIAI3QAYH64AUAV5DIA",
    pass: "AmYH6pQTsqeBigWa+LkqQRW0kRoeMC5yVwRfMt8h7md4"
}




async function sendEmail(infoEvent) {

    let transporter = nodemailer.createTransport({
        host: account.server,
        port: account.port,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass
        }
    })
    transporter.sendMail(createCalenderEVent(infoEvent), (err, info) => {
        return err ? emailError.push(infoEvent.to.required) : console.log("All Sent ");
    })


}

function createCalenderEVent(infoEvent) {
    let cal = ical();

    cal.createEvent({
        start: new Date(infoEvent.start),
        end: new Date(infoEvent.end),
        summary: infoEvent.summary,
        description: infoEvent.description,
        location: infoEvent.location,
    });
    return {
        from: infoEvent.from,
        to: infoEvent.to.required,
        subject: infoEvent.subject,
        attachments:[{
            filename:"Event.ics",
            contentType: "text/calendar",
            content:Buffer.from(cal.toString())
        }],
        html: emailContent
        
    };
}

