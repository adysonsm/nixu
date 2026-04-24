document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileLinks = document.querySelectorAll(".mobile-menu-link");
  const sectionLinks = document.querySelectorAll('a[href^="#"]');
  const form = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const whatsappButton = document.getElementById("whatsapp-button");
  const translateToggle = document.getElementById("translate-toggle");

  const closeMobileMenu = () => {
    mobileMenu.classList.remove("is-open");
    mobileMenu.classList.add("hidden");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.textContent = "menu";
  };

  mobileMenuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");
    if (isOpen) {
      closeMobileMenu();
      return;
    }

    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("is-open");
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    mobileMenuToggle.textContent = "close";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value?.trim() || "";
    const email = document.getElementById("email")?.value?.trim() || "";
    const message = document.getElementById("message")?.value?.trim() || "";

    const subject = encodeURIComponent(`Contato NIXU Digital - ${name || "Novo lead"}`);
    const body = encodeURIComponent([
      `Nome: ${name}`,
      `Email: ${email}`,
      "",
      "Mensagem:",
      message
    ].join("\n"));

    formFeedback.textContent = "Abrindo seu cliente de e-mail para enviar a proposta.";
    formFeedback.classList.remove("hidden");

    window.location.href = `mailto:contato@nixu.digital?subject=${subject}&body=${body}`;
  });

  whatsappButton?.addEventListener("click", () => {
    formFeedback.textContent = "Abrindo o WhatsApp com uma mensagem pronta para a equipe da NIXU.";
    formFeedback.classList.remove("hidden");
  });

  translateToggle?.addEventListener("click", () => {
    const currentLang = document.documentElement.lang;
    const nextLang = currentLang === "pt-BR" ? "en" : "pt-BR";
    document.documentElement.lang = nextLang;
    translateToggle.title = nextLang === "en" ? "Language toggled to English layout labels" : "Idioma alternado para português";
  });
});