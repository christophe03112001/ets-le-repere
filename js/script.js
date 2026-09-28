const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = menuToggle?.querySelector("i");
        if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        }
    });
});

const serviceTexts = {
    "Commerce général": "ETS LE REPERE propose des activités de commerce général et d'approvisionnement selon les besoins des clients.",
    "Prestation de services": "Nous proposons différentes prestations de services adaptées aux besoins des particuliers, professionnels et organisations.",
    "Bâtiments, routes et TP": "Nous intervenons dans l'accompagnement de projets liés aux bâtiments, routes et travaux publics.",
    "Import-export": "ETS LE REPERE développe des activités liées à l'importation, l'exportation et aux échanges de biens.",
    "Tourisme et loisir": "Nous proposons des activités et prestations orientées vers le tourisme, les loisirs et la détente.",
    "Agriculture et élevage": "Nos activités couvrent également l'agriculture et l'élevage, selon les projets et besoins.",
    "Sonorisation et location": "Nous proposons la sonorisation et la location de matériel pour différents types d'événements."
};

const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalContact = document.getElementById("modalContact");

document.querySelectorAll(".service-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".service-card");
        const title = card.dataset.service;
        modalTitle.textContent = title;
        modalText.textContent = serviceTexts[title] || "Contactez ETS LE REPERE pour obtenir plus d'informations.";
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
    });
});

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});
modalContact?.addEventListener("click", closeModal);

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
        button.classList.add("active");
        document.getElementById(button.dataset.tab)?.classList.add("active");
    });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const text =
        `Bonjour ETS LE REPERE,%0A%0A` +
        `Nom : ${encodeURIComponent(name)}%0A` +
        `Téléphone : ${encodeURIComponent(phone)}%0A` +
        `Objet : ${encodeURIComponent(subject)}%0A` +
        `Message : ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/237681960876?text=${text}`, "_blank");
});
let methodeChoisie="";
function ouvrirPaiement(m){methodeChoisie=m;document.getElementById("titrePaiement").innerText="Payer avec "+m;document.getElementById("modalPaiement").style.display="flex";}
function fermerPaiement(){document.getElementById("modalPaiement").style.display="none";}
function envoyerWhatsApp(){const t=document.getElementById("telClient").value;const mo=document.getElementById("montantClient").value;if(!t||!mo){alert("Entre numero et montant");return;}window.open(`https://wa.me/237681960876?text=Bonjour ETS LE REPERE%0AMethode: ${methodeChoisie}%0ANumero: ${t}%0AMontant: ${mo} FCFA`,"_blank");fermerPaiement();}
