/* English copy is kept separate from the original Russian content. */
(function(){
  const params = new URLSearchParams(location.search);
  const requested = params.get('lang');
  let saved = 'ru';
  try { saved = localStorage.getItem('portfolio-language') || 'ru'; } catch (_) {}
  const lang = requested === 'en' || requested === 'ru' ? requested : saved;
  window.PORTFOLIO_LANG = lang === 'en' ? 'en' : 'ru';
  document.documentElement.lang = window.PORTFOLIO_LANG;
  if (requested === 'en' || requested === 'ru') try { localStorage.setItem('portfolio-language', requested); } catch (_) {}
  if (window.PORTFOLIO_LANG !== 'en') return;
  const site = window.SITE_CONTENT;
  Object.assign(site.header,{catalog:'Projects',about:'About',contact:'Contact'});
  Object.assign(site.hero,{
    title:'PORTFOLIO',name:'DARYA ATROKHINA',role:'GRAPHIC & WEB DESIGNER',
    greeting:"Hi, I'm Darya!",
    description:'I create visual concepts for brands, from advertising and print to merchandise and digital interfaces. I love typography and bold compositions.',
    skillsTitle:'WHAT I DO',
    skills:['Advertising design','Brand identity & merch','Social media design','Print design','Web design & UI','Illustration & 3D'],
    hint:'SCROLL DOWN TO EXPLORE THE COLLECTION ↓',button:'Explore projects ↗'
  });
  Object.assign(site.catalog,{heading:'SELECTED WORK',filters:['All','Branding','Interfaces','Editorial design','Experiments'],machine:'PROJECT SHOWCASE'});
  Object.assign(site.about,{heading:'ABOUT THE DESIGNER',title:'Ideas taking shape.',
    paragraphs:[
      "I'm a graphic designer creating visual concepts, advertising, print materials, merchandise and digital assets for commercial projects.",
      'My background is in software engineering, so I understand not only visual design and composition but also how digital products work.'
    ],button:'Discuss a project ↗'});
  site.contacts.message="Hello! I've seen your portfolio and would love to discuss a design project. Could you let me know how we might work together?";
  site.footer='© 2026 DARYA ATROKHINA';
  const translations={
    supertyazh:{name:'SUPERTYAZH — Signature Combo',category:'Branding',field:'Advertising design / Design challenge',short:'Design challenge: advertising creative for the SUPERTYAZH signature combo, from visual research and competitor analysis to concepts and mockups.',goal:'Create an eye-catching signature combo campaign that feels on-brand and communicates the name, price and offer clearly.',research:'Analyzed SUPERTYAZH’s visual identity alongside campaigns from Vkusno i Tochka, Rostic’s, Starbucks and Burger King, focusing on vivid color, bold typography, food textures and consistent price tags.',process:'Cut out source images, built a draft composition, refined the food imagery using ChatGPT and Flux Inpaint, chose Climate Crisis typography and brand colors, and tested multiple layouts for legibility.',result:'Developed three final creative variations featuring lemonade, a burger and fries at 399 RUB, with placement mockups for print and social media.',conclusion:'The creative idea, “Too good not to share,” comes alive through a hand reaching for a fry, giving the food shot a playful narrative.'},
    laser:{
      category:'Branding',field:'Advertising / Beauty',
      short:'Graphic design for a laser hair removal studio chain in Russia and Kazakhstan: social media, print, AI visuals and email campaigns.',
      goal:'Create visual communications promoting services, seasonal offers and advertising campaigns for a laser hair removal studio chain.',
      research:'I collaborated with a marketer who supplied copy and briefs. I independently developed visual concepts, art direction, compositions and format adaptations, often without ready-made references.',
      process:'Designed social media posts and stories, printed advertising, AI-assisted visuals and email campaigns, adapting each piece to its medium and communication goals.',
      result:'Delivered a collection of digital and print assets for ongoing brand communication, campaigns and special offers across Russia and Kazakhstan.',
      conclusion:'My key contribution was turning marketing briefs into original visual concepts and adapting them consistently across channels.',
      showcase:[
        ['Stories','Social media story designs for promotions, special offers and informative posts, balancing visual appeal, readability and engagement.'],
        ['Email campaigns','Visual assets for marketing emails, including promotions, tailored offers and informational messages with clear hierarchy.'],
        ['2GIS highlight covers','A consistent set of highlight covers that organizes information and reinforces brand recognition.'],
        ['AI-generated visuals','Advertising visuals created with generative AI, from concept development to image refinement for specific campaigns.'],
        ['Merchandise','Branded merchandise graphics and mockups, adapting the visual identity to physical products.']
      ]
    },
    gold:{
      name:'Zolotoye Pravilo',category:'Branding',field:'Healthcare / Visual communications',
      short:'Design for a private healthcare network: outdoor advertising, banners, print, social media and presentations.',
      goal:'Communicate the clinics’ services and offers clearly across digital and printed media.',
      research:'Working from marketing briefs and occasional references, I developed compositions, color accents and visual imagery aligned with the brand identity.',
      process:'Created signage, outdoor advertising, digital banners, brochures, social media posts and presentation designs.',
      result:'Produced a range of promotional and informational materials for different clinic communication channels.',
      conclusion:'Healthcare design calls for clear information hierarchy and careful typography.'
    },
    dance:{
      category:'Branding',field:'Dance / Identity & merchandise',
      short:'Logos, printed materials and apparel graphics for Dance Soul dance studio.',
      goal:'Develop distinctive branded graphics for the studio and its merchandise.',
      research:'The visual direction draws on expressive typography, a contrasting palette and contemporary dance culture.',
      process:'Designed logos, print materials, T-shirt graphics and other merchandise, including print-ready artwork.',
      result:'Created branded assets and apparel designs for the studio.',
      conclusion:'A strong graphic identity should work equally well on screen and on fabric.'
    },
    book:{
      name:'Dad Knows Everything',category:'Editorial design',field:'Gift book / Hardcover / Prepress',
      short:'A hardcover book for my father’s 50th birthday, bringing together stories and memories from family and friends. Original layout and full prepress production.',
      goal:'Preserve the memories of loved ones in a personal, story-filled gift for my father’s 50th birthday.',
      research:'The book brings together stories and memories from family, friends and other people close to him.',
      process:'Designed the cover, endpapers and interior layout, and completed prepress preparation for the printer.',
      result:'The finished hardcover book was printed in 2025 as a 50th birthday gift.',
      conclusion:'Thoughtful editorial design turned personal memories and family stories into a lasting physical keepsake.'
    },
    'dance-website':{
      name:'Dance School Website',category:'Web design',field:'Web development / Dance',
      short:'A multi-page dance school website with a home page, class schedule, memberships, registration and personal account.',
      goal:'Build a website where students can learn about classes and interact with the dance school.',
      research:'The structure covers both public information and user journeys: discovering classes, viewing the schedule, choosing a membership and managing an account.',
      process:'Designed and developed client-side pages using HTML, CSS and JavaScript. The repository also includes a Node.js backend.',
      result:'A multi-page website prototype with a schedule, memberships, contacts and personal accounts.',
      conclusion:'The project combines visual design with practical user flows for a dance school.'
    },
    sevstar:{
      name:'Sevstar.Culinary',category:'Interfaces',field:'Smart TV application / UI',
      short:'A cooking app interface for a smart TV set-top box, designed during a 2023 hackathon.',
      goal:'Design a recipe catalog and step-by-step cooking interface for a TV set-top box.',
      research:'Created for a major internet provider in Sevastopol, the concept included integration with an existing grocery delivery service.',
      process:'Designed category screens, recipe listings, recipe details, step-by-step instructions and a shopping cart.',
      result:'Produced a visual interface concept as part of a hackathon.',
      conclusion:'TV interfaces require especially clear navigation and large, legible elements.'
    },
    'dance-posters':{
      name:'Animated Dance Posters',category:'Motion design',field:'Animated posters / Dance',
      short:'Three animated posters for dance classes: Dasha Pisanets, Panther and Sakura.',
      goal:'Create expressive animated posters to promote dance classes.',
      research:'Dynamic compositions, music, typography and movement help communicate the personality of each class.',
      process:'Created three motion posters for different dance classes.',
      result:'A set of three video posters for social media.',
      conclusion:'Motion graphics can communicate the atmosphere of a dance class before it even begins.'
    },
    extra:{
      name:'Illustration & 3D',category:'Experiments',field:'Illustration / 3D',
      short:'Original digital illustrations, 3D models based on architectural floor plans, and an educational road-safety scene.',
      goal:'Explore how 3D can make technical information and educational scenarios easier to understand.',
      research:'For architectural models I used floor plans to reconstruct walls, doors, windows and room geometry. For the educational scene I studied road layouts and traffic rules.',
      process:'Built spatial models from technical plans while preserving proportions. I also created a road-safety 3D scene and original digital illustrations; the architectural models were not photorealistic renders.',
      result:'Created 3D floor-plan models, an educational traffic scene and a series of digital illustrations.',
      conclusion:'Exploring different techniques expands the possibilities of graphic design.'
    },
    baker:{
      name:'The Happy Baker',category:'Interfaces',field:'Mobile game / UI',
      short:'Mobile game UI with original hand-drawn backgrounds, game screens, and win and lose illustrations.',
      goal:'Create a visual world and interface for a mobile game, including its key gameplay states.',
      research:'The visual direction uses warm colors, bakery-inspired imagery and bright action buttons.',
      process:'Illustrated the backgrounds and game graphics, designed screen compositions and created win and lose states.',
      result:'A series of game screens featuring original backgrounds and illustrations.',
      conclusion:'Expressive game visuals should always support intuitive navigation.'
    },
    owl:{
      name:'Owl & Little Fox',category:'Interfaces',field:'Children’s website / Landing page',
      short:'A landing page for a children’s project with pastel colors, class information and an inquiry form.',
      goal:'Design a website where parents can request a tour of a kindergarten.',
      research:'Used a soft pastel palette requested by the client and considered implementation on Tilda.',
      process:'Designed a landing page with informational sections, reviews, pricing and an inquiry form.',
      result:'Delivered a landing page design for a children’s education project.',
      conclusion:'Even playful, child-friendly design needs to be clear and useful for parents.'
    },
    babushka:{
      name:'BABUSHKA Zine',category:'Editorial design',field:'Magazine / Collage',
      short:'An original collage-style zine reimagining the traditional grandmother’s headscarf as a contemporary fashion accessory.',
      goal:'Show a familiar accessory from an unexpected perspective through editorial design.',
      research:'The concept combines archival imagery, fashion photography, expressive typography and collage.',
      process:'Designed the cover, spreads, typographic compositions and collages.',
      result:'Created an original magazine with a cohesive visual system.',
      conclusion:'Collage and typography can bring nostalgia and contemporary visual culture together.'
    }
  };
  window.PORTFOLIO_PROJECTS.forEach(project=>{
    const tr=translations[project.id]; if(!tr)return;
    for(const key of ['name','category','field','short','goal','research','process','result','conclusion']) if(tr[key])project[key]=tr[key];
    if(tr.showcase && project.showcase) project.showcase.forEach((item,i)=>{
      if(tr.showcase[i]){item.title=tr.showcase[i][0];item.description=tr.showcase[i][1];}
    });
  });
  window.PORTFOLIO_EN_TEXT={
    'РАЗРАБОТКА КОНЦЕПЦИИ':'CONCEPT DEVELOPMENT','ТЕСТОВОЕ ЗАДАНИЕ / 2026':'DESIGN CHALLENGE / 2026','01 / ИССЛЕДОВАНИЕ':'01 / RESEARCH','02 / КОНЦЕПЦИЯ':'02 / CONCEPT','03 / РЕЗУЛЬТАТ':'03 / OUTCOME','Фирменный язык и конкуренты':'Brand language & competitors','Невозможно не поделиться':'Too good not to share','Три варианта. Одна идея.':'Three versions. One idea.','КОМБО СУПЕРТЯЖ':'SUPERTYAZH COMBO',
    'Проект не найден':'Project not found','Вернуться в каталог':'Back to projects',
    'Вернуться к коллекции':'Back to collection','Предыдущий проект':'Previous project','Следующий проект':'Next project',
    '01 / Задача':'01 / Brief','02 / Контекст и подход':'02 / Context & approach','03 / Моя работа':'03 / My contribution','04 / Результат':'04 / Outcome','05 / Вывод':'05 / Takeaway',
    'НАПРАВЛЕНИЯ РАБОТЫ':'DESIGN AREAS','ПРИМЕРЫ ДИЗАЙНА':'SELECTED WORK',
    'КЕЙСЫ':'CASE STUDIES','ГАЛЕРЕЯ ПРОЕКТА':'PROJECT GALLERY','ФОТОГРАФИИ И МАКЕТЫ':'PHOTOS & MOCKUPS',
    'ГАЛЕРЕИ РАБОТ':'WORK GALLERIES','ИЛЛЮСТРАЦИИ / 3D':'ILLUSTRATION / 3D',
    'Иллюстрации':'Illustrations','Авторские цифровые иллюстрации.':'Original digital illustrations.',
    'Рекламные баннеры':'Advertising banners','Презентации':'Presentations',
    'Мерч для благотворительного марафона':'Charity marathon merchandise','Полиграфия':'Print design',
    'Брендинг':'Branding','Мерч':'Merchandise','Исследование и предложения':'Research & concepts','Результат':'Outcome',
    'ДО / ПЕРВЫЙ ЛОГОТИП':'BEFORE / ORIGINAL LOGO','ПОСЛЕ / РЕБРЕНДИНГ':'AFTER / REBRANDING',
    'Афиша для расклейки':'Printed event poster',
    'ВИДЕОАФИШИ':'MOTION POSTERS','03 ВИДЕО':'03 VIDEOS',
    'САЙТ ТАНЦЕВАЛЬНОЙ ШКОЛЫ':'DANCE SCHOOL WEBSITE','ВЕБ-ПРОЕКТ':'WEB PROJECT',
    'Открыть сайт':'Visit website','Посмотреть код на GitHub':'View code on GitHub',
    'ЭКРАНЫ ИГРЫ':'GAME SCREENS','05 ЗАГРУЖЕННЫХ ЭКРАНОВ · АВТОРСКИЕ ИЛЛЮСТРАЦИИ':'05 SCREENS · ORIGINAL ILLUSTRATIONS',
    'ЭКРАНЫ ПРИЛОЖЕНИЯ':'APP SCREENS','SMART TV · 09 ЭКРАНОВ':'SMART TV · 09 SCREENS',
    'Первый экран можно прокручивать вверх и вниз внутри телевизора.':'Scroll vertically inside the TV to explore the first screen.',
    'ГАЛЕРЕЯ ЗИНА':'ZINE GALLERY','20 СТРАНИЦ · 10 РАЗВОРОТОВ':'20 PAGES · 10 SPREADS',
    'Загрузите изображение':'Image unavailable','Страница ожидает загрузки':'Page loading',
    'ПРОЕКТОВ':'PROJECTS','Почта':'Email','Нейросети':'AI tools',
    'Даша Писанец':'Dasha Pisanets','Пантера':'Panther','Сакура':'Sakura',
    'Экран телевизора. Первый макет прокручивается вертикально.':'TV screen. The first layout can be scrolled vertically.',
    'Интерактивный журнал BABUSHKA':'Interactive BABUSHKA zine',
    'ЗОЛОТОЕ ПРАВИЛО':'ZOLOTOYE PRAVILO','Реклама / Бьюти':'Advertising / Beauty',
    'Предыдущий слайд':'Previous slide','Следующий слайд':'Next slide',
    'Предыдущее изображение':'Previous image','Следующее изображение':'Next image',
    'Предыдущий экран':'Previous screen','Следующий экран':'Next screen',
    'Предыдущий разворот':'Previous spread','Следующий разворот':'Next spread',
    'Воспроизвести видеоафишу':'Play motion poster',
    'Первый логотип Dance Soul':'Original Dance Soul logo','Новый логотип Dance Soul':'New Dance Soul logo',
    'Презентация на мероприятии':'Presentation at an event',
    'Сайт танцевальной школы':'Dance school website',
    'Главная страница сайта танцевальной школы Алисы Шарко':'Alisa Sharko dance school homepage',
    'Три видеоафиши для танцевальных классов: «Даша Писанец», «Пантера» и «Сакура».':'Three animated posters for the Dasha Pisanets, Panther and Sakura dance classes.',
    'Многостраничный сайт школы танцев с расписанием, абонементами и личным кабинетом. Разработан для танцевальной школы Алисы Шарко.':'A multi-page website with class schedules, memberships and student accounts, developed for Alisa Sharko Dance School.',
    'Для мобильной игры «Весёлый Пекарь» разработала интерфейс и самостоятельно нарисовала иллюстрации: персонажей, элементы окружения и игровую графику.':'I designed the interface and illustrated the characters, environments and game assets for The Happy Baker mobile game.',
    'Преобразование технических планов БТИ в понятные трёхмерные модели помещений: поэтажные планы, стены, перегородки и геометрия без фотореалистичных рендеров. Отдельный учебный 3D-проект посвящён правилам дорожного движения: моделирование дорожной сцены для визуального объяснения ситуаций на дороге.':'Turning architectural floor plans into understandable 3D room models, without photorealistic rendering. A separate educational project illustrates traffic rules through a modeled road scene.',
    'Разработка первоначального логотипа танцевальной студии Dance Soul. Через год — ребрендинг с адаптацией названия и логотипа на русский язык в связи с новыми требованиями к оформлению вывесок.':'I designed the original Dance Soul logo and later refreshed the identity, adapting its name and logo to Russian signage requirements.',
    'Небольшое исследование и подбор визуальных направлений для будущего мерча студии: идеи, референсы и предложения по оформлению.':'Explored visual directions, references and concepts for the studio’s future merchandise.',
    'В результате созданы футболка с авторским принтом и свободные брюки с вышивкой и лампасами из гобелена с ковровым орнаментом. Контраст лаконичной чёрной основы и насыщенных узоров объединяет эстетику уличной одежды с характером танцевальной студии.':'The final pieces include a graphic T-shirt and loose trousers with embroidery and patterned tapestry stripes, blending streetwear with the studio’s identity.',
    'Адаптация фирменного стиля «Золотого Правила» для масштабной рекламной кампании в Уфе: разработка широкоформатного рекламного баннера и баннеров для платформы «ПроДокторов». Цель — усилить узнаваемость бренда с помощью современной визуальной подачи и понятной иерархии информации.':'Adapted the clinic’s visual identity for a large advertising campaign in Ufa, including outdoor banners and ads for ProDoktorov, with a focus on brand recognition and clear information hierarchy.',
    'Разработка презентационных материалов для медицинских и просветительских мероприятий: структурирование информации, визуальная иерархия и оформление слайдов в фирменной стилистике.':'Designed presentations for medical and educational events, organizing information with clear hierarchy and consistent branding.',
    'Разработка футболок для благотворительного марафона: от визуальной концепции и графики до подготовки макетов к производству и воплощения идеи в готовом изделии.':'Designed T-shirts for a charity marathon, from initial visual concept to production-ready artwork.',
    'Дизайн печатных материалов для клиники «Золотое Правило»: адаптация фирменного стиля под физические носители, работа с композицией, типографикой и подготовка макетов к печати.':'Designed printed materials for Zolotoye Pravilo, adapting its identity to physical formats and preparing artwork for production.'
  };
  window.localizePortfolioPage=function(root=document){
    if(window.PORTFOLIO_LANG!=='en')return;
    const dict=window.PORTFOLIO_EN_TEXT;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(node.parentElement?.closest('script,style,svg'))return;
      const original=node.nodeValue;
      const trimmed=original.trim();
      if(dict[trimmed])node.nodeValue=original.replace(trimmed,dict[trimmed]);
    });
    root.querySelectorAll('[aria-label],[alt],[title]').forEach(el=>{
      for(const key of ['aria-label','alt','title']){
        const v=el.getAttribute(key);if(v&&dict[v])el.setAttribute(key,dict[v]);
      }
    });
  };
  document.addEventListener('DOMContentLoaded',()=>window.localizePortfolioPage(document));
})();
