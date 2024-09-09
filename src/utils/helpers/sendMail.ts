import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'divyeshr@zeusint.com',
            pass: 'xpqn mysr vrkg aifj'
        }
    });

    const mailOptions = {
        from: 'divyeshr@zeusint.com',
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;
