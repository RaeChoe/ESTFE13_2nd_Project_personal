import "../../css/style.css";
import "../../css/pages/productList.css";

import productData from "../../../data/products.json";

import "../modules/header.js";
import "../modules/footer.js";

import { applyUrlFilter } from "../modules/categoryLink.js";
import { addToCart, updateCartCount } from "../utils/common.js";

const productGrid = document.querySelector(".product-grid");
const productEmpty = document.querySelector(".product-empty");

const paginationContainer = document.querySelector(".pagination");

const resultCount = document.querySelector(".product-result-count");
const filterSummary = document.querySelector(".product-filter-summary");

const filterButton = document.querySelector(".filter-button");
const filterPanel = document.querySelector(".filter-panel");
const filterCloseButton = document.querySelector(".filter-panel__close-button");
const filterBackdrop = document.querySelector(".filter-backdrop");

const activeFilterCount = document.querySelector(".active-filter-count");
const activeFilterList = document.querySelector(".active-filter-list");

const resetButtons = document.querySelectorAll(
  ".filter-reset-button, .product-empty-reset",
);

const categoryFilter = document.querySelector("#category-filter");
const brandFilter = document.querySelector("#brand-filter");
const colorFilter = document.querySelector("#color-filter");
const priceFilter = document.querySelector("#price-filter");

const searchInput = document.querySelector(".search-input");

const products = productData.products;

let filteredData = [...products];

let selectedCategories = [];
let selectedBrands = [];
let selectedColors = [];
let selectedPrices = [];
let selectedBadge = "";

let currentPage = 1;
let countPerPage = 6;

const pagerPerGroup = 5;

/* --------------------------------
 * Labels
 * -------------------------------- */

const CATEGORY_LABELS = {
  eyewear: "Eyewear",
  sunglasses: "Sunglasses",
  lens: "Lens",
  accessory: "Accessory",
};

const PRICE_RANGES = [
  {
    value: "low",
    label: "₩200,000 이하",
  },
  {
    value: "middle",
    label: "₩200,000 ~ ₩400,000",
  },
  {
    value: "high",
    label: "₩400,000 이상",
  },
];

/* --------------------------------
 * Helpers
 * -------------------------------- */

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(Number(price));
}

function getDisplayPrice(product) {
  const isSale =
    product.badge?.toLowerCase() === "sale" && Number(product.sale_rate) > 0;

  if (!isSale) {
    return product.price;
  }

  return Math.round(product.price * (1 - product.sale_rate / 100));
}

function getBadgeLabel(product) {
  if (!product.badge) return "";

  if (product.badge.toLowerCase() === "sale" && Number(product.sale_rate) > 0) {
    return `-${product.sale_rate}%`;
  }

  return product.badge;
}

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

function getActiveFilterTotal() {
  return (
    selectedCategories.length +
    selectedBrands.length +
    selectedColors.length +
    selectedPrices.length
  );
}

function getFilterLabel(type, value) {
  if (type === "category") {
    return getCategoryLabel(value);
  }

  if (type === "price") {
    return PRICE_RANGES.find(range => range.value === value)?.label ?? value;
  }

  return value;
}

function scrollToProducts() {
  const toolbar = resultCount?.closest("div");

  if (!toolbar) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  toolbar.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

/* --------------------------------
 * URL Badge
 * -------------------------------- */

function applyBadgeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const badge = urlParams.get("badge");

  if (!badge) {
    selectedBadge = "";
    return;
  }

  const normalizedBadge = badge.toUpperCase();

  if (!["NEW", "BEST"].includes(normalizedBadge)) {
    selectedBadge = "";
    return;
  }

  selectedBadge = normalizedBadge;
}

/* --------------------------------
 * Filter Options
 * -------------------------------- */

function createFilterOption({ name, value, label, checked = false }) {
  const wrapper = document.createElement("label");

  wrapper.className = "filter-option";

  const input = document.createElement("input");

  input.type = "checkbox";
  input.name = name;
  input.value = value;
  input.checked = checked;

  const visual = document.createElement("span");

  visual.className = "filter-option__box";
  visual.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");

  text.className = "filter-option__label";
  text.textContent = label;

  wrapper.append(input, visual, text);

  return wrapper;
}

function renderFilterGroup({ container, name, options }) {
  if (!container) return;

  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  fragment.appendChild(
    createFilterOption({
      name,
      value: "all",
      label: "전체",
      checked: true,
    }),
  );

  options.forEach(option => {
    fragment.appendChild(
      createFilterOption({
        name,
        value: option.value,
        label: option.label,
      }),
    );
  });

  container.appendChild(fragment);
}

