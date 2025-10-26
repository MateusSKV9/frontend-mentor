document.addEventListener("DOMContentLoaded", () => {
	const nav = document.querySelector("#nav");
	const btnMenu = document.querySelector("#btn-menu");
	const btnCloseMenu = document.querySelector("#btn-close-menu");
	const overlay = document.querySelector("#overlay");

	window.addEventListener("resize", () => {
		if (window.innerWidth > 550) {
			btnCloseMenu.classList.add("hidden");
			btnMenu.classList.add("hidden");
		} else {
			btnCloseMenu.classList.remove("hidden");
			btnMenu.classList.remove("hidden");
			btnMenu.classList.add("isActive");
		}
	});

	if (window.innerWidth > 550) {
		btnCloseMenu.classList.add("hidden");
		btnMenu.classList.add("hidden");
	} else {
		btnCloseMenu.classList.remove("hidden");
		btnMenu.classList.remove("hidden");
		btnMenu.classList.add("isActive");
	}

	nav.classList.remove("isActive");

	btnMenu.addEventListener("click", () => {
		btnMenu.classList.add("isActive");
		nav.classList.add("isActive");
		overlay.classList.add("isActive");
	});

	btnCloseMenu.addEventListener("click", () => {
		btnMenu.classList.remove("isActive");
		nav.classList.remove("isActive");
		overlay.classList.remove("isActive");
	});
});
