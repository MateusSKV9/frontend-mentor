const btnsAddCart = document.getElementsByClassName("add-cart");
const dessert = document.querySelectorAll(".image-dessert img");
let offs = document.querySelectorAll(".add-cart .off");
let ons = document.querySelectorAll(".add-cart .on");
const pluss = document.getElementsByClassName("fa-plus");
const minuss = document.getElementsByClassName("fa-minus");
const qtdItems = document.getElementsByClassName("qtd-item");

const containerListOrder = document.getElementById("container-list-order");
let items = undefined;
const finalValue = document.getElementById("total");

// const itens = document.getElementsByClassName("dessert-item");

const imageEmpetyCart = document.getElementById("image-empety-cart");
const messageEmpetyCart = document.getElementById("message-empety-cart");
const desserts = document.getElementById("desserts");

// Função para renderizar os itens
function renderDesserts(data) {
  data.forEach((dessert) => {
    // Criar o elemento do item
    const dessertItem = document.createElement("div");
    dessertItem.classList.add("dessert-item");

    // Inserir a estrutura HTML no item
    dessertItem.innerHTML = `
      <div class="image-dessert">
        <img src="${dessert.image.desktop}" alt="${dessert.name}" />
      </div>
      <span class="name-dessert">${dessert.category}</span>
      <h5>${dessert.name}</h5>
      <span class="price-dessert">${dessert.price.toFixed(2)}</span>
      <div class="add-cart">
        <div class="off">
          <img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          <span>Add to Cart</span>
        </div>
        <div class="on oculto">
          <div class="container-icon">
            <i class="fa-solid fa-minus"></i>
          </div>
          <span class="qtd-item">1</span>
          <div class="container-icon">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    `;

    // Adicionar o item ao contêiner
    desserts.appendChild(dessertItem);
  });
}

// Carregar o JSON e renderizar os itens
fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro ao carregar o JSON: ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    renderDesserts(data); // Renderiza os itens
    addEventListeners(); // Configura os eventos nos itens recém-criados
  })
  .catch((error) => {
    console.error("Erro:", error);
  });

// PAROU DE FUNCIONAR
let counts = undefined;
function addEventListeners() {
  const btnsAddCart = document.getElementsByClassName("add-cart");
  const offs = document.querySelectorAll(".add-cart .off");
  const ons = document.querySelectorAll(".add-cart .on");
  const dessert = document.querySelectorAll(".image-dessert img");

  Array.from(btnsAddCart).forEach((btnAddCart, indice) => {
    btnAddCart.addEventListener("click", function () {
      dessert[indice].classList.toggle("selected");
      btnAddCart.classList.toggle("selected-background");
      offs[indice].classList.toggle("oculto");
      ons[indice].classList.toggle("oculto");

      if (!ons[indice].classList.contains("oculto")) {
        addItemTolist(indice, offs, ons, dessert);
      } else {
        if (containerListOrder.querySelector(`.item${indice}`)) {
          containerListOrder.removeChild(
            containerListOrder.querySelector(`.item${indice}`)
          );
          sumValues();
          calcQtdDessertCart();
        }
      }
    });
  });

  items = document.getElementsByClassName("dessert-item");
  counts = Array(btnsAddCart.length).fill(1);
  Array.from(pluss).forEach((plus, indice) => {
    plus.addEventListener("click", function (event) {
      event.stopPropagation();
      counts[indice]++;
      qtdItems[indice].textContent = counts[indice];
      addItemTolist(indice, offs, ons, dessert);
    });
  });

  /* ---------------------> FUNÇÃO DECREMENTO */
  Array.from(minuss).forEach((minus, indice) => {
    minus.addEventListener("click", function (event) {
      event.stopPropagation();
      if (counts[indice] > 1) {
        counts[indice]--;
        qtdItems[indice].textContent = counts[indice];
        addItemTolist(indice);
      } else {
        alert("Não podem valores menores que zero.");
      }
    });
  });
}

