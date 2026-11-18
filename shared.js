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
  const label = (item, direction) => '<span><strong>' + projectTitle(item) +
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

function coverBase(project) {
  const index = PROJECTS.filter(item => item.id !== "supertyazh").findIndex(item => item.id === project.id) + 1;
  const number = project.id === "supertyazh" ? "12" : String(index).padStart(2, "0");
  return imagePath("assets/project-covers/cover-" + number);
}

function productArtwork(project) {
  return '<img src="' + coverBase(project) + '.webp" alt="" loading="lazy" decoding="async" width="720" height="720">';
}

function projectTitle(project) {
  return escapeHtml(project.name).replace(/\s+—\s+/g, "&nbsp;— ");
}

function caseCover(project) {
  const name = escapeHtml(project.name);
  const floating = ["laser", "gold", "dance-posters"].includes(project.id);
  const landscape = ["dance-website", "sevstar", "extra", "baker", "owl"].includes(project.id);
  return '<figure class="case-cover' + (landscape ? ' is-landscape' : '') + '"><figcaption>' +
    '<span class="window-lights" aria-hidden="true"><i></i><i></i><i></i></span>' +
    '<span class="case-cover-label">' + name + '.webp</span></figcaption>' +
    '<div class="case-cover-media' + (floating ? ' is-floating' : '') + '"><img src="' + coverBase(project) +
    '-hero.webp" alt="' + name + '" decoding="async" fetchpriority="high"></div></figure>';
}

function caseTags(project) {
  return '<div class="tags">' + project.tags.map(tag =>
    '<span class="tag">' + escapeHtml(tag) + '</span>').join("") + '</div>';
}

function enableFloatingItem(item, area, {returnToDropPoint = false} = {}) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let x = 0;
  let y = 0;
  let drag;
  let releaseEffect;
  let suppressClick = false;
  const position = (px, py) => px + "px " + py + "px";

  function bounded(nextX, nextY) {
    const margin = reducedMotion.matches ? 0 : 16;
    return [
      Math.max(margin - item.offsetLeft, Math.min(nextX,
        area.clientWidth - item.offsetLeft - item.offsetWidth - margin)),
      Math.max(margin - item.offsetTop, Math.min(nextY,
        area.clientHeight - item.offsetTop - item.offsetHeight - margin))
    ];
  }

  function moveTo(nextX, nextY) {
    [x, y] = bounded(nextX, nextY);
    item.style.translate = position(x, y);
  }

  function stopRelease() {
    if (!releaseEffect) return;
    const [currentX, currentY = 0] = getComputedStyle(item).translate.split(" ").map(parseFloat);
    releaseEffect.cancel();
    releaseEffect = undefined;
    item.classList.remove("is-releasing");
    if (Number.isFinite(currentX)) moveTo(currentX, currentY);
  }

  item.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.button !== 0) return;
    stopRelease();
    suppressClick = false;
    drag = {
      id: event.pointerId, originX: event.clientX - x, originY: event.clientY - y,
      startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastY: event.clientY,
      time: event.timeStamp, vx: 0, vy: 0
    };
    item.setPointerCapture(event.pointerId);
    item.classList.add("is-grabbed");
  });
  item.addEventListener("pointermove", event => {
    if (event.pointerId !== drag?.id) return;
    if (!suppressClick && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 4) return;
    suppressClick = true;
    const elapsed = Math.max(8, event.timeStamp - drag.time);
    drag.vx = drag.vx * .35 + (event.clientX - drag.lastX) / elapsed * .65;
    drag.vy = drag.vy * .35 + (event.clientY - drag.lastY) / elapsed * .65;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.time = event.timeStamp;
    moveTo(event.clientX - drag.originX, event.clientY - drag.originY);
  });
  item.addEventListener("pointerup", event => {
    if (event.pointerId !== drag?.id || !suppressClick || reducedMotion.matches || !item.animate) return;
    const totalX = event.clientX - drag.startX;
    const totalY = event.clientY - drag.startY;
    const distance = Math.hypot(totalX, totalY);
    if (distance < 4) return;
    const speed = event.timeStamp - drag.time < 110 ? Math.hypot(drag.vx, drag.vy) : 0;
    const impulse = Math.min(28, 8 + speed * 27);
    const directionX = speed > .04 ? drag.vx / speed : totalX / distance;
    const directionY = speed > .04 ? drag.vy / speed : totalY / distance;
    const from = position(x, y);
    const [peakX, peakY] = bounded(x + directionX * impulse, y + directionY * impulse);
    const dx = peakX - x;
    const dy = peakY - y;
    const recoil = position(x + dx * .46, y + dy * .46);
    if (!returnToDropPoint) moveTo(x + dx * .62, y + dy * .62);
    item.classList.add("is-releasing");
    const effect = item.animate([
      {translate: from, offset: 0, easing: "cubic-bezier(.14,.72,.25,1)"},
      {translate: position(peakX, peakY), offset: .32, easing: returnToDropPoint ? "ease-out" : "ease-in-out"},
      ...(returnToDropPoint ? [] : [{translate: recoil, offset: .7, easing: "ease-out"}]),
      {translate: position(x, y), offset: 1}
    ], {duration: 460});
    releaseEffect = effect;
    effect.onfinish = () => {
      if (releaseEffect !== effect) return;
      releaseEffect = undefined;
      item.classList.remove("is-releasing");
    };
  });
  item.addEventListener("lostpointercapture", () => {
    drag = undefined;
    item.classList.remove("is-grabbed");
  });
  item.addEventListener("dragstart", event => event.preventDefault());
  item.addEventListener("click", event => {
    if (!suppressClick || event.detail === 0) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  item.addEventListener("keydown", event => {
    const step = event.shiftKey ? 24 : 8;
    const directions = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step]};
    if (event.key === "Escape") {
      stopRelease();
      x = y = 0;
      item.style.translate = "";
    } else if (directions[event.key]) {
      event.preventDefault();
      stopRelease();
      const [dx, dy] = directions[event.key];
      moveTo(x + dx, y + dy);
    }
  });
  reducedMotion.addEventListener("change", stopRelease);
  new ResizeObserver(() => {
    stopRelease();
    if (x || y) moveTo(x, y);
  }).observe(area);
}
