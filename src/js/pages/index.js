import "../../css/style.css";
import "../../css/pages/index.css";

import "../modules/header.js";
import "../modules/footer.js";

import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { events } from "../../../data/event.json";
import { faqs } from "../../../data/faq.json";
import { notices } from "../../../data/notice.json";
import { products } from "../../../data/products.json";
import { reviews } from "../../../data/reviews.json";

/* --------------------------------
 * Hero
 * -------------------------------- */

function initHeroSwiper() {
  const swiperElement = document.querySelector(".main-hero-swiper");

  if (!swiperElement) return;

  new Swiper(swiperElement, {
    modules: [Navigation, Pagination, Autoplay],

    loop: true,
    speed: 800,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    navigation: {
      prevEl: ".main-hero-prev",
      nextEl: ".main-hero-next",
    },

    pagination: {
      el: ".main-hero-pagination",
      clickable: true,
    },
  });
}

/* --------------------------------
 * Category
 * -------------------------------- */

function renderCategoryImages() {
  const categoryImages = document.querySelectorAll("[data-category-image]");

  if (!categoryImages.length) return;

  categoryImages.forEach(image => {
    const category = image.dataset.categoryImage;

    const product = products.find(item => item.category === category);

    if (!product) {
      const imageContainer = image.parentElement;

      if (imageContainer) {
        imageContainer.classList.add("hidden");
      }

      return;
    }

    image.src = `/${product.thumbnailMin}`;

    /*
     * 카드 링크 내부에 카테고리명이 이미 텍스트로 존재하므로
     * 이미지는 장식 이미지로 처리한다.
     */
    image.alt = "";

    image.addEventListener(
      "error",
      () => {
        const imageContainer = image.parentElement;

        if (imageContainer) {
          imageContainer.classList.add("hidden");
        }
      },
      { once: true },
    );
  });
}

/* --------------------------------
 * Featured
 * -------------------------------- */

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(Number(price));
}

function getCuratedProducts() {
  const categoryPlan = {
    eyewear: 2,
    sunglasses: 4,
    lens: 1,
    accessory: 1,
  };

  return Object.entries(categoryPlan).flatMap(([category, count]) =>
    products.filter(product => product.category === category).slice(0, count),
  );
}

function renderFeaturedProducts() {
  const container = document.querySelector(".main-featured-container");
  const template = document.querySelector("#main-featured-template");

  if (!container || !template) return;

  const featuredProducts = getCuratedProducts();
  const fragment = document.createDocumentFragment();

  featuredProducts.forEach(product => {
    const item = template.content.cloneNode(true);

    const image = item.querySelector(".main-featured-image");
    const imageLink = item.querySelector(".main-featured-link");
    const titleLink = item.querySelector(".main-featured-title");

    const brand = item.querySelector(".main-featured-brand");
    const rating = item.querySelector(".main-featured-rating");
    const price = item.querySelector(".main-featured-price");

    if (!image || !imageLink || !titleLink || !brand || !rating || !price) {
      return;
    }

    const detailUrl = `/detail.html?id=${product.id}`;
    const accessibleLabel = `${product.title} 상품 상세 보기`;

    image.src = `/${product.thumbnailMin}`;
    image.alt = product.title;

    imageLink.href = detailUrl;
    imageLink.setAttribute("aria-label", accessibleLabel);

    titleLink.href = detailUrl;
    titleLink.setAttribute("aria-label", accessibleLabel);
    titleLink.textContent = product.title;

    brand.textContent = product.brand;
    rating.textContent = product.rating ?? "-";
    price.textContent = `₩${formatPrice(product.price)}`;

    fragment.appendChild(item);
  });

  container.appendChild(fragment);
}

/* --------------------------------
 * Support
 * -------------------------------- */

function createNoticeItem(notice) {
  const article = document.createElement("article");

  article.className =
    "flex items-start justify-between gap-6 border-b border-line py-5";

  const content = document.createElement("div");

  content.className = "flex min-w-0 items-center gap-3";

  if (notice.isImportant) {
    const badge = document.createElement("span");

    badge.className =
      "shrink-0 bg-plum-100 px-2 py-1 text-[0.65rem] font-semibold text-plum-700";

    badge.textContent = "NOTICE";

    content.appendChild(badge);
  }

  const title = document.createElement("p");

  title.className =
    "m-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-ink";

  title.textContent = notice.title;

  content.appendChild(title);

  const date = document.createElement("time");

  date.className = "shrink-0 text-xs text-muted";
  date.dateTime = notice.date;
  date.textContent = notice.date;

  article.append(content, date);

  return article;
}