/* ---------------------> FUNÇÃO ADICIONAR ITEM A LISTA */
let valorFinal = 0;
function addItemTolist(indice, offs, ons, dessert) {
  if (containerListOrder.querySelector(`.item${indice}`)) {
    let item = containerListOrder.querySelector(`.item${indice}`);
    item.querySelector(".qtd-dessert-cart").textContent = `${counts[indice]}x`;
    item.querySelector(".value-total-dessert").textContent = `$${(
      counts[indice] *
      Number(items[indice].querySelector(".price-dessert").textContent)
    ).toFixed(2)}`;

    finalValue.textContent = `${valorFinal}`;
    if (itemsListed.length >= 0) {
      sumValues();
      calcQtdDessertCart();
    }
  } else {
    let itemOrder = document.createElement("div");
    itemOrder.classList.add("item-order", `item${indice}`);
    itemOrder.setAttribute("data-index", indice); // Atributo personalizado

    let containerInfo = document.createElement("div");
    containerInfo.classList.add("container-information-dessert");

    if (items && items[indice]) {
      const h5Element = items[indice].getElementsByTagName("h5")[0];
      if (h5Element) {
        let dessertName = document.createElement("h5");
        dessertName.textContent = h5Element.textContent;
        containerInfo.appendChild(dessertName);
      }
    }

    let image = document.createElement("img");
    let srcImage = items[indice]
      .querySelector(".image-dessert img")
      .getAttribute("src");
    image.classList.add("oculto");
    image.setAttribute("src", srcImage);
    containerInfo.appendChild(image);

    let informationDessert = document.createElement("div");
    informationDessert.classList.add("information-dessert");

    let qtdDessert = document.createElement("span");
    qtdDessert.classList.add("qtd-dessert-cart");
    qtdDessert.textContent = `${counts[indice]}x`;
    informationDessert.appendChild(qtdDessert);

    let priceUnd = document.createElement("span");
    priceUnd.classList.add("price-und");
    priceUnd.textContent = `aaa@${
      items[indice].querySelector(".price-dessert").textContent
    }`;
    informationDessert.appendChild(priceUnd);

    let totalValue = document.createElement("span");
    totalValue.classList.add("value-total-dessert");
    totalValue.textContent = `$${(
      counts[indice] *
      Number(items[indice].querySelector(".price-dessert").textContent)
    ).toFixed(2)}`;
    informationDessert.appendChild(totalValue);

    containerInfo.appendChild(informationDessert);
    itemOrder.appendChild(containerInfo);

    let removeIconContainer = document.createElement("div");
    removeIconContainer.classList.add("icon-remove-item");

    let removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid", "fa-x");
    removeIconContainer.appendChild(removeIcon);

    // Adicione o evento de remoção diretamente
    removeIconContainer.addEventListener("click", function () {
      containerListOrder.removeChild(itemOrder);
      offs[indice].classList.remove("oculto");
      ons[indice].classList.toggle("oculto");
      dessert[indice].classList.remove("selected");
      btnsAddCart[indice].classList.remove("selected-background");
      sumValues();
      calcQtdDessertCart();
    });

    itemOrder.appendChild(removeIconContainer);
    containerListOrder.appendChild(itemOrder);

    if (itemsListed.length >= 0) {
      sumValues();
      calcQtdDessertCart();
    }
  }
}

/* ---------------------> SOMAR VALORES E CALCULAR QUANTIDADE */


const itemsListed = containerListOrder.getElementsByClassName(
  "value-total-dessert"
);

sumValues();
calcQtdDessertCart();

function sumValues() {
  let soma = 0;

  Array.from(itemsListed).forEach((itemListed, indice) => {
    let value = parseFloat(itemListed.textContent.replace("$", "").trim());
    soma += value;
  });

  total = document.getElementById("total");
  total.textContent = `$${soma.toFixed(2)}`;

  totalConfirm = document.getElementById("total-confirm");
  totalConfirm.textContent = `$${soma.toFixed(2)}`;

  if (soma == 0.0) {
    imageEmpetyCart.classList.remove("oculto");
    messageEmpetyCart.hidden = false;
  } else {
    imageEmpetyCart.classList.add("oculto");
    messageEmpetyCart.hidden = true;
  }
}

