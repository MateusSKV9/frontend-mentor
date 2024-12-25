const btnsAddCart = document.getElementsByClassName("add-cart");
const dessert = document.querySelectorAll(".image-dessert img");
const offs = document.querySelectorAll(".add-cart .off");
const ons = document.querySelectorAll(".add-cart .on");

Array.from(btnsAddCart).forEach((btnAddCart, indice) => {
  btnAddCart.addEventListener("click", function() {
    dessert[indice].classList.toggle("selected");
    btnAddCart.classList.toggle("selected-background");
    offs[indice].classList.toggle("oculto");
    ons[indice].classList.toggle("oculto");
  })
});