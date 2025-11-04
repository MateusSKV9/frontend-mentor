document.addEventListener("DOMContentLoaded", () => {
	const btnMenu = document.querySelector("#btn-menu");
	const nav = document.querySelector("header  nav");

	btnMenu.addEventListener("click", () => {
		nav.classList.toggle("active");
	});

	document.addEventListener("click", (event) => {
		const isMenuOpen = nav.classList.contains("active");
		const isClickInsideNav = nav.contains(event.target);
		const isClickInsideBtnMenu = btnMenu.contains(event.target);

		if (isMenuOpen && !isClickInsideNav && !isClickInsideBtnMenu) {
			nav.classList.remove("active");
		}
	});

	window.addEventListener("scroll", () => {
		if (nav.classList.contains("active")) {
			nav.classList.remove("active");
		}
	});

	if (window.innerWidth >= 730) {
		btnMenu.hidden = true;
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth >= 730) {
			btnMenu.hidden = true;
		}
	});
});
