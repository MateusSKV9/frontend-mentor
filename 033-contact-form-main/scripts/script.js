const form = document.querySelector(".form");
const errors = document.querySelectorAll(".error");
const inputs = document.querySelectorAll('input:not([type="submit"]), textarea');
let timeout;

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let isValid = true;
	resetErrors(errors);
	if (timeout) clearTimeout(timeout);

	console.log(inputs);
	inputs.forEach((input) => {
		const { name, value, type, checked } = input;
		const error = document.querySelector(`.error.${name}`);

		if (type === "radio") {
			const radios = document.querySelectorAll(`input[name="${name}"]`);
			const checked = Array.from(radios).find((input) => input.checked);

			if (!checked) {
				error.classList.remove("hidden");
				isValid = false;
				return;
			}
		}

		if (type === "checkbox") {
			if (!checked) {
				error.classList.remove("hidden");
				isValid = false;
				return;
			}
		}

		if (!value.trim()) {
			error.classList.remove("hidden");
			isValid = false;
			return;
		}

		if (name === "email" && !value.includes("@")) {
			error.classList.remove("hidden");
			isValid = false;
			return;
		}
	});

	showToast(isValid);
});

const showToast = (isValid) => {
	if (isValid) {
		const toast = document.querySelector(".toast");
		toast.classList.remove("hidden");

		timeout = setTimeout(() => {
			toast.classList.add("hidden");
		}, 2000);
	}
};

const resetErrors = (errors) => errors.forEach((error) => error.classList.add("hidden"));
