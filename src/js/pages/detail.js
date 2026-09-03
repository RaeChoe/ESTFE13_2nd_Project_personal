import "../../css/style.css";
import "../../css/pages/detail.css";

import productData from "../../../data/products.json";
import reviewData from "../../../data/reviews.json";

import "../modules/header.js";
import "../modules/footer.js";

import { renderTabs } from "../modules/tabs.js";

import { addToCart, updateCartCount } from "../utils/common.js";

const products = productData.products;
const reviews = reviewData.reviews;

let product = null;
let productReviews = [];
let quantity = 1;

const CATEGORY_LABELS = {
  eyewear: "Eyewear",
  sunglasses: "Sunglasses",
  lens: "Lens",
  accessory: "Accessory",
};

const CATEGORY_ACTIONS = {
  eyewear: "showEyewear",
  sunglasses: "showSunglasses",
  lens: "showLens",
  accessory: "showAccessory",
};

const BRAND_DESCRIPTIONS = {
  "RAY-BAN":
    "클래식은 영원하다, 레이밴 SINCE 1937. 시간이 증명하는 글로벌 아이웨어 브랜드. '빛(Ray)을 막아준다(Ban)'는 이름처럼 선글라스 본연의 역할에 집중하며 누구나 어울리는 클래식한 디자인을 선보입니다.",

  BLIZ: "스웨덴에서 시작된 스포츠 아이웨어 브랜드 BLIZ는 스포츠와 아웃도어 환경에서 필요한 기능성과 편안한 착용감을 바탕으로 다양한 아이웨어를 선보입니다.",

  "PUBLIC BEACON":
    "PUBLIC BEACON은 문화와 예술에서 받은 영감을 현대적인 감각으로 재해석해 클래식하면서도 개성 있는 아이웨어를 선보입니다.",

  "MUSEUM BY BEACON":
    "MUSEUM BY BEACON은 시간이 지나도 변하지 않는 클래식한 아름다움을 현대적인 디자인으로 재해석하는 아이웨어 브랜드입니다.",

  FAKEME:
    "FAKEME는 정해진 스타일보다 각자의 개성과 분위기에 집중하며 다양한 실루엣과 감각적인 디자인의 아이웨어를 선보입니다.",

  "RUDY PROJECT":
    "RUDY PROJECT는 스포츠 퍼포먼스를 위한 기능성과 편안한 피팅을 중심으로 발전해 온 이탈리아 아이웨어 브랜드입니다.",

  OAKLEY:
    "OAKLEY는 스포츠 퍼포먼스와 광학 기술을 기반으로 기능성과 독창적인 디자인을 결합한 아이웨어를 선보입니다.",

  PRADA:
    "PRADA는 절제된 실루엣과 세련된 디자인을 통해 브랜드 특유의 감각적인 스타일을 아이웨어에 담아냅니다.",

  "LE SPECS":
    "LE SPECS는 호주에서 시작된 패션 아이웨어 브랜드로 감각적인 실루엣과 컬러를 활용한 다양한 선글라스를 선보입니다.",

  "STYLE:WORK":
    "STYLE:WORK는 일상에서 편안하게 착용할 수 있는 실용적인 디자인과 균형 잡힌 실루엣을 제안합니다.",

  "ROUNZ BASIC":
    "ROUNZ BASIC은 기본에 충실한 디자인과 편안한 착용감, 합리적인 구성을 중심으로 데일리 아이웨어를 제안합니다.",

  "VEDI VERO":
    "VEDI VERO는 섬세한 소재와 디테일을 바탕으로 독창적인 디자인과 편안한 착용감을 함께 추구합니다.",

  HEISTER:
    "HEISTER는 착용자의 분위기와 개성을 자연스럽게 표현할 수 있도록 다양한 실루엣과 감각적인 아이웨어를 선보입니다.",

  "NINE ACCORD":
    "NINE ACCORD는 클래식한 안경 제작 방식과 현대적인 디자인을 결합해 섬세하고 독창적인 프레임을 만들어갑니다.",

  "NISHIDE KAZUO":
    "NISHIDE KAZUO는 정교한 제작 기술과 섬세한 디테일을 바탕으로 높은 완성도의 아이웨어를 선보입니다.",
};

/* ========================================
 * Helper
 * ====================================== */

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(Number(price));
}

