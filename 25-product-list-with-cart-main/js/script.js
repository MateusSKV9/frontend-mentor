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

Array.from(btnsAddCart).forEach((btnAddCart, indice) => {
  btnAddCart.addEventListener("click", function () {
    dessert[indice].classList.toggle("selected");
    btnAddCart.classList.toggle("selected-background");
    offs[indice].classList.toggle("oculto");
    ons[indice].classList.toggle("oculto");

    if (!ons[indice].classList.contains("oculto")) {
      addItemTolist(indice);
    } else {
      if (containerListOrder.querySelector(`.item${indice}`))
        containerListOrder.removeChild(
          containerListOrder.querySelector(`.item${indice}`)
        );
    }
  });
});


/* ---------------------> FUNÇÃO ADICIONAR ITEM A LISTA */
let valorFinal = 0;
function addItemTolist(indice) {
  if (containerListOrder.querySelector(`.item${indice}`)) {
    let item = containerListOrder.querySelector(`.item${indice}`);
    item.querySelector(".qtd-dessert-cart").textContent = `${counts[indice]}x`;
    item.querySelector(".value-total-dessert").textContent = `$${
      counts[indice] *
      Number(items[indice].querySelector(".price-dessert").textContent)
    }`;

    // SOMAR VALORES
    // let valor = Number(containerListOrder.querySelector(`.item${indice}`).querySelector(".value-total-dessert").textContent.replace('$', ''));
    // valorFinal += valor;

    finalValue.textContent = `${valorFinal}`;
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
    totalValue.textContent = `$${
      counts[indice] *
      Number(items[indice].querySelector(".price-dessert").textContent)
    }`;
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
    });

    itemOrder.appendChild(removeIconContainer);
    containerListOrder.appendChild(itemOrder);
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

const qtdTotalDessert = document.getElementById("qtd-total-dessert");
let soma = counts.reduce(
  (acumulador, valorAtual) => acumulador + valorAtual,
  0
);
qtdTotalDessert.textContent = `${soma}`;

// const itemsOrder = document.getElementsByClassName("item-order");
