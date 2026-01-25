import { EMAIL_APP_PASSWORD, EMAIL_USER, FRONTEND_URL } from "@/configs/env-config";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(username: string, email: string, otp: string) {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_APP_PASSWORD,
        },
    });

    // email HTML
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #ffffff; margin: 0; padding: 0; }
            .container { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); margin-top: 1.25rem; max-width: 28rem; margin-left: auto; margin-right: auto; padding: 2.5rem; }
            h3 { text-align: center; font-weight: 600; }
            .heading1 { font-size: 1.875rem; margin-top: 2rem; margin-bottom: 2rem; }
            .heading2 { font-size: 1.25rem; margin-bottom: 1rem; }
            .brand-box { margin-bottom: 3rem; padding-top: 2rem; padding-bottom: 2rem; text-align: center; background-color: #001f3f; color: #ffffff; }
            .brand-box h1 { font-weight: 700; font-size: 2.25rem; margin: 0; }
            .verify-text { color: #3b82f6; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; text-align: center; margin-top: 1rem; }
            .instructions { color: #000000; font-size: 1.125rem; font-weight: 500; text-align: center; margin-top: 0.5rem; margin-left: 1rem; margin-right: 1rem; }
            .code-box { background-color: #f3f4f6; border-radius: 0.375rem; width: 18rem; margin-left: auto; margin-right: auto; margin-top: 1rem; margin-bottom: 1rem; padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .code-display { color: #000000; font-size: 2.25rem; font-weight: 700; letter-spacing: 0.1em; text-align: center; }
            .info-text { color: #374151; font-size: 0.875rem; text-align: center; padding-left: 2.5rem; padding-right: 2.5rem; margin-top: 1rem; }
            .footer-text { color: #000000; font-size: 0.75rem; font-weight: 700; text-align: center; margin-top: 1.25rem; }
            a { color: #374151; text-decoration: underline; margin-left: 0.25rem; margin-right: 0.25rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <h3 class="heading1">Hi, ${username}</h3>
            <h3 class="heading2">Welcome to</h3>
            <div class="brand-box">
                <h1>True Feedback</h1>
            </div>
            <p class="verify-text">Verify Your Identity</p>
            <h2 class="instructions">Enter the following code to finish your verification.</h2>
            <div class="code-box">
                <p class="code-display">${otp}</p>
            </div>
            <p class="info-text">Not expecting this email?</p>
            <p class="info-text">
                Contact
                <a href="mailto:support@truefeedback.com">support@truefeedback.com</a>
                if you did not request this code.
            </p>
        </div>
        <p class="footer-text">Securely powered by Shwet.</p>
    </body>
    </html>
    `;

    // Setup email data
    await transporter.sendMail({
        from: `"True Feedback" <${EMAIL_USER}>`, // Use your Gmail
            to: email,
            subject: 'Your verification code | True Feedback',
            html: emailHTML, // Rendered HTML email
    });

    return;
};

export async function sendResetPasswordEmail(token: string, email: string, username: string) {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_APP_PASSWORD,
        },
    });

    // email HTML
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #ffffff; margin: 0; padding: 0; }
            .container { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); margin-top: 1.25rem; max-width: 28rem; margin-left: auto; margin-right: auto; padding: 2.5rem; }
            h3 { text-align: center; font-weight: 600; }
            .heading1 { font-size: 1.875rem; margin-top: 2rem; margin-bottom: 2rem; }
            .heading2 { font-size: 1.25rem; margin-bottom: 1rem; }
            .brand-box { margin-bottom: 3rem; padding-top: 2rem; padding-bottom: 2rem; text-align: center; background-color: #001f3f; color: #ffffff; }
            .brand-box h1 { font-weight: 700; font-size: 2.25rem; margin: 0; }
            .verify-text { color: #3b82f6; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; text-align: center; margin-top: 1rem; }
            .instructions { color: #000000; font-size: 1.125rem; font-weight: 500; text-align: center; margin-top: 0.5rem; margin-left: 1rem; margin-right: 1rem; }
            .code-box { background-color: #f3f4f6; border-radius: 0.375rem; width: 18rem; margin-left: auto; margin-right: auto; margin-top: 1rem; margin-bottom: 1rem; padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .code-display { color: #000000; font-size: 2.25rem; font-weight: 700; letter-spacing: 0.1em; text-align: center; }
            .info-text { color: #374151; font-size: 0.875rem; text-align: center; padding-left: 2.5rem; padding-right: 2.5rem; margin-top: 1rem; }
            .footer-text { color: #000000; font-size: 0.75rem; font-weight: 700; text-align: center; margin-top: 1.25rem; }
            a { color: #374151; text-decoration: underline; margin-left: 0.25rem; margin-right: 0.25rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <h3 class="heading1">Hi, ${username}</h3>
            <h3 class="heading2">Welcome to</h3>
            <div class="brand-box">
                <h1>True Feedback</h1>
            </div>
            <p class="verify-text">Verify Your Identity</p>
            <h2 class="instructions">follow the following link to reset your password.</h2>
            <div class="code-box">
                <a href=${FRONTEND_URL}/reset-password?token=${token} class="code-display">reset-your-password</a>
            </div>
            <p class="info-text">Not expecting this email?</p>
            <p class="info-text">
                Contact
                <a href="mailto:support@truefeedback.com">support@truefeedback.com</a>
                if you did not request this code.
            </p>
        </div>
        <p class="footer-text">Securely powered by Shwet.</p>
    </body>
    </html>
    `;

    // Setup email data
    await transporter.sendMail({
        from: `"True Feedback" <${EMAIL_USER}>`, // Use your Gmail
            to: email,
            subject: 'Reset your password | True Feedback',
            html: emailHTML, // Rendered HTML email
    });

    return;  
};