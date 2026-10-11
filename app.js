(function () {
  // Put the public download link here when it exists (GitHub Release, Google Drive...).
  var DOWNLOAD_URL = "";

  if (/^https:\/\//.test(DOWNLOAD_URL) && document.getElementById("dl-pending")) {
    document.getElementById("dl-pending").hidden = true;
    document.getElementById("dl-ready").hidden = false;
    document.getElementById("dl-bottom").href = DOWNLOAD_URL;
  }

  // language
  var body = document.body;
  function setLang(l) {
    body.setAttribute("data-l", l);
    document.documentElement.lang = l;
    document.getElementById("lang-kk").setAttribute("aria-pressed", l === "kk");
    document.getElementById("lang-ru").setAttribute("aria-pressed", l === "ru");
    document.getElementById("lang-en").setAttribute("aria-pressed", l === "en");
    try { localStorage.setItem("ocrkk-lang", l); } catch (e) {}
  }
  var LANGS = ["kk", "ru", "en"];
  var start = "kk";
  try { start = localStorage.getItem("ocrkk-lang") || "kk"; } catch (e) {}
  if (LANGS.indexOf(start) < 0) start = "kk";
  if (location.hash === "#ru") start = "ru";
  if (location.hash === "#en") start = "en";
  if (location.hash === "#kk") start = "kk";
  setLang(start);
  document.querySelectorAll("[data-set]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.set); });
  });

  // demo popup
  var words = {
    grab:    { en: "grab",      ipa: "/ɡɹæb/",       tag: "verb",   kk: "алу; ұстап алу" },
    your:    { en: "your",      ipa: "/jɔː/",        tag: "det",    kk: "сенің; сіздің" },
    sword:   { en: "sword",     ipa: "/sɔːd/",       tag: "noun",   kk: "қылыш; семсер" },
    we:      { en: "we",        ipa: "/wiː/",        tag: "pron",   kk: "біз" },
    rideout: { en: "ride out",  ipa: "/ɹaɪd aʊt/",   tag: "phrase", kk: "атқа мініп аттану" },
    dawn:    { en: "at dawn",   ipa: "/æt dɔːn/",    tag: "phrase", kk: "таң атқанда" }
  };
  var screen = document.getElementById("screen");
  if (!screen) return; // pages without the demo (privacy.html)
  var pop = document.getElementById("pop");
  var btns = screen.querySelectorAll(".w");
  function show(btn) {
    var d = words[btn.dataset.w];
    btns.forEach(function (b) { b.classList.toggle("on", b === btn); });
    document.getElementById("p-en").textContent = d.en;
    document.getElementById("p-ipa").textContent = d.ipa;
    document.getElementById("p-tag").textContent = d.tag;
    document.getElementById("p-kk").textContent = d.kk;
    var s = screen.getBoundingClientRect(), r = btn.getBoundingClientRect();
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = r.left - s.left + r.width / 2 - pw / 2;
    left = Math.max(10, Math.min(left, s.width - pw - 10));
    var top = Math.max(44, r.top - s.top - ph - 12);
    pop.style.left = left + "px";
    pop.style.top = top + "px";
  }
  btns.forEach(function (b) {
    b.addEventListener("mouseenter", function () { show(b); });
    b.addEventListener("focus", function () { show(b); });
    b.addEventListener("click", function () { show(b); });
  });
  var current = function () { return screen.querySelector(".w.on") || btns[2]; };
  show(current());
  window.addEventListener("resize", function () { show(current()); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { show(current()); });
})();
