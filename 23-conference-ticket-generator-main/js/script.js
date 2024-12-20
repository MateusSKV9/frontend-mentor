const container = document.getElementById('container-input-file');
const inputFile = document.getElementById('iAvatar');
const iconUpload = document.getElementById('icon-upload');
const labelUpload = document.getElementById('label-upload');

// Redireciona o clique para o input file
container.addEventListener('click', () => inputFile.click());

// Evento para arrastar arquivos sobre o contêiner
container.addEventListener('dragover', (event) => {
  event.preventDefault();
  container.classList.add('dragover');
});

// Evento para quando o arquivo sai do contêiner
container.addEventListener('dragleave', () => {
  container.classList.remove('dragover');
});

// Evento para soltar arquivos
container.addEventListener('drop', (event) => {
  event.preventDefault();
  container.classList.remove('dragover');

  const files = event.dataTransfer.files;

  if (files.length > 0) {
    const file = files[0];
    handleFile(file);
  }
});

// Evento para quando um arquivo é selecionado pelo input
inputFile.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
  }
});

// Função para exibir a imagem no contêiner
function handleFile(file) {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Remove ícone e texto do contêiner
      iconUpload.style.display = 'none';
      labelUpload.style.display = 'none';

      // Adiciona a imagem carregada
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('preview');

      // Remove prévias anteriores (se houver)
      const existingPreview = container.querySelector('img.preview');
      if (existingPreview) {
        existingPreview.remove();
      }

      container.appendChild(img);
    };

    reader.readAsDataURL(file); // Converte o arquivo para uma URL base64
  } else {
    alert('Por favor, arraste uma imagem válida!');
  }
}
