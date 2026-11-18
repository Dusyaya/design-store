/* Общий просмотр изображений и перспективные карусели. */
(function(){
  const root=document.querySelector('main');
  if(!root)return;
  const english = window.PORTFOLIO_LANG === "en";
  const closeLabel = english ? "Close" : "Закрыть";
  const overlay = document.createElement("dialog");
  overlay.className = "portfolio-lightbox";
  overlay.setAttribute("aria-label", english ? "Image preview" : "Просмотр изображения");
  overlay.innerHTML = '<button class="portfolio-lightbox-close" type="button" aria-label="' + closeLabel + '">×</button><img alt="">';
  document.body.appendChild(overlay);
  const preview = overlay.querySelector("img");
  let lastFocus;
  overlay.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    preview.removeAttribute("src");
    lastFocus?.focus({preventScroll: true});
  });
  function open(image) {
    if (!image.naturalWidth || overlay.open) return;
    lastFocus = document.activeElement;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    overlay.showModal();
    document.body.classList.add("lightbox-open");
  }
  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest(".portfolio-lightbox-close")) overlay.close();
  });
  root.querySelectorAll("img").forEach(image => {
    if (image.closest(".sevstar-tv")) return;
    const printPage = image.closest(".print-book");
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    const zoom = english ? "Zoom image" : "Увеличить изображение";
    image.setAttribute("aria-label", (image.alt ? image.alt + " · " : "") + zoom);
    if (printPage) {
      image.addEventListener("dblclick", () => open(image));
    } else {
      image.classList.add("portfolio-zoomable");
      image.addEventListener("click", event => {
        event.stopImmediatePropagation();
        event.preventDefault();
        open(image);
      }, true);
    }
    image.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      open(image);
    }, true);
  });
  window.PORTFOLIO_DECK_ENHANCED=true;
  const configs=[
    ['.dance-carousel','.dance-carousel-slide','.dance-carousel-prev','.dance-carousel-next','.dance-carousel-count'],
    ['.supertyazh-deck','.supertyazh-slide','.supertyazh-prev','.supertyazh-next','.supertyazh-counter'],
    ['.extra-carousel','.extra-slides img','.extra-prev','.extra-next','.extra-count'],
    ['.baker-carousel','.baker-slides img','.baker-prev','.baker-next','.baker-count'],
    ['.showcase-media.is-carousel','.showcase-slide',null,null,null]
  ];
  configs.forEach(([selector,slideSelector,prevSelector,nextSelector,countSelector])=>{
    root.querySelectorAll(selector).forEach(carousel=>{
      const slides=[...carousel.querySelectorAll(slideSelector)];
      if(slides.length<2)return;
      const isShowcase=carousel.matches('.showcase-media.is-carousel');
      carousel.classList.add('portfolio-perspective');
      if(isShowcase)carousel.classList.add('portfolio-showcase-deck');
      let active=0;
      let controls=carousel.querySelector('.portfolio-perspective-controls');
      if(!controls&&!prevSelector){
        controls=document.createElement('div');controls.className='portfolio-perspective-controls';
        controls.innerHTML='<button type="button" class="portfolio-perspective-prev" aria-label="Предыдущее изображение">' + arrowSvg('left') + '</button><span class="portfolio-perspective-count"></span><button type="button" class="portfolio-perspective-next" aria-label="Следующее изображение">' + arrowSvg('right') + '</button>';
        carousel.appendChild(controls);
      }
      const prev=prevSelector?carousel.querySelector(prevSelector):controls.querySelector('.portfolio-perspective-prev');
      const next=nextSelector?carousel.querySelector(nextSelector):controls.querySelector('.portfolio-perspective-next');
      const counter=countSelector?carousel.querySelector(countSelector):controls.querySelector('.portfolio-perspective-count');
      function show(n){
        active=(n+slides.length)%slides.length;
        slides.forEach((slide,i)=>{
          const distance=(i-active+slides.length)%slides.length;
          const offset=distance>slides.length/2?distance-slides.length:distance;
          slide.hidden=false;
          slide.classList.toggle('portfolio-active',offset===0);
          slide.classList.toggle('portfolio-offstage', Math.abs(offset) > 1);
          slide.style.setProperty('--perspective-offset',offset);
          slide.style.zIndex=String(20-Math.abs(offset));
          const offstage = Math.abs(offset) > 1;
          slide.inert = offstage;
          slide.setAttribute('aria-hidden', String(offstage));
        });
        if(counter)counter.textContent=String(active+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
      }
      prev.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault();show(active-1);},true);
      next.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault();show(active+1);},true);
      carousel.addEventListener('keydown',e=>{if(e.target.tagName==='BUTTON'||e.target.tagName==='IMG')return;if(e.key==='ArrowRight')show(active+1);if(e.key==='ArrowLeft')show(active-1);});
      show(0);
    });
  });
  function bindSwipe(surface, previous, next){
    if(!surface||!previous||!next)return;
    surface.classList.add('portfolio-swipe');
    let start=null,suppressClickUntil=0;
    surface.addEventListener('touchstart',event=>{
      start=event.touches.length===1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
    },{passive:true});
    surface.addEventListener('touchend',event=>{
      if(!start||event.touches.length)return;
      const touch=event.changedTouches[0];
      const dx=touch.clientX-start.x,dy=touch.clientY-start.y;
      start=null;
      if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.4)return;
      suppressClickUntil=Date.now()+500;
      (dx<0?next:previous).click();
    },{passive:true});
    surface.addEventListener('touchcancel',()=>{start=null;},{passive:true});
    surface.addEventListener('click',event=>{
      if(event.isTrusted&&Date.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}
    },true);
  }
  const swipeConfigs=[
    ['.portfolio-perspective','.dance-carousel-prev,.supertyazh-prev,.extra-prev,.baker-prev,.portfolio-perspective-prev','.dance-carousel-next,.supertyazh-next,.extra-next,.baker-next,.portfolio-perspective-next'],
    ['.zp-presentation-right','.zp-prev','.zp-next'],
    ['.sevstar-case','.sevstar-prev','.sevstar-next'],
    ['.print-reader','.print-prev','.print-next']
  ];
  swipeConfigs.forEach(([selector,prev,next])=>root.querySelectorAll(selector).forEach(carousel=>{
    bindSwipe(carousel,carousel.querySelector(prev),carousel.querySelector(next));
  }));
})();