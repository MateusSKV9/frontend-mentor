const container = document.getElementById("container-input-file");
const inputFile = document.getElementById("iAvatar");
const iconUpload = document.getElementById("icon-upload");
const labelUpload = document.getElementById("label-upload");
const divInfo = document.getElementById("file-information");
const submit = document.querySelector('input[type="submit"]');
let fileIsValid = false; // Inicializa como falso

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
  }
});

// Evento para quando um arquivo é selecionado pelo input
inputFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
  }
});

// Função para exibir a imagem no contêiner e salvar no localStorage
function handleFile(file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Remove ícone e texto do contêiner
      iconUpload.style.display = "none";
      labelUpload.style.display = "none";

      // Adiciona a imagem carregada
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("preview");

      // Remove prévias anteriores (se houver)
      const existingPreview = container.querySelector("img.preview");
      if (existingPreview) {
        existingPreview.remove();
      }

      container.appendChild(img);
      fileIsValid = true; // Arquivo válido foi adicionado
      divInfo.classList.remove("errorMessage"); // Remove erro

      // Salva a URL da imagem no localStorage
      localStorage.setItem("imageUrl", e.target.result); // Salva no localStorage
    };

    reader.readAsDataURL(file); // Converte o arquivo para uma URL base64
  } else {
    fileIsValid = false;
    alert("Por favor, adicione uma imagem válida!"); // Mensagem de erro
  }
}

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
