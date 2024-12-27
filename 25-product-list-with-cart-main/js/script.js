const btnsAddCart = document.getElementsByClassName("add-cart");
const dessert = document.querySelectorAll(".image-dessert img");
const offs = document.querySelectorAll(".add-cart .off");
const ons = document.querySelectorAll(".add-cart .on");
const pluss = document.getElementsByClassName("fa-plus");
const minuss = document.getElementsByClassName("fa-minus");
const qtdItems = document.getElementsByClassName("qtd-item");
const counts = Array(btnsAddCart.length).fill(1);
const containerListOrder = document.getElementById("container-list-order");
const items = document.getElementsByClassName("dessert-item");
const finalValue = document.getElementById("total");

// const itens = document.getElementsByClassName("dessert-item");

const imageEmpetyCart = document.getElementById("image-empety-cart");
const messageEmpetyCart = document.getElementById("message-empety-cart");

Array.from(btnsAddCart).forEach((btnAddCart, indice) => {
  btnAddCart.addEventListener("click", function () {
    dessert[indice].classList.toggle("selected");
    btnAddCart.classList.toggle("selected-background");
    offs[indice].classList.toggle("oculto");
    ons[indice].classList.toggle("oculto");

    if (!ons[indice].classList.contains("oculto")) {
      addItemTolist(indice);
    } else {
      if (containerListOrder.querySelector(`.item${indice}`)) {
        containerListOrder.removeChild(
          containerListOrder.querySelector(`.item${indice}`)
        );
        sumValues();
      }
    }
  });
});

/* ---------------------> FUNÇÃO ADICIONAR ITEM A LISTA */

let valorFinal = 0;
function addItemTolist(indice) {
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
    priceUnd.textContent = `@${
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
      btnsAddCart[indice].classList.remove("selected-background");
      sumValues();
    });

    itemOrder.appendChild(removeIconContainer);
    containerListOrder.appendChild(itemOrder);

    if (itemsListed.length >= 0) {
      sumValues();
    }
  }
}

/* ---------------------> FUNÇÃO INCREMENT */

Array.from(pluss).forEach((plus, indice) => {
  plus.addEventListener("click", function (event) {
    event.stopPropagation();
    counts[indice]++;
    qtdItems[indice].textContent = counts[indice];
    addItemTolist(indice);
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

/* ---------------------> FUNÇÃO SOMA TOTAL */

const itemsListed = containerListOrder.getElementsByClassName(
  "value-total-dessert"
);

sumValues();

function sumValues() {
  let soma = 0;

  Array.from(itemsListed).forEach((itemListed, indice) => {
    let value = parseFloat(itemListed.textContent.replace("$", "").trim());
    soma += value;
  });

  total = document.getElementById("total");
  total.textContent = `$${soma.toFixed(2)}`;

  if (soma == 0.0) {
    imageEmpetyCart.classList.remove("oculto");
    messageEmpetyCart.hidden = false;
  } else {
    imageEmpetyCart.classList.add("oculto");
    messageEmpetyCart.hidden = true;
  }
}

/* ---------------------> FUNÇÃO CONFIRMAR PEDIDO */

const btnConfirmOrder = document.getElementById("confirm-order");
const modal = document.getElementById("modal");
const containerOrders = document.getElementById("container-orders");
const orders = containerListOrder.getElementsByClassName("item-order");

btnConfirmOrder.addEventListener("click", function () {
  modal.showModal();

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

/* ---------------------> FUNÇÃO CONFIRMAR PEDIDO */
