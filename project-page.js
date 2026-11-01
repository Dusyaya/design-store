// Универсальный шаблон страницы проекта.
// Сам текст находится в projects.js, а не в HTML.
renderLayout();

const projectId = document.body.dataset.project;
const project = PROJECTS.find(item => item.id === projectId);
const main = document.querySelector("main");

if (!project) {
  const merchHtml = project.id === 'gold'
    ? '<article class="showcase-item zp-case"><div class="showcase-copy"><span class="eyebrow">03 / 03</span><h2>Мерч для благотворительного марафона</h2><p>Разработка футболок для благотворительного марафона: от визуальной концепции и графики до подготовки макетов к производству и воплощения идеи в готовом изделии.</p></div>' +
      '<div class="showcase-media is-carousel is-3d-deck zp-merch"><div class="showcase-track">' +
      Array.from({length:4}, (_,i) => {
        const path = 'assets/projects/gold/merch/merch-' + String(i+1).padStart(2,'0') + '.jpg';
        return '<div class="showcase-slide"><img src="' + imagePath(path) + '" alt="Мерч благотворительного марафона, фото ' + (i+1) + '" loading="lazy"></div>';
      }).join('') + '</div></div></article>'
    : '';
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

  const bannerImages = ['banner-01.jpg', 'banner-02.jpg', 'banner-03.jpg'];
  const bannerSection = (project.id === 'gold' || project.id === 'gold-ufa')
    ? '<article class="showcase-item zp-case"><div class="showcase-copy"><span class="eyebrow">01 / 03</span><h2>Рекламные баннеры</h2><p>Адаптация фирменного стиля «Золотого Правила» для масштабной рекламной кампании в Уфе. Разработка баннеров для «ПроДокторов» с акцентом на узнаваемость бренда и ясную подачу информации.</p></div><div class="showcase-media zp-banner-stack">' +
      bannerImages.map((name, i) => '<img src="' + imagePath('assets/projects/gold-ufa/' + name) + '" alt="Рекламный баннер ' + (i+1) + '" loading="lazy">').join('') +
      '</div></article>'
    : '';
  const presentationHtml = (project.id === 'gold' || project.id === 'gold-ufa')
    ? '<article class="showcase-item zp-case"><div class="showcase-copy"><span class="eyebrow">02 / 03</span><h2>Презентации</h2><p>Разработка презентационных материалов для медицинских и просветительских мероприятий: структурирование информации, визуальная иерархия и оформление слайдов в фирменной стилистике.</p></div>' +
      '<div class="showcase-media zp-presentation-layout"><figure class="zp-presentation-photo"><img src="' + imagePath('assets/projects/gold-ufa/photo.PNG') + '" alt="Презентация на мероприятии" loading="lazy"></figure>' +
      '<div class="zp-presentation-right"><div class="zp-presentation-slides">' +
      Array.from({length:10}, (_,i) => '<img src="' + imagePath('assets/projects/gold-ufa/slide-' + String(i+1).padStart(2,'0') + '.jpg') + '" alt="Слайд презентации ' + (i+1) + '" loading="lazy">').join('') +
      '</div><div class="zp-presentation-controls"><button type="button" class="zp-prev" aria-label="Предыдущий слайд">←</button><span class="zp-count">01 / 10</span><button type="button" class="zp-next" aria-label="Следующий слайд">→</button></div></div></div></article>'
    : '';
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
    showcaseHtml + (project.id === "gold" ? '<section class="case-showcase zp-cases"><div class="section-head"><span>КЕЙСЫ</span><span>ЗОЛОТОЕ ПРАВИЛО</span></div>' + bannerSection + presentationHtml + merchHtml + '</section>' : '') +
    (showcase.length || project.id === 'gold-ufa' || project.id === 'gold' ? '' : '<div class="section-head"><span>ГАЛЕРЕЯ ПРОЕКТА</span><span>ФОТОГРАФИИ И МАКЕТЫ</span></div><div class="gallery">' + gallery + '</div>') +
    '<a class="next" href="' + projectUrl(next) + '">Следующий проект →</a></div>';
  bindImages(main);
  const zpPresentation = main.querySelector('.zp-presentation-slides');
  if (zpPresentation) {
    zpPresentation.classList.add('is-3d-deck');
    zpPresentation.querySelectorAll('img').forEach(img => img.classList.add('zp-perspective-slide'));
  }
  const zpSlides = [...main.querySelectorAll('.zp-presentation-slides img')];
  if (zpSlides.length) {
    let active = 0;
    const showZpSlide = () => {
      zpSlides.forEach((img, i) => { img.hidden = i !== active; });
      main.querySelector('.zp-count').textContent = String(active + 1).padStart(2, '0') + ' / ' + zpSlides.length;
    };
    main.querySelector('.zp-prev').addEventListener('click', () => { active = (active - 1 + zpSlides.length) % zpSlides.length; showZpSlide(); });
    main.querySelector('.zp-next').addEventListener('click', () => { active = (active + 1) % zpSlides.length; showZpSlide(); });
    showZpSlide();
  }

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
