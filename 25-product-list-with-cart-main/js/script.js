const btnsAddCart = document.getElementsByClassName("add-cart");
const dessert = document.querySelectorAll(".image-dessert img");
const offs = document.querySelectorAll(".add-cart .off");
const ons = document.querySelectorAll(".add-cart .on");
const pluss = document.getElementsByClassName("fa-plus");
const minuss = document.getElementsByClassName("fa-minus");
const qtdItems = document.getElementsByClassName("qtd-item");
const counts = Array(btnsAddCart.length).fill(1);

Array.from(btnsAddCart).forEach((btnAddCart, indice) => {
  btnAddCart.addEventListener("click", function() {
    dessert[indice].classList.toggle("selected");
    btnAddCart.classList.toggle("selected-background");
    offs[indice].classList.toggle("oculto");
    ons[indice].classList.toggle("oculto");
  })
});

Array.from(pluss).forEach((plus, indice) => {
  plus.addEventListener("click", function(event) {
    event.stopPropagation();
    counts[indice]++;
    qtdItems[indice].textContent = counts[indice];
  })
});

Array.from(minuss).forEach((minus, indice) => {
  minus.addEventListener("click", function(event) {
    event.stopPropagation();
    if(counts[indice]>1) {
      counts[indice]--;
      qtdItems[indice].textContent = counts[indice];
    } else {
      alert("Não podem valores menores que zero.");
    }
  })
});