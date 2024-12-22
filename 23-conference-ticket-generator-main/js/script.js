const container = document.getElementById("container-input-file");
const inputFile = document.getElementById("iAvatar");
const iconUpload = document.getElementById("icon-upload");
const divInfo = document.getElementById("file-information");
const submit = document.querySelector('input[type="submit"]');
const containerButtons = document.getElementById("container-buttons");
let fileIsValid = false;

window.addEventListener("DOMContentLoaded", () => {
  const savedImageUrl = localStorage.getItem("imageUrl");
  if (savedImageUrl) {
    const img = document.createElement("img");
    img.src = savedImageUrl;
    img.classList.add("preview");

    iconUpload.style.display = "none";

    container.appendChild(img);
    fileIsValid = true;
  } else {
    fileIsValid = false;
  }

  updateUIBasedOnFile();
});

function updateUIBasedOnFile() {
  const placeholder = document.getElementById("file-placeholder");

  if (fileIsValid) {
    placeholder.style.display = "none";
    containerButtons.style.display = "flex";
  } else {
    placeholder.style.display = "block";
    containerButtons.style.display = "none";
  }
}

// Redireciona o clique para o input file
container.addEventListener("click", () => inputFile.click());

// Evento para arrastar arquivos sobre o contêiner
container.addEventListener("dragover", (event) => {
  event.preventDefault();
  container.classList.add("dragover");
});

// Evento para quando o arquivo sai do contêiner
container.addEventListener("dragleave", () => {
  container.classList.remove("dragover");
});

// Evento para soltar arquivos
container.addEventListener("drop", (event) => {
  event.preventDefault();
  container.classList.remove("dragover");

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    handleFile(file);
    updateUIBasedOnFile();
  }
});

// Evento para quando um arquivo é selecionado pelo input
inputFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
    updateUIBasedOnFile();
  }
});

// Função para exibir a imagem no contêiner e salvar no localStorage
function handleFile(file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      iconUpload.style.display = "none";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("preview");

      const existingPreview = container.querySelector("img.preview");
      if (existingPreview) {
        existingPreview.remove();
      }

      container.appendChild(img);
      fileIsValid = true;

      divInfo.classList.remove("errorMessage");

      localStorage.setItem("imageUrl", e.target.result);
      updateUIBasedOnFile();
    };

    reader.readAsDataURL(file);
  } else {
    fileIsValid = false;
    alert("Por favor, adicione uma imagem válida!");
  }
}

function removeImage() {
  const existingPreview = container.querySelector("img.preview");
  if (existingPreview) {
    existingPreview.remove();
  }

  iconUpload.style.display = "flex";

  fileIsValid = false;

  inputFile.value = "";

  localStorage.removeItem("imageUrl");
}

const btnRemove = document.getElementById("remove-image");
btnRemove.addEventListener("click", (event) => {
  event.stopPropagation();
  removeImage();
  updateUIBasedOnFile();
});

// Função para validar email
function emailValidate(event) {
  const inputEmail = document.getElementById("iEmail");
  const email = inputEmail.value.trim();
  const errorEmail = document.getElementById("errorEmail");
  let emailIsValid = true;

  if (!email.includes("@") || !email.includes(".com")) {
    inputEmail.classList.add("errorInput");
    errorEmail.hidden = false;
    errorEmail.classList.add("errorMessage");
    emailIsValid = false;
  } else {
    inputEmail.classList.remove("errorInput");
    errorEmail.hidden = true;
    errorEmail.classList.remove("errorMessage");
    emailIsValid = true;
  }

  if (!emailIsValid) {
    event.preventDefault();
  }
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("iFullName") || "Guest"; // Nome padrão caso vazio
  const email = params.get("iEmail") || "No email provided";
  return { name, email };
}

const ticketName = document.getElementById("ticket-name");
const ticketEmail = document.getElementById("ticket-email");

// Validação no envio do formulário
submit.addEventListener("click", function (event) {
  emailValidate(event);

  if (!fileIsValid) {
    divInfo.classList.add("errorMessage");
    event.preventDefault(); // Previne o envio do formulário
  }
});