function renderCategories() {
  const categories = [
    ...new Set(products.map(product => product.category)),
  ].filter(Boolean);

  const options = categories.map(category => ({
    value: category,
    label: getCategoryLabel(category),
  }));

  renderFilterGroup({
    container: categoryFilter,
    name: "category",
    options,
  });
}

function renderBrands() {
  const brands = [...new Set(products.map(product => product.brand))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const options = brands.map(brand => ({
    value: brand,
    label: brand,
  }));

  renderFilterGroup({
    container: brandFilter,
    name: "brand",
    options,
  });
}

function renderColors() {
  const colors = [...new Set(products.map(product => product.color))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const options = colors.map(color => ({
    value: color,
    label: color,
  }));

  renderFilterGroup({
    container: colorFilter,
    name: "color",
    options,
  });
}

function renderPrices() {
  renderFilterGroup({
    container: priceFilter,
    name: "price",
    options: PRICE_RANGES,
  });
}

/* --------------------------------
 * Filter Events
 * -------------------------------- */

function setupFilterGroup(container, onChange) {
  if (!container) return;

  const allInput = container.querySelector('input[value="all"]');

  const itemInputs = [
    ...container.querySelectorAll('input:not([value="all"])'),
  ];

  if (!allInput) return;

  allInput.addEventListener("change", () => {
    if (!allInput.checked) {
      const hasSelectedItem = itemInputs.some(input => input.checked);

      if (!hasSelectedItem) {
        allInput.checked = true;
      }

      return;
    }

    itemInputs.forEach(input => {
      input.checked = false;
    });

    onChange([]);
    applyFilter();
  });

  itemInputs.forEach(input => {
    input.addEventListener("change", () => {
      const selected = itemInputs
        .filter(item => item.checked)
        .map(item => item.value);

      allInput.checked = selected.length === 0;

      onChange(selected);
      applyFilter();
    });
  });
}

function initFilterEvents() {
  setupFilterGroup(categoryFilter, values => {
    selectedCategories = values;
  });

  setupFilterGroup(brandFilter, values => {
    selectedBrands = values;
  });

  setupFilterGroup(colorFilter, values => {
    selectedColors = values;
  });

  setupFilterGroup(priceFilter, values => {
    selectedPrices = values;
  });

  searchInput?.addEventListener("input", () => {
    applyFilter();
  });

  resetButtons.forEach(button => {
    button.addEventListener("click", () => {
      resetFilters();
    });
  });
}

/* --------------------------------
 * Active Filters
 * -------------------------------- */

function createActiveFilterChip(type, value) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "active-filter-chip";

  const text = document.createElement("span");

  text.textContent = getFilterLabel(type, value);

  const close = document.createElement("span");

  close.setAttribute("aria-hidden", "true");
  close.textContent = "×";

  button.setAttribute("aria-label", `${getFilterLabel(type, value)} 필터 제거`);

  button.append(text, close);

  button.addEventListener("click", () => {
    removeFilter(type, value);
  });

  return button;
}

function renderActiveFilters() {
  if (!activeFilterList || !activeFilterCount) return;

  const activeFilters = [
    ...selectedCategories.map(value => ({
      type: "category",
      value,
    })),
    ...selectedBrands.map(value => ({
      type: "brand",
      value,
    })),
    ...selectedColors.map(value => ({
      type: "color",
      value,
    })),
    ...selectedPrices.map(value => ({
      type: "price",
      value,
    })),
  ];

  activeFilterList.innerHTML = "";

  if (activeFilters.length === 0) {
    activeFilterList.classList.add("hidden");
    activeFilterList.classList.remove("flex");

    activeFilterCount.classList.add("hidden");
    activeFilterCount.textContent = "0";

    return;
  }

  const fragment = document.createDocumentFragment();

  activeFilters.forEach(filter => {
    fragment.appendChild(createActiveFilterChip(filter.type, filter.value));
  });

  activeFilterList.appendChild(fragment);

  activeFilterList.classList.remove("hidden");
  activeFilterList.classList.add("flex");

  activeFilterCount.textContent = String(activeFilters.length);

  activeFilterCount.classList.remove("hidden");
}

function removeFilter(type, value) {
  const stateMap = {
    category: selectedCategories,
    brand: selectedBrands,
    color: selectedColors,
    price: selectedPrices,
  };

  const containerMap = {
    category: categoryFilter,
    brand: brandFilter,
    color: colorFilter,
    price: priceFilter,
  };

  const state = stateMap[type];
  const container = containerMap[type];

  if (!state || !container) return;

  const nextValues = state.filter(item => item !== value);

  if (type === "category") {
    selectedCategories = nextValues;
  }

  if (type === "brand") {
    selectedBrands = nextValues;
  }

  if (type === "color") {
    selectedColors = nextValues;
  }

  if (type === "price") {
    selectedPrices = nextValues;
  }

  const removedInput = [
    ...container.querySelectorAll('input:not([value="all"])'),
  ].find(input => input.value === value);

  if (removedInput) {
    removedInput.checked = false;
  }

  const remainingChecked = container.querySelector(
    'input:not([value="all"]):checked',
  );

  const allInput = container.querySelector('input[value="all"]');

  if (allInput) {
    allInput.checked = !remainingChecked;
  }

  applyFilter();
}

function resetFilters() {
  selectedCategories = [];
  selectedBrands = [];
  selectedColors = [];
  selectedPrices = [];
  selectedBadge = "";

  [categoryFilter, brandFilter, colorFilter, priceFilter].forEach(container => {
    if (!container) return;

    container.querySelectorAll("input").forEach(input => {
      input.checked = input.value === "all";
    });
  });

  if (searchInput) {
    searchInput.value = "";
  }

  const url = new URL(window.location.href);

  url.searchParams.delete("badge");
  url.searchParams.delete("action");

  window.history.replaceState(
    {},
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );

  currentPage = 1;

  applyFilter();
}

/* --------------------------------
 * Filtering
 * -------------------------------- */

function applyFilter() {
  let result = [...products];

  if (selectedBadge) {
    result = result.filter(
      product => product.badge?.toUpperCase() === selectedBadge,
    );
  }

  if (selectedCategories.length > 0) {
    result = result.filter(product =>
      selectedCategories.includes(product.category),
    );
  }

  if (selectedBrands.length > 0) {
    result = result.filter(product => selectedBrands.includes(product.brand));
  }

  if (selectedColors.length > 0) {
    result = result.filter(product => selectedColors.includes(product.color));
  }

  if (selectedPrices.length > 0) {
    result = result.filter(product => {
      return selectedPrices.some(range => {
        if (range === "low") {
          return product.price <= 200000;
        }

        if (range === "middle") {
          return product.price > 200000 && product.price <= 400000;
        }

        if (range === "high") {
          return product.price > 400000;
        }

        return false;
      });
    });
  }

  const searchTerm = searchInput?.value.trim().toLowerCase() ?? "";

  if (searchTerm) {
    result = result.filter(product => {
      const title = product.title?.toLowerCase() ?? "";

      const brand = product.brand?.toLowerCase() ?? "";

      return title.includes(searchTerm) || brand.includes(searchTerm);
    });
  }

  filteredData = result;
  currentPage = 1;

  renderAll();
}

/* --------------------------------
 * Product Cards
 * -------------------------------- */

function paginate(data, page) {
  const start = (page - 1) * countPerPage;

  return data.slice(start, start + countPerPage);
}

function createProductCard(product) {
  const isSale =
    product.badge?.toLowerCase() === "sale" && Number(product.sale_rate) > 0;

  const displayPrice = getDisplayPrice(product);
  const badgeLabel = getBadgeLabel(product);

  const article = document.createElement("article");

  article.className = "product-card group";

  const imageArea = document.createElement("div");

  imageArea.className = "product-card__image-container";

  const imageLink = document.createElement("a");

  imageLink.href = `/detail.html?id=${product.id}`;

  imageLink.className = "product-card__image-link";

  imageLink.setAttribute("aria-label", `${product.title} 상품 상세 보기`);

  const image = document.createElement("img");

  image.src = `/${product.thumbnail}`;
  image.alt = product.title;
  image.loading = "lazy";

  image.className = "product-card__image";

  imageLink.appendChild(image);

  imageArea.appendChild(imageLink);

  if (badgeLabel) {
    const badge = document.createElement("span");

    badge.className = `product-card__badge product-card__badge--${product.badge.toLowerCase()}`;

    badge.textContent = badgeLabel;

    imageArea.appendChild(badge);
  }

  const cartButton = document.createElement("button");

  cartButton.type = "button";

  cartButton.className = "product-card__cart-button";

  cartButton.dataset.id = product.id;

  cartButton.setAttribute("aria-label", `${product.title} 장바구니에 담기`);

  cartButton.innerHTML = `
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
    </svg>
  `;

  imageArea.appendChild(cartButton);

  const content = document.createElement("div");

  content.className = "product-card__content";

  const meta = document.createElement("div");

  meta.className = "product-card__meta";

  const brand = document.createElement("p");

  brand.className = "product-card__brand";

  brand.textContent = product.brand;

  const rating = document.createElement("span");

  rating.className = "product-card__rating";

  rating.setAttribute("aria-label", `별점 5점 만점에 ${product.rating}점`);

  rating.innerHTML = `
    <span aria-hidden="true">★</span>
    <span>${product.rating}</span>
  `;

  meta.append(brand, rating);

  const title = document.createElement("h2");

  title.className = "product-card__title";

  const titleLink = document.createElement("a");

  titleLink.href = `/detail.html?id=${product.id}`;

  titleLink.setAttribute("aria-label", `${product.title} 상품 상세 보기`);

  titleLink.textContent = product.title;

  title.appendChild(titleLink);

  const info = document.createElement("div");

  info.className = "product-card__info";

  const category = document.createElement("span");

  category.textContent = getCategoryLabel(product.category);

  info.appendChild(category);

  if (product.color) {
    const separator = document.createElement("span");

    separator.setAttribute("aria-hidden", "true");

    separator.textContent = "·";

    const color = document.createElement("span");

    color.textContent = product.color;

    info.append(separator, color);
  }

  const priceArea = document.createElement("div");

  priceArea.className = "product-card__price-area";

  if (isSale) {
    const saleRate = document.createElement("span");

    saleRate.className = "product-card__sale-rate";

    saleRate.textContent = `${product.sale_rate}%`;

    priceArea.appendChild(saleRate);
  }

  const price = document.createElement("strong");

  price.className = "product-card__price";

  price.textContent = `₩${formatPrice(displayPrice)}`;

  priceArea.appendChild(price);

  if (isSale) {
    const originalPrice = document.createElement("del");

    originalPrice.className = "product-card__original-price";

    originalPrice.textContent = `₩${formatPrice(product.price)}`;

    priceArea.appendChild(originalPrice);
  }

  content.append(meta, title, info, priceArea);

  article.append(imageArea, content);

  return article;
}

function renderProducts() {
  if (!productGrid || !productEmpty) return;

  productGrid.innerHTML = "";

  if (filteredData.length === 0) {
    productGrid.classList.add("hidden");
    productEmpty.classList.remove("hidden");

    return;
  }

  productGrid.classList.remove("hidden");
  productEmpty.classList.add("hidden");

  const fragment = document.createDocumentFragment();

  const pagedData = paginate(filteredData, currentPage);

  pagedData.forEach(product => {
    fragment.appendChild(createProductCard(product));
  });

  productGrid.appendChild(fragment);
}

/* --------------------------------
 * Results
 * -------------------------------- */

function renderResultCount() {
  if (!resultCount) return;

  resultCount.textContent = `${filteredData.length} products`;

  const totalFilters = getActiveFilterTotal();

  const searchTerm = searchInput?.value.trim() ?? "";

  if (!filterSummary) return;

  if (totalFilters === 0 && !searchTerm && !selectedBadge) {
    filterSummary.classList.add("hidden");
    filterSummary.textContent = "";

    return;
  }

  const summaryParts = [];

  if (selectedBadge) {
    summaryParts.push(`${selectedBadge} COLLECTION`);
  }

  if (totalFilters > 0) {
    summaryParts.push(`${totalFilters}개 필터 적용`);
  }

  if (searchTerm) {
    summaryParts.push(`"${searchTerm}" 검색`);
  }

  filterSummary.textContent = summaryParts.join(" · ");

  filterSummary.classList.remove("hidden");
}

/* --------------------------------
 * Pagination
 * -------------------------------- */

function createPaginationButton({
  label,
  page,
  active = false,
  disabled = false,
  ariaLabel,
}) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "pagination__button";

  button.textContent = label;
  button.disabled = disabled;

  if (active) {
    button.classList.add("pagination__button--active");

    button.setAttribute("aria-current", "page");
  }

  if (ariaLabel) {
    button.setAttribute("aria-label", ariaLabel);
  }

  if (!disabled && page) {
    button.addEventListener("click", () => {
      currentPage = page;

      renderProducts();
      renderPagination();

      scrollToProducts();
    });
  }

  return button;
}

