// Outreach Pipelines — minimal progressive enhancement (no tracking, no cookies).
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close ✕" : "Menu ☰";
    });
    // Close menu when a link is activated (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu ☰";
      }
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Highlight current nav item when aria-current was not set (fallback)
  try {
    var path = window.location.pathname.replace(/\/+$/, "") || "/";
    // Normalize /about/index.html style URLs
    if (path.endsWith("/index")) path = path.slice(0, -6) || "/";
    document.querySelectorAll("[data-nav] a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").replace(/\/+$/, "") || "/";
      if (href === path && !a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
    });
  } catch (e) { /* no-op */ }

  // Contact form -> composes a mailto: link (no backend, no data sent anywhere by this site).
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#cf-name").value.trim();
      var email = form.querySelector("#cf-email").value.trim();
      var topic = form.querySelector("#cf-topic").value;
      var message = form.querySelector("#cf-message").value.trim();

      function show(msg, kind) {
        status.textContent = msg;
        status.className = "form-status show " + kind;
        status.setAttribute("role", kind === "error" ? "alert" : "status");
      }

      if (!name || !email || !message) {
        show("Please complete your name, email address, and message before continuing.", "error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show("That email address does not look valid. Please check it and try again.", "error");
        return;
      }
      var subject = "[Outreach Pipelines — " + topic + "] Message from " + name;
      var body = message + "\n\n—\nFrom: " + name + " <" + email + ">\nTopic: " + topic;
      var href = "mailto:rajath@piplines.online?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      show("Opening your email app with your message addressed to rajath@piplines.online. Press Send there to deliver it — this site does not send or store your message.", "success");
      window.location.href = href;
    });
  }
})();