function getDisplayPrice(item) {
  const hasSale =
    item.badge?.toLowerCase() === "sale" && Number(item.sale_rate) > 0;

  if (!hasSale) {
    return Number(item.price);
  }

  return Math.round(Number(item.price) * (1 - Number(item.sale_rate) / 100));
}

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category ?? "Collection";
}

function getProductFromUrl() {
  const params = new URLSearchParams(window.location.search);

  const productId = Number(params.get("id"));

  if (!productId) {
    return null;
  }

  return products.find(item => item.id === productId) ?? null;
}

function getStyle(item) {
  const title = item.title?.toLowerCase() ?? "";

  if (title.includes("캣아이") || title.includes("cat")) {
    return "Cat-eye";
  }

  if (title.includes("오벌") || title.includes("oval")) {
    return "Oval";
  }

  if (title.includes("라운드") || title.includes("round")) {
    return "Round";
  }

  if (title.includes("고글") || title.includes("sport")) {
    return "Sport";
  }

  if (title.includes("메탈") || title.includes("metal")) {
    return "Metal";
  }

  return "Classic";
}

function getMaterial(item) {
  const title = item.title?.toLowerCase() ?? "";

  if (
    title.includes("베타티타늄") ||
    title.includes("티타늄") ||
    title.includes("titanium")
  ) {
    return "Titanium";
  }

  if (title.includes("tr90")) {
    return "TR90";
  }

  if (title.includes("메탈") || title.includes("metal")) {
    return "Metal";
  }

  return "Acetate / Mixed";
}

function renderStars(rating) {
  const roundedRating = Math.round(Number(rating));

  return Array.from({ length: 5 }, (_, index) =>
    index < roundedRating ? "★" : "☆",
  ).join("");
}

function getReviewAverage() {
  if (productReviews.length === 0) {
    return Number(product?.rating ?? 0);
  }

  const total = productReviews.reduce(
    (sum, review) => sum + Number(review.rating),
    0,
  );

  return total / productReviews.length;
}

/* ========================================
 * Product
 * ====================================== */

function renderProduct() {
  if (!product) return;

  const categoryLabel = getCategoryLabel(product.category);

  const productStyle = getStyle(product);
  const productMaterial = getMaterial(product);
  const productColor = product.color || "Various";

  const displayPrice = getDisplayPrice(product);

  const reviewAverage = getReviewAverage();

  const hasSale =
    product.badge?.toLowerCase() === "sale" && Number(product.sale_rate) > 0;

  document.title = `${product.title} — ROUNZ`;

  /* 이미지 */
  const image = document.querySelector(".product-main-image");

  if (image) {
    image.src = `/${product.thumbnail}`;
    image.alt = product.title;
  }

  /* 브랜드 */
  const brand = document.querySelector(".product-brand");

  if (brand) {
    brand.textContent = product.brand;
  }

  /* 상품명 */
  const title = document.querySelector(".product-title");

  if (title) {
    title.textContent = product.title;
  }

  /* Breadcrumb */
  const breadcrumbBrand = document.querySelector(".product-brand-breadcrumb");

  if (breadcrumbBrand) {
    breadcrumbBrand.textContent = product.brand;
  }

  const categoryLink = document.querySelector(".product-category-link");

  if (categoryLink) {
    categoryLink.textContent = categoryLabel;

    const action = CATEGORY_ACTIONS[product.category];

    categoryLink.href = action
      ? `/productList.html?action=${action}`
      : "/productList.html";
  }

  /* 기본 정보 */
  const categories = document.querySelectorAll(".product-category");

  categories.forEach(element => {
    element.textContent = categoryLabel;
  });

  const colors = document.querySelectorAll(".product-color");

  colors.forEach(element => {
    element.textContent = productColor;
  });

  const styles = document.querySelectorAll(".product-style");

  styles.forEach(element => {
    element.textContent = productStyle;
  });

  const materials = document.querySelectorAll(
    ".product-material, .spec-material",
  );

  materials.forEach(element => {
    element.textContent = productMaterial;
  });

  /* 가격 */
  const price = document.querySelector(".product-price");

  if (price) {
    price.textContent = `${formatPrice(displayPrice)}원`;
  }

  const saleRate = document.querySelector(".product-sale-rate");

  const originalPrice = document.querySelector(".product-original-price");

  if (hasSale) {
    if (saleRate) {
      saleRate.textContent = `${product.sale_rate}%`;

      saleRate.classList.remove("hidden");
    }

    if (originalPrice) {
      originalPrice.textContent = `${formatPrice(product.price)}원`;

      originalPrice.classList.remove("hidden");
    }
  } else {
    saleRate?.classList.add("hidden");
    originalPrice?.classList.add("hidden");
  }

  /* Badge */
  const badge = document.querySelector(".product-badge");

  if (badge && product.badge) {
    badge.textContent = hasSale ? `-${product.sale_rate}%` : product.badge;

    badge.dataset.badge = product.badge.toLowerCase();

    badge.classList.remove("hidden");
  } else {
    badge?.classList.add("hidden");
  }

  /* 평점 */
  const ratingScore = document.querySelector(".rating-score");

  if (ratingScore) {
    ratingScore.textContent = reviewAverage.toFixed(1);
  }

  const productStars = document.querySelector(".product-stars");

  if (productStars) {
    productStars.textContent = renderStars(reviewAverage);
  }

  const ratingCount = document.querySelector(".rating-count");

  if (ratingCount) {
    ratingCount.textContent = `${productReviews.length}개의 후기`;
  }

  const tabReviewCount = document.querySelector(".tab-review-count");

  if (tabReviewCount) {
    tabReviewCount.textContent = `(${productReviews.length})`;
  }

  /* 브랜드 설명 */
  const description = document.querySelector(".product-description");

  if (description) {
    description.textContent =
      BRAND_DESCRIPTIONS[product.brand] ??
      `${product.brand}의 디자인과 착용감을 고려해 ROUNZ에서 선별한 아이웨어입니다.`;
  }

  updateTotalPrice();
}

