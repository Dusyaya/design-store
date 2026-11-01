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
    '<div class="section-head"><span>ГАЛЕРЕЯ ПРОЕКТА</span>' +
    '<span>ФОТОГРАФИИ И МАКЕТЫ</span></div>' +
    '<div class="gallery">' + gallery + '</div>' +
    '<a class="next" href="' + projectUrl(next) + '">Следующий проект →</a></div>';
  bindImages(main);
}
