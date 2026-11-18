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
  const label = (item, direction) => '<span><small>' + direction + '</small><strong>' +
    projectTitle(item) + '</strong></span>';
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
    ["Instagram", SITE.contacts.instagram, "instagram-filled"],
    ["WhatsApp", whatsappContactUrl(), "whatsapp-filled"],
    [window.PORTFOLIO_LANG === "en" ? "Email" : "Почта", emailContactUrl(), "mail-filled"]
  ];
  return '<div class="social-links">' +
    links.map(([name, url, icon]) =>
      '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' +
      '<img class="social-icon" src="' + SITE_ROOT + 'assets/icons/' + icon +
      '.svg" alt="" width="22" height="22" loading="lazy">' +
      '<span>' + name + '</span></a>'
    ).join("") + '</div>';
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
    const topbar = nav.closest(".topbar");
    new ResizeObserver(() => {
      document.documentElement.style.setProperty("--sticky-offset", (topbar.offsetHeight + 12) + "px");
    }).observe(topbar);
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

const WINDOW_LIGHTS = '<span class="window-lights" aria-hidden="true"><i></i><i></i><i></i></span>';

function windowBar(title) {
  return '<figcaption class="window-bar">' + WINDOW_LIGHTS + '<span>' + escapeHtml(title) + '</span></figcaption>';
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
  const landscape = ["dance-website", "sevstar", "extra", "baker", "owl"].includes(project.id);
  return '<figure class="case-cover floating-window' + (landscape ? ' is-landscape' : '') + '">' +
    windowBar(project.name + ".webp") +
    '<div class="case-cover-media"><img src="' + coverBase(project) +
    '-hero.webp" alt="' + escapeHtml(project.name) + '" decoding="async" fetchpriority="high"></div></figure>';
}

function caseTags(project) {
  return '<div class="tags">' + project.tags.map(tag =>
    '<span class="tag">' + escapeHtml(tag) + '</span>').join("") + '</div>';
}

function enableFloatingWindow(item, area, {returnToOrigin = true, edgeGap = 24} = {}) {
  const image = item.querySelector("img.portfolio-zoomable");
  const control = image || item.querySelector(".window-bar");
  if (!image) control.tabIndex = 0;
  const english = window.PORTFOLIO_LANG === "en";
  const movement = english
    ? "Drag to move the window or use the arrow keys. Escape returns it to its place."
    : "Перетащите окно или переместите его стрелками. Escape возвращает окно на место.";
  const zoom = image ? (english ? " Press Enter to enlarge." : " Нажмите Enter, чтобы увеличить изображение.") : "";
  control.setAttribute("aria-description", movement + zoom);
  enableFloatingItem(item, area, {returnToOrigin, followScroll: true, edgeGap});
}

