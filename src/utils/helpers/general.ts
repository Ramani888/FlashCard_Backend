// export const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export const getIssueSentence = (supportType: string) => {
    switch (supportType) {
        case 'Bug Report':
            return 'A new Bug Report has been successfully submitted by the user. Please review the details and take the necessary action.'
        case 'Feedback':
            return 'The user has submitted Feedback. Please check the details and provide a response as needed.'
        case 'Issues':
            return 'An Issue has been reported by the user. Kindly review the submission and address it promptly.'
        case 'Suggestions':
            return 'A new Suggestion has been submitted by the user. Please take a look and consider it for future improvements.'
        case 'ETC':
            return 'A user has submitted an issue under the category ETC. Please review the information and respond accordingly.'
        default:
            return 'A new Bug Report has been successfully submitted by the user. Please review the details and take the necessary action.'    
    }
}