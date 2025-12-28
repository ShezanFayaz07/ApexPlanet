const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const successMessage = document.getElementById('successMessage');

const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener('submit', function(e) {
    e.preventDefault();

        clearErrors();

        if (validateForm()) {
        showSuccess();
        
        setTimeout(() => {
            form.reset();
            hideSuccess();
        }, 3000);
}
});

function validateForm() {
    let isValid = true; 

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();


    if (nameValue === '') {
        showError(nameInput, nameError, 'Please enter your name');
        isValid = false;
    } else if (nameValue.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (emailValue === '') {
        showError(emailInput, emailError, 'Please enter your email');
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (messageValue === '') {
        showError(messageInput, messageError, 'Please enter a message');
        isValid = false;
    } else if (messageValue.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters');
        isValid = false;
    }
    return isValid;
}  

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {

    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    messageError.classList.remove('show');
    
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
}

function showSuccess() {
    successMessage.classList.add('show');
}

function hideSuccess() {
    successMessage.classList.remove('show');
}


// Real Time Validation (Optional)
nameInput.addEventListener('input', function() {
    if (nameInput.classList.contains('error')) {
        nameInput.classList.remove('error');
        nameError.classList.remove('show');
    }
});

emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
        emailInput.classList.remove('error');
        emailError.classList.remove('show');
    }
});

messageInput.addEventListener('input', function() {
    if (messageInput.classList.contains('error')) {
        messageInput.classList.remove('error');
        messageError.classList.remove('show');
    }
});
