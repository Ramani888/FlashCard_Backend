import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, htmlTemplate: any, imageUrl?: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: 'divyeshr@zeusint.com',
            // pass: 'xpqn mysr vrkg aifj'

            user: 'Biblestudykitapp@gmail.com',
            pass: 'jtlo jveb dilx fhlx'
        }
    });

    const mailOptions: { [key: string]: any } = {
        from: 'Biblestudykitapp@gmail.com',
        to,
        subject,
        html: htmlTemplate
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
