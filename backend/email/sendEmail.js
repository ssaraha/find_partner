import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import {
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    ACCEPTED_REQUEST_TEMPLATE,
    DECLINE_REQUEST_TEMPLATE,
    FINISH_REQUEST_TEMPLATE
} from "./emailTemplate.js";
import dotenv from "dotenv"


dotenv.config();
export const sendEmail = (emailTo, type, verificationToken = '', username = '', resetPassword = '') => {
    
    let subject = "";
    let templateEmail = "";
    // FOR REAL GMAIL
    let config = {
        service: 'gmail',
        auth: {
            // user: emailFrom,
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);
    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Business.com",
            link: "https://mailgen.js"
        }
    })

    let response = {
        body: {
            name: "Request send",
            intro: "You have a new request",
            // table: {
            //     data: [
            //         {
            //             item: "Nodemailer Stack Book",
            //             description: "A Backend application",
            //             price: "$10.99"
            //         },
            //     ],
            //     outro: "Looking forward to do more business"
           // },
        }
    }
    
    if (type === "verificationToken") {
        templateEmail = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken);
        subject = "Verification email";
    }
    else if(type === "verifyEmail") {        
        templateEmail = WELCOME_EMAIL_TEMPLATE.replace('{username}', username);
        subject = "Welcome email";
    }
    else if(type === "resetPassword") {        
        templateEmail = PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetPassword);
        subject = "Reset your password";
    }
    else if(type === "resetSuccessEmail") {        
        templateEmail = PASSWORD_RESET_SUCCESS_TEMPLATE;
        subject = "Reset success password";
    }
    else if(type === "acceptRequest") {        
        templateEmail = ACCEPTED_REQUEST_TEMPLATE.replace('{username}', username);
        subject = "Accept request";
    }
    else if(type === "declineRequest") {        
        templateEmail = DECLINE_REQUEST_TEMPLATE.replace('{username}', username);
        subject = "Decline request";
    }
    else if(type === "finishRequest") {        
        templateEmail = FINISH_REQUEST_TEMPLATE.replace('{username}', username);
        subject = "Decline request";
    }

    let mail = MailGenerator.generate(response);
    let message = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: subject,
        html: templateEmail
    }

    transporter.sendMail(message).then(() => {
        return function (req, res) {
            res.status(201).json({
                messageEmail: "You should receive an email",
            })
        }
    }).catch(error => {
        return function (req, res) {
            res.status(500).json({
                error
            })
        }
    })
}