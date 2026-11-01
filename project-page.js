// Универсальный шаблон страницы проекта.
// Сам текст находится в projects.js, а не в HTML.
renderLayout();

const projectId = document.body.dataset.project;
const project = PROJECTS.find(item => item.id === projectId);
const main = document.querySelector("main");

if (!project) {
  main.innerHTML = '<div class="wrap case"><h1>Проект не найден</h1>' +
    '<a class="back" href="' + SITE_ROOT + '#catalog">← Вернуться в каталог</a></div>';
} else {
  document.title = project.name + " — Портфолио";
  const sections = [
    ["01 / Задача", project.goal],
    ["02 / Контекст и подход", project.research],
    ["03 / Моя работа", project.process],
    ["04 / Результат", project.result],
    ["05 / Вывод", project.conclusion]
  ];
  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  const gallery = ["Главный визуал / обложка кейса", "Работы и детали", "Мокапы и применение"]
    .map((label, index) => {
      const path = "assets/projects/" + project.id + "/" + (index + 1) + ".webp";
      return '<div class="project-image-slot">' +
        '<img data-file="' + path + '" src="' + imagePath(path) + '" alt="' + escapeHtml(label) + '">' +
        '<div class="placeholder" style="display:none"><span>＋</span>' +
        '<strong>' + typography(label) + '</strong><small>Загрузите файл ' +
        escapeHtml(path) + '</small></div></div>';
    }).join("");


  // Дополнительные секции кейса настраиваются в projects.js.
  const showcase = Array.isArray(project.showcase) ? project.showcase : [];
  // Одно изображение — обычная карточка, несколько — горизонтальная карусель.
  const showcaseHtml = showcase.length
    ? '<section class="case-showcase"><div class="section-head"><span>НАПРАВЛЕНИЯ РАБОТЫ</span><span>ПРИМЕРЫ ДИЗАЙНА</span></div>' +
      showcase.map((item, index) => {
        const images = Array.isArray(item.images) && item.images.length ? item.images : [item.image];
        const slides = images.map((path, slideIndex) =>
          '<div class="showcase-slide"><img data-file="' + escapeHtml(path) +
          '" src="' + imagePath(path) + '" alt="' + escapeHtml(item.title) + ', работа ' +
          (slideIndex + 1) + '" loading="lazy"><div class="placeholder" style="display:none"><span>＋</span><strong>' +
          typography(item.title) + '</strong><small>' + escapeHtml(path) + '</small></div></div>'
        ).join("");
        const carousel = images.length > 1;
        return '<article class="showcase-item"><div class="showcase-copy"><span class="eyebrow">' +
          String(index + 1).padStart(2, "0") + ' / ' + String(showcase.length).padStart(2, "0") +
          '</span><h2>' + typography(item.title) + '</h2><p>' +
          typography(item.description) + '</p></div>' +
          '<div class="showcase-media' + (carousel ? ' is-carousel is-3d-deck' : '') + (item.title === 'Email-рассылки' ? ' is-email' : '') + '">' +
          '<div class="showcase-track">' + slides + '</div>' +
          (carousel ? '' : '') +
          '</div></article>';
      }).join("") + '</section>'
    : "";

  const ufaGallery = project.id === "gold-ufa"
    ? '<section class="ufa-gallery"><div class="section-head"><span>РЕКЛАМНАЯ КАМПАНИЯ В УФЕ</span><span>БАННЕРЫ</span></div>' +
      ['banner-01.jpg','banner-02.jpg','banner-03.jpg'].map((name, index) => {
        const path = 'assets/projects/gold-ufa/' + name;
        return '<figure class="ufa-banner"><img data-file="' + path + '" src="' + imagePath(path) +
          '" alt="Рекламный баннер Золотое Правило ' + (index + 1) + '" loading="lazy">' +
          '<div class="placeholder" style="display:none"><strong>Баннер ' + (index + 1) +
          '</strong><small>' + path + '</small></div></figure>';
      }).join('') + '</section>'
    : "";
  main.innerHTML =
    '<div class="wrap case">' +
    '<a class="back" href="' + SITE_ROOT + '#catalog">← Вернуться в магазин</a>' +
    '<div class="eyebrow">' + typography(project.category) + ' / ' +
    typography(project.field) + ' / ' + escapeHtml(project.year) + '</div>' +
    '<h1>' + typography(project.name) + '</h1>' +
    '<div class="case-intro"><p>' + typography(project.short) + '</p>' +
    '<div class="tags">' + project.tags.map(tag =>
      '<span class="tag">' + escapeHtml(tag) + '</span>').join("") + '</div></div>' +
    '<div class="case-stage" style="--glow:' +
    (COLORS[project.tone] || COLORS.silver) + '77">' +
    productArtwork(project) + '</div>' +
    '<div class="case-rows">' + sections.map(([heading, description]) =>
      '<div class="case-row"><h2>' + typography(heading) + '</h2><p>' +
      typography(description) + '</p></div>').join("") + '</div>' +
    showcaseHtml + ufaGallery +
    (showcase.length || project.id === 'gold-ufa' ? '' : '<div class="section-head"><span>ГАЛЕРЕЯ ПРОЕКТА</span><span>ФОТОГРАФИИ И МАКЕТЫ</span></div><div class="gallery">' + gallery + '</div>') +
    '<a class="next" href="' + projectUrl(next) + '">Следующий проект →</a></div>';
  bindImages(main);
  main.querySelectorAll(".showcase-media.is-email .showcase-slide").forEach(slide => {
    const img = slide.querySelector("img");
    const updateRatio = () => {
      if (img.naturalWidth && img.naturalHeight) slide.style.setProperty("--email-ratio", img.naturalWidth + "/" + img.naturalHeight);
    };
    if (img.complete) updateRatio();
    img.addEventListener("load", updateRatio);
  });
  main.querySelectorAll(".showcase-media.is-carousel").forEach(carousel => {
    const track = carousel.querySelector(".showcase-track");
    const slides = [...track.children];
    let current = 0;
    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        // Ближняя карточка расположена слева, остальные уходят в перспективу вправо.
        const offset = (i - current + slides.length) % slides.length;
        slide.style.setProperty("--deck-offset", offset);
        slide.style.setProperty("--deck-depth", -offset * 105 + "px");
        slide.style.setProperty("--deck-x", offset * 43 + "%");
        slide.style.setProperty("--deck-scale", 1 - offset * .13);
        slide.style.setProperty("--deck-rotate", offset * -10 + "deg");
        slide.style.zIndex = String(slides.length - offset);
        slide.classList.toggle("is-front", offset === 0);
        slide.setAttribute("aria-label", "Показать работу " + (i + 1));
        slide.tabIndex = 0;
      });
    };
    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => show(i === current ? current + 1 : i));
      slide.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          show(i);
        }
      });
    });
    show(0);
  });
}
