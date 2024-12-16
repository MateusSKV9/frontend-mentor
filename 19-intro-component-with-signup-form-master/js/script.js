function verificarCampos(event) {
    const inputs = document.getElementsByTagName("input");
    const feedBacks = document.getElementsByClassName("feedback");
    const iconsError = document.getElementsByClassName("icon-error");
    let formIsValid = true;

    Array.from(inputs).forEach((input, indice) => {
        if (indice !== 2) {
            if (input.value.trim() === "") {
                input.classList.add("error");
                feedBacks[indice].hidden = false;
                iconsError[indice].hidden = false;
                formIsValid = false;
            } else {
                input.classList.remove("error");
                input.classList.add("success");
                feedBacks[indice].hidden = true;
            }
        } else {
            const email = input.value.trim();

            if (!email.includes("@") || !email.includes(".com")) {
                input.classList.add("error");
                feedBacks[indice].hidden = false;
                iconsError[indice].hidden = false
                formIsValid = false;
            } else {
                input.classList.remove("error");
                input.classList.add("success");
                feedBacks[indice].hidden = true;
            }
        }
    });

    if (!formIsValid) {
        event.preventDefault();
    }
}

const btnClaim = document.getElementById("claim-free-trial");
btnClaim.addEventListener("click", verificarCampos);
