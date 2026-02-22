export const getCreateAccountTemplate = () => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Document</title>
        </head>
        <body style="font-family: Inter, sans-serif; font-size: 14px; margin: 0; padding: 0;">
        <table style="width: 600px; border-collapse: collapse; margin: auto; background: #ffffff;">
            <tr>
            <td style="text-align: center; padding: 20px;">
                <img src="https://flashcard-email-template-v1.s3.us-east-1.amazonaws.com/Logo.png" width="80" height="80" alt="Logo">
                <h2 style="color: #146D8B; font-family: Inter, sans-serif; font-weight: 700; font-size: 18px;">BIBLE FLASHCARDS & AI</h2>
            </td>
            </tr>
            <tr>
            <td style="height: 1px; background: #d1d1d6;"></td>
            </tr>
            <tr>
            <td style="height: 32px; background: transparent;"></td>
            </tr>
            <tr>
            <td style="background: #E9F9FF; border-radius: 24px; text-align: center;">
                <h1 style="font-size: 36px; color: #002634;">Your account has been successfully created!</h1>
                <!-- <p style="font-size: 20px; color: #000;">We will contact you shortly. Thank you 🙌</p> -->
                <a href="https://play.google.com/store/apps/details?id=com.flashcard.app" target="_blank">
                <img src="https://flashcard-email-template-v1.s3.us-east-1.amazonaws.com/Iphone+Congrats+2.png" width="480" height="411">
                </a>
            </td>
            </tr>
            <tr>
            <td style="height: 32px; background: transparent;"></td>
            </tr>
            <tr>
            <td style="height: 1px; background: #d1d1d6;"></td>
            </tr>
            <tr>
            <td style="text-align: left; padding: 20px;">
                <img src="https://flashcard-email-template-v1.s3.us-east-1.amazonaws.com/Logo+Chat+1.png" width="94" height="69">
                <p style="margin: 0;">Have a question, feedback, or suggestion?</p>
                <p style="margin: 0;">Reply to this email.</p>
            </td>
            </tr>
            <tr>
            <td style="height: 1px; background: #d1d1d6;"></td>
            </tr>
            <tr>
            <td style="text-align: center; padding: 20px; font-size: 18px;">
                <p style="margin: 0;">support@biblestudycards.app</p>
            </td>
            </tr>
        </table>
        </body>
        </html>
    `
}