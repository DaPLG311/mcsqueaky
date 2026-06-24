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
  // Lead capture via Web3Forms (free, no server). Until a real access key is
  // pasted into the hidden #access_key field in quote.html, this gracefully
  // falls back to opening the visitor's email app so the form is never dead.
  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
  var KEY_PLACEHOLDER = "WEB3FORMS_ACCESS_KEY_HERE";

  var form = document.querySelector("#quote-form");
  if (form) {
    var LABELS = {
      service: "Service", name: "Name", phone: "Phone", email: "Email",
      city: "City/Town", bedrooms: "Bedrooms", bathrooms: "Bathrooms",
      cadence: "Frequency", timing: "Timing", pets: "Pets", message: "Notes"
    };

    var getKey = function () {
      var f = form.querySelector('[name="access_key"]');
      return f ? (f.value || "").trim() : "";
    };
    var fieldVal = function (data, k) { return (data.get(k) || "").toString().trim(); };

    // Fires a lead conversion if a tag manager / gtag is present. Safe no-op otherwise.
    // When you set up Google Ads, this is the event to mark as a conversion.
    var trackLead = function (service) {
      try {
        if (window.gtag) window.gtag("event", "generate_lead", { event_category: "quote", event_label: service });
        if (window.dataLayer) window.dataLayer.push({ event: "generate_lead", service: service });
        if (window.fbq) window.fbq("track", "Lead");
      } catch (err) { /* tracking is best-effort */ }
    };

    var showSuccess = function (service) {
      var success = document.querySelector("#quote-success");
      if (success) { form.hidden = true; success.hidden = false; success.scrollIntoView({ behavior: "smooth", block: "center" }); }
      trackLead(service);
    };

    var mailtoFallback = function (data, subject) {
      var lines = [];
      Object.keys(LABELS).forEach(function (k) { var v = fieldVal(data, k); if (v) lines.push(LABELS[k] + ": " + v); });
      var body = "New quote request from the McSqueaky website:\n\n" + lines.join("\n") + "\n";
      window.location.href = "mailto:bosslady@mcsqueaky.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var note = form.querySelector(".form-note");
      if (note) note.innerHTML = "Opening your email app… if nothing happens, email <a href='mailto:bosslady@mcsqueaky.com'>bosslady@mcsqueaky.com</a> or call <a href='tel:+13157754078'>(315) 775-4078</a>.";
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot — silently drop bot submissions.
      var bot = form.querySelector('[name="botcheck"]');
      if (bot && bot.checked) return;

      // Required-field guard
      var required = form.querySelectorAll("[required]");
      for (var i = 0; i < required.length; i++) {
        if (!required[i].value.trim()) {
          required[i].focus();
          required[i].reportValidity && required[i].reportValidity();
          return;
        }
      }

      var data = new FormData(form);
      var name = fieldVal(data, "name") || "Website";
      var service = fieldVal(data, "service") || "Cleaning";
      var subject = "Free quote request — " + service + " (" + name + ")";
      data.set("subject", subject);

      var key = getKey();
      // No real key yet → keep the form usable via email.
      if (!key || key === KEY_PLACEHOLDER) { mailtoFallback(data, subject); return; }

      var btn = form.querySelector('button[type="submit"]');
      var btnText = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.success) {
            // Best-effort owner SMS via our Vercel function (no-op until env vars are set).
            try {
              var lead = {};
              ["name", "phone", "email", "city", "service", "cadence", "timing", "pets", "message"]
                .forEach(function (k) { lead[k] = fieldVal(data, k); });
              fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lead)
              }).catch(function () { /* SMS is best-effort; email already captured the lead */ });
            } catch (e) { /* ignore */ }
            showSuccess(service);
          } else {
            throw new Error((json && json.message) || "Submission failed");
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = btnText; }
          var note = form.querySelector(".form-note");
          if (note) note.innerHTML = "Hmm, that didn't go through. Please email <a href='mailto:bosslady@mcsqueaky.com'>bosslady@mcsqueaky.com</a> or call <a href='tel:+13157754078'>(315) 775-4078</a> and we'll take care of you.";
        });
    });
  }

  // --- Current year in footer ---
  var yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
