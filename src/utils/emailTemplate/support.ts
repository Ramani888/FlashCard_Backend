export const getSupportEmailTemplate = (userEmail: string, description: string) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #C0392B; text-align: center;">New Support Request Received</h2>
            <p>Hello Admin,</p>
            <p>A new support request has been submitted with the following details:</p>
            
            <p><strong>User Email:</strong> ${userEmail}</p>
            <p><strong>Description:</strong> ${description}</p>
            
            <p>Please review this request and respond as needed.</p>
            <p>Thank you,<br>Your Support Team</p>
        </div>
    `

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Creation Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                <!-- Header Logo -->
                <div style="text-align: center; padding-top: 20px;">
                    <img src="YOUR_LOGO_URL" alt="Logo" style="width: 50px; height: 50px;">
                    <h2 style="color: #0d76d3; margin: 10px 0;">BIBLE FLASHCARDS & AI</h2>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                </div>

                <!-- Main Message -->
                <div style="text-align: center; padding: 20px; background-color: #e8f4fb; border-radius: 8px;">
                    <h2 style="color: #2b2b2b; margin: 0;">Hi Fahmi, Your account has been successfully created!</h2>
                    <div style="margin: 20px 0;">
                        <img src="https://flashcard-images-v1.s3.amazonaws.com/1729914384925-Screenshot%202024-07-25%20at%2012.59.14%E2%80%AFPM.png" alt="Confirmation Image" style="width: 150px; height: auto; border-radius: 8px;">
                    </div>
                    <p style="color: #2b2b2b; font-size: 16px; margin: 0;">Congratulations!<br>You successfully created an account.</p>
                    <a href="YOUR_APP_LINK" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0d76d3; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">Go to App</a>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding: 20px;">
                    <div style="display: inline-block; padding: 10px;">
                        <img src="YOUR_CHAT_ICON_URL" alt="Chat Icon" style="width: 20px; height: 20px;">
                    </div>
                    <p style="color: #2b2b2b; font-size: 14px; margin: 0;">Have a question, feedback, or suggestion? Reply to this email.</p>
                    <p style="color: #0d76d3; font-size: 14px; margin-top: 10px;">support@biblestudycards.app</p>
                </div>
            </div>
        </body>
        </html>
    `
}