function renderPagination() {
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredData.length / countPerPage);

  if (totalPages <= 1) {
    paginationContainer.classList.add("hidden");

    return;
  }

  paginationContainer.classList.remove("hidden");

  const currentBlock = Math.floor((currentPage - 1) / pagerPerGroup);

  const startPage = currentBlock * pagerPerGroup + 1;

  const endPage = Math.min(startPage + pagerPerGroup - 1, totalPages);

  paginationContainer.appendChild(
    createPaginationButton({
      label: "←",
      page: currentPage - 1,
      disabled: currentPage === 1,
      ariaLabel: "이전 페이지",
    }),
  );

  for (let page = startPage; page <= endPage; page += 1) {
    paginationContainer.appendChild(
      createPaginationButton({
        label: String(page),
        page,
        active: page === currentPage,
        ariaLabel: `${page}페이지`,
      }),
    );
  }

  paginationContainer.appendChild(
    createPaginationButton({
      label: "→",
      page: currentPage + 1,
      disabled: currentPage === totalPages,
      ariaLabel: "다음 페이지",
    }),
  );
}

/* --------------------------------
 * Responsive Pagination
 * -------------------------------- */

function updateCountPerPage() {
  const width = window.innerWidth;

  if (width >= 1024) {
    countPerPage = 9;

    return;
  }

  if (width >= 768) {
    countPerPage = 6;

    return;
  }

  countPerPage = 6;
}

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    const previousCount = countPerPage;

    updateCountPerPage();

    if (previousCount !== countPerPage) {
      currentPage = 1;
      renderAll();
    }

    if (window.innerWidth >= 1024) {
      closeFilterPanel();
    }
  }, 150);
});

