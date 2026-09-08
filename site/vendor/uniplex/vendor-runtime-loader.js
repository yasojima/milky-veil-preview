const VENDOR_RUNTIME_SRC = "/milky-veil-preview/site/vendor/uniplex/wp-content/themes/uniplex/js/script.js?ver=1.0.4";
if (!document.getElementById("jquery-js")) {
  const script = document.createElement("script");
  script.id = "jquery-js";
  script.src = VENDOR_RUNTIME_SRC;
  document.body.append(script);
}
