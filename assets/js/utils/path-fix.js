// path-fix.js
(function () {
  if (location.hostname.includes("github.io")) {
    const basePath = "/onggeulda-skill-lab";

    document.addEventListener("DOMContentLoaded", function () {
      document
        .querySelectorAll(
          'link[href^="/"], script[src^="/"], img[src^="/"], a[href^="/"]'
        )
        .forEach((el) => {
          const attr =
            el.tagName === "LINK"
              ? "href"
              : el.tagName === "A"
              ? "href"
              : "src";
          const path = el.getAttribute(attr);

          if (path && !path.startsWith(basePath) && !path.startsWith("http")) {
            el.setAttribute(attr, basePath + path);
          }
        });
    });
  }
})();
