import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, text: string, imageUrl?: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'divyeshr@zeusint.com',
            pass: 'xpqn mysr vrkg aifj'
        }
    });

    const mailOptions: { [key: string]: any } = {
        from: 'divyeshr@zeusint.com',
        to,
        subject,
        text,
    };

    // Add attachment only if imagePath is provided
    if (imageUrl) {
        mailOptions.attachments = [
            {
                path: imageUrl
            }
        ];
    }

    await transporter.sendMail(mailOptions);
};

export default sendMail;
