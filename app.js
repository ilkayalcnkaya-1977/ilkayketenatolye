const products = [
  {name:"Keten Gömlek", price:750, category:"Gömlek", image:"/images/IMG_1197.jpeg"},
  {name:"Keten Pantolon", price:950, category:"Pantolon", image:"/images/IMG_1238.jpeg"},
  {name:"Keten Şort", price:550, category:"Şort", image:"/images/IMG_1276.jpeg"},
  {name:"Keten Elbise", price:1250, category:"Elbise", image:""},
  {name:"Keten Takım", price:1650, category:"Takım", image:""}
];

const grid = document.getElementById("productGrid");
const more = document.getElementById("loadMore");
let activeFilter = "Tümü";
let visible = 10;

function money(v){ return new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY"}).format(v); }

function render(){
  const filtered = activeFilter==="Tümü" ? products : products.filter(p=>p.category===activeFilter);
  const list = filtered.slice(0, visible);
  grid.innerHTML = list.map((p,i)=>`
    <article class="product">
      <div class="product-image">
        ${p.image ? `<img src="${p.image}" loading="lazy" alt="${p.name}">` : ""}
        <button class="heart" aria-label="Favorilere ekle">♡</button>
      </div>
      <div class="product-info">
        <h3>${p.name.toUpperCase()}</h3>
        <div class="price">${money(p.price)}</div>
        <div class="swatches"><i></i><i></i><i></i></div>
      </div>
    </article>`).join("");
  more.style.display = filtered.length > visible ? "block" : "none";
}

document.querySelectorAll("[data-filter]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    activeFilter=btn.dataset.filter;
    visible=10;
    document.querySelectorAll(".filters button").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));
    render();
    document.getElementById("koleksiyon").scrollIntoView({behavior:"smooth"});
  });
});

more.addEventListener("click",()=>{visible+=10;render();});
document.getElementById("searchBtn").addEventListener("click",()=>alert("Arama sistemi ürün sayısı büyüdüğünde burada açılacak."));
render();

/*
  1000+ ürün için:
  - products dizisini JSON/API ile besleyin.
  - Görselleri /images yerine CDN'e koyun.
  - loading="lazy" sayesinde görünmeyen görseller yüklenmez.
  - Sayfalama/sonsuz kaydırma 10-20 ürünlük parçalarla çalışır.
*/
