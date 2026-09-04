import { updateCartCount } from "../utils/common.js";

const siteHeader = document.querySelector(".site__header");

function renderHeader() {
  if (!siteHeader) return;

  siteHeader.innerHTML = /* HTML */ `
    <a
      href="#content"
      class="
        fixed left-4 top-4 z-[120]
        -translate-y-24
        bg-ink px-5 py-3
        text-sm font-semibold text-white
        no-underline
        transition-transform duration-200
        focus:translate-y-0
      "
    >
      본문 바로가기
    </a>

    <div
      class="
        border-b border-line
        bg-paper/95
        backdrop-blur-md
      "
    >
      <div
        class="
          site-container
          flex h-[72px]
          items-center
          justify-between
          lg:h-20
        "
      >
        <!-- LEFT -->
        <div class="flex items-center gap-6 lg:gap-10">
          <button
            type="button"
            class="
              site-menu-open
              flex size-10
              cursor-pointer
              items-center justify-center
              rounded-full
              border-0
              bg-transparent
              text-ink
              transition-colors
              hover:bg-plum-50
              lg:hidden
            "
            aria-expanded="false"
            aria-controls="site-mobile-menu"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            >
              <path d="M4 7h16"></path>
              <path d="M4 12h16"></path>
              <path d="M4 17h16"></path>
            </svg>

            <span class="sr-only">메뉴 열기</span>
          </button>

          <a
            href="/"
            class="
              text-[1.4rem]
              font-black
              tracking-[-0.055em]
              text-ink
              no-underline
              sm:text-2xl
            "
          >
            ROUNZ
          </a>

          <!-- DESKTOP NAV -->
          <nav
            class="hidden lg:block"
            aria-label="주요 메뉴"
          >
            <ul
              class="
                m-0 flex
                list-none
                items-center
                gap-7
                p-0
              "
            >
              <!-- COLLECTION -->
              <li class="site-collection relative">
                <button
                  type="button"
                  class="
                    site-collection-button
                    flex
                    cursor-pointer
                    items-center
                    gap-1.5
                    border-0
                    bg-transparent
                    p-0
                    text-xs
                    font-semibold
                    tracking-[0.1em]
                    text-ink
                    transition-colors
                    hover:text-plum-600
                  "
                  aria-expanded="false"
                  aria-controls="site-collection-menu"
                >
                  COLLECTION

                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="
                      site-collection-icon
                      transition-transform
                      duration-200
                    "
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>

                <div
                  id="site-collection-menu"
                  class="
                    site-collection-menu
                    invisible
                    absolute
                    left-0 top-[calc(100%+1.25rem)]
                    z-50
                    min-w-[220px]
                    translate-y-2
                    border border-line
                    bg-paper
                    p-2
                    opacity-0
                    shadow-[0_16px_40px_rgb(23_21_23/0.08)]
                    transition-all
                    duration-200
                  "
                  aria-hidden="true"
                >
                  <a
                    href="/productList.html"
                    class="
                      flex
                      items-center
                      justify-between
                      px-4 py-3
                      text-sm
                      font-medium
                      text-ink
                      no-underline
                      transition-colors
                      hover:bg-plum-50
                    "
                  >
                    <span>All collection</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href="/productList.html?action=showEyewear"
                    class="
                      flex
                      items-center
                      justify-between
                      border-t border-line
                      px-4 py-3
                      text-sm
                      text-ink
                      no-underline
                      transition-colors
                      hover:bg-plum-50
                    "
                  >
                    <span>Eyewear</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href="/productList.html?action=showSunglasses"
                    class="
                      flex
                      items-center
                      justify-between
                      border-t border-line
                      px-4 py-3
                      text-sm
                      text-ink
                      no-underline
                      transition-colors
                      hover:bg-plum-50
                    "
                  >
                    <span>Sunglasses</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href="/productList.html?action=showLens"
                    class="
                      flex
                      items-center
                      justify-between
                      border-t border-line
                      px-4 py-3
                      text-sm
                      text-ink
                      no-underline
                      transition-colors
                      hover:bg-plum-50
                    "
                  >
                    <span>Lens</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href="/productList.html?action=showAccessory"
                    class="
                      flex
                      items-center
                      justify-between
                      border-t border-line
                      px-4 py-3
                      text-sm
                      text-ink
                      no-underline
                      transition-colors
                      hover:bg-plum-50
                    "
                  >
                    <span>Accessory</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>

              <!-- NEW -->
              <li>
                <a
                  href="/productList.html?badge=NEW"
                  class="
                    text-xs
                    font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  NEW
                </a>
              </li>

              <!-- BEST -->
              <li>
                <a
                  href="/productList.html?badge=BEST"
                  class="
                    text-xs
                    font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  BEST
                </a>
              </li>

              <!-- EDITORIAL -->
              <li>
                <a
                  href="/#editorial"
                  class="
                    text-xs
                    font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  EDITORIAL
                </a>
              </li>

              <!-- GUIDE -->
              <li>
                <a
                  href="/#support"
                  class="
                    text-xs
                    font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  GUIDE
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- RIGHT -->
        <ul
          class="
            m-0 flex
            list-none
            items-center
            gap-1
            p-0
            sm:gap-2
          "
        >
          <li class="hidden sm:block">
            <a
              href="/productList.html"
              class="
                flex size-10
                items-center justify-center
                rounded-full
                text-ink
                no-underline
                transition-colors
                hover:bg-plum-50
              "
              aria-label="상품 검색"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="7"></circle>
                <path d="m20 20-3.5-3.5"></path>
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/login.html"
              class="
                flex size-10
                items-center justify-center
                rounded-full
                text-ink
                no-underline
                transition-colors
                hover:bg-plum-50
              "
              aria-label="로그인"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/cart.html"
              class="
                relative
                flex size-10
                items-center justify-center
                rounded-full
                text-ink
                no-underline
                transition-colors
                hover:bg-plum-50
              "
              aria-label="장바구니"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 8h14l-1 12H6L5 8Z"></path>
                <path d="M9 8a3 3 0 0 1 6 0"></path>
              </svg>

              <span
                class="
                  cart__counter
                  absolute right-0 top-0
                  flex min-w-4
                  items-center justify-center
                  rounded-full
                  bg-plum-700
                  px-1
                  text-[10px]
                  font-bold
                  leading-4
                  text-white
                "
              >
                0
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div
      id="site-mobile-menu"
      class="
        site-mobile-menu
        invisible
        fixed inset-0 z-50
        opacity-0
        transition-[opacity,visibility]
        duration-300
        lg:hidden
      "
      aria-hidden="true"
    >
      <button
        type="button"
        class="
          site-menu-backdrop
          absolute inset-0
          cursor-default
          border-0
          bg-black/40
        "
        aria-label="메뉴 닫기"
        tabindex="-1"
      ></button>

      <div
        class="
          site-mobile-panel
          absolute inset-y-0 left-0
          flex
          w-[min(88vw,380px)]
          -translate-x-full
          flex-col
          bg-paper
          p-6
          transition-transform
          duration-300
          ease-out
        "
      >
        <div class="flex items-center justify-between">
          <a
            href="/"
            class="
              text-xl
              font-black
              tracking-[-0.05em]
              text-ink
              no-underline
            "
          >
            ROUNZ
          </a>

          <button
            type="button"
            class="
              site-menu-close
              flex size-10
              cursor-pointer
              items-center justify-center
              rounded-full
              border-0
              bg-transparent
              text-ink
              transition-colors
              hover:bg-plum-50
            "
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            >
              <path d="M6 6l12 12"></path>
              <path d="M18 6 6 18"></path>
            </svg>

            <span class="sr-only">메뉴 닫기</span>
          </button>
        </div>

        <nav
          class="mt-12"
          aria-label="모바일 메뉴"
        >
          <ul class="m-0 list-none p-0">
            <!-- COLLECTION -->
            <li>
              <button
                type="button"
                class="
                  site-mobile-collection-button
                  flex w-full
                  cursor-pointer
                  items-center
                  justify-between
                  border-0
                  border-b border-line
                  bg-transparent
                  py-5
                  text-left
                  text-xl
                  font-medium
                  tracking-[-0.03em]
                  text-ink
                "
                aria-expanded="true"
                aria-controls="site-mobile-collection-menu"
              >
                <span>Collection</span>

                <span
                  class="
                    site-mobile-collection-icon
                    rotate-45
                    text-xl
                    font-light
                    transition-transform
                  "
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                id="site-mobile-collection-menu"
                class="
                  site-mobile-collection-menu
                  border-b border-line
                  bg-plum-50/50
                  px-4 py-2
                "
              >
                <a
                  href="/productList.html"
                  class="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-sm
                    text-ink
                    no-underline
                  "
                >
                  <span>All collection</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="/productList.html?action=showEyewear"
                  class="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-sm
                    text-ink
                    no-underline
                  "
                >
                  <span>Eyewear</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="/productList.html?action=showSunglasses"
                  class="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-sm
                    text-ink
                    no-underline
                  "
                >
                  <span>Sunglasses</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="/productList.html?action=showLens"
                  class="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-sm
                    text-ink
                    no-underline
                  "
                >
                  <span>Lens</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="/productList.html?action=showAccessory"
                  class="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-sm
                    text-ink
                    no-underline
                  "
                >
                  <span>Accessory</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </li>

            <li>
              <a
                href="/productList.html?badge=NEW"
                class="
                  flex
                  items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl
                  font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>New</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li>
              <a
                href="/productList.html?badge=BEST"
                class="
                  flex
                  items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl
                  font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Best</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li>
              <a
                href="/#editorial"
                class="
                  flex
                  items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl
                  font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Editorial</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li>
              <a
                href="/#support"
                class="
                  flex
                  items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl
                  font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Guide</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>

        <div
          class="
            mt-auto
            border-t border-line
            pt-6
          "
        >
          <p
            class="
              m-0
              text-[0.7rem]
              uppercase
              tracking-[0.22em]
              text-muted
            "
          >
            See yourself differently.
          </p>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------
 * Desktop Collection Menu
 * -------------------------------- */

function initCollectionMenu() {
  const wrapper = document.querySelector(".site-collection");
  const button = document.querySelector(".site-collection-button");
  const menu = document.querySelector(".site-collection-menu");
  const icon = document.querySelector(".site-collection-icon");

  if (!wrapper || !button || !menu || !icon) return;

  let closeTimer;

  function openCollectionMenu() {
    window.clearTimeout(closeTimer);

    menu.classList.remove("invisible", "opacity-0", "translate-y-2");

    menu.classList.add("visible", "opacity-100", "translate-y-0");

    icon.classList.add("rotate-180");

    menu.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
  }

  function closeCollectionMenu() {
    menu.classList.add("invisible", "opacity-0", "translate-y-2");

    menu.classList.remove("visible", "opacity-100", "translate-y-0");

    icon.classList.remove("rotate-180");

    menu.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
  }

  function scheduleClose() {
    closeTimer = window.setTimeout(closeCollectionMenu, 120);
  }

  wrapper.addEventListener("mouseenter", openCollectionMenu);

  wrapper.addEventListener("mouseleave", scheduleClose);

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeCollectionMenu();
      return;
    }

    openCollectionMenu();
  });

  button.addEventListener("keydown", event => {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      openCollectionMenu();

      menu.querySelector("a")?.focus();
    }
  });

  menu.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCollectionMenu();
      button.focus();
    }
  });

  document.addEventListener("click", event => {
    if (!wrapper.contains(event.target)) {
      closeCollectionMenu();
    }
  });
}

/* --------------------------------
 * Mobile Collection Accordion
 * -------------------------------- */

function initMobileCollection() {
  const button = document.querySelector(".site-mobile-collection-button");

  const menu = document.querySelector(".site-mobile-collection-menu");

  const icon = document.querySelector(".site-mobile-collection-icon");

  if (!button || !menu || !icon) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));

    menu.classList.toggle("hidden", isOpen);
    icon.classList.toggle("rotate-45", !isOpen);
  });
}

/* --------------------------------
 * Mobile Menu
 * -------------------------------- */

function initMobileMenu() {
  const openButton = document.querySelector(".site-menu-open");

  const closeButton = document.querySelector(".site-menu-close");

  const backdrop = document.querySelector(".site-menu-backdrop");

  const menu = document.querySelector(".site-mobile-menu");

  const panel = document.querySelector(".site-mobile-panel");

  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  if (!openButton || !closeButton || !backdrop || !menu || !panel) {
    return;
  }

  let previousFocusedElement = null;

  function setPageInert(isInert) {
    if (main) {
      main.toggleAttribute("inert", isInert);
    }

    if (footer) {
      footer.toggleAttribute("inert", isInert);
    }
  }

  function openMenu() {
    previousFocusedElement = document.activeElement;

    menu.classList.remove("invisible", "opacity-0");

    menu.classList.add("visible", "opacity-100");

    panel.classList.remove("-translate-x-full");
    panel.classList.add("translate-x-0");

    menu.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");

    setPageInert(true);

    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeMenu() {
    menu.classList.add("invisible", "opacity-0");

    menu.classList.remove("visible", "opacity-100");

    panel.classList.add("-translate-x-full");
    panel.classList.remove("translate-x-0");

    menu.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");

    setPageInert(false);

    document.body.style.removeProperty("overflow");

    previousFocusedElement?.focus();
  }

  openButton.addEventListener("click", openMenu);

  closeButton.addEventListener("click", closeMenu);

  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", event => {
    const isOpen = menu.getAttribute("aria-hidden") === "false";

    if (event.key === "Escape" && isOpen) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 1024 &&
      menu.getAttribute("aria-hidden") === "false"
    ) {
      closeMenu();
    }
  });
}

/* --------------------------------
 * Initialize
 * -------------------------------- */

renderHeader();

initCollectionMenu();
initMobileCollection();
initMobileMenu();

updateCartCount();