function enableFloatingItem(item, area, {
  returnToOrigin = false, followScroll = false, edgeGap = 24, activationTarget = item
} = {}) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let x = 0;
  let y = 0;
  let drag;
  let releaseEffect;
  let suppressClick = false;
  const position = (px, py) => px + "px " + py + "px";

  function bounded(nextX, nextY) {
    const margin = reducedMotion.matches ? 0 : edgeGap;
    const horizontalMargin = Math.min(margin, Math.max(0, (area.clientWidth - item.offsetWidth) / 2));
    const verticalMargin = Math.min(margin, Math.max(0, (area.clientHeight - item.offsetHeight) / 2));
    let left = item.offsetLeft;
    let top = item.offsetTop;
    for (let parent = item.offsetParent; parent && parent !== area; parent = parent.offsetParent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
    }
    return [
      Math.max(horizontalMargin - left, Math.min(nextX,
        area.clientWidth - left - item.offsetWidth - horizontalMargin)),
      Math.max(verticalMargin - top, Math.min(nextY,
        area.clientHeight - top - item.offsetHeight - verticalMargin))
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

  function animateRelease(keyframes, timing) {
    item.classList.add("is-releasing");
    const effect = item.animate(keyframes, timing);
    releaseEffect = effect;
    effect.onfinish = () => {
      if (releaseEffect !== effect) return;
      releaseEffect = undefined;
      item.classList.remove("is-releasing");
    };
  }

  function resetPosition() {
    const from = position(x, y);
    x = y = 0;
    item.style.translate = "";
    if (returnToOrigin && !reducedMotion.matches && from !== "0px 0px" && item.animate) {
      animateRelease([{translate: from}, {translate: "0px 0px"}], {
        duration: 420, easing: "cubic-bezier(.19,.86,.25,1)"
      });
    }
  }

  const pointerY = event => followScroll ? event.pageY : event.clientY;
  item.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest("video")) return;
    stopRelease();
    suppressClick = false;
    drag = {
      id: event.pointerId, originX: event.clientX - x, originY: pointerY(event) - y,
      startX: event.clientX, startY: pointerY(event), lastX: event.clientX, lastY: pointerY(event),
      time: event.timeStamp, vx: 0, vy: 0
    };
    // Захват на исходном элементе сохраняет клик по изображению внутри окна.
    event.target.setPointerCapture(event.pointerId);
    item.classList.add("is-grabbed");
  });
  item.addEventListener("pointermove", event => {
    if (event.pointerId !== drag?.id) return;
    const currentY = pointerY(event);
    if (!suppressClick && Math.hypot(event.clientX - drag.startX, currentY - drag.startY) < 4) return;
    suppressClick = true;
    const elapsed = Math.max(8, event.timeStamp - drag.time);
    drag.vx = drag.vx * .35 + (event.clientX - drag.lastX) / elapsed * .65;
    drag.vy = drag.vy * .35 + (currentY - drag.lastY) / elapsed * .65;
    drag.lastX = event.clientX;
    drag.lastY = currentY;
    drag.viewportY = event.clientY;
    drag.time = event.timeStamp;
    moveTo(event.clientX - drag.originX, currentY - drag.originY);
  });
  if (followScroll) window.addEventListener("scroll", () => {
    if (drag && suppressClick) moveTo(x, drag.viewportY + window.scrollY - drag.originY);
  }, {passive: true});
  item.addEventListener("pointerup", event => {
    if (event.pointerId !== drag?.id || !suppressClick) return;
    if (returnToOrigin) {
      resetPosition();
      return;
    }
    if (reducedMotion.matches || !item.animate) return;
    const totalX = event.clientX - drag.startX;
    const totalY = pointerY(event) - drag.startY;
    const distance = Math.hypot(totalX, totalY);
    if (distance < 4) return;
    const speed = event.timeStamp - drag.time < 110 ? Math.hypot(drag.vx, drag.vy) : 0;
    const impulse = Math.min(34, 12 + speed * 29);
    const directionX = speed > .04 ? drag.vx / speed : totalX / distance;
    const directionY = speed > .04 ? drag.vy / speed : totalY / distance;
    const from = position(x, y);
    const [peakX, peakY] = bounded(x + directionX * impulse, y + directionY * impulse);
    animateRelease([
      {translate: from, offset: 0, easing: "cubic-bezier(.14,.72,.25,1)"},
      {translate: position(peakX, peakY), offset: .32, easing: "ease-out"},
      {translate: from, offset: 1}
    ], {duration: 300});
  });
  item.addEventListener("lostpointercapture", () => {
    if (returnToOrigin && drag && !releaseEffect && suppressClick) resetPosition();
    drag = undefined;
    item.classList.remove("is-grabbed");
  });
  if (activationTarget !== item) activationTarget.addEventListener("pointerdown", event => {
    if (!item.contains(event.target)) suppressClick = false;
  });
  activationTarget.addEventListener("dragstart", event => event.preventDefault());
  activationTarget.addEventListener("click", event => {
    if (!suppressClick || event.detail === 0 || event.target.closest("video")) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  item.addEventListener("keydown", event => {
    if (event.target.closest("video")) return;
    const step = event.shiftKey ? 24 : 8;
    const directions = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step]};
    if (event.key === "Escape") {
      stopRelease();
      resetPosition();
    } else if (directions[event.key]) {
      event.preventDefault();
      stopRelease();
      const [dx, dy] = directions[event.key];
      moveTo(x + dx, y + dy);
    }
  });
  reducedMotion.addEventListener("change", () => {
    stopRelease();
    if (returnToOrigin && !drag) resetPosition();
  });
  new ResizeObserver(() => {
    if (returnToOrigin && releaseEffect) return;
    stopRelease();
    if (x || y) moveTo(x, y);
  }).observe(area);
}
