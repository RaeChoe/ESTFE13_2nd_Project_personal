import "../../css/style.css";
import "../../css/pages/cart.css";

import productData from "../../../data/products.json";

import "../modules/header.js";
import "../modules/footer.js";

import { readCart, updateCartCount, writeCart } from "../utils/common.js";

const products = productData.products;

const selectedIds = new Set();

const cartList = document.querySelector(".cart__list");

const selectAllCheckbox = document.querySelector(".cart__select-all-checkbox");

const selectDeleteButton = document.querySelector(".cart__delete-btn");

const purchaseButton = document.querySelector(".cart-summary__purchase-btn");

/* ========================================
 * Helpers
 * ====================================== */

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(Number(price));
}

function getCartItems() {
  return readCart();
}

function saveCartItems(items) {
  writeCart(items);
}

/* ========================================
 * Selection
 * ====================================== */

function selectAllCartItems() {
  const cartItems = getCartItems();

  selectedIds.clear();

  cartItems.forEach(item => {
    selectedIds.add(item.id);
  });
}

function syncSelectAllCheckbox() {
  const cartItems = getCartItems();

  if (!selectAllCheckbox) return;

  if (cartItems.length === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.disabled = true;

    return;
  }

  selectAllCheckbox.disabled = false;

  selectAllCheckbox.checked = selectedIds.size === cartItems.length;
}

/* ========================================
 * Cart Count
 * ====================================== */

function renderCartCount() {
  const target = document.querySelector(".cart__count-value");

  if (!target) return;

  target.textContent = String(getCartItems().length);
}

/* ========================================
 * Cart Item
 * ====================================== */

function createCartItem(item) {
  const listItem = document.createElement("li");

  listItem.className = `
    cart__item
    grid
    grid-cols-[1.25rem_5.5rem_minmax(0,1fr)]
    gap-4
    border-b
    border-line
    py-6
    sm:grid-cols-[1.25rem_8rem_minmax(0,1fr)_auto]
    sm:items-center
    sm:gap-5
  `;

  /* 선택 */
  const checkboxWrap = document.createElement("div");

  checkboxWrap.className = "self-start pt-1 sm:self-center sm:pt-0";

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.id = `cart-item-${item.id}`;

  checkbox.className = "cart__checkbox-input sr-only";

  checkbox.dataset.id = String(item.id);

  checkbox.checked = selectedIds.has(item.id);

  const checkboxLabel = document.createElement("label");

  checkboxLabel.htmlFor = checkbox.id;

  checkboxLabel.className = `
    cart__checkbox-label
    flex
    size-5
    cursor-pointer
    items-center
    justify-center
    border
    border-line
  `;

  checkboxLabel.innerHTML = `
    <svg
      class="cart__checkbox-check hidden"
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12L9 16L19 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `;

  checkboxWrap.append(checkbox, checkboxLabel);

  /* 이미지 */
  const imageLink = document.createElement("a");

  imageLink.href = `/detail.html?id=${item.id}`;

  imageLink.className = `
    block
    overflow-hidden
    bg-[#efede9]
  `;

  imageLink.setAttribute("aria-label", `${item.title} 상품 상세 보기`);

  const image = document.createElement("img");

  image.src = item.thumb.startsWith("/") ? item.thumb : `/${item.thumb}`;

  image.alt = item.title;

  image.className = `
    aspect-square
    w-full
    object-cover
  `;

  imageLink.appendChild(image);

  /* 상품 정보 */
  const info = document.createElement("div");

  info.className = "min-w-0 self-start sm:self-center";

  const brand = document.createElement("p");

  brand.className = `
    m-0
    text-[0.65rem]
    font-semibold
    uppercase
    tracking-[0.12em]
    text-muted
  `;

  brand.textContent = item.brand;

  const title = document.createElement("h3");

  title.className = "m-0 mt-2";

  const titleLink = document.createElement("a");

  titleLink.href = `/detail.html?id=${item.id}`;

  titleLink.className = `
    line-clamp-2
    text-sm
    font-medium
    leading-6
    text-ink
    no-underline
    transition-colors
    hover:text-plum-700
  `;

  titleLink.textContent = item.title;

  title.appendChild(titleLink);

  const price = document.createElement("strong");

  price.className = `
    mt-3
    block
    text-sm
    font-semibold
  `;

  price.textContent = `${formatPrice(item.price)}원`;

  const mobileActions = document.createElement("div");

  mobileActions.className = `
    mt-5
    flex
    items-center
    justify-between
    gap-4
    sm:hidden
  `;

  mobileActions.append(createQuantityControl(item), createRemoveButton(item));

  info.append(brand, title, price, mobileActions);

  /* 데스크톱 컨트롤 */
  const desktopActions = document.createElement("div");

  desktopActions.className = `
    col-start-3
    flex
    items-center
    justify-between
    gap-5
    sm:col-start-auto
    sm:flex-col
    sm:items-end
  `;

  const lineTotal = document.createElement("strong");

  lineTotal.className = `
    hidden
    whitespace-nowrap
    text-sm
    font-semibold
    sm:block
  `;

  lineTotal.textContent = `${formatPrice(item.price * item.qty)}원`;

  const controls = document.createElement("div");

  controls.className = `
    hidden
    items-center
    gap-5
    sm:flex
  `;

  controls.append(createQuantityControl(item), createRemoveButton(item));

  desktopActions.append(lineTotal, controls);

  listItem.append(checkboxWrap, imageLink, info, desktopActions);

  return listItem;
}

