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
    title:'PORTFOLIO',name:'Darya Atrokhina',role:'GRAPHIC & WEB DESIGNER',
    greeting:"Hi, I'm Darya!",
    description:'I create visual concepts for brands, from advertising and print to merchandise and digital interfaces. I love typography and bold compositions.',
    skillsTitle:'What I do',
    skills:['Advertising design','Brand identity & merch','Social media design','Print design','Web design & UI','Illustration & 3D'],
    hint:'SCROLL DOWN TO EXPLORE THE COLLECTION ↓',button:'Explore projects ↗'
  });
  Object.assign(site.catalog,{heading:'Selected work',filters:['All','Branding','Web and interfaces','Motion','Editorial design'],machine:'PROJECT SHOWCASE'});
  Object.assign(site.about,{heading:'ABOUT THE DESIGNER',title:['Ideas', 'taking shape'],
    paragraphs:[
      "I’m a graphic designer. I develop visual concepts and bring them to life in advertising, print, merchandise and digital projects.",
      'My background is in software engineering. I’m interested in how digital products look and how people use them.'
    ],button:'Discuss a project ↗'});
  site.contacts.message="Hello! I've seen your portfolio and would love to discuss a design project. Could you let me know how we might work together?";
  site.footer='© 2026 DARYA ATROKHINA';
  const translations={
    supertyazh:{name:'SUPERTYAZH — Signature Combo',category:'Branding',field:'Advertising design / Design challenge',preview:"Three ads for a burger, fries and lemonade combo. I also showed how they look outdoors and indoors.", short:'Design challenge: advertising creative for the SUPERTYAZH signature combo, from visual research and competitor analysis to concepts and mockups.',goal:"I wanted people to recognize SUPERTYAZH at a glance and see what comes in the combo and how much it costs.",research:"I started with SUPERTYAZH’s own ads: bright colors, dimensional headlines and photography paired with flat graphics. Vkusno i Tochka showed how a simple background draws attention to the food, while Rostic’s used a consistent price badge that was easy to spot. Starbucks drew my eye to textures and details, and Burger King made a quick bite feel like time with friends. Those observations informed the prominent price badge, close-up food imagery and the idea of sharing fries.",process:"I built a draft from the source photos and refined the food imagery with ChatGPT and Flux Inpaint. I chose Climate Crisis for the headline and used the brand’s existing colors. I compared six versions in grayscale to see where the name, price and food stood out best.",result:"Three designs made the final cut, all with the same offer: lemonade, a burger and fries for 399 RUB. Two mockups show how the ad looks outdoors and indoors.",conclusion:"I turned “Too good not to share” into a familiar gesture: a hand reaches into the frame for a fry. It’s that moment when one friend orders fries and everyone at the table has a taste."},
    laser:{
      category:'Branding',field:'Advertising / Beauty',
      preview:"Posts, stories, emails and print ads for laser hair removal studios. I used AI to create images for some of the campaigns.",
      short:'Graphic design for a laser hair removal studio chain in Russia and Kazakhstan: social media, print, AI visuals and email campaigns.',
      goal:"Laser&Beauty always has something to share, from new services to seasonal offers and campaigns. My job was to give each of those moments a look of its own.",
      research:"The marketer brought the brief and copy, and I developed the visual idea. For some assignments, I started with just a written brief and found the direction myself.",
      process:"I designed posts, stories, emails and print ads. For some campaigns I created imagery with AI, then built a layout for each format.",
      result:"The resulting work served studios in Russia and Kazakhstan, from everyday social posts to seasonal campaigns.",
      conclusion:"My favorite part is finding an idea you can recognize in a quick story, an email or a printed ad.",
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
      preview:"Signs, ads, brochures and presentations for a clinic network, plus T-shirts I designed for a charity marathon.",
      short:'Design for a private healthcare network: outdoor advertising, banners, print, social media and presentations.',
      goal:"A clinic sign has to be recognizable at a glance. A brochure gives people time to understand a service. I designed for both situations.",
      research:"The marketer supplied the copy and sometimes references. I chose the layouts, imagery and color accents within the clinic’s identity.",
      process:"I worked on signage, outdoor ads, ProDoktorov banners, brochures and social posts. I also designed presentations and merchandise for a charity marathon.",
      result:"The case brings together work at several scales, from a large outdoor ad in Ufa to slides for medical events and marathon T-shirts.",
      conclusion:"With healthcare materials, my first check is whether people can find the offer and see where to read more."
    },
    dance:{
      category:'Branding',field:'Dance / Identity & merchandise',
      preview:"Logos, a poster and clothing for Dance Soul studio. I designed a T-shirt print and graphics for the trousers.",
      short:'Logos, printed materials and apparel graphics for Dance Soul dance studio.',
      goal:"I started with a logo for a dance studio, then carried its personality into posters and clothing.",
      research:"A year later the studio needed a Russian-language sign. I kept the oversized lettering and strong contrast that gave the original logo its character.",
      process:"I worked on both logos, designed a printed poster and developed graphics for clothing. For the merchandise I gathered references and explored a few directions.",
      result:"The finished pieces included a graphic T-shirt and loose trousers with embroidery and tapestry stripes.",
      conclusion:"The most interesting part was seeing the graphics leave the screen and become something people could wear."
    },
    book:{
      name:'Dad Knows Everything',category:'Editorial design',field:'Gift book / Hardcover / Prepress',
      preview:"A book for my dad’s 50th birthday. I collected stories from family and friends, designed the cover and laid out the pages.",
      short:'A hardcover book for my father’s 50th birthday, bringing together stories and memories from family and friends. Original layout and full prepress production.',
      goal:"For Dad’s 50th birthday, I wanted to give him a book only our family could have made. It brings together stories from relatives and friends.",
      research:"Everyone told their story in their own voice. I wanted to keep that feeling while making the collection flow as a book.",
      process:"I designed the cover and endpapers, laid out the spreads and prepared the files for the printer.",
      result:"I sent the book to print in 2025 and chose a hardcover for the gift edition.",
      conclusion:"Now those stories have a place to live. You can open the book anywhere and hear a familiar voice again."
    },
    'dance-website':{
      name:'Dance School Website',category:'Web design',field:'Web development / Dance',
      preview:"A dance school website where students can check the schedule, choose a membership and sign up.",
      short:'A multi-page dance school website with a home page, class schedule, memberships, registration and personal account.',
      goal:"I wanted a site where you could choose a class and see what to do next, whether that meant checking the schedule, picking a membership or signing up.",
      research:"I organized the pages around those actions. New visitors can get to know the studio, and students have a member area.",
      process:"I built the pages and client-side interface with HTML, CSS and JavaScript. The project uses Node.js on the server.",
      result:"The result is a multi-page prototype with schedules, memberships, contact details, registration and a member area.",
      conclusion:"What I enjoy about this kind of project is turning a design into an interface and following the journey a student would take."
    },
    sevstar:{
      name:'Sevstar.Culinary',category:'Interfaces',field:'Smart TV application / UI',
      preview:"A cooking app for a TV set-top box. I designed the recipe catalog, cooking instructions and grocery cart.",
      short:'A cooking app interface for a smart TV set-top box, designed during a 2023 hackathon.',
      goal:"At a hackathon we took on a cooking app for a TV set-top box. I worked out how to pick a dish on the big screen and follow it one step at a time.",
      research:"The project was for Sevstar, an internet provider in Sevastopol. The concept included Yamigom grocery delivery so viewers could go from a recipe to its ingredients.",
      process:"I designed the categories, recipe catalog and recipe details, then the cooking instructions and shopping cart.",
      result:"The gallery shows how the screens fit together, from choosing a dish to finding the ingredients and following the recipe.",
      conclusion:"People watch TV from across the room. Even small decisions change when labels and buttons have to be readable from the sofa."
    },
    'dance-posters':{
      name:'Animated Dance Posters',category:'Motion design',field:'Animated posters / Dance',
      preview:"Four animated posters: three for dance classes and one for Trap Dance studio’s birthday.",
      short:'Three video posters for choreographers Dasha Pisanets, Pantera and Sakura, plus one for the Trap Dance studio’s birthday.',
      goal:"I wanted each poster to give you a sense of the class before you heard the music in the studio.",
      research:"Dasha Pisanets, Pantera and Sakura each called for a different look, and Trap Dance’s birthday had its own mood. I found a separate direction for each video.",
      process:"I built each composition around the person on screen, choosing type, music and pacing that gave the poster movement and left time to read.",
      result:"I made three videos for the choreographers and one for the studio’s birthday. All four are below.",
      conclusion:"An animated poster can set a mood in a couple of seconds. I like it when you can feel that rhythm in the lettering too."
    },
    extra:{
      name:'Illustration & 3D',category:'Experiments',field:'Illustration / 3D',
      preview:"Digital illustrations, 3D room models built from floor plans and a scene for learning traffic rules.",
      short:'Original digital illustrations, 3D models based on architectural floor plans, and an educational road-safety scene.',
      goal:"This case brings together experiments in digital illustration and 3D. Some pieces are about building an image, while others depend on getting the source details right.",
      research:"I used technical floor plans to locate walls, windows and doorways. For the road scene, I worked from traffic rules.",
      process:"I turned the plans into spatial models and checked the proportions. I also modeled a road-safety scene and made a series of digital illustrations.",
      result:"The galleries show the technical models, road scene and illustrations.",
      conclusion:"I enjoy switching between the two modes. I can take more liberties with an illustration, but every opening in a floor-plan model has a specific place."
    },
    baker:{
      name:'The Happy Baker',category:'Interfaces',field:'Mobile game / UI',
      preview:"The interface for The Happy Baker mobile game, with illustrations for backgrounds, levels, and win and loss screens.",
      short:'Mobile game UI with original hand-drawn backgrounds, game screens, and win and lose illustrations.',
      goal:"I wanted The Happy Baker to feel like a baking game from the first screen and make it clear where to tap.",
      research:"Warm colors and bakery details set the mood. Bright buttons make the next action easy to spot against a busy background.",
      process:"I drew the backgrounds and game art, designed the interface and made separate illustrations for winning and losing.",
      result:"The gallery shows five game screens and how the mood changes from the start to the outcome.",
      conclusion:"I enjoyed balancing details you want to look at with buttons you need to spot immediately."
    },
    owl:{
      name:'Owl & Little Fox',category:'Interfaces',field:'Children’s website / Landing page',
      preview:"A kindergarten website where parents can learn about classes, read reviews and request a visit.",
      short:'A landing page for a children’s project with pastel colors, class information and an inquiry form.',
      goal:"Parents need to get a quick sense of the kindergarten and decide whether to visit. I built the page around that decision.",
      research:"The client wanted a pastel palette. I used it as the starting point and kept in mind that the page might be built on Tilda.",
      process:"I organized the class information, reviews and pricing and designed a form for requesting a tour.",
      result:"The resulting landing page lets parents get to know the kindergarten and request a visit in one place.",
      conclusion:"I wanted the page to feel like the kindergarten and still make the practical information easy for parents to find."
    },
    babushka:{
      name:'BABUSHKA Zine',category:'Editorial design',field:'Magazine / Collage',
      preview:"A zine about the grandmother’s headscarf in contemporary fashion, made with archival pictures, fashion photography and collage.",
      short:'An original collage-style zine reimagining the traditional grandmother’s headscarf as a contemporary fashion accessory.',
      goal:"I wondered what a familiar grandmother’s headscarf would look like in contemporary fashion. That question turned into a zine.",
      research:"I put archival images next to fashion photography. Collage gave me a way to bring them onto the same spread and see what they had in common.",
      process:"I designed the cover and spreads, made the collages and used type to tie together images with different moods.",
      result:"The result is an original zine you can flip through below, from cover to the last page.",
      conclusion:"My favorite part is that the scarf remains recognizable even when the whole look around it changes."
    }
  };
  window.PORTFOLIO_PROJECTS.forEach(project=>{
    const tr=translations[project.id]; if(!tr)return;
    for(const key of ['name','category','field','short','preview','goal','research','process','result','conclusion']) if(tr[key])project[key]=tr[key];
    if(tr.showcase && project.showcase) project.showcase.forEach((item,i)=>{
      if(tr.showcase[i]){item.title=tr.showcase[i][0];item.description=tr.showcase[i][1];}
    });
  });
  window.PORTFOLIO_EN_TEXT={
    'РЕДАКЦИОННЫЙ ДИЗАЙН / ПОДАРОЧНАЯ КНИГА / 2025':'EDITORIAL DESIGN / GIFT BOOK / 2025',
    'РЕДАКЦИОННЫЙ ДИЗАЙН / ЖУРНАЛ / 2026':'EDITORIAL DESIGN / MAGAZINE / 2026',
    'ТВЁРДЫЙ ПЕРЕПЛЁТ':'HARDCOVER','20 СТРАНИЦ':'20 PAGES','Назад к коллекции':'Back to collection',
    'ВИДЕОАФИШИ':'VIDEO POSTERS','4 ВИДЕО':'4 VIDEOS','Даша Писанец':'Dasha Pisanets','Пантера':'Pantera','Сакура':'Sakura',
    'ПРЕЗЕНТАЦИЯ ПРОЕКТА':'PROJECT PRESENTATION','11 СЛАЙДОВ':'11 SLIDES','ФИНАЛЬНЫЕ МАКЕТЫ':'FINAL DESIGNS','3 ВАРИАНТА':'3 VERSIONS','МОКАПЫ':'MOCKUPS','2 ИЗОБРАЖЕНИЯ':'2 IMAGES','Предыдущий слайд':'Previous slide','Следующий слайд':'Next slide','Вариант 1':'Version 1','Вариант 2':'Version 2','Вариант 3':'Version 3',
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
    '03 ВИДЕО':'03 VIDEOS',
    'САЙТ ТАНЦЕВАЛЬНОЙ ШКОЛЫ':'DANCE SCHOOL WEBSITE','ВЕБ-ПРОЕКТ':'WEB PROJECT',
    'Открыть сайт':'Visit website','Посмотреть код на GitHub':'View code on GitHub',
    'ЭКРАНЫ ИГРЫ':'GAME SCREENS','5 ЭКРАНОВ · АВТОРСКИЕ ИЛЛЮСТРАЦИИ':'5 SCREENS · ORIGINAL ILLUSTRATIONS',
    'ЭКРАНЫ ПРИЛОЖЕНИЯ':'APP SCREENS','SMART TV · 9 ЭКРАНОВ':'SMART TV · 9 SCREENS',
    'Первый экран можно прокручивать вверх и вниз внутри телевизора.':'Scroll vertically inside the TV to explore the first screen.',
    'ГАЛЕРЕЯ ЗИНА':'ZINE GALLERY','20 СТРАНИЦ · 10 РАЗВОРОТОВ':'20 PAGES · 10 SPREADS',
    'Загрузите изображение':'Image unavailable','Страница ожидает загрузки':'Page loading',
    'ПРОЕКТОВ':'PROJECTS','Почта':'Email','Нейросети':'AI tools',
    'Даша Писанец':'Dasha Pisanets','Пантера':'Pantera','Сакура':'Sakura',
    'Экран телевизора. Первый макет прокручивается вертикально.':'TV screen. The first layout can be scrolled vertically.',
    'Интерактивный журнал BABUSHKA':'Interactive BABUSHKA zine',
    'ЗОЛОТОЕ ПРАВИЛО':'ZOLOTOYE PRAVILO','Реклама / Бьюти':'Advertising / Beauty',
    'Предыдущий слайд':'Previous slide','Следующий слайд':'Next slide',
    'Предыдущее изображение':'Previous image','Следующее изображение':'Next image',
    'Предыдущий экран':'Previous screen','Следующий экран':'Next screen',
    'ИНТЕРАКТИВНАЯ КНИГА':'INTERACTIVE BOOK','ТВЁРДЫЙ ПЕРЕПЛЁТ':'HARDCOVER',
    'Листать назад':'Previous spread','Листать вперед':'Next spread',
    'Интерактивная книга':'Interactive book','Интерактивный журнал BABUSHKA':'Interactive BABUSHKA zine',
    'Предыдущий разворот':'Previous spread','Следующий разворот':'Next spread',
    'Воспроизвести видеоафишу':'Play motion poster',
    'Первый логотип Dance Soul':'Original Dance Soul logo','Новый логотип Dance Soul':'New Dance Soul logo',
    'Презентация на мероприятии':'Presentation at an event',
    'Сайт танцевальной школы':'Dance school website',
    'Главная страница сайта танцевальной школы Алисы Шарко':'Alisa Sharko dance school homepage',
    'Многостраничный сайт школы танцев с расписанием, абонементами и личным кабинетом. Разработан для танцевальной школы Алисы Шарко.':'A multi-page website with class schedules, memberships and student accounts, developed for Alisa Sharko Dance School.',
    'Для мобильной игры «Весёлый Пекарь» разработала интерфейс и самостоятельно нарисовала иллюстрации: персонажей, элементы окружения и игровую графику.':'I designed the interface and illustrated the characters, environments and game assets for The Happy Baker mobile game.',
    'Преобразование технических планов БТИ в понятные трёхмерные модели помещений: поэтажные планы, стены, перегородки и геометрия без фотореалистичных рендеров. Отдельный учебный 3D-проект посвящён правилам дорожного движения: моделирование дорожной сцены для визуального объяснения ситуаций на дороге.':'Turning architectural floor plans into understandable 3D room models, without photorealistic rendering. A separate educational project illustrates traffic rules through a modeled road scene.',
    'Разработка первоначального логотипа танцевальной студии Dance Soul. Через год — ребрендинг с адаптацией названия и логотипа на русский язык в связи с новыми требованиями к оформлению вывесок.':'I designed the original Dance Soul logo and later refreshed the identity, adapting its name and logo to Russian signage requirements.',
    'Небольшое исследование и подбор визуальных направлений для будущего мерча студии: идеи, референсы и предложения по оформлению.':'Explored visual directions, references and concepts for the studio’s future merchandise.',
    'В коллекцию вошли футболка с авторским принтом и свободные брюки с вышивкой и лампасами из гобелена. Ковровый орнамент выделяется на чёрной ткани и связывает оба предмета.':'The final pieces include a graphic T-shirt and loose trousers with embroidery and patterned tapestry stripes, blending streetwear with the studio’s identity.',
    'Адаптировала фирменный стиль «Золотого Правила» для кампании в Уфе. Разработала макет наружной рекламы и баннеры для «ПроДокторов», чтобы клинику было легко узнать, а предложение — быстро прочитать.':'Adapted the clinic’s visual identity for a large advertising campaign in Ufa, including outdoor banners and ads for ProDoktorov, with a focus on brand recognition and clear information hierarchy.',
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
      const normalized=trimmed.replace(/\u00a0/g,' ').replace(/‑/g,'-');
      if(dict[normalized])node.nodeValue=original.replace(trimmed,dict[normalized]);
    });
    root.querySelectorAll('[aria-label],[alt],[title]').forEach(el=>{
      for(const key of ['aria-label','alt','title']){
        const v=el.getAttribute(key);if(v&&dict[v])el.setAttribute(key,dict[v]);
      }
    });
  };
  document.addEventListener('DOMContentLoaded',()=>{
    const id=document.querySelector('.book-reader')?'book':document.querySelector('.zin-reader')?'babushka':null;
    const project=window.PORTFOLIO_PROJECTS.find(item=>item.id===id);
    if(project){
      document.querySelector('main h1').textContent=project.name;
      document.querySelector('.case-intro p').textContent=project.short;
      document.querySelectorAll('.case-row p').forEach((node,i)=>{node.textContent=project[['goal','research','process','result','conclusion'][i]];});
      document.title=project.name+' — Portfolio';
    }
    window.localizePortfolioPage(document);
  });
})();