/* ========================================
 * Quantity
 * ====================================== */

function updateQuantity() {
  const input = document.querySelector("#quantity");

  if (input) {
    input.value = String(quantity);
  }

  updateTotalPrice();
}

function updateTotalPrice() {
  if (!product) return;

  const totalPrice = document.querySelector(".product-total-price");

  if (!totalPrice) return;

  const price = getDisplayPrice(product);

  totalPrice.textContent = `${formatPrice(price * quantity)}원`;
}

function initQuantity() {
  const decrease = document.querySelector(".quantity-decrease");

  const increase = document.querySelector(".quantity-increase");

  decrease?.addEventListener("click", () => {
    if (quantity <= 1) {
      return;
    }

    quantity -= 1;
    updateQuantity();
  });

  increase?.addEventListener("click", () => {
    quantity += 1;
    updateQuantity();
  });
}

/* ========================================
 * Cart / Buy
 * ====================================== */

function getCartProduct() {
  return {
    ...product,
    price: getDisplayPrice(product),
  };
}

function initPurchase() {
  const addCartButton = document.querySelector(".add-cart");

  const form = document.querySelector(".product-form");

  addCartButton?.addEventListener("click", () => {
    if (!product) return;

    addToCart(getCartProduct(), quantity);

    const previousText = addCartButton.textContent;

    addCartButton.textContent = "장바구니에 담았습니다";

    addCartButton.classList.add("is-added");

    window.setTimeout(() => {
      addCartButton.textContent = previousText;

      addCartButton.classList.remove("is-added");
    }, 1000);
  });

  form?.addEventListener("submit", event => {
    event.preventDefault();

    if (!product) return;

    addToCart(getCartProduct(), quantity);

    window.location.href = "/cart.html";
  });
}

/* ========================================
 * Favorite
 * ====================================== */

function initFavorite() {
  const button = document.querySelector(".favorite-button");

  if (!button) return;

  button.addEventListener("click", () => {
    const pressed = button.getAttribute("aria-pressed") === "true";

    button.setAttribute("aria-pressed", String(!pressed));

    button.setAttribute(
      "aria-label",
      pressed ? "관심 상품에 추가" : "관심 상품에서 제거",
    );
  });
}

/* ========================================
 * Share
 * ====================================== */

function initShare() {
  const button = document.querySelector(".share-button");

  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.title ?? "ROUNZ",

          text: product?.title ?? "ROUNZ 상품",

          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(window.location.href);

      const label = button.querySelector("span");

      if (!label) return;

      const previous = label.textContent;

      label.textContent = "링크가 복사되었습니다";

      window.setTimeout(() => {
        label.textContent = previous;
      }, 1200);
    } catch {
      // 사용자가 공유창을 닫은 경우 별도 처리 없음
    }
  });
}

/* ========================================
 * Reviews
 * ====================================== */