function createQuantityControl(item) {
  const control = document.createElement("div");

  control.className = `
    cart__quantity-control
    grid
    h-10
    grid-cols-[2.3rem_2.7rem_2.3rem]
    border
    border-line
  `;

  const decrease = document.createElement("button");

  decrease.type = "button";

  decrease.dataset.id = String(item.id);

  decrease.className = `
    cart__quantity-btn
    cart__quantity-btn--decrease
    cursor-pointer
    border-0
    bg-transparent
    text-base
    transition-colors
    hover:bg-plum-50
    disabled:cursor-not-allowed
    disabled:text-line
  `;

  decrease.setAttribute("aria-label", `${item.title} 수량 줄이기`);

  decrease.textContent = "−";

  decrease.disabled = item.qty <= 1;

  const quantity = document.createElement("span");

  quantity.className = `
    flex
    items-center
    justify-center
    border-x
    border-line
    text-xs
    font-medium
  `;

  quantity.textContent = String(item.qty);

  const increase = document.createElement("button");

  increase.type = "button";

  increase.dataset.id = String(item.id);

  increase.className = `
    cart__quantity-btn
    cart__quantity-btn--increase
    cursor-pointer
    border-0
    bg-transparent
    text-base
    transition-colors
    hover:bg-plum-50
  `;

  increase.setAttribute("aria-label", `${item.title} 수량 늘리기`);

  increase.textContent = "+";

  control.append(decrease, quantity, increase);

  return control;
}

function createRemoveButton(item) {
  const button = document.createElement("button");

  button.type = "button";

  button.dataset.id = String(item.id);

  button.className = `
    cart__remove-btn
    cursor-pointer
    border-0
    bg-transparent
    p-0
    text-xs
    text-muted
    underline
    decoration-line
    underline-offset-4
    transition-colors
    hover:text-plum-700
  `;

  button.textContent = "삭제";

  button.setAttribute("aria-label", `${item.title} 장바구니에서 삭제`);

  return button;
}

/* ========================================
 * Render Cart
 * ====================================== */

function renderCart() {
  if (!cartList) return;

  const cartItems = getCartItems();

  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    cartList.innerHTML = `
      <li
        class="
          flex
          min-h-[28rem]
          flex-col
          items-center
          justify-center
          border-y
          border-line
          px-6
          py-16
          text-center
        "
      >
        <p
          class="
            m-0
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            text-muted
          "
        >
          YOUR BAG IS EMPTY
        </p>

        <h2
          class="
            mb-0
            mt-4
            text-3xl
            font-medium
            tracking-[-0.04em]
          "
        >
          장바구니가 비어있습니다.
        </h2>

        <p
          class="
            mb-0
            mt-3
            text-sm
            text-muted
          "
        >
          마음에 드는 아이웨어를 둘러보세요.
        </p>

        <a
          href="/productList.html"
          class="
            mt-8
            inline-flex
            min-h-12
            items-center
            justify-center
            bg-ink
            px-7
            text-sm
            font-semibold
            text-white
            no-underline
            transition-colors
            hover:bg-plum-700
          "
        >
          상품 보러가기
        </a>
      </li>
    `;

    renderCartCount();
    syncSelectAllCheckbox();

    return;
  }

  const fragment = document.createDocumentFragment();

  cartItems.forEach(item => {
    fragment.appendChild(createCartItem(item));
  });

  cartList.appendChild(fragment);

  renderCartCount();
  syncSelectAllCheckbox();
}

