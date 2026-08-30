const products = [
  {
    name: "Keten Pantolon",
    price: 950,
    category: "Pantolon",
    image: "/images/pantolon-beyaz.jpg"
  },
  {
    name: "Keten Pantolon Gri",
    price: 950,
    category: "Pantolon",
    image: "/images/pantolon-gri.jpg"
  },
  {
    name: "Keten Şort",
    price: 550,
    category: "Şort",
    image: "/images/keten-sort.jpg"
  }
];

const grid = document.getElementById("productGrid");
const more = document.getElementById("loadMore");

let activeFilter = "Tümü";
let visible = 10;

function money(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY"
  }).format(value);
}

function render() {
  const filtered =
    activeFilter === "Tümü"
      ? products
      : products.filter(product => product.category === activeFilter);

  const list = filtered.slice(0, visible);

  grid.innerHTML = list.map(product => `
    <article class="product">
      <div class="product-image">
        <img
          src="${product.image}"
          loading="lazy"
          alt="${product.name}"
        />

        <button
          class="heart"
          type="button"
          aria-label="Favorilere ekle"
        >
          ♡
        </button>
      </div>

      <div class="product-info">
        <h3>${product.name.toUpperCase()}</h3>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="swatches">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </article>
  `).join("");

  if (more) {
    more.style.display =
      filtered.length > visible ? "block" : "none";
  }
}

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    visible = 10;

    document
      .querySelectorAll(".filters button")
      .forEach(item => {
        item.classList.toggle(
          "active",
          item.dataset.filter === activeFilter
        );
      });

    render();

    const section = document.getElementById("koleksiyon");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

if (more) {
  more.addEventListener("click", () => {
    visible += 10;
    render();
  });
}

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    alert("Arama sistemi yakında aktif olacak.");
  });
}

render();