function renderReviews() {
  const reviewList = document.querySelector(".review-list");

  const reviewEmpty = document.querySelector(".review-empty");

  const reviewAverage = document.querySelector(".review-average");

  const reviewAverageStars = document.querySelector(".review-average-stars");

  const reviewTotal = document.querySelector(".review-total");

  if (!reviewList || !reviewEmpty) {
    return;
  }

  reviewList.innerHTML = "";

  const average = getReviewAverage();

  if (reviewAverage) {
    reviewAverage.textContent = average.toFixed(1);
  }

  if (reviewAverageStars) {
    reviewAverageStars.textContent = renderStars(average);
  }

  if (reviewTotal) {
    reviewTotal.textContent = `총 ${productReviews.length}개의 후기`;
  }

  if (productReviews.length === 0) {
    reviewList.classList.add("hidden");
    reviewEmpty.classList.remove("hidden");

    return;
  }

  reviewEmpty.classList.add("hidden");
  reviewList.classList.remove("hidden");

  const fragment = document.createDocumentFragment();

  productReviews.forEach(review => {
    const article = document.createElement("article");

    article.className = `
      border-b
      border-line
      py-8
    `;

    const header = document.createElement("div");

    header.className = `
      flex
      flex-wrap
      items-center
      justify-between
      gap-3
    `;

    const stars = document.createElement("span");

    stars.className = `
      text-sm
      tracking-[0.05em]
      text-plum-600
    `;

    stars.setAttribute("aria-label", `별점 5점 만점에 ${review.rating}점`);

    stars.textContent = renderStars(review.rating);

    const date = document.createElement("time");

    date.className = "text-xs text-muted";

    date.dateTime = review.date;

    date.textContent = review.date.replaceAll("-", ".");

    header.append(stars, date);

    const content = document.createElement("p");

    content.className = `
      mb-0
      mt-5
      max-w-4xl
      text-sm
      leading-7
      text-ink
    `;

    content.textContent = review.content;

    const user = document.createElement("p");

    user.className = `
      mb-0
      mt-5
      text-xs
      font-medium
      text-muted
    `;

    user.textContent = review.username;

    article.append(header, content, user);

    fragment.appendChild(article);
  });

  reviewList.appendChild(fragment);
}

/* ========================================
 * Review Shortcut
 * ====================================== */

function initReviewShortcut() {
  const shortcut = document.querySelector(".review-tab-link");

  const reviewTab = document.querySelector("#tab-reviews");

  const tabsContainer = document.querySelector(".tabs__container");

  if (!shortcut || !reviewTab || !tabsContainer) {
    return;
  }

  shortcut.addEventListener("click", () => {
    /*
        tabs.js는 탭 클릭 이벤트를
        tabs__container에서 위임받고 있으므로
        실제 탭을 클릭시켜 기존 로직을 그대로 사용한다.
      */
    reviewTab.click();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    tabsContainer.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",

      block: "start",
    });
  });
}

/* ========================================
 * Not Found
 * ====================================== */

function renderNotFound() {
  const main = document.querySelector("main");

  if (!main) return;

  main.innerHTML = `
    <section
      class="
        site-container
        flex
        min-h-[65vh]
        flex-col
        items-center
        justify-center
        py-24
        text-center
      "
    >
      <p
        class="
          m-0
          text-sm
          text-muted
        "
      >
        상품을 찾을 수 없습니다.
      </p>

      <h1
        class="
          mb-0
          mt-4
          text-4xl
          font-medium
          tracking-[-0.05em]
        "
      >
        존재하지 않는 상품입니다.
      </h1>

      <a
        href="/productList.html"
        class="
          mt-8
          inline-flex
          items-center
          justify-center
          bg-ink
          px-7
          py-4
          text-sm
          font-semibold
          text-white
          no-underline
          transition-colors
          hover:bg-plum-700
        "
      >
        상품 목록으로
      </a>
    </section>
  `;
}

/* ========================================
 * Init
 * ====================================== */

function init() {
  product = getProductFromUrl();

  if (!product) {
    renderNotFound();
    updateCartCount();

    return;
  }

  productReviews = reviews.filter(
    review => review.productTitle === product.title,
  );

  renderProduct();
  renderReviews();

  /*
    기존 프로젝트의 tabs.js 재사용.
    첫 번째 탭 활성화,
    클릭 전환,
    ← / → / Home / End 키보드 조작을 처리한다.
  */
  renderTabs();

  initQuantity();
  initPurchase();
  initFavorite();
  initShare();
  initReviewShortcut();

  updateCartCount();
}

init();
