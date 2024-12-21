function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("iFullName") || "Guest"; // Nome padrão caso vazio
  const email = params.get("iEmail") || "No email provided";
  return { name, email };
}

const ticketName = document.getElementById("ticket-name");
const ticketEmail = document.getElementById("ticket-email");

if (ticketName && ticketEmail) {
  const { name, email } = getQueryParams();
  ticketName.innerHTML = `Congrats, <span class="gradient-text">${name}!</span><br> Your ticket is ready.`;
  ticketEmail.innerHTML = `We've emailed your ticket to <span class="gradient-text">${email}</span> and will send updates in the run-up to the event.`;
}
