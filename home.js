// Главная страница: весь редактируемый текст берётся из content.js.
renderLayout();

const isEnglish = window.PORTFOLIO_LANG === "en";
const hero = SITE.hero;
document.querySelector(".portfolio-heading h1").textContent = hero.title;
document.querySelector(".portfolio-year").textContent = hero.year;
document.querySelector(".portfolio-intro h2").textContent = hero.greeting;
document.querySelector(".portfolio-intro p").innerHTML = typography(hero.description);
document.querySelector(".portfolio-skills-heading").textContent = hero.skillsTitle;
document.querySelector(".portfolio-skills").innerHTML = hero.skills.map(skill =>
  '<li><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></svg><span>' +
  typography(skill) + '</span></li>'
).join("");
document.querySelector(".portrait-filename").textContent = hero.name + ".jpg";
document.querySelector(".portrait-window img").alt = hero.name;

if (isEnglish) {
  document.title = "Portfolio — Darya Atrokhina";
  document.querySelector('meta[name="description"]').content = "Graphic and web design portfolio by Darya Atrokhina.";
}

const catalog = SITE.catalog;
document.querySelector("#catalog-heading").textContent = catalog.heading;
document.querySelector("#filters").setAttribute("aria-label", isEnglish ? "Filter projects" : "Фильтры проектов");

document.querySelector("#about .section-head").textContent = SITE.about.heading;
document.querySelector("#about h2").innerHTML = SITE.about.title.map(escapeHtml).join("<br>");
document.querySelector("#about .about-text").innerHTML =
  SITE.about.paragraphs.map(text => "<p>" + typography(text) + "</p>").join("");
document.querySelector("#about .next").innerHTML = escapeHtml(SITE.about.button.replace(/ ↗/g,"")) + " " + iconArrowUpRight();
document.querySelector("#about .next").href = telegramContactUrl();
document.querySelector("#about .contact-links").innerHTML = socialLinks();

let activeFilter = catalog.filters[0];
const shelf = document.querySelector("#shelf");
const filters = document.querySelector("#filters");

function renderCatalog() {
  const visible = activeFilter === catalog.filters[0]
    ? PROJECTS
    : PROJECTS.filter(project => {
        const category = project.category;
        if (activeFilter === 'Интерфейсы' || activeFilter === 'Interfaces') return category === 'Интерфейсы' || category === 'Interfaces' || project.id === 'dance-website';
        if (activeFilter === 'Моушн' || activeFilter === 'Motion') return category === 'Моушн-дизайн' || category === 'Motion design';
        return category === activeFilter;
      });
  const russianCount = {one: "проект", few: "проекта", many: "проектов"};
  const count = isEnglish
    ? visible.length + (visible.length === 1 ? " project" : " projects")
    : visible.length + " " + russianCount[new Intl.PluralRules("ru").select(visible.length)];
  document.querySelector(".catalog-count").textContent = count;
  shelf.innerHTML = visible.map(project => {
    const index = PROJECTS.indexOf(project) + 1;
    return '<a class="catalog-card" data-project="' + escapeHtml(project.id) + '" href="' + projectUrl(project) + '">' +
      '<div class="catalog-cover">' + productArtwork(project, true) +
      '<span aria-hidden="true" class="catalog-index">' + String(index).padStart(2, "0") + '</span></div>' +
      '<div class="catalog-card-copy"><h3>' + typography(project.name) + ' ' + iconArrowUpRight() + '</h3>' +
      '<p>' + typography(project.short) + '</p>' +
      '<div class="tags">' + project.tags.map(tag =>
        '<span class="tag">' + escapeHtml(tag) + '</span>').join("") +
      '</div></div></a>';
  }).join("");
}

const filterRows = [catalog.filters.slice(0, 3), catalog.filters.slice(3)];
filters.innerHTML = filterRows.map(row => '<div class="filter-row">' +
  row.map(name => '<button type="button" data-filter="' + escapeHtml(name) + '">' +
    escapeHtml(name) + '</button>').join("") + '</div>').join("");
filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderCatalog();
  updateFilters();
});
function updateFilters() {
  filters.querySelectorAll("button").forEach(button => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}
renderCatalog();
updateFilters();
initSkillBadges();

function initSkillBadges() {
  const orbit = document.querySelector(".skill-orbit");
  const badges = [...orbit.querySelectorAll(".skill-badge")];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const hints = isEnglish ? {
    group: "Tools", keys: "Drag with the pointer or move with the arrow keys. Escape resets the position.",
    neural: "AI tools"
  } : {
    group: "Инструменты", keys: "Перетаскивайте мышкой или перемещайте стрелками. Escape возвращает иконку на место.",
    neural: "Нейросети"
  };
  orbit.setAttribute("aria-label", hints.group);
  orbit.querySelector("#skill-controls-help").textContent = hints.keys;
  orbit.querySelector(".skill-neural-label").textContent = hints.neural;
  for (const badge of badges) {
    const label = badge.querySelector(".skill-badge-visual > span:last-child").textContent;
    badge.setAttribute("aria-label", label);
    let x = 0;
    let y = 0;
    let drag;

    function moveTo(nextX, nextY) {
      const margin = reducedMotion.matches ? 0 : 12;
      x = Math.max(margin - badge.offsetLeft, Math.min(nextX,
        orbit.clientWidth - badge.offsetLeft - badge.offsetWidth - margin));
      y = Math.max(margin - badge.offsetTop, Math.min(nextY,
        orbit.clientHeight - badge.offsetTop - badge.offsetHeight - margin));
      badge.style.translate = x + "px " + y + "px";
    }

    badge.addEventListener("pointerdown", event => {
      if (!event.isPrimary || event.button !== 0) return;
      drag = {id: event.pointerId, x: event.clientX - x, y: event.clientY - y};
      badge.setPointerCapture(event.pointerId);
      badge.classList.add("is-grabbed");
    });
    badge.addEventListener("pointermove", event => {
      if (event.pointerId !== drag?.id) return;
      moveTo(event.clientX - drag.x, event.clientY - drag.y);
    });
    badge.addEventListener("lostpointercapture", () => {
      drag = undefined;
      badge.classList.remove("is-grabbed");
    });
    badge.addEventListener("keydown", event => {
      const step = event.shiftKey ? 24 : 8;
      const directions = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step]};
      if (event.key === "Escape") {
        x = y = 0;
        badge.style.translate = "";
      } else if (directions[event.key]) {
        event.preventDefault();
        const [dx, dy] = directions[event.key];
        moveTo(x + dx, y + dy);
      }
    });
    new ResizeObserver(() => {
      if (x || y) moveTo(x, y);
    }).observe(orbit);
  }
}
