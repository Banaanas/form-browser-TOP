// Delete the stylesheet we don"t use
import "./styles/index.css";
import "./styles/normalize.css";

const allLabels = document.querySelectorAll("input");
const lastName = document.querySelector("#last-name");
const firstName = document.querySelector("#first-name");
const country = document.querySelector("#country");
const zipCode = document.querySelector("#zip-code");
const eMail = document.querySelector("#e-mail");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const errorsDiv = document.querySelector("#errors-div");

// Add the novalidate attribute when the JS loads
const submitForm = document.querySelector("form");
submitForm.noValidate = true;

// Remove errorDiv hidden display style
function blockDisplayErrorDiv() {
  if (errorsDiv.style.display !== "block") {
    errorsDiv.style.display = "block";
  }
}

// Display error type / when there is no error
function showError(eventTargetID) {
  if (eventTargetID === "last-name") {
    if (lastName.validity.valueMissing) {
      errorsDiv.textContent = "You need to enter your Last Name.";
    } else if (lastName.validity.patternMismatch) {
      errorsDiv.textContent = "Only alphabetic characters are allowed.";
    } else if (lastName.validity.tooShort) {
      errorsDiv.textContent = `Last Name should be at least ${lastName.minLength} characters.`;
    } else if (lastName.validity.valid) {
      errorsDiv.textContent = "Last Name is alright.";
    }
  }

  if (eventTargetID === "first-name") {
    if (firstName.validity.valueMissing) {
      errorsDiv.textContent = "You need to enter your First Name.";
    } else if (firstName.validity.patternMismatch) {
      errorsDiv.textContent = "Only alphabetic characters are allowed.";
    } else if (firstName.validity.tooShort) {
      errorsDiv.textContent = `First Name should be at least ${firstName.minLength} characters.`;
    } else if (firstName.validity.valid) {
      errorsDiv.textContent = "First Name is alright.";
    }
  }

  if (eventTargetID === "country") {
    if (country.validity.valueMissing) {
      errorsDiv.textContent = "You need to enter your Country.";
    } else if (country.validity.patternMismatch) {
      errorsDiv.textContent = "Only alphabetic characters are allowed.";
    } else if (country.validity.tooShort) {
      errorsDiv.textContent = `Country's Name should be at least ${country.minLength} characters.`;
    } else if (country.validity.valid) {
      errorsDiv.textContent = "Country's Name is alright.";
    }
  }

  if (eventTargetID === "zip-code") {
    if (zipCode.validity.valueMissing) {
      errorsDiv.textContent = "You need to enter your Zip Code.";
    } else if (
      zipCode.validity.rangeUnderflow
      || zipCode.validity.rangeOverflow
    ) {
      errorsDiv.textContent = "Zip-Code must be 5 numbers long.";
    } else if (zipCode.validity.valid) {
      errorsDiv.textContent = "Zip-Code is alright.";
    }
  }

  if (eventTargetID === "e-mail") {
    if (eMail.validity.valueMissing) {
      errorsDiv.textContent = "You need to enter your E-Mail address.";
    } else if (eMail.validity.typeMismatch) {
      errorsDiv.textContent = "Entered value needs to be an E-Mail address.";
    } else if (eMail.validity.tooShort) {
      errorsDiv.textContent = `E-Mail should be at least ${eMail.minLength} characters.`;
    } else if (eMail.validity.valid) {
      errorsDiv.textContent = "E-Mail is alright.";
    }
  }

  if (eventTargetID === "password") {
    if (password.validity.tooShort) {
      errorsDiv.textContent = `Password should be at least ${password.minLength} characters. You entered ${password.value.length} yet.`;
    } else if (password.validity.valid) {
      errorsDiv.textContent = "Password is alright.";
    }
  }

  if (eventTargetID === "confirm-password") {
    if (confirmPassword.validity.tooShort) {
      errorsDiv.textContent = `Confirmed Password should be at least ${confirmPassword.minLength} characters; you entered ${confirmPassword.value.length}.`;
    } else if (confirmPassword.validity.valid) {
      errorsDiv.textContent = "Confirmed Password is alright.";
    }
  }
}