/* --------------------------------
 * Mobile Filter Panel
 * -------------------------------- */

function openFilterPanel() {
  if (!filterPanel || !filterButton || !filterBackdrop) {
    return;
  }

  filterPanel.classList.add("filter-panel--open");

  filterBackdrop.classList.add("filter-backdrop--open");

  filterButton.setAttribute("aria-expanded", "true");

  document.body.classList.add("filter-open");

  filterCloseButton?.focus();
}

function closeFilterPanel() {
  if (!filterPanel || !filterButton || !filterBackdrop) {
    return;
  }

  const wasOpen = filterPanel.classList.contains("filter-panel--open");

  filterPanel.classList.remove("filter-panel--open");

  filterBackdrop.classList.remove("filter-backdrop--open");

  filterButton.setAttribute("aria-expanded", "false");

  document.body.classList.remove("filter-open");

  if (wasOpen && window.innerWidth < 1024) {
    filterButton.focus();
  }
}

function initFilterPanel() {
  filterButton?.addEventListener("click", openFilterPanel);

  filterCloseButton?.addEventListener("click", closeFilterPanel);

  filterBackdrop?.addEventListener("click", closeFilterPanel);

  window.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      filterPanel?.classList.contains("filter-panel--open")
    ) {
      closeFilterPanel();
    }
  });
}

