const errorMessageElement = document.querySelector('.error_message');
export const showErrorMessage = (message) => {
    errorMessageElement.innerText = message;
}

const feedbackMessageElement = document.querySelector('.feedback-message');
export const showFeedbackMessage = (message) => {
    feedbackMessageElement.innerText = message;
}

