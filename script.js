(function () {
  "use strict";

  // ---------- Theme ----------
  var THEMES = ["night", "album", "tape"];
  var root = document.documentElement;
  var themeButtons = document.querySelectorAll("[data-set-theme]");

  function applyTheme(name) {
    if (THEMES.indexOf(name) === -1) name = "night";
    root.setAttribute("data-theme", name);
    themeButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-theme") === name ? "true" : "false");
    });
  }

  var saved = null;
  try { saved = localStorage.getItem("portfolio-theme"); } catch (e) {}
  applyTheme(saved || "night");

  themeButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      var name = b.getAttribute("data-set-theme");
      applyTheme(name);
      try { localStorage.setItem("portfolio-theme", name); } catch (e) {}
    });
  });

  // ---------- Video URL -> safe embed URL (YouTube / Vimeo only) ----------
  function embedUrl(raw) {
    if (!raw) return null;
    var u;
    try { u = new URL(raw); } catch (e) { return null; }
    var host = u.hostname.replace(/^www\./, "");
    var id = null;

    if (host === "youtu.be") {
      id = u.pathname.slice(1).split("/")[0];
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.indexOf("/embed/") === 0 || u.pathname.indexOf("/shorts/") === 0) id = u.pathname.split("/")[2];
    }
    if (id && /^[\w-]{6,20}$/.test(id)) {
      return "https://www.youtube-nocookie.com/embed/" + id + "?rel=0&autoplay=1";
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      var m = u.pathname.match(/(\d{5,})/);
      if (m) return "https://player.vimeo.com/video/" + m[1] + "?autoplay=1";
    }
    return null;
  }

  // ---------- Cards ----------
  var grid = document.getElementById("grid");
  var player = document.getElementById("player");
  var frame = document.getElementById("playerFrame");
  var pTitle = document.getElementById("playerTitle");
  var pMeta = document.getElementById("playerMeta");
  var lastFocus = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function openPlayer(project, src, trigger) {
    lastFocus = trigger;
    pTitle.textContent = project.title;
    pMeta.textContent = project.credit || project.meta || "";
    frame.src = src;
    if (typeof player.showModal === "function") player.showModal();
    else player.setAttribute("open", "");
  }

  function closePlayer() {
    frame.src = "about:blank";
    if (player.open) player.close();
    if (lastFocus) lastFocus.focus();
  }

  document.getElementById("closePlayer").addEventListener("click", closePlayer);
  player.addEventListener("cancel", function (e) { e.preventDefault(); closePlayer(); });
  player.addEventListener("click", function (e) { if (e.target === player) closePlayer(); });

  (typeof PROJECTS !== "undefined" ? PROJECTS : []).forEach(function (p, i) {
    var src = embedUrl(p.video);
    var card = el("article", "card");
    card.style.setProperty("--i", i);

    var thumb = el("div", "thumb tone-" + (p.tone || 1));
    if (p.thumb) {
      var img = document.createElement("img");
      img.src = p.thumb;
      img.alt = "";
      img.loading = "lazy";
      thumb.appendChild(img);
    }
    thumb.appendChild(el("span", "no", "no. " + String(i + 1).padStart(2, "0")));
    if (src) thumb.appendChild(el("span", "play", "play"));
    else thumb.appendChild(el("span", "soon", "video soon"));

    var caption = el("div", "caption");
    caption.appendChild(el("h3", "c-title", p.title));
    caption.appendChild(el("p", "c-meta", p.meta));

    if (src) {
      var btn = el("button", "card-btn");
      btn.type = "button";
      btn.setAttribute("aria-label", "Play " + p.title);
      btn.appendChild(thumb);
      btn.appendChild(caption);
      btn.addEventListener("click", function () { openPlayer(p, src, btn); });
      card.appendChild(btn);
    } else {
      card.appendChild(thumb);
      card.appendChild(caption);
    }
    grid.appendChild(card);
  });
})();
