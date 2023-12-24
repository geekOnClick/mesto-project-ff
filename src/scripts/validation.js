const validateSubmitBtn = (params, inputs, btn) => {
    const isActiveBtn = Array.from(inputs).every((input) => input.validity.valid);

    if (isActiveBtn) {
        btn.classList.remove(params.inactiveButtonClass);
        btn.removeAttribute('disabled');
    } else {
        btn.classList.add(params.inactiveButtonClass);
        btn.setAttribute('disabled', true);
    }
};

const showError = (input, params) => {
    input.classList.add(params.inputErrorClass);
    const errorSpan = input.nextElementSibling;
    errorSpan.classList.add(params.errorClass);
    errorSpan.textContent = input.validationMessage;
};

const clearError = (input, params) => {
    input.classList.remove(params.inputErrorClass);
    const errorSpan = input.nextElementSibling;
    errorSpan.classList.remove(params.errorClass);
    errorSpan.textContent = '';
};

const validateInput = (params, input) => {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity('');
    }
    if (input.validity.valid) {
        clearError(input, params);
    } else {
        showError(input, params);
    }
};

export const clearValidation = (form, validationParams) => {
    const inputs = form.querySelectorAll(validationParams.inputSelector);
    const submitBtn = form.querySelector(validationParams.submitButtonSelector);

    inputs.forEach((input) => {
        clearError(input, validationParams);
    });
    validateSubmitBtn(validationParams, inputs, submitBtn);
};

export const enableValidation = (validationParams) => {
    const forms = document.querySelectorAll(validationParams.formSelector);
    forms.forEach((form) => {
        const submitBtn = form.querySelector(validationParams.submitButtonSelector);
        const inputs = form.querySelectorAll(validationParams.inputSelector);

        validateSubmitBtn(validationParams, inputs, submitBtn);
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                validateInput(validationParams, input);
                validateSubmitBtn(validationParams, inputs, submitBtn);
            });
        });
    });
};
