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


(function(){
  const mq = window.matchMedia('(max-width: 768px)');
  const items = document.querySelectorAll('.nav-item.has-dropdown');

  items.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.dropdown-menu');

    // Sur mobile: toggle au clic
    link.addEventListener('click', function(e){
      if (mq.matches){
        e.preventDefault();
        const open = item.classList.toggle('is-open');
        // Ferme les autres
        if (open){
          items.forEach(i => { if(i!==item) i.classList.remove('is-open'); });
        }
      }
    });

    // Accessibilité: ESC pour fermer
    item.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){ item.classList.remove('is-open'); link.focus(); }
    });
  });

  // Clic à l'extérieur pour fermer
  document.addEventListener('click', (e)=>{
    const inside = e.target.closest('.nav-item.has-dropdown');
    if (!inside){
      items.forEach(i => i.classList.remove('is-open'));
    }
  });
})();

document.querySelectorAll('.nav-item.has-dropdown > a').forEach(link=>{
  link.addEventListener('click', function(e){
    if(window.innerWidth <= 768){
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    }
  });
});