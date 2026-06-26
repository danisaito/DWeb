let lastScrollTop = 0;
const nav = document.getElementById("scrollNav");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    nav.classList.add("hide-nav");
    nav.classList.remove("show-nav");
  } else {
    nav.classList.add("show-nav");
    nav.classList.remove("hide-nav");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Função de busca
document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = this.value.trim().toLowerCase();
    if (!query) return;

    const elements = document.querySelectorAll("main, section, div, p, h1, h2, h3, span");

    for (const el of elements) {
      if (el.innerText.toLowerCase().includes(query)) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.outline = "2px dashed #ddb389";
        setTimeout(() => el.style.outline = "none", 2000);
        return;
      }
    }

    alert("Nenhum resultado encontrado.");
  }
});