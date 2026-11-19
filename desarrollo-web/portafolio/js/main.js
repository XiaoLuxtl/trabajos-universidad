(function () {
  "use strict";
  var KEY_THEME = "portafolio.tema";
  var KEY_VISITS = "portafolio.visitas";
  var KEY_DRAFT = "portafolio.borrador";

  // --- Web Storage: tema ---
  var body = document.body;
  var toggle = document.getElementById("theme-toggle");
  function applyTheme(dark) {
    body.classList.toggle("dark", dark);
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.textContent = dark ? "Modo claro" : "Modo oscuro";
  }
  applyTheme(localStorage.getItem(KEY_THEME) === "dark");
  toggle.addEventListener("click", function () {
    var dark = !body.classList.contains("dark");
    applyTheme(dark);
    localStorage.setItem(KEY_THEME, dark ? "dark" : "light");
  });

  // --- Web Storage: contador de visitas ---
  var visits = (parseInt(localStorage.getItem(KEY_VISITS), 10) || 0) + 1;
  localStorage.setItem(KEY_VISITS, String(visits));
  document.getElementById("visit-counter").textContent =
    "Has visitado este portafolio " + visits + (visits === 1 ? " vez." : " veces.");

  // --- Formulario: Constraint Validation API + borrador en localStorage ---
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var fields = ["nombre", "correo", "mensaje"].map(function (id) { return document.getElementById(id); });

  function messageFor(el) {
    var v = el.validity;
    if (v.valueMissing) return "Este campo es obligatorio.";
    if (v.typeMismatch) return "Escribe un correo válido, por ejemplo contacto@ejemplo.com.";
    if (v.tooShort) return "Escribe al menos " + el.minLength + " caracteres (llevas " + el.value.length + ").";
    if (v.tooLong) return "Máximo " + el.maxLength + " caracteres.";
    return el.validationMessage;
  }
  function check(el) {
    el.setCustomValidity("");
    if (el.id === "nombre" && el.value.trim() !== "" && !/\s/.test(el.value.trim())) {
      el.setCustomValidity("Incluye al menos nombre y apellido.");
    }
    var msg = el.checkValidity() ? "" : messageFor(el);
    document.getElementById("err-" + el.id).textContent = msg;
    el.classList.toggle("invalid", msg !== "");
    el.classList.toggle("valid", msg === "" && el.value !== "");
    return msg === "";
  }

  // restaurar borrador
  try {
    var draft = JSON.parse(localStorage.getItem(KEY_DRAFT) || "{}");
    fields.forEach(function (el) { if (draft[el.id]) el.value = draft[el.id]; });
    if (Object.keys(draft).length) status.textContent = "Se restauró tu borrador guardado.";
  } catch (e) { localStorage.removeItem(KEY_DRAFT); }

  fields.forEach(function (el) {
    el.addEventListener("input", function () {
      var d = {};
      fields.forEach(function (f) { d[f.id] = f.value; });
      localStorage.setItem(KEY_DRAFT, JSON.stringify(d));
      check(el);
    });
    el.addEventListener("blur", function () { check(el); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = fields.map(check).every(Boolean);
    if (!ok) {
      status.style.color = "#dc2626";
      status.textContent = "Revisa los campos marcados.";
      fields.filter(function (f) { return !f.validity.valid; })[0].focus();
      return;
    }
    status.style.color = "#16a34a";
    status.textContent = "Mensaje validado correctamente. Gracias, " + fields[0].value.trim().split(" ")[0] + ". (Demostración: no se envía a ningún servidor.)";
    localStorage.removeItem(KEY_DRAFT);
    form.reset();
    fields.forEach(function (f) { f.classList.remove("valid"); });
  });

  document.getElementById("clear-draft").addEventListener("click", function () {
    localStorage.removeItem(KEY_DRAFT);
    form.reset();
    fields.forEach(function (f) { f.classList.remove("valid", "invalid"); document.getElementById("err-" + f.id).textContent = ""; });
    status.style.color = "#16a34a";
    status.textContent = "Borrador eliminado.";
  });

  // --- Evento de scroll: sombra del encabezado ---
  window.addEventListener("scroll", function () {
    document.querySelector(".site-header").style.boxShadow =
      window.scrollY > 20 ? "0 4px 18px rgba(0,0,0,.35)" : "";
  });
})();
