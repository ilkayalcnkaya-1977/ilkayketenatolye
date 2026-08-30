const products = [
  {
    name: "Keten Pantolon",
    price: 950,
    category: "Pantolon",
    gender: "Erkek",
    image: "/IMG_0647.png"
  },
  {
    name: "Keten Pantolon Gri",
    price: 950,
    category: "Pantolon",
    gender: "Erkek",
    image: "/IMG_0650.png"
  },
  {
    name: "Keten Şort",
    price: 550,
    category: "Şort",
    gender: "Erkek",
    image: "/IMG_1276.jpeg"
  }
];

const grid = document.getElementById("productGrid");
const more = document.getElementById("loadMore");

let activeGender = "Erkek";
let activeFilter = "Tümü";
let visible = 10;

/* KADIN / ERKEK MENÜSÜ */
const filtersBox = document.querySelector(".filters");

if (filtersBox && !document.querySelector(".gender-switch")) {
  const genderSwitch = document.createElement("div");

  genderSwitch.className = "gender-switch";

  genderSwitch.innerHTML = `
    <button class="gender-btn" data-gender="Kadın">
      KADIN
    </button>
    <button class="gender-btn active" data-gender="Erkek">
      ERKEK
    </button>
  `;

  filtersBox.parentNode.insertBefore(genderSwitch, filtersBox);

  const style = document.createElement("style");

  style.textContent = `
    .gender-switch {
      display:flex;
      justify-content:center;
      gap:38px;
      margin:0 auto 24px;
    }

    .gender-btn {
      border:0;
      background:none;
      padding:8px 3px;
      color:#777;
      font-family:inherit;
      font-size:11px;
      letter-spacing:.18em;
      cursor:pointer;
    }

    .gender-btn.active {
      color:#222;
      border-bottom:1px solid #222;
    }

    .empty-products {
      grid-column:1 / -1;
      text-align:center;
      padding:80px 20px;
    }

    .empty-products span {
      font-size:10px;
      letter-spacing:.22em;
      color:#777;
    }

    .empty-products h3 {
      font-family:"Playfair Display",serif;
      font-size:30px;
      font-weight:400;
      margin:15px 0 8px;
    }

    .empty-products p {
      color:#777;
      font-size:13px;
    }
  `;

  document.head.appendChild(style);
}

function money(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY"
  }).format(value);
}

function render() {

  const genderProducts = products.filter(
    product => product.gender === activeGender
  );

  const filtered =
    activeFilter === "Tümü"
      ? genderProducts
      : genderProducts.filter(
          product => product.category === activeFilter
        );

  const list = filtered.slice(0, visible);

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty-products">

        <span>
          ${activeGender.toUpperCase()} KOLEKSİYONU
        </span>

        <h3>
          Yeni ürünler çok yakında.
        </h3>

        <p>
          Bu kategoriye ait ürünler hazırlanıyor.
        </p>

      </div>
    `;

  } else {

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

          <h3>
            ${product.name.toUpperCase()}
          </h3>

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
  }

  if (more) {
    more.style.display =
      filtered.length > visible ? "block" : "none";
  }
}

/* KADIN / ERKEK */
document.querySelectorAll("[data-gender]").forEach(button => {

  button.addEventListener("click", () => {

    activeGender = button.dataset.gender;

    activeFilter = "Tümü";

    visible = 10;

    document
      .querySelectorAll(".gender-btn")
      .forEach(item => {

        item.classList.toggle(
          "active",
          item.dataset.gender === activeGender
        );

      });

    document
      .querySelectorAll(".filters button")
      .forEach(item => {

        item.classList.toggle(
          "active",
          item.dataset.filter === "Tümü"
        );

      });

    render();

    document
      .getElementById("koleksiyon")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  });

});

/* KATEGORİ FİLTRELERİ */
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

    document
      .getElementById("koleksiyon")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  });

});

/* DAHA FAZLA */
if (more) {

  more.addEventListener("click", () => {

    visible += 10;

    render();

  });

}

/* ARAMA */
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

  searchBtn.addEventListener("click", () => {

    alert("Arama sistemi yakında aktif olacak.");

  });

}

render();
