// Fonction de chargement d’un fichier HTML dans un élément (avec promesse)
function includeHTML(id, file) {
  return fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// Inclure le header et le footer
includeHTML("footer", "footer.html");

// Inclure le header PUIS déclencher l'apparition au scroll
includeHTML("header", "header.html");

includeHTML("header", "header.html").then(() => {
  const header = document.querySelector(".main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("visible");
    } else {
      header.classList.remove("visible");
    }
  });
});

console.log("Page chargée !");