// When User enter input, check input validity
allLabels.forEach((item) => {
  item.addEventListener("input", (event) => {
    const eventTargetID = event.target.id;

    // Check if password and confirmPassword values match
    // ONLY IF there is no tooShort error and Return
    // This way, passwordS' length validity is checked before
    // to check if they are identical
    blockDisplayErrorDiv();
    if (eventTargetID === "password" && !password.validity.tooShort) {
      if (confirmPassword.value !== password.value) {
        errorsDiv.textContent = "Passwords don't match.";
        return;
      }
      if (confirmPassword.value === password.value) {
        errorsDiv.textContent = "Passwords match.";
        return;
      }
    }

    if (
      eventTargetID === "confirm-password"
      && !confirmPassword.validity.tooShort
    ) {
      if (confirmPassword.value !== password.value) {
        errorsDiv.textContent = "Passwords don't match.";
        return;
      }
      if (confirmPassword.value === password.value) {
        errorsDiv.textContent = "Passwords match.";
        return;
      }
    }

    // Each time the user types something, check if the
    // form fields are valid.
    if (
      lastName.validity.valid
      && firstName.validity.valid
      && country.validity.valid
      && zipCode.validity.valid
      && eMail.validity.valid
      && password.validity.valid
      && confirmPassword.validity.valid
      && confirmPassword.value === password.value
    ) {
      errorsDiv.innerHTML = ""; // Reset the content of the message
      errorsDiv.textContent = "You can submit your form.";
    } else {
      // If there is still an error, show the correct error
      showError(eventTargetID);
    }
  });
});

// Add Input indication Message when clicked for the first time
allLabels.forEach((item) => {
  item.addEventListener("click", (event) => {
    const eventTargetValue = event.target.value;
    let eventTargetID = event.target.id;

    // If input is empty
    if (!eventTargetValue) {
      // eslint-disable-next-line default-case
      switch (eventTargetID) {
        case "last-name":
          eventTargetID = "Last Name";
          break;
        case "first-name":
          eventTargetID = "First Name";
          break;
        case "country":
          eventTargetID = "Country";
          break;
        case "zip-code":
          eventTargetID = "Zip Code";
          break;
        case "e-mail":
          eventTargetID = "E-Mail";
          break;
        case "password":
          eventTargetID = "Password";
          break;
        case "confirm-password":
          eventTargetID = "Password Confirmation";
          break;
      }
      // Set the Input indication Message
      errorsDiv.innerHTML = ""; // Reset the content of the message
      errorsDiv.textContent = `Please, enter your ${eventTargetID}.`;
      blockDisplayErrorDiv();
    }
  });
});

// If all input are correctly filled, add a "submit message"
allLabels.forEach((item) => {
  item.addEventListener("keyup", () => {
    if (
      lastName.validity.valid
      && firstName.validity.valid
      && country.validity.valid
      && zipCode.validity.valid
      && eMail.validity.valid
      && password.validity.valid
      && confirmPassword.validity.valid
      && confirmPassword.value === password.value
    ) {
      // In case there is an error message visible, if the field
      // is valid, remove the error message.
      errorsDiv.innerHTML = ""; // Reset the content of the message
      errorsDiv.textContent = "You can submit your form.";
    }
  });
});

// When click on Submit Button
submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  blockDisplayErrorDiv();
  // If the form doesn't contain any invalid input
  if (submitForm.checkValidity() && confirmPassword.value === password.value) {
    errorsDiv.innerHTML = " &#128526; You are the best ! &#128540;";
  } else if (
    !submitForm.checkValidity()
    && confirmPassword.value !== password.value
  ) {
    // If there is still an error, show the correct error
    errorsDiv.innerHTML = "Passwords don't match";
  } else if (!submitForm.checkValidity()) {
    // If there is still an error, show the correct error
    errorsDiv.innerHTML = "Please fill all the field with correct values.";
  }
});