/* ========================================
 * Quantity
 * ====================================== */

function increaseQty(id) {
  const cartItems = getCartItems();

  const item = cartItems.find(cartItem => cartItem.id === id);

  if (!item) return;

  item.qty += 1;

  saveCartItems(cartItems);

  refreshCart();
}

function decreaseQty(id) {
  const cartItems = getCartItems();

  const item = cartItems.find(cartItem => cartItem.id === id);

  if (!item) return;

  if (item.qty <= 1) {
    return;
  }

  item.qty -= 1;

  saveCartItems(cartItems);

  refreshCart();
}

/* ========================================
 * Delete
 * ====================================== */

function removeCartItem(id) {
  const cartItems = getCartItems();

  const updatedCart = cartItems.filter(item => item.id !== id);

  saveCartItems(updatedCart);

  selectedIds.delete(id);

  refreshCart();
}

function deleteSelectedItems() {
  if (selectedIds.size === 0) {
    return;
  }

  const cartItems = getCartItems();

  const updatedCart = cartItems.filter(item => !selectedIds.has(item.id));

  saveCartItems(updatedCart);

  selectedIds.clear();

  refreshCart();
}

/* ========================================
 * Summary
 * ====================================== */

function calculateSummary() {
  const cartItems = getCartItems();

  const selectedItems = cartItems.filter(item => selectedIds.has(item.id));

  const selectedQuantity = selectedItems.reduce(
    (total, item) => total + item.qty,
    0,
  );

  const productTotal = selectedItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.qty),
    0,
  );

  const shippingFee = 0;

  const finalTotal = productTotal + shippingFee;

  return {
    selectedItems,
    selectedQuantity,
    productTotal,
    shippingFee,
    finalTotal,
  };
}

function renderSummary() {
  const {
    selectedItems,
    selectedQuantity,
    productTotal,
    shippingFee,
    finalTotal,
  } = calculateSummary();

  const count = document.querySelector(".cart-summary__selected-count");

  const productTotalElement = document.querySelector(
    ".cart-summary__product-total",
  );

  const shipping = document.querySelector(".cart-summary__shipping");

  const final = document.querySelector(".cart-summary__final-total");

  if (count) {
    count.textContent = `${selectedQuantity}개`;
  }

  if (productTotalElement) {
    productTotalElement.textContent = `${formatPrice(productTotal)}원`;
  }

  if (shipping) {
    shipping.textContent = `${formatPrice(shippingFee)}원`;
  }

  if (final) {
    final.textContent = `${formatPrice(finalTotal)}원`;
  }

  if (purchaseButton) {
    purchaseButton.disabled = selectedItems.length === 0;
  }
}

/* ========================================
 * Recommend
 * ====================================== */

function getRecommendProducts() {
  const cartIds = new Set(getCartItems().map(item => item.id));

  const filtered = products.filter(product => !cartIds.has(product.id));

  /*
    BEST / NEW 상품을 우선 보여주고
    부족하면 일반 상품으로 채운다.
  */
  return [...filtered]
    .sort((a, b) => {
      const badgeScore = item => {
        const badge = item.badge?.toUpperCase();

        if (badge === "BEST") {
          return 2;
        }

        if (badge === "NEW") {
          return 1;
        }

        return 0;
      };

      return badgeScore(b) - badgeScore(a);
    })
    .slice(0, 4);
}

