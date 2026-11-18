function iconArrowUpRight(){return '<svg class="ui-arrow ui-arrow-up-right" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M8 7h9v9"/></svg>';}
// Общие функции для всех страниц.
const arrowSvg = direction => '<svg class="ui-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="' + (direction === 'left' ? 'M19 12H5m7 7-7-7 7-7' : direction === 'up-right' ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14m-7-7 7 7-7 7') + '"/></svg>';
const SITE_ROOT = document.documentElement.dataset.root || "./";
const SITE = window.SITE_CONTENT;
const PROJECTS = window.PORTFOLIO_PROJECTS;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function typography(value) {
  return escapeHtml(value)
    .replace(/(^|[\s(«„])((?:в|во|на|к|ко|с|со|у|о|об|от|до|по|за|из|и|а|но|не|для|при|над|под|без|про|как|что))\s+/giu,
      (_, before, word) => before + word + "&nbsp;")
    .replace(/\s+—\s+/g, "&nbsp;—&nbsp;");
}

function projectUrl(project) {
  return SITE_ROOT + "projects/" + encodeURIComponent(project.id) + "/";
}

function projectNavigation(project) {
  const index = PROJECTS.indexOf(project);
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const english = window.PORTFOLIO_LANG === "en";
  const label = (item, direction) => '<span><strong>' + typography(item.name) +
    '</strong><small>' + direction + '</small></span>';
  return '<nav class="project-navigation" aria-label="' + (english ? "Project navigation" : "Навигация по проектам") + '">' +
    '<a href="' + projectUrl(previous) + '" rel="prev">' + arrowSvg("left") +
    label(previous, english ? "Previous project" : "Предыдущий проект") + '</a>' +
    '<a href="' + projectUrl(next) + '" rel="next">' +
    label(next, english ? "Next project" : "Следующий проект") + arrowSvg("right") + '</a></nav>';
}

function imagePath(path) {
  const projectAsset = /^(assets\/projects\/|projects\/owl\/).+\.(jpe?g|png)$/i.test(path);
  return SITE_ROOT + path + (projectAsset ? ".webp" : "");
}

function bindImages(root = document) {
  root.querySelectorAll("img[data-file]").forEach(image => {
    image.addEventListener("load", () => {
      image.style.display = "block";
      const placeholder = image.nextElementSibling;
      if (placeholder?.classList.contains("placeholder")) placeholder.style.display = "none";
    });
    image.addEventListener("error", () => {
      image.style.display = "none";
      const placeholder = image.nextElementSibling;
      if (placeholder?.classList.contains("placeholder")) placeholder.style.display = "flex";
    });

  });
}

// Сообщение для обращения редактируется в content.js.
function contactMessage() {
  return SITE.contacts.message || "";
}

function telegramContactUrl() {
  return SITE.contacts.telegram + "?text=" + encodeURIComponent(contactMessage());
}

function whatsappContactUrl() {
  return SITE.contacts.whatsapp + "?text=" + encodeURIComponent(contactMessage());
}

// Веб-редактор Gmail работает даже без настроенного почтового приложения.
function emailContactUrl() {
  return "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(SITE.contacts.email) +
    "&su=" + encodeURIComponent(window.PORTFOLIO_LANG === "en" ? "Design project inquiry" : "Запрос на дизайн-проект") +
    "&body=" + encodeURIComponent(contactMessage());
}

function socialLinks() {
  const links = [
    ["Telegram", telegramContactUrl(), "telegram"],
    ["Instagram", SITE.contacts.instagram, "instagram"],
    ["WhatsApp", whatsappContactUrl(), "whatsapp"]
  ];
  return '<div class="social-links">' +
    links.map(([name, url, icon]) =>
      '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' +
      '<img src="' + imagePath("assets/icons/" + icon + ".svg") + '" alt="" width="22" height="22" loading="lazy">' +
      '<span>' + name + '</span></a>'
    ).join("") +
    '<a href="' + escapeHtml(emailContactUrl()) + '" target="_blank" rel="noopener noreferrer">' +
    '<svg class="mail-symbol" viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg><span>' + (window.PORTFOLIO_LANG === "en" ? "Email" : "Почта") + '</span></a></div>';
}

function renderLayout() {
  const brand = document.querySelector(".brand");
  if (brand) brand.textContent = SITE.header.brand;
  const nav = document.querySelector(".topbar nav");
  if (nav) nav.innerHTML =
    '<a href="' + SITE_ROOT + '#catalog">' + typography(SITE.header.catalog) + '</a>' +
    '<a href="' + SITE_ROOT + '#about">' + typography(SITE.header.about) + '</a>' +
    '<a class="contact" href="' + escapeHtml(telegramContactUrl()) +
    '" target="_blank" rel="noopener noreferrer">' + typography(SITE.header.contact) + ' ' + iconArrowUpRight() + '</a>' +
    '<div class="language-switch" role="group" aria-label="Language / Язык">' +
    '<a href="?lang=ru" lang="ru" class="' + (window.PORTFOLIO_LANG === 'ru' ? 'is-active' : '') + '" aria-label="Русский язык">RU</a>' +
    '<span aria-hidden="true">/</span>' +
    '<a href="?lang=en" lang="en" class="' + (window.PORTFOLIO_LANG === 'en' ? 'is-active' : '') + '" aria-label="English language">EN</a></div>';
  const footer = document.querySelector("footer");
  if (nav) {
    nav.setAttribute("aria-label", window.PORTFOLIO_LANG === "en" ? "Main navigation" : "Основная навигация");
    const currentLanguage = nav.querySelector(".language-switch .is-active");
    currentLanguage.setAttribute("aria-current", "true");
    nav.querySelectorAll(".language-switch a").forEach(link => {
      link.href += location.hash;
      const formLanguage = link.getAttribute("lang");
      link.addEventListener("click", () => {
        link.href = "?lang=" + formLanguage + location.hash;
      });
    });
  }
  if (footer) footer.innerHTML = '<span>' + typography(SITE.footer) + '</span>';
}

function productArtwork(project, thumbnail = false) {
  const index = PROJECTS.filter(item => item.id !== "supertyazh").findIndex(item => item.id === project.id) + 1;
  const number = project.id === "supertyazh" ? "12" : String(index).padStart(2, "0");
  const base = imagePath("assets/project-covers/cover-" + number);
  if (thumbnail) return '<img src="' + base + '.webp" alt="" loading="lazy" decoding="async" width="720" height="720">';
  return '<div class="artifact cover-packaging cover-packaging--' + number + '">' +
    '<img class="cover-packaging-image" src="' + base + '.webp" alt="' + escapeHtml(project.name) + '" decoding="async" fetchpriority="high"></div>';
}