const itemsQtdCart =
  containerListOrder.getElementsByClassName("qtd-dessert-cart");
function calcQtdDessertCart() {
  let qtdTotalDessertCart = 0;

  if (containerListOrder.querySelector(".item-order")) {
    Array.from(itemsQtdCart).forEach((itemQtdCart) => {
      let value = parseFloat(itemQtdCart.textContent.replace("x", "").trim());
      qtdTotalDessertCart += value;
    });
  } else {
    qtdTotalDessertCart = 0;
  }

  let qtdTotalCart = document.getElementById("qtd-total-dessert");
  qtdTotalCart.textContent = `${qtdTotalDessertCart}`;
}

/* ---------------------> FUNÇÃO CONFIRMAR PEDIDO */

const btnConfirmOrder = document.getElementById("confirm-order");
const modal = document.getElementById("modal");
const containerOrders = document.getElementById("container-orders");
const orders = containerListOrder.getElementsByClassName("item-order");

btnConfirmOrder.addEventListener("click", function () {
  modal.showModal();

  clearOrder();

  if (containerListOrder.querySelector(".item-order")) {
    Array.from(orders).forEach((order) => {
      let itemOrder = document.createElement("div");

      itemOrder.classList.add("item-order");
      containerOrders.appendChild(itemOrder);

      let modalInformationDessert = document.createElement("div");
      modalInformationDessert.classList.add("modal-information-dessert");
      itemOrder.appendChild(modalInformationDessert);

      let modalImageDessert = document.createElement("div");
      modalImageDessert.classList.add("modal-image-dessert");

      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `${order.querySelector("img").getAttribute("src")}`
      );

      modalInformationDessert.appendChild(img);

      let contentOrder = document.createElement("div");
      contentOrder.classList.add("content-order");
      modalInformationDessert.appendChild(contentOrder);

      let h5 = document.createElement("h5");
      h5.textContent = order.querySelector("h5").textContent;
      contentOrder.appendChild(h5);

      let informationDessert = document.createElement("div");
      informationDessert.classList.add("information-dessert");
      contentOrder.appendChild(informationDessert);

      let qtdDessertCart = document.createElement("span");
      qtdDessertCart.textContent =
        order.querySelector(".qtd-dessert-cart").textContent;
      qtdDessertCart.classList.add("qtd-dessert-cart");
      informationDessert.appendChild(qtdDessertCart);

      let priceUnd = document.createElement("span");
      priceUnd.textContent = order.querySelector(".price-und").textContent;

      informationDessert.appendChild(priceUnd);

      let modalDesertValue = document.createElement("div");
      modalDesertValue.classList.add("modal-desert-value");
      itemOrder.appendChild(modalDesertValue);

      let span = document.createElement("span");
      span.textContent = order.querySelector(
        ".value-total-dessert"
      ).textContent;
      modalDesertValue.appendChild(span);
    });
  }
});

// Fechar o modal
function closeModal() {
  modal.close();
}

// Fechar o modal ao clicar fora dele
document.addEventListener("click", (event) => {
  // Verifica se o modal está aberto e se o clique foi fora do conteúdo do modal
  if (modal.open && event.target.closest("#modal")) {
    closeModal();
  }
});

/* --------------------->  */
const btnStarNewOrder = document.getElementById("start-new-order");
btnStarNewOrder.addEventListener("click", () => {
  window.location.reload();
});

function clearOrder() {
  if (containerOrders.querySelector(".item-order")) {
    const orders = containerOrders.querySelectorAll(".item-order");

    Array.from(orders).forEach((order) => {
      containerOrders.removeChild(order);
    });
  }
}
