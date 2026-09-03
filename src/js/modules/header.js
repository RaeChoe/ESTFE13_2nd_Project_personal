import { updateCartCount } from "../utils/common.js";

const siteHeader = document.querySelector(".site__header");

function renderHeader() {
  if (!siteHeader) return;

  siteHeader.innerHTML = /* HTML */ `
    <a
      href="#content"
      class="
        fixed left-4 top-4 z-[100]
        -translate-y-24
        bg-ink px-5 py-3
        text-sm font-semibold text-white
        no-underline
        transition-transform duration-200
        focus:translate-y-0
      "
    >
      컨텐츠로 바로가기
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
        <!-- 왼쪽 -->
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

            <span class="visually-hidden">메뉴 열기</span>
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
              <li>
                <a
                  href="/productList.html?action=showEyewear"
                  class="
                    text-xs font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  EYEWEAR
                </a>
              </li>

              <li>
                <a
                  href="/productList.html?action=showSunglasses"
                  class="
                    text-xs font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  SUNGLASSES
                </a>
              </li>

              <li>
                <a
                  href="/productList.html?action=showLens"
                  class="
                    text-xs font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  LENS
                </a>
              </li>

              <li>
                <a
                  href="/productList.html?action=showAccessory"
                  class="
                    text-xs font-semibold
                    tracking-[0.1em]
                    text-ink
                    no-underline
                    transition-colors
                    hover:text-plum-600
                  "
                >
                  ACCESSORY
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- 오른쪽 -->
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

    <!-- 모바일 메뉴 -->
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

            <span class="visually-hidden">메뉴 닫기</span>
          </button>
        </div>

        <nav
          class="mt-14"
          aria-label="모바일 메뉴"
        >
          <ul
            class="
              m-0
              list-none
              p-0
            "
          >
            <li>
              <a
                href="/productList.html?action=showEyewear"
                class="
                  flex items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Eyewear</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li>
              <a
                href="/productList.html?action=showSunglasses"
                class="
                  flex items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Sunglasses</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li>
              <a
                href="/productList.html?action=showLens"
                class="
                  flex items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Lens</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li>
              <a
                href="/productList.html?action=showAccessory"
                class="
                  flex items-center
                  justify-between
                  border-b border-line
                  py-5
                  text-xl font-medium
                  tracking-[-0.03em]
                  text-ink
                  no-underline
                "
              >
                <span>Accessory</span>
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

renderHeader();
initMobileMenu();
updateCartCount();
