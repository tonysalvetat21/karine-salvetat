// Jeu de diapositives (reprend ta structure d'origine)
const slideSets = [
    {
      title: "FABRICATION",
      text: "Texte pour la fabrication",
      images: ["image/01.jpg", "image/02.jpg", "image/03.jpg", "image/04.jpg"]
    },
    {
      title: "LIVRAISON",
      text: "Texte pour la livraison",
      images: ["image/05 modif liv.jpg", "image/06 modif liv .jpg"]
    },
    {
      title: "MONTAGE",
      text: "Texte pour le montage",
      images: ["image/07 montage.jpg", "image/08 modif mont.jpg"]
    },
    {
      title: "RÉSULTAT",
      text: "Texte pour le resultat",
      images: ["image/im finale.JPG"]
    }
  ];
  
  let currentSet = 0;
  let currentSlide = 0;
  let timer = null;
  const INTERVAL = 2500;
  
  const $ = (sel) => document.querySelector(sel);
  
  function setActiveStepButtons() {
    document.querySelectorAll(".step-btn").forEach((btn, i) => {
      btn.setAttribute("aria-pressed", i === currentSet ? "true" : "false");
    });
  }
  
  function updateSlide() {
    const imgPath = slideSets[currentSet].images[currentSlide];
    // Sécurise les chemins avec espaces/majuscules
    $("#slide").src = encodeURI(imgPath);
    $("#info-title").textContent = slideSets[currentSet].title;
    $("#info-text").textContent = slideSets[currentSet].text;
    setActiveStepButtons();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideSets[currentSet].images.length;
    updateSlide();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideSets[currentSet].images.length) % slideSets[currentSet].images.length;
    updateSlide();
  }
  
  function start() {
    if (!timer) timer = setInterval(nextSlide, INTERVAL);
    $("#playpause").textContent = "⏸";
    $("#playpause").setAttribute("aria-label", "Mettre en pause");
  }
  function pause() {
    clearInterval(timer); timer = null;
    $("#playpause").textContent = "▶";
    $("#playpause").setAttribute("aria-label", "Relancer le diaporama");
  }
  function togglePlay() { (timer ? pause : start)(); }
  
  function showSet(index) {
    currentSet = index;
    currentSlide = 0;
    updateSlide();
    start(); // relance l’autoplay sur chaque set
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Boutons d’étapes (header)
    document.querySelectorAll(".step-btn").forEach(btn => {
      btn.addEventListener("click", () => showSet(Number(btn.dataset.set)));
    });
  
    // Contrôles
    $("#next").addEventListener("click", nextSlide);
    $("#prev").addEventListener("click", prevSlide);
    $("#playpause").addEventListener("click", togglePlay);
  
    // Pause au survol
    $("#slider").addEventListener("mouseenter", pause);
    $("#slider").addEventListener("mouseleave", start);
  
    // Navigation clavier gauche/droite
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    });
  
    // Init
    updateSlide();
    start();
  });
  