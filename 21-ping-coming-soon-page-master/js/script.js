function validateEmail(event) {
  const inputEmail = document.getElementById("iemail");
  const email = inputEmail.value.trim();
  const errorMessage = document.getElementById("error-message");
  let emailValid = true;


  if(!email.includes("@") || !email.includes(".com")) {
    errorMessage.hidden = false;
    inputEmail.classList.add("error");
    emailValid = false;
  } else {
    inputEmail.classList.remove("error");
    errorMessage.hidden = true;
    emailValid = true;
  }

  if(!emailValid) {
    event.preventDefault();
  }
}

const btnNotify = document.getElementById("btnNotify");
btnNotify.addEventListener("click", validateEmail);