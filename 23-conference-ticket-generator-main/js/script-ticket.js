function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("iFullName") || "Guest"; // Nome padrão caso vazio
  const email = params.get("iEmail") || "No email provided";
  const userGitHub = params.get("iGitHubUser") || "No user GitHub provided";
  return { name, email, userGitHub };
}

const ticketName = document.getElementById("ticket-name");
const ticketEmail = document.getElementById("ticket-email");
const usergithub = document.getElementById("user-github");
const nameProfile = document.getElementById("name-profile");

// Exibe informações do usuário
if (ticketName && ticketEmail) {
  const { name, email, userGitHub } = getQueryParams();
  ticketName.innerHTML = `Congrats, <span class="gradient-text">${name}!</span><br> Your ticket is ready.`;
  ticketEmail.innerHTML = `We've emailed your ticket to <span class="gradient-text">${email}</span> and will send updates in the run-up to the event.`;

  nameProfile.textContent = `${name}`;
  usergithub.textContent = `${userGitHub}`;
}

// Recupera a imagem do localStorage e exibe
const imageUrl = localStorage.getItem("imageUrl");

if (imageUrl) {
  const img = document.getElementById("image-profile");
  img.src = imageUrl;  // Define o src da imagem com a URL armazenada
  img.classList.add("preview");
}

const ticketNumber = document.getElementById("ticket-number");
let n1 = Math.floor((Math.random()*10));
let n2 = Math.floor((Math.random()*10));
let n3 = Math.floor((Math.random()*10));
let n4 = Math.floor((Math.random()*10));
let n5 = Math.floor((Math.random()*10));
ticketNumber.textContent = `#${n1}${n2}${n3}${n4}${n5}`;