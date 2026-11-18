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
document.querySelector(".case-summary").insertAdjacentHTML("beforeend", caseTags(printProject));
document.querySelector(".case-cover-slot").outerHTML = caseCover(printProject);
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
  const path = "assets/projects/" + printProject.id + "/" + encodeURIComponent(pages[index]);
  return '<div class="print-page ' + side + '"><picture><source media="(min-width: 1000px)"><img alt="' +
    label + '" data-src="' + imagePath(path) + '" data-original="' + SITE_ROOT + path + '" decoding="async"></picture></div>';
}

book.innerHTML = pairs.map(pair => '<div class="print-spread">' +
  pageMarkup(pair[0], "left") + pageMarkup(pair[1], "right") + '</div>').join("") +
  '<div class="print-sheet" aria-hidden="true"><div class="print-front"></div><div class="print-back"></div></div>';

const spreads = [...book.querySelectorAll(".print-spread")];
const sheet = book.querySelector(".print-sheet");
let current = 0;
let busy = false;

const prepared = new Map();

function prepareSpread(index) {
  if (index < 0 || index >= spreads.length || prepared.has(index)) return;
  const images = [...spreads[index].querySelectorAll("img")];
  prepared.set(index, Promise.allSettled(images.map(image => {
    image.previousElementSibling.srcset = image.dataset.original;
    image.src = image.dataset.src;
    return image.decode();
  })));
}

function prefetchAdjacent() {
  prepareSpread(current - 1);
  prepareSpread(current + 1);
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
  prepareSpread(target);
  await prepared.get(target);

  if (!motion.matches && typeof sheet.animate === "function") {
    const front = outgoing.querySelector(fromLeft ? ".left img" : ".right img");
    const back = incoming.querySelector(fromLeft ? ".right img" : ".left img");
    sheet.querySelector(".print-front").style.backgroundImage = front ? 'url("' + front.currentSrc + '")' : "none";
    sheet.querySelector(".print-back").style.backgroundImage = back ? 'url("' + back.currentSrc + '")' : "none";

    incoming.classList.add("is-visible", fromLeft ? "hide-right" : "hide-left");
    outgoing.classList.add("is-outgoing", fromLeft ? "hide-left" : "hide-right");
    sheet.classList.toggle("from-left", fromLeft);
    sheet.classList.add("is-turning");
    const turnAnimation = sheet.animate(
      [{transform: "rotateY(0deg)"}, {transform: "rotateY(" + (fromLeft ? 180 : -180) + "deg)"}],
      {duration: 460, easing: "cubic-bezier(.26,.25,.55,1)", fill: "forwards"}
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
  prefetchAdjacent();
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
  else pageClick = setTimeout(() => turn(direction), 180);
});
book.addEventListener("dblclick", () => clearTimeout(pageClick));


showSpread();
const readerObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  prepareSpread(0);
  prefetchAdjacent();
  readerObserver.disconnect();
}, {rootMargin: "900px 0px"});
readerObserver.observe(reader);
