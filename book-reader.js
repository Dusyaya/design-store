// Книга и зин используют одну механику, независимо от формата и количества страниц.
const reader = document.querySelector(".print-reader");
const printProject = PROJECTS.find(project => project.id === reader.dataset.project);
const english = window.PORTFOLIO_LANG === "en";
const pages = printProject.id === "book"
  ? ["обложка1.jpg", "01Forzac1.jpg",
    ...Array.from({length: 40}, (_, i) => String(i + 2).padStart(3, "0") + ".jpg"),
    "Forzac_posledniy.jpg", "обложка_последняя.jpg"]
  : Array.from({length: 20}, (_, i) => "Babushka" + (i + 1) + ".jpg");

renderLayout();
document.querySelector(".case-stage").innerHTML = productArtwork(printProject);
document.querySelector(".print-navigation").outerHTML = projectNavigation(printProject);

const book = reader.querySelector(".print-book");
const counter = reader.querySelector(".print-count");
const previousSpread = reader.querySelector(".print-prev");
const nextSpread = reader.querySelector(".print-next");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const pairs = [[null, 0]];
for (let index = 1; index < pages.length; index += 2) {
  pairs.push([index, index + 1 < pages.length ? index + 1 : null]);
}

function pageMarkup(index, side) {
  if (index === null) return '<div class="print-page ' + side + ' is-empty"></div>';
  const label = (english ? "Page " : "Страница ") + (index + 1);
  return '<div class="print-page ' + side + '"><img alt="' + label + '" decoding="async"></div>';
}

book.innerHTML = pairs.map(pair => '<div class="print-spread">' +
  pageMarkup(pair[0], "left") + pageMarkup(pair[1], "right") + '</div>').join("") +
  '<div class="print-sheet" aria-hidden="true"><div class="print-front"></div><div class="print-back"></div></div>';

const spreads = [...book.querySelectorAll(".print-spread")];
const sheet = book.querySelector(".print-sheet");
let current = 0;
let busy = false;

function pageUrl(index) {
  return imagePath("assets/projects/" + printProject.id + "/" + encodeURIComponent(pages[index]));
}

function loadSpread(index) {
  const images = spreads[index].querySelectorAll("img");
  pairs[index].filter(page => page !== null).forEach((page, imageIndex) => {
    const image = images[imageIndex];
    if (!image.hasAttribute("src")) {
      image.loading = index === 0 ? "lazy" : "eager";
      image.src = pageUrl(page);
    }
  });
  return [...images];
}

function showSpread() {
  spreads.forEach((spread, index) => {
    spread.classList.toggle("is-visible", index === current);
    spread.setAttribute("aria-hidden", String(index !== current));
  });
  counter.textContent = String(current + 1).padStart(2, "0") + " / " + String(spreads.length).padStart(2, "0");
  previousSpread.disabled = current === 0;
  nextSpread.disabled = current === spreads.length - 1;
}

async function turn(direction) {
  const target = current + direction;
  if (busy || target < 0 || target >= spreads.length) return;

  busy = true;
  reader.setAttribute("aria-busy", "true");
  const outgoing = spreads[current];
  const incoming = spreads[target];
  const fromLeft = direction < 0;
  const targetImages = loadSpread(target);
  await Promise.allSettled(targetImages.map(image => {
    image.loading = "eager";
    return image.decode();
  }));

  if (!motion.matches && typeof sheet.animate === "function") {
    const front = fromLeft ? pairs[current][0] : pairs[current][1];
    const back = fromLeft ? pairs[target][1] : pairs[target][0];
    sheet.querySelector(".print-front").style.backgroundImage = 'url("' + pageUrl(front) + '")';
    sheet.querySelector(".print-back").style.backgroundImage = 'url("' + pageUrl(back) + '")';

    incoming.classList.add("is-visible", fromLeft ? "hide-right" : "hide-left");
    outgoing.classList.add("is-outgoing", fromLeft ? "hide-left" : "hide-right");
    sheet.classList.toggle("from-left", fromLeft);
    sheet.classList.add("is-turning");
    const turnAnimation = sheet.animate(
      [{transform: "rotateY(0deg)"}, {transform: "rotateY(" + (fromLeft ? 180 : -180) + "deg)"}],
      {duration: 800, easing: "cubic-bezier(.42,.02,.55,.98)", fill: "forwards"}
    );
    await turnAnimation.finished.catch(() => {});
    sheet.classList.remove("is-turning");
    turnAnimation.cancel();
    outgoing.classList.remove("is-outgoing", "hide-left", "hide-right");
    incoming.classList.remove("hide-left", "hide-right");
  }
  const activeControl = document.activeElement;
  current = target;
  showSpread();
  if (activeControl === previousSpread && previousSpread.disabled) nextSpread.focus({preventScroll: true});
  if (activeControl === nextSpread && nextSpread.disabled) previousSpread.focus({preventScroll: true});
  reader.removeAttribute("aria-busy");
  busy = false;
}

previousSpread.addEventListener("click", () => turn(-1));
nextSpread.addEventListener("click", () => turn(1));
let pageClick;
book.addEventListener("click", event => {
  clearTimeout(pageClick);
  if (event.detail > 1) return;
  const bounds = book.getBoundingClientRect();
  const direction = event.clientX - bounds.left > bounds.width / 2 ? 1 : -1;
  if (event.pointerType === "touch") turn(direction);
  else pageClick = setTimeout(() => turn(direction), 280);
});
book.addEventListener("dblclick", () => clearTimeout(pageClick));


loadSpread(0);
showSpread();
