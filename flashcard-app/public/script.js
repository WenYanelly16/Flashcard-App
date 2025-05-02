// /public/script.js
document.addEventListener('DOMContentLoaded', function() {
    const flashcard = document.getElementById('flashcard');
    
    if (flashcard) {
      flashcard.addEventListener('click', function() {
        flashcard.classList.toggle('flip');
      });
    }
  });
  
  // Client-side validation for add card form
  document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addCardForm');
    if (addForm) {
      const validateInput = (input) => {
        const errorElement = document.getElementById(`${input.name}Error`);
        
        if (input.validity.valueMissing) {
          errorElement.textContent = 'This field is required';
        } else if (input.validity.tooShort) {
          errorElement.textContent = `Minimum length is ${input.minLength} characters`;
        } else if (input.validity.tooLong) {
          errorElement.textContent = `Maximum length is ${input.maxLength} characters`;
        } else {
          errorElement.textContent = '';
        }
      };

      const inputs = addForm.querySelectorAll('input[required]');
      inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
      });

      addForm.addEventListener('submit', function(e) {
        let isValid = true;
        inputs.forEach(input => {
          validateInput(input);
          if (!input.checkValidity()) {
            isValid = false;
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      });
    }
  });