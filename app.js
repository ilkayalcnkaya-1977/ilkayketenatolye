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
  },
  {
    name: "Yeşil Keten Pantolon",
    price: 950,
    category: "Pantolon",
    gender: "Erkek",
    image: "/IMG_0714.jpeg",
    images: [
      "/IMG_0714.jpeg",
      "/IMG_0715.jpeg",
      "/IMG_0716.jpeg"
    ]
  }
];

const grid = document.getElementById("productGrid");
const more = document.getElementById("loadMore");

let activeGender = "Erkek";
let activeFilter = "Tümü";
let visible = 10;

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
        <span>${activeGender.toUpperCase()} KOLEKSİYONU</span>
        <h3>Yeni ürünler çok yakında.</h3>
        <p>Bu kategoriye ait ürünler hazırlanıyor.</p>
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
            class="product-photo"
            onclick="openProductImage('${product.image}')"
          >

          ${
            product.images
              ? `
                <div class="product-thumbnails">
                  ${product.images.map(image => `
                    <img
                      src="${image}"
                      alt="${product.name}"
                      onclick="openProductImage('${image}')"
                    >
                  `).join("")}
                </div>
              `
              : ""
          }

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

    document.querySelectorAll(".gender-btn").forEach(item => {
      item.classList.toggle(
        "active",
        item.dataset.gender === activeGender
      );
    });

    document.querySelectorAll(".filters button").forEach(item => {
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


/* KATEGORİLER */

document.querySelectorAll("[data-filter]").forEach(button => {

  button.addEventListener("click", () => {

    activeFilter = button.dataset.filter;
    visible = 10;

    document.querySelectorAll(".filters button").forEach(item => {
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


/* ÜRÜN FOTOĞRAFINI BÜYÜT */

function openProductImage(image) {

  const lightbox = document.createElement("div");

  lightbox.className = "image-lightbox";

  lightbox.innerHTML = `
    <button
      class="lightbox-close"
      aria-label="Kapat"
    >
      ×
    </button>

    <img
      src="${image}"
      alt="Ürün görseli"
    >
  `;

  document.body.appendChild(lightbox);

  lightbox.addEventListener("click", (e) => {

    if (
      e.target === lightbox ||
      e.target.classList.contains("lightbox-close")
    ) {
      lightbox.remove();
    }

  });

}


/* BAŞLAT */

render(); 