function renderRecommend() {
  const list = document.querySelector(".recommend__list");

  if (!list) return;

  list.innerHTML = "";

  const fragment = document.createDocumentFragment();

  getRecommendProducts().forEach(product => {
    const item = document.createElement("li");

    item.className = "group min-w-0";

    const imageLink = document.createElement("a");

    imageLink.href = `/detail.html?id=${product.id}`;

    imageLink.className = `
        block
        overflow-hidden
        bg-[#efede9]
      `;

    const image = document.createElement("img");

    image.src = `/${product.thumbnail}`;

    image.alt = product.title;

    image.loading = "lazy";

    image.className = `
        aspect-[5/3]
        w-full
        object-cover
        transition-transform
        duration-500
        group-hover:scale-[1.025]
      `;

    imageLink.appendChild(image);

    const brand = document.createElement("p");

    brand.className = `
        m-0
        mt-4
        text-[0.65rem]
        font-semibold
        uppercase
        tracking-[0.12em]
        text-muted
      `;

    brand.textContent = product.brand;

    const title = document.createElement("h3");

    title.className = "m-0 mt-1";

    const titleLink = document.createElement("a");

    titleLink.href = `/detail.html?id=${product.id}`;

    titleLink.className = `
        line-clamp-1
        text-sm
        font-medium
        text-ink
        no-underline
        transition-colors
        hover:text-plum-700
      `;

    titleLink.textContent = product.title;

    title.appendChild(titleLink);

    const price = document.createElement("strong");

    price.className = `
        mt-3
        block
        text-sm
        font-semibold
      `;

    const salePrice =
      product.badge?.toLowerCase() === "sale" && Number(product.sale_rate) > 0
        ? Math.round(
            Number(product.price) * (1 - Number(product.sale_rate) / 100),
          )
        : Number(product.price);

    price.textContent = `${formatPrice(salePrice)}원`;

    item.append(imageLink, brand, title, price);

    fragment.appendChild(item);
  });

  list.appendChild(fragment);
}

/* ========================================
 * Events
 * ====================================== */

function initCartEvents() {
  cartList?.addEventListener("click", event => {
    const increaseButton = event.target.closest(
      ".cart__quantity-btn--increase",
    );

    const decreaseButton = event.target.closest(
      ".cart__quantity-btn--decrease",
    );

    const removeButton = event.target.closest(".cart__remove-btn");

    if (increaseButton) {
      increaseQty(Number(increaseButton.dataset.id));

      return;
    }

    if (decreaseButton) {
      decreaseQty(Number(decreaseButton.dataset.id));

      return;
    }

    if (removeButton) {
      removeCartItem(Number(removeButton.dataset.id));
    }
  });

  cartList?.addEventListener("change", event => {
    const checkbox = event.target.closest(".cart__checkbox-input");

    if (!checkbox) return;

    const id = Number(checkbox.dataset.id);

    if (checkbox.checked) {
      selectedIds.add(id);
    } else {
      selectedIds.delete(id);
    }

    syncSelectAllCheckbox();
    renderSummary();
  });

  selectAllCheckbox?.addEventListener("change", () => {
    if (selectAllCheckbox.checked) {
      selectAllCartItems();
    } else {
      selectedIds.clear();
    }

    renderCart();
    renderSummary();
  });

  selectDeleteButton?.addEventListener("click", deleteSelectedItems);

  purchaseButton?.addEventListener("click", () => {
    if (selectedIds.size === 0) {
      return;
    }

    /*
        현재 프로젝트에는 별도의 결제 페이지가 없으므로
        우선 클릭 피드백만 제공한다.
        추후 주문/결제 페이지가 생기면 여기서 이동 처리.
      */
    window.alert("선택한 상품의 주문 기능은 추후 연결할 예정입니다.");
  });
}

/* ========================================
 * Refresh
 * ====================================== */

function refreshCart() {
  /*
    삭제 이후 존재하지 않는 상품 ID가
    selectedIds에 남아있지 않도록 정리
  */
  const validIds = new Set(getCartItems().map(item => item.id));

  [...selectedIds].forEach(id => {
    if (!validIds.has(id)) {
      selectedIds.delete(id);
    }
  });

  renderCart();
  renderSummary();
  renderRecommend();
  updateCartCount();
}

/* ========================================
 * Init
 * ====================================== */

function init() {
  /*
    장바구니 최초 진입 시
    모든 상품을 선택된 상태로 시작
  */
  selectAllCartItems();

  renderCart();
  renderSummary();
  renderRecommend();

  initCartEvents();

  updateCartCount();
}

init();
