import nodemailer from "nodemailer";

export async function sendemail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMILSENDER,
            pass: process.env.EMAILPASS,
        },
    });

    const info = await transporter.sendMail({
        from: `roaa_shop <${process.env.EMILSENDER}>`,
        to,
        subject,
        html,
    });

    return info;
}