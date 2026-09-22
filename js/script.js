/* ==========================================
   MENU MOBILE
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Fermer le menu après clic */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ==========================================
   ANNÉE AUTOMATIQUE
========================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ==========================================
   FICHE INTERACTIVE
========================================== */

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabContents =
    document.querySelectorAll(".tab-content");


tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target =
            button.dataset.tab;


        tabButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        tabContents.forEach(content => {

            content.classList.remove("active");

        });


        button.classList.add("active");


        document
            .getElementById(target)
            .classList.add("active");

    });

});


/* ==========================================
   MODALE DES SERVICES
========================================== */

const serviceCards =
    document.querySelectorAll(".service-card");

const modal =
    document.getElementById("serviceModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalClose =
    document.getElementById("modalClose");

const modalContact =
    document.getElementById("modalContact");


serviceCards.forEach(card => {

    const button =
        card.querySelector(".service-more");


    button.addEventListener("click", () => {

        const title =
            card.dataset.title;

        const description =
            card.dataset.description;


        modalTitle.textContent =
            title;

        modalDescription.textContent =
            description;


        modal.classList.add("active");

    });

});


/* Fermer la modale */

modalClose.addEventListener("click", () => {

    modal.classList.remove("active");

});


/* Fermer en cliquant dehors */

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


/* ==========================================
   DEMANDE DE DEVIS
========================================== */

const quoteButton =
    document.getElementById("quoteButton");

quoteButton.addEventListener("click", () => {

    document
        .getElementById("contact")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* ==========================================
   FORMULAIRE -> WHATSAPP
========================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const service =
        document.getElementById("service").value;

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone || !message) {

        alert(
            "Veuillez remplir tous les champs obligatoires."
        );

        return;

    }


    const text =

        `Bonjour ETS LE REPERE,%0A%0A` +

        `Nom : ${encodeURIComponent(name)}%0A` +

        `Téléphone : ${encodeURIComponent(phone)}%0A` +

        `Service : ${encodeURIComponent(service)}%0A%0A` +

        `Message : ${encodeURIComponent(message)}`;


    const whatsappNumber =
        "237681960876";


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${text}`;


    window.open(
        whatsappURL,
        "_blank"
    );

});