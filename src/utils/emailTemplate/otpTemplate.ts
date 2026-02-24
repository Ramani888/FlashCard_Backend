export const getOtpTemplate = (otp: number) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Document</title>
        </head>
        <body style="font-family: Inter, sans-serif; font-size: 14px; margin: 0; padding: 0;">
        <table style="width: 600px; border-collapse: collapse; margin: auto; background: #ffffff;">
            <tr> 
            <td align="center" style="background: #E9F9FF; border-radius: 24px; padding: 30px;">
                <h1 style="font-size: 36px; color: #002634; margin: 0;">OTP - Verification Code</h1>
                <p style="font-size: 20px; color: #000; margin: 10px 0;">Please use the code below to verify your account. This code is valid for 15 minutes.</p>

                <!-- Centered OTP Code Table -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                    <td align="center">
                    <table role="presentation" cellspacing="10" cellpadding="0" border="0" style="margin: auto;">
                        <tr>
                        <td style="width: 50px; height: 50px; font-size: 24px; font-weight: bold; text-align: center; background: #ffffff; border-radius: 8px; border: 1px solid #cccccc;">${otp.toString().charAt(0)}</td>
                        <td style="width: 50px; height: 50px; font-size: 24px; font-weight: bold; text-align: center; background: #ffffff; border-radius: 8px; border: 1px solid #cccccc;">${otp.toString().charAt(1)}</td>
                        <td style="width: 50px; height: 50px; font-size: 24px; font-weight: bold; text-align: center; background: #ffffff; border-radius: 8px; border: 1px solid #cccccc;">${otp.toString().charAt(2)}</td>
                        <td style="width: 50px; height: 50px; font-size: 24px; font-weight: bold; text-align: center; background: #ffffff; border-radius: 8px; border: 1px solid #cccccc;">${otp.toString().charAt(3)}</td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>

            </td>
            </tr>
            <tr>
            <td style="text-align: left; padding: 20px;">
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