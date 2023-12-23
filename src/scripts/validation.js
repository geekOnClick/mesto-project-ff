const inactiveButtonClass = 'popup__button_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';

// Functions

const validateSubmitBtn = (params) => {
    const isActiveBtn = params.inputsSelector.every((input) => {
        return input.validity.valid;
    });
    const btn = params.formSelector.querySelector('.popup__button');
    if (isActiveBtn) {
        btn.classList.remove(inactiveButtonClass);
        btn.removeAttribute('disabled');
    } else {
        btn.classList.add(inactiveButtonClass);
        btn.setAttribute('disabled', true);
    }
};

const showError = (input, params) => {
    input.classList.add(inputErrorClass);

    const errorSpan = params.formSelector.querySelector(`.error_type_${input.name}`);

    errorSpan.classList.add(errorClass);
    if (input.validity.patternMismatch) {
        errorSpan.textContent = input.dataset.errorMessage;
    } else {
        errorSpan.textContent = input.validationMessage;
    }

    validateSubmitBtn(params);
};
const clearError = (input, params) => {
    if (input.classList.contains(inputErrorClass)) {
        input.classList.remove(inputErrorClass);

        const errorSpan = params.formSelector.querySelector(`.error_type_${input.name}`);

        errorSpan.classList.remove(errorClass);
        errorSpan.textContent = '';
    }
    validateSubmitBtn(params);
};

const validateInput = (params, input) => {
    switch (input.type) {
        case 'text':
            if (
                !input.validity.valid ||
                input.validity.tooLong ||
                input.validity.tooShort ||
                input.validity.patternMismatch
            ) {
                showError(input, params);
                break;
            } else {
                clearError(input, params);
                break;
            }
        case 'url':
            if (!input.validity.valid || input.validity.patternMismatch) {
                showError(input, params);
                break;
            } else {
                clearError(input, params);
                break;
            }
    }
};

export const clearValidation = (validationParams) => {
    validationParams.inputsSelector.forEach((input) => {
        clearError(input, validationParams);
    });
};
export const enableValidation = (validationParams) => {
    validateSubmitBtn(validationParams);

    validationParams.inputsSelector.forEach((input) => {
        input.addEventListener('input', () => validateInput(validationParams, input));
    });
};