/* --------------------------------
 * Cart
 * -------------------------------- */

function initCartEvents() {
  productGrid?.addEventListener("click", event => {
    const button = event.target.closest(".product-card__cart-button");

    if (!button) return;

    const productId = Number(button.dataset.id);

    const product = products.find(item => item.id === productId);

    if (!product) return;

    addToCart(product);

    const originalLabel = button.getAttribute("aria-label");

    button.classList.add("product-card__cart-button--added");

    button.setAttribute("aria-label", `${product.title} 장바구니 담기 완료`);

    window.setTimeout(() => {
      button.classList.remove("product-card__cart-button--added");

      if (originalLabel) {
        button.setAttribute("aria-label", originalLabel);
      }
    }, 900);
  });
}

/* --------------------------------
 * Render
 * -------------------------------- */

function renderAll() {
  renderProducts();
  renderPagination();
  renderResultCount();
  renderActiveFilters();
}

/* --------------------------------
 * Initialize
 * -------------------------------- */

function init() {
  renderCategories();
  renderBrands();
  renderColors();
  renderPrices();

  initFilterEvents();
  initFilterPanel();
  initCartEvents();

  updateCountPerPage();

  filteredData = [...products];

  /*
   * Header의 NEW / BEST 링크에서 전달되는
   * badge query를 먼저 읽는다.
   */
  applyBadgeFromUrl();

  /*
   * 기존 Header / Main Category 링크에서 전달되는
   * action query 처리.
   */
  applyUrlFilter();

  /*
   * badge / category / 기타 필터 조건을
   * 한 번에 적용한다.
   */
  applyFilter();

  updateCartCount();
}

init();