function createAccordionItem(titleText, descriptionText, metaText = "") {
  const details = document.createElement("details");

  details.className = "group border-b border-line";

  const summary = document.createElement("summary");

  summary.className =
    "flex cursor-pointer list-none items-center justify-between gap-6 py-5";

  const textContainer = document.createElement("div");

  textContainer.className = "min-w-0";

  if (metaText) {
    const meta = document.createElement("span");

    meta.className =
      "mb-1 block text-[0.68rem] font-medium uppercase tracking-[0.1em] text-muted";

    meta.textContent = metaText;

    textContainer.appendChild(meta);
  }

  const title = document.createElement("span");

  title.className = "block text-sm font-medium leading-6 text-ink";
  title.textContent = titleText;

  textContainer.appendChild(title);

  const icon = document.createElement("span");

  icon.setAttribute("aria-hidden", "true");

  icon.className =
    "shrink-0 text-xl font-light text-muted transition-transform duration-200 group-open:rotate-45";

  icon.textContent = "+";

  const description = document.createElement("p");

  description.className =
    "mb-5 mt-0 max-w-3xl pr-10 text-sm leading-7 text-muted";

  description.textContent = descriptionText;

  summary.append(textContainer, icon);
  details.append(summary, description);

  return details;
}

function renderSupportContent() {
  const noticeContainer = document.querySelector("#support-notice");
  const eventContainer = document.querySelector("#support-event");
  const faqContainer = document.querySelector("#support-faq");

  if (!noticeContainer || !eventContainer || !faqContainer) return;

  notices.forEach(notice => {
    noticeContainer.appendChild(createNoticeItem(notice));
  });

  events.forEach(event => {
    eventContainer.appendChild(
      createAccordionItem(
        event.title,
        event.description,
        `${event.badge} / ${event.period}`,
      ),
    );
  });

  faqs.forEach(faq => {
    faqContainer.appendChild(
      createAccordionItem(faq.question, faq.answer, faq.category),
    );
  });
}

function initSupportTabs() {
  const tabButtons = document.querySelectorAll(".support-tab");

  const tabPanels = document.querySelectorAll(
    "#support-notice, #support-event, #support-faq",
  );

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;

      tabButtons.forEach(tabButton => {
        const isActive = tabButton === button;

        tabButton.setAttribute("aria-selected", String(isActive));

        tabButton.classList.toggle("border-ink", isActive);
        tabButton.classList.toggle("text-ink", isActive);
        tabButton.classList.toggle("font-semibold", isActive);

        tabButton.classList.toggle("border-transparent", !isActive);
        tabButton.classList.toggle("text-muted", !isActive);
      });

      tabPanels.forEach(panel => {
        panel.hidden = panel.id !== targetId;
      });
    });
  });
}

/* --------------------------------
 * Review Modal
 * -------------------------------- */

function renderReviews() {
  const container = document.querySelector(".modal-reviews-container");

  if (!container) return;

  const fragment = document.createDocumentFragment();

  reviews.forEach(review => {
    const article = document.createElement("article");

    article.className = "border-b border-line py-6 last:border-b-0";

    const heading = document.createElement("div");

    heading.className = "flex items-start justify-between gap-4";

    const userContainer = document.createElement("div");

    const username = document.createElement("strong");

    username.className = "block text-sm font-medium text-ink";
    username.textContent = review.username;

    const product = document.createElement("span");

    product.className = "mt-1 block text-xs leading-5 text-muted";
    product.textContent = review.productTitle;

    userContainer.append(username, product);

    const rating = document.createElement("span");

    rating.className =
      "shrink-0 text-xs font-semibold tracking-[0.06em] text-plum-700";

    rating.textContent = `${"★".repeat(review.rating)}${"☆".repeat(
      5 - review.rating,
    )}`;

    heading.append(userContainer, rating);

    const comment = document.createElement("p");

    comment.className = "mb-0 mt-4 text-sm leading-7 text-ink";
    comment.textContent = review.content;

    const date = document.createElement("time");

    date.className = "mt-4 block text-xs text-muted";
    date.dateTime = review.date;
    date.textContent = review.date;

    article.append(heading, comment, date);
    fragment.appendChild(article);
  });

  container.appendChild(fragment);
}

function initReviewModal() {
  const openButton = document.querySelector(".main-review-button");
  const closeButton = document.querySelector(".main-review-close");
  const modal = document.querySelector(".main-review-modal");

  if (!openButton || !closeButton || !modal) return;

  openButton.addEventListener("click", () => {
    modal.showModal();
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

/* --------------------------------
 * Initialize
 * -------------------------------- */

function init() {
  initHeroSwiper();

  renderCategoryImages();
  renderFeaturedProducts();

  renderSupportContent();
  initSupportTabs();

  renderReviews();
  initReviewModal();
}

init();
