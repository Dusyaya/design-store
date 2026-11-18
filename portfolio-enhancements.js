/* Общий просмотр изображений и навигация по каруселям. */
(function () {
  const root = document.querySelector("main");
  const english = window.PORTFOLIO_LANG === "en";
  const labels = english
    ? {previous: "Previous image", next: "Next image", close: "Close", preview: "Image preview", zoom: "Zoom image", select: "Select slide"}
    : {previous: "Предыдущее изображение", next: "Следующее изображение", close: "Закрыть", preview: "Просмотр изображения", zoom: "Увеличить изображение", select: "Выбрать слайд"};
  const originalStatus = english
    ? {loading: "Loading full-size image…", fallback: "Full-size image unavailable. Showing preview."}
    : {loading: "Загружается оригинал…", fallback: "Оригинал недоступен. Открыто превью."};
  const formatCount = (index, length) => [index + 1, length].map(value => String(value).padStart(2, "0")).join(" / ");
  const wrapIndex = (index, length) => (index + length) % length;
  const navButton = (direction, label, className = "") =>
    '<button type="button" class="' + className + '" aria-label="' + label + '">' + arrowSvg(direction) + '</button>';

  const overlay = document.createElement("dialog");
  overlay.className = "portfolio-lightbox";
  overlay.setAttribute("aria-label", labels.preview);
  overlay.innerHTML = '<button class="portfolio-lightbox-close" type="button" aria-label="' + labels.close + '">×</button>' +
    '<div class="lightbox-image-area"><img alt=""></div>' +
    '<span class="lightbox-progress" role="status" hidden></span>' +
    '<div class="lightbox-controls" hidden>' + navButton("left", labels.previous, "lightbox-prev") +
    '<span role="status"></span>' + navButton("right", labels.next, "lightbox-next") + '</div>';
  document.body.appendChild(overlay);
  const imageArea = overlay.querySelector(".lightbox-image-area");
  const progress = overlay.querySelector(".lightbox-progress");
  let preview = imageArea.querySelector("img");
  const controls = overlay.querySelector(".lightbox-controls");
  const previousPreview = controls.querySelector(".lightbox-prev");
  const nextPreview = controls.querySelector(".lightbox-next");
  let viewing;
  let pendingOriginal;

  function originalImageUrl(thumbnail) {
    return thumbnail
      .replace(/(\.jpe?g|\.png)\.webp$/i, "$1")
      .replace(/(\/project-covers\/cover-\d+)(?:-hero)?\.webp$/i, "$1.png");
  }

  function setPreviewLayout(image) {
    const tall = image.naturalHeight > image.naturalWidth * 2.5;
    imageArea.classList.toggle("is-tall", tall);
    imageArea.tabIndex = tall ? 0 : -1;
    imageArea.scrollTop = 0;
  }

  function setProgress(message, loading = false) {
    progress.textContent = message;
    progress.hidden = !message;
    progress.classList.toggle("is-loading", loading);
  }

  function cancelOriginal() {
    pendingOriginal?.removeAttribute("src");
    pendingOriginal = undefined;
    preview.removeAttribute("aria-busy");
    setProgress("");
  }

  function updatePreview() {
    cancelOriginal();
    const image = viewing.images[viewing.index];
    const thumbnail = image.currentSrc || image.getAttribute("src") || image.dataset.src;
    imageArea.classList.toggle("is-dance-logo", Boolean(image.closest(".dance-logos")));
    preview.src = thumbnail;
    preview.alt = image.alt;
    setPreviewLayout(image);
    controls.hidden = viewing.images.length < 2;
    controls.querySelector("[role=status]").textContent = formatCount(viewing.index, viewing.images.length);

    const originalUrl = image.dataset.original || originalImageUrl(thumbnail);
    if (originalUrl === thumbnail) return;
    const original = new Image();
    pendingOriginal = original;
    preview.setAttribute("aria-busy", "true");
    setProgress(originalStatus.loading, true);
    original.alt = image.alt;
    original.fetchPriority = "high";
    original.src = originalUrl;
    original.decode().then(() => {
      if (pendingOriginal !== original) return;
      pendingOriginal = undefined;
      preview.replaceWith(original);
      preview = original;
      setPreviewLayout(original);
      setProgress("");
    }).catch(() => {
      if (pendingOriginal !== original) return;
      cancelOriginal();
      setProgress(originalStatus.fallback);
    });
  }

  function openPreview(images, index, select) {
    const image = images[index];
    if (!(image.src || image.dataset.src) || overlay.open) return;
    viewing = {images, index, select, returnTo: document.activeElement};
    updatePreview();
    overlay.showModal();
    document.body.classList.add("lightbox-open");
  }

  function stepPreview(offset) {
    if (!viewing || viewing.images.length < 2) return;
    viewing.index = wrapIndex(viewing.index + offset, viewing.images.length);
    viewing.select?.(viewing.index);
    updatePreview();
  }

  previousPreview.addEventListener("click", () => stepPreview(-1));
  nextPreview.addEventListener("click", () => stepPreview(1));
  overlay.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    stepPreview(event.key === "ArrowLeft" ? -1 : 1);
  });
  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target === imageArea || event.target.closest(".portfolio-lightbox-close")) overlay.close();
  });
  overlay.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    cancelOriginal();
    preview.removeAttribute("src");
    const focusTarget = viewing.select ? viewing.images[viewing.index] : viewing.returnTo;
    focusTarget?.focus({preventScroll: true});
    viewing = undefined;
  });

  function bindSwipe(surface, step) {
    surface.classList.add("portfolio-swipe");
    let start, suppressUntil = 0;
    surface.addEventListener("touchstart", event => {
      start = event.touches.length === 1 ? event.touches[0] : null;
    }, {passive: true});
    surface.addEventListener("touchend", event => {
      if (!start || event.touches.length) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.clientX;
      const dy = touch.clientY - start.clientY;
      start = null;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      suppressUntil = Date.now() + 500;
      step(dx < 0 ? 1 : -1);
    }, {passive: true});
    surface.addEventListener("touchcancel", () => { start = null; }, {passive: true});
    surface.addEventListener("click", event => {
      if (event.isTrusted && Date.now() < suppressUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }
  bindSwipe(overlay, stepPreview);

  function labelImage(image, action, available = true) {
    image.tabIndex = available ? 0 : -1;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", [image.alt, action].filter(Boolean).join(" · "));
  }

  function bindImage(image, activate, clickEvent = "click") {
    image.classList.add("portfolio-zoomable");
    image.addEventListener(clickEvent, activate);
    image.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      activate();
    });
  }

  const carouselImages = new Set();
  const configs = [
    [".dance-carousel", ".dance-carousel-slide", "dance-carousel", ".dance-carousel-count"],
    [".supertyazh-deck", ".supertyazh-slide", "supertyazh", ".supertyazh-counter"],
    [".extra-carousel", ".extra-slides img", "extra", ".extra-count"],
    [".baker-carousel", ".baker-slides img", "baker", ".baker-count"],
    [".showcase-media.is-carousel", ".showcase-slide"],
    [".zp-presentation-right", ".zp-presentation-slides img", "zp", ".zp-count"],
    [".sevstar-case", ".sevstar-slide", "sevstar", ".sevstar-counter"],
  ];
  configs.forEach(([selector, slideSelector, buttonPrefix, counterSelector]) => {
    root.querySelectorAll(selector).forEach(carousel => {
      let prefix = buttonPrefix;
      let countSelector = counterSelector;
      const slides = [...carousel.querySelectorAll(slideSelector)];
      if (slides.length < 2) return;
      const images = slides.map(slide => slide.matches("img") ? slide : slide.querySelector("img"));
      images.forEach(image => {
        carouselImages.add(image);
        image.dataset.src = image.getAttribute("src");
        image.removeAttribute("src");
      });

      const screen = carousel.querySelector(".sevstar-screen");
      const presentation = carousel.matches(".zp-presentation-right");
      if (!screen && !presentation) carousel.classList.add("portfolio-perspective");
      if (!prefix) {
        const nav = document.createElement("div");
        nav.className = "portfolio-perspective-controls";
        nav.innerHTML = navButton("left", labels.previous, "portfolio-perspective-prev") +
          '<span class="portfolio-perspective-count"></span>' + navButton("right", labels.next, "portfolio-perspective-next");
        carousel.classList.add("portfolio-showcase-deck");
        carousel.appendChild(nav);
        prefix = "portfolio-perspective";
        countSelector = ".portfolio-perspective-count";
      }
      const previous = carousel.querySelector("." + prefix + "-prev");
      const next = carousel.querySelector("." + prefix + "-next");
      const counter = carousel.querySelector(countSelector);
      counter.setAttribute("role", "status");
      const track = slides[0].parentElement;
      const controls = previous.parentElement;
      if (!screen) controls.classList.add("image-carousel-controls");
      let active = 0;

      function alignSlides() {
        const front = images[active];
        const frontWidth = front.offsetWidth;
        const trackWidth = track.clientWidth;
        if (!frontWidth || !trackWidth || !front.offsetHeight) return;
        const spaceBelowImage = (track.clientHeight - front.offsetHeight) / 2;
        controls.style.setProperty("--carousel-control-gap", (10 - spaceBelowImage) + "px");
        slides.forEach((slide, index) => {
          if (slide.classList.contains("portfolio-offstage")) return;
          const offset = Number(slide.style.getPropertyValue("--perspective-offset"));
          const sideWidth = images[index].offsetWidth * .82;
          const overlap = Math.min(48, Math.min(frontWidth, sideWidth) * .18);
          const shift = Math.max(0, Math.min(
            (frontWidth + sideWidth) / 2 - overlap,
            (trackWidth - sideWidth) / 2 - 5
          ));
          slide.style.setProperty("--slide-shift", offset * shift + "px");
        });
      }

      if (!screen) {
        const observer = new ResizeObserver(alignSlides);
        observer.observe(track);
        images.forEach(image => observer.observe(image));
      }

      function show(index) {
        active = wrapIndex(index, slides.length);
        slides.forEach((slide, position) => {
          const distance = wrapIndex(position - active, slides.length);
          const offset = distance > slides.length / 2 ? distance - slides.length : distance;
          const offstage = Math.abs(offset) > 1 || Boolean(screen && offset !== 0);
          const selected = offset === 0;
          slide.hidden = (presentation || Boolean(screen)) && offstage;
          slide.classList.toggle("portfolio-active", selected);
          slide.classList.toggle("portfolio-offstage", offstage);
          slide.style.setProperty("--perspective-offset", offset);
          slide.style.zIndex = String(20 - Math.abs(offset));
          slide.inert = offstage;
          slide.setAttribute("aria-hidden", String(offstage));
          const image = images[position];
          if (!offstage && !image.hasAttribute("src")) image.src = image.dataset.src;
          if (!screen) labelImage(image, selected ? labels.zoom : labels.select, !offstage);
        });
        counter.textContent = formatCount(active, slides.length);
        if (screen) {
          screen.scrollTop = 0;
          screen.classList.toggle("is-scrollable", active === 0);
        } else {
          alignSlides();
        }
      }

      const step = offset => show(active + offset);
      previous.addEventListener("click", () => step(-1));
      next.addEventListener("click", () => step(1));
      carousel.addEventListener("keydown", event => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        step(event.key === "ArrowLeft" ? -1 : 1);
        if (images.includes(event.target)) images[active].focus({preventScroll: true});
      });
      bindSwipe(carousel, step);
      if (screen) {
        screen.setAttribute("role", "button");
        screen.setAttribute("aria-label", english ? "Show next TV screen" : "Показать следующий экран телевизора");
        screen.setAttribute("aria-describedby", "sevstar-hint");
        screen.closest(".sevstar-tv").addEventListener("click", () => step(1));
        screen.addEventListener("keydown", event => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          step(1);
        });
      } else {
        images.forEach((image, index) => bindImage(image, () => {
          if (index !== active) show(index);
          else openPreview(images, index, show);
        }));
      }
      show(0);
    });
  });

  const reader = root.querySelector(".print-reader");
  if (reader) {
    const pages = [...reader.querySelectorAll(".print-page img")];
    pages.forEach((image, index) => {
      labelImage(image, labels.zoom);
      bindImage(image, () => openPreview(pages, index), "dblclick");
    });
    bindSwipe(reader, offset => reader.querySelector(offset < 0 ? ".print-prev" : ".print-next").click());
  }

  root.querySelectorAll("img").forEach(image => {
    if (carouselImages.has(image) || image.closest(".print-book")) return;
    labelImage(image, labels.zoom);
    bindImage(image, () => openPreview([image], 0));
  });
  root.querySelectorAll(".floating-window").forEach(item => {
    const hero = item.closest(".case-hero");
    enableFloatingWindow(item, hero || item.closest(".case"), hero
      ? {returnToOrigin: false, edgeGap: 0, overflowRatio: .2}
      : undefined);
  });
})();
