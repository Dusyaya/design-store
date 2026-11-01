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
  const previous = PROJECTS[(PROJECTS.indexOf(project) - 1 + PROJECTS.length) % PROJECTS.length];

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
    ? '<article class="showcase-item zp-case"><div class="showcase-copy"><span class="eyebrow">01 / 04</span><h2>Рекламные баннеры</h2><p>Адаптация фирменного стиля «Золотого Правила» для масштабной рекламной кампании в Уфе: разработка широкоформатного рекламного баннера и баннеров для платформы «ПроДокторов». Цель — усилить узнаваемость бренда с помощью современной визуальной подачи и понятной иерархии информации.</p></div><div class="showcase-media zp-banner-stack">' +
      bannerImages.map((name, i) => '<img src="' + imagePath('assets/projects/gold/' + name) + '" alt="Рекламный баннер ' + (i+1) + '" loading="lazy">').join('') +
      '</div></article>'
    : '';
  const presentationHtml = project.id === 'gold'
    ? '<article class="showcase-item zp-case zp-presentation-case"><div class="showcase-copy"><span class="eyebrow">02 / 04</span><h2>Презентации</h2><p>Разработка презентационных материалов для медицинских и просветительских мероприятий: структурирование информации, визуальная иерархия и оформление слайдов в фирменной стилистике.</p></div>' +
      '<div class="showcase-media zp-presentation-layout">' +
      '<figure class="zp-presentation-photo"><img src="' + imagePath('assets/projects/gold/photo.PNG') + '" alt="Презентация на мероприятии" loading="lazy"></figure>' +
      '<div class="zp-presentation-right"><div class="zp-presentation-slides">' +
      Array.from({length:9}, (_,i) => '<img src="' + imagePath('assets/projects/gold/slide-' + String(i+1).padStart(2,'0') + '.jpg') + '" alt="Слайд презентации ' + (i+1) + '" loading="lazy">').join('') +
      '</div><div class="zp-presentation-controls"><button type="button" class="zp-prev" aria-label="Предыдущий слайд">←</button><span class="zp-count">01 / 09</span><button type="button" class="zp-next" aria-label="Следующий слайд">→</button></div></div></div></article>'
    : '';
  const merchHtml = project.id === 'gold'
    ? '<article class="showcase-item zp-case"><div class="showcase-copy"><span class="eyebrow">03 / 04</span><h2>Мерч для благотворительного марафона</h2><p>Разработка футболок для благотворительного марафона: от визуальной концепции и графики до подготовки макетов к производству и воплощения идеи в готовом изделии.</p></div>' +
      '<div class="showcase-media is-carousel is-3d-deck zp-merch"><div class="showcase-track">' +
      Array.from({length:4}, (_,i) => {
        const path = 'assets/projects/gold/merch/merch-' + String(i+1).padStart(2,'0') + (i < 2 ? '.jpg' : '.png');
        return '<div class="showcase-slide"><img src="' + imagePath(path) + '" alt="Мерч благотворительного марафона, фото ' + (i+1) + '" loading="lazy"></div>';
      }).join('') + '</div></div></article>'
    : '';
  const printHtml = project.id === 'gold'
    ? '<article class="showcase-item zp-case zp-print-case"><div class="showcase-copy"><span class="eyebrow">04 / 04</span><h2>Полиграфия</h2><p>Дизайн печатных материалов для клиники «Золотое Правило»: адаптация фирменного стиля под физические носители, работа с композицией, типографикой и подготовка макетов к печати.</p></div>' +
      '<div class="showcase-media zp-print-carousel"><div class="zp-print-slides">' +
      ['print-01.jpg','print-02.jpg'].map((name,i) => '<img src="' + imagePath('assets/projects/gold/print/' + name) + '" alt="Полиграфия Золотое Правило, работа ' + (i+1) + '" loading="lazy">').join('') +
      '</div><div class="zp-print-controls"><button type="button" class="zp-print-prev" aria-label="Предыдущее изображение">←</button><span class="zp-print-count">01 / 02</span><button type="button" class="zp-print-next" aria-label="Следующее изображение">→</button></div></div></article>'
    : '';
  const danceImage = (path,alt) => '<div class="dance-image"><img src="' + imagePath(path) + '" alt="' + alt + '" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="dance-image-placeholder" hidden>Загрузите изображение<br><small>' + escapeHtml(path.split('/').pop()) + '</small></div></div>';
  const danceCarousel = (paths,kind) => '<div class="dance-carousel dance-carousel-' + kind + '"><div class="dance-carousel-slides">' +
    paths.map((path,i)=>'<div class="dance-carousel-slide"' + (i?' hidden':'') + '>' + danceImage(path,kind+' — '+(i+1)) + '</div>').join('') +
    '</div><div class="dance-carousel-controls"><button type="button" class="dance-carousel-prev" aria-label="Предыдущее изображение">←</button><span class="dance-carousel-count">01 / ' + String(paths.length).padStart(2,'0') + '</span><button type="button" class="dance-carousel-next" aria-label="Следующее изображение">→</button></div></div>';
  const danceHtml = project.id === 'dance'
    ? '<section class="case-showcase dance-cases"><div class="section-head"><span>КЕЙСЫ</span><span>DANCE SOUL</span></div>' +
      '<article class="dance-case"><div class="dance-case-copy"><span class="eyebrow">01 / 02</span><h2>Брендинг</h2><p>Разработка первоначального логотипа танцевальной студии Dance Soul. Через год — ребрендинг с адаптацией названия и логотипа на русский язык в связи с новыми требованиями к оформлению вывесок.</p></div><div class="dance-branding-media"><div class="dance-logos"><figure><figcaption>ДО / ПЕРВЫЙ ЛОГОТИП</figcaption>' +
      danceImage('assets/projects/dance/branding/logo-before.jpg','Первый логотип Dance Soul') +
      '</figure><figure><figcaption>ПОСЛЕ / РЕБРЕНДИНГ</figcaption>' +
      danceImage('assets/projects/dance/branding/logo-after.jpg','Новый логотип Dance Soul') +
      '</figure></div><div class="dance-poster"><p>Афиша для расклейки</p>' +
      danceImage('assets/projects/dance/branding/poster.jpg','Афиша Dance Soul для расклейки') +
      '</div></div></article>' +
      '<article class="dance-case"><div class="dance-case-copy"><span class="eyebrow">02 / 02</span><h2>Мерч</h2><p>Небольшое исследование и подбор визуальных направлений для будущего мерча студии: идеи, референсы и предложения по оформлению.</p></div><div class="dance-merch-media"><h3>Исследование и предложения</h3>' +
      danceCarousel(Array.from({length:7},(_,i)=>'assets/projects/dance/research/Slide 16_9 - '+i+'.jpg'),'research') +
      '<h3>Результат</h3><p>Реализация мерча: серия из 11 фотографий готовых изделий.</p>' +
      danceCarousel(Array.from({length:11},(_,i)=>'assets/projects/dance/merch/merch-'+String(i+1).padStart(2,'0')+'.jpg'),'photos') +
      '</div></article></section>'
    : '';
  const zinPairs = [[20,1], ...Array.from({length:9},(_,i)=>[2+i*2,3+i*2])];
  const zinHtml = project.id === 'babushka'
    ? '<section class="zin-section"><div class="section-head"><span>ГАЛЕРЕЯ ЗИНА</span><span>20 СТРАНИЦ · 10 РАЗВОРОТОВ</span></div>' +
      '<div class="zin-reader"><div class="zin-book" aria-label="Интерактивный журнал BABUSHKA">' +
      zinPairs.map((pair,i) => '<div class="zin-spread' + (i===0?' is-visible':'') + '" data-spread="' + i + '">' +
        pair.map((n,j) => '<div class="zin-page zin-page-' + (j===0?'left':'right') + '"><span class="zin-page-fallback">BABUSHKA <strong>'+String(n).padStart(2,'0')+'</strong><small>Страница ожидает загрузки</small></span><img src="' + imagePath('assets/projects/babushka/Babushka'+n+'.jpg') + '" alt="Зин BABUSHKA, страница '+n+'" loading="'+(i<2?'eager':'lazy')+'" onerror="this.style.display=\'none\'" onload="this.style.display=\'block\'"></div>').join('') +
      '</div>').join('') +
      '<div class="zin-turn-sheet" aria-hidden="true"><div class="zin-turn-front"></div><div class="zin-turn-back"></div></div>' +
      '</div><div class="zin-controls"><button type="button" class="zin-prev" aria-label="Предыдущий разворот">←</button><span class="zin-count">01 / 10</span><button type="button" class="zin-next" aria-label="Следующий разворот">→</button></div></div></section>'
    : '';
  main.innerHTML =
    '<div class="wrap case">' +
    '<a class="back" href="' + SITE_ROOT + '#catalog">← Вернуться к коллекции</a>' +
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
    showcaseHtml + danceHtml + zinHtml + (project.id === "gold" ? '<section class="case-showcase zp-cases"><div class="section-head"><span>КЕЙСЫ</span><span>ЗОЛОТОЕ ПРАВИЛО</span></div>' + bannerSection + presentationHtml + merchHtml + printHtml + '</section>' : '') +
    (showcase.length || project.id === 'babushka' || project.id === 'dance' || project.id === 'gold-ufa' || project.id === 'gold' ? '' : '<div class="section-head"><span>ГАЛЕРЕЯ ПРОЕКТА</span><span>ФОТОГРАФИИ И МАКЕТЫ</span></div><div class="gallery">' + gallery + '</div>') +
    '<nav class="project-navigation" aria-label="Навигация по проектам"><a href="' + projectUrl(previous) + '">← Предыдущий проект</a><a href="' + projectUrl(next) + '">Следующий проект →</a></nav></div>';
  bindImages(main);
  main.querySelectorAll('.dance-carousel').forEach(carousel=>{
    const slides=[...carousel.querySelectorAll('.dance-carousel-slide')];
    const count=carousel.querySelector('.dance-carousel-count');
    let current=0;
    function show(index){current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.hidden=i!==current;});count.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');}
    carousel.querySelector('.dance-carousel-prev').addEventListener('click',()=>show(current-1));
    carousel.querySelector('.dance-carousel-next').addEventListener('click',()=>show(current+1));
    show(0);
  });
  const zinBook = main.querySelector('.zin-book');
  if (zinBook) {
    const spreads = [...zinBook.querySelectorAll('.zin-spread')];
    const sheet = zinBook.querySelector('.zin-turn-sheet');
    const front = sheet.querySelector('.zin-turn-front');
    const back = sheet.querySelector('.zin-turn-back');
    const prev = main.querySelector('.zin-prev');
    const nextBtn = main.querySelector('.zin-next');
    const count = main.querySelector('.zin-count');
    let current = 0, turning = false;
    const go = direction => {
      const target = current + direction;
      if (turning || target < 0 || target >= spreads.length) return;
      turning = true;
      const oldSpread = spreads[current], newSpread = spreads[target];
      const oldPages = oldSpread.querySelectorAll('.zin-page img');
      const newPages = newSpread.querySelectorAll('.zin-page img');
      front.style.backgroundImage = 'url("' + (direction>0?oldPages[1]:oldPages[0]).src + '")';
      back.style.backgroundImage = 'url("' + (direction>0?newPages[0]:newPages[1]).src + '")';
      sheet.classList.toggle('is-reverse',direction<0);
      sheet.classList.remove('is-turning');
      sheet.style.display='block';
      newSpread.classList.add('is-visible');
      newSpread.style.zIndex='1';
      oldSpread.style.zIndex='2';
      oldSpread.classList.toggle('zin-leaving-forward',direction>0);
      oldSpread.classList.toggle('zin-leaving-backward',direction<0);
      void sheet.offsetWidth;
      sheet.classList.add('is-turning');
      setTimeout(() => {
        oldSpread.classList.remove('is-visible','zin-leaving-forward','zin-leaving-backward');
        oldSpread.style.zIndex='';
        newSpread.style.zIndex='';
        sheet.classList.remove('is-turning');
        sheet.style.display='none';
        current=target; turning=false;
        count.textContent=String(current+1).padStart(2,'0')+' / '+String(spreads.length).padStart(2,'0');
        prev.disabled=current===0;nextBtn.disabled=current===spreads.length-1;
      },850);
    };
    prev.addEventListener('click',()=>go(-1));
    nextBtn.addEventListener('click',()=>go(1));
    prev.disabled=true;
  }
  const printSlides = [...main.querySelectorAll('.zp-print-slides img')];
  if (printSlides.length) {
    let printIndex = 0;
    const showPrint = () => {
      printSlides.forEach((img,i) => { img.hidden = i !== printIndex; });
      main.querySelector('.zp-print-count').textContent = String(printIndex + 1).padStart(2,'0') + ' / ' + String(printSlides.length).padStart(2,'0');
    };
    main.querySelector('.zp-print-prev').addEventListener('click', () => { printIndex = (printIndex - 1 + printSlides.length) % printSlides.length; showPrint(); });
    main.querySelector('.zp-print-next').addEventListener('click', () => { printIndex = (printIndex + 1) % printSlides.length; showPrint(); });
    showPrint();
  }
  const zpSlides = [...main.querySelectorAll('.zp-presentation-slides img')];
  if (zpSlides.length) {
    let active = 0;
    const showZpSlide = () => {
      zpSlides.forEach((img, i) => {
        const forward = (i - active + zpSlides.length) % zpSlides.length;
        const offset = forward > zpSlides.length / 2 ? forward - zpSlides.length : forward;
        img.hidden = Math.abs(offset) > 1;
        img.classList.toggle('is-active', offset === 0);
        img.style.setProperty('--slide-offset', String(offset));
        img.style.setProperty('--slide-scale', offset === 0 ? '1' : '.78');
        img.style.zIndex = String(3 - Math.abs(offset));
        img.setAttribute('aria-hidden', String(offset !== 0));
      });
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
