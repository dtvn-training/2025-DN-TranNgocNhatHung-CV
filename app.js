document.addEventListener("DOMContentLoaded", function () {
    const btnShow = document.querySelector(".btn__show");
    const btnHide = document.querySelector(".btn__hide");
    const nav = document.querySelector(".nav");
    const btnLogo = document.querySelector(".header__logo");
    const navLinks = document.querySelectorAll(".nav__item--link");
    const sections = document.querySelectorAll(".section");

    btnShow.addEventListener("click", function () {
        nav.classList.add("nav__visible");  
        btnShow.classList.add("icon-hidden");  
        btnShow.classList.remove("icon-visible");  
        btnHide.classList.remove("icon-hidden");  
        btnHide.classList.add("icon-visible");
    });

    btnHide.addEventListener("click", function () {
        nav.classList.remove("nav__visible");  
        btnHide.classList.add("icon-hidden");  
        btnHide.classList.remove("icon-visible");
        btnShow.classList.remove("icon-hidden");  
        btnShow.classList.add("icon-visible");   
    });

    btnLogo.addEventListener("click", function () {
        window.scrollTo({ 
            top: 0,
            behavior: "smooth" 
        });
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
            const targetId = this.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({ 
                    top: (targetElement.offsetTop - 50),
                    behavior: "smooth" 
                });
            }

            if (window.innerWidth <= 1024) {
                nav.classList.remove("nav__visible");
                btnHide.classList.add("icon-hidden");
                btnHide.classList.remove("icon-visible");
                btnShow.classList.remove("icon-hidden");
                btnShow.classList.add("icon-visible");
            }
        });
    });

    function updateActiveSection() {
        let maxVisibleRatio = 0;
        let activeSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
            const visibilityRatio = visibleHeight / section.offsetHeight;
            if (visibilityRatio > maxVisibleRatio) {
                maxVisibleRatio = visibilityRatio;
                activeSection = section;
            }

        });

        if (activeSection) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector(`.nav__item--link[data-target="${activeSection.id}"]`).classList.add("active");
        }
    }

    window.addEventListener("scroll", updateActiveSection);
});