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
let methodeChoisie="", dernierRecu=null;
function ouvrirPaiement(m){methodeChoisie=m;document.getElementById("titrePaiement").innerText="Payer avec "+m;document.getElementById("modalPaiement").style.display="flex";}
function fermerPaiement(){document.getElementById("modalPaiement").style.display="none";}
function envoyerWhatsApp(){
  const t=document.getElementById("telClient").value.trim();
  const mo=document.getElementById("montantClient").value.trim();
  if(!t||!mo){alert("Entre numero et montant");return;}
  const numRecu="ETS-"+Date.now().toString().slice(-6);
  const dateNow=new Date().toLocaleString('fr-FR');
  dernierRecu={num:numRecu, date:dateNow, methode:methodeChoisie, tel:t, montant:mo};
  genererPDF(dernierRecu);
  window.open(`https://wa.me/237681960876?text=*NOUVEAU PAIEMENT*%0ARecu: ${numRecu}%0AMethode: ${methodeChoisie}%0AClient: ${t}%0AMontant: ${mo} FCFA%0ADate: ${dateNow}`,"_blank");
  fermerPaiement();
  document.getElementById("recuNum").innerText=numRecu;
  document.getElementById("recuDetails").innerHTML=`<b>Méthode:</b> ${methodeChoisie}<br><b>Client:</b> ${t}<br><b>Montant:</b> ${mo} FCFA<br><b>Date:</b> ${dateNow}`;
  document.getElementById("modalRecu").style.display="flex";
  document.getElementById("btnDownload").onclick=()=>{ dernierRecu.doc.save(`Recu-${numRecu}.pdf`); };
  document.getElementById("btnSendClient").onclick= async ()=>{
  const pdfBlob = dernierRecu.doc.output('blob');
  const pdfFile = new File([pdfBlob], `Recu-${dernierRecu.num}.pdf`, {type:"application/pdf"});
  const telClientWhatsApp = t.startsWith("237")?t:"237"+t.replace(/\s/g,'');
  if(navigator.canShare && navigator.canShare({files:[pdfFile]})){
    try{
      await navigator.share({
        files:[pdfFile],
        title:`Recu ${dernierRecu.num}`,
        text:`Bonjour! Voici votre recu ETS LE REPERE - ${dernierRecu.montant} FCFA`
      });
    }catch(e){}
  } else {
    dernierRecu.doc.save(`Recu-${dernierRecu.num}.pdf`);
    alert("PDF telecharge! Maintenant selectionne le PDF dans WhatsApp pour l'envoyer.");
    window.open(`https://wa.me/${telClientWhatsApp}?text=Bonjour! Votre recu ${dernierRecu.num} de ${dernierRecu.montant} FCFA est pret. Je vous envoie le PDF a l'instant.`,"_blank");
  }
};
}
function genererPDF(data){
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF();
  doc.setFontSize(18); doc.text("ETS LE REPERE",105,20,{align:"center"});
  doc.setFontSize(10); doc.text("Bafoussam - Carrefour Auberge | Tel: 681 96 08 76",105,26,{align:"center"});
  doc.line(10,30,200,30);
  doc.setFontSize(14); doc.text("RECU DE PAIEMENT",105,40,{align:"center"});
  doc.setFontSize(11);
  doc.text(`Recu N°: ${data.num}`,20,55);
  doc.text(`Date: ${data.date}`,20,62);
  doc.text(`Methode: ${data.methode}`,20,69);
  doc.text(`Numero Client: ${data.tel}`,20,76);
  doc.text(`Montant: ${data.montant} FCFA`,20,83);
  doc.setFillColor(240,253,244); doc.rect(20,90,170,15,'F');
  doc.text("Statut: Paiement en attente de validation",22,99);
  doc.setFontSize(9); doc.text("Merci pour votre confiance - ETS LE REPERE",105,120,{align:"center"});
  data.doc=doc;
}
