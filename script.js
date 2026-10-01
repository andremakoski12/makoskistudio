const WHATSAPP_NUMBER = "5544999999999"; // Troque pelo WhatsApp do Makoski Studio.

const progressBar = document.getElementById("progressBar");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav nav");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, {passive:true});

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.querySelector('[name="servico"]');
    if(select) select.value = link.dataset.service;
  });
});

const form = document.getElementById("briefForm");
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const nome = data.get("nome");
  const whatsapp = data.get("whatsapp");
  const servico = data.get("servico");
  const ideia = data.get("ideia");
  const referencias = data.get("referencias");

  const message =
`Olá, Makoski Studio! ♡

Meu nome é ${nome}.
Meu WhatsApp: ${whatsapp}

Quero conversar sobre: ${servico}

Minha ideia:
${ideia}

Referências / detalhes:
${referencias || "Não tenho referências por enquanto."}

Quero entender como podemos transformar essa ideia em algo especial.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();
