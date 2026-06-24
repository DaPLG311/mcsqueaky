/* McSqueaky — site interactions */
(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close the menu after tapping a link (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Header shadow on scroll ---
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // --- FAQ accordion ---
  document.querySelectorAll(".faq-item > button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // --- Quote form -> mailto (placeholder until a real form backend is wired) ---
  // NOTE FOR JOHN: this opens the visitor's email app pre-filled. For tracked,
  // reliable lead capture (and Google/Meta ads conversions), swap this for a
  // form backend (Formspree / Netlify Forms / your CRM) — see BUILD-PACKET.md.
  var form = document.querySelector("#quote-form");
  if (form) {
    // Friendly labels for the fields we collect, in the order they appear.
    var LABELS = {
      service: "Service", name: "Name", phone: "Phone", email: "Email",
      city: "City/Town", bedrooms: "Bedrooms", bathrooms: "Bathrooms",
      cadence: "Frequency", timing: "Timing", pets: "Pets", message: "Notes"
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic required-field guard
      var required = form.querySelectorAll("[required]");
      for (var i = 0; i < required.length; i++) {
        if (!required[i].value.trim()) {
          required[i].focus();
          required[i].reportValidity && required[i].reportValidity();
          return;
        }
      }

      var data = new FormData(form);
      var name = (data.get("name") || "Website").toString().trim();
      var service = (data.get("service") || "Cleaning").toString().trim();

      var lines = [];
      Object.keys(LABELS).forEach(function (key) {
        var val = (data.get(key) || "").toString().trim();
        if (val) lines.push(LABELS[key] + ": " + val);
      });

      var subject = "Free quote request — " + service + " (" + name + ")";
      var body = "New quote request from the McSqueaky website:\n\n" + lines.join("\n") + "\n";

      window.location.href =
        "mailto:hello@mcsqueaky.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      var note = form.querySelector(".form-note");
      if (note) {
        note.innerHTML =
          "Opening your email app… if nothing happens, email us at " +
          "<a href='mailto:hello@mcsqueaky.com'>hello@mcsqueaky.com</a> or call " +
          "<a href='tel:+13157754078'>(315) 775-4078</a>.";
      }
    });
  }

  // --- Current year in footer ---
  var yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
