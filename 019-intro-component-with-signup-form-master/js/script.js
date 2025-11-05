function verificarCampos(event) {
    const inputs = document.getElementsByTagName("input");
    const feedBacks = document.getElementsByClassName("feedback");
    const iconsError = document.getElementsByClassName("icon-error");
    let formIsValid = true; // Assumimos inicialmente que o formulário é válido

    Array.from(inputs).forEach((input, indice) => {
        const isEmailField = indice === 2; // Checar se o campo atual é o de e-mail
        const value = input.value.trim();

        if (value === "") {
     
            input.classList.add("error");
            if (feedBacks[indice]) feedBacks[indice].hidden = false;
            if (iconsError[indice]) iconsError[indice].hidden = false;
            formIsValid = false;
        } else if (isEmailField && (!value.includes("@") || !value.includes(".com"))) {
            input.classList.add("error");
            if (feedBacks[indice]) feedBacks[indice].hidden = false;
            if (iconsError[indice]) iconsError[indice].hidden = false;
            formIsValid = false;
        } else {
            input.classList.remove("error");
            input.classList.add("success");
            if (feedBacks[indice]) feedBacks[indice].hidden = true;
            if (iconsError[indice]) iconsError[indice].hidden = true;
        }
    });

    if (!formIsValid) {
        event.preventDefault();
    }
}

const btnClaim = document.getElementById("claim-free-trial");
btnClaim.addEventListener("click", verificarCampos);
