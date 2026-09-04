const siteFooter = document.querySelector(".site__footer");

function renderFooter() {
  if (!siteFooter) return;

  siteFooter.innerHTML = /* HTML */ `
    <div
      class="
        border-t border-white/10
        bg-ink
        text-white
      "
    >
      <div
        class="
          site-container
          grid gap-12
          py-14
          md:grid-cols-2
          md:py-20
          lg:grid-cols-[1.5fr_0.65fr_0.65fr]
        "
      >
        <!-- 브랜드 -->
        <div>
          <a
            href="/"
            class="
              inline-block
              text-3xl
              font-black
              tracking-[-0.055em]
              text-white
              no-underline
            "
          >
            ROUNZ
          </a>

          <p
            class="
              mb-0 mt-5
              max-w-sm
              text-sm
              leading-7
              text-white/55
            "
          >
            안경을 고르는 순간부터 매일 착용하는 순간까지,
            나다운 시선을 발견할 수 있는 아이웨어 경험을 제안합니다.
          </p>
        </div>

        <!-- SHOP -->
        <div>
          <h2
            class="
              m-0
              text-[0.7rem]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white/40
            "
          >
            Shop
          </h2>

          <ul
            class="
              mb-0 mt-5
              list-none
              space-y-3
              p-0
              text-sm
            "
          >
            <li>
              <a
                href="/productList.html?action=showEyewear"
                class="
                  text-white/70
                  no-underline
                  transition-colors
                  hover:text-white
                "
              >
                Eyewear
              </a>
            </li>

            <li>
              <a
                href="/productList.html?action=showSunglasses"
                class="
                  text-white/70
                  no-underline
                  transition-colors
                  hover:text-white
                "
              >
                Sunglasses
              </a>
            </li>

            <li>
              <a
                href="/productList.html?action=showLens"
                class="
                  text-white/70
                  no-underline
                  transition-colors
                  hover:text-white
                "
              >
                Lens
              </a>
            </li>

            <li>
              <a
                href="/productList.html?action=showAccessory"
                class="
                  text-white/70
                  no-underline
                  transition-colors
                  hover:text-white
                "
              >
                Accessory
              </a>
            </li>
          </ul>
        </div>

        <!-- SUPPORT -->
        <div>
          <h2
            class="
              m-0
              text-[0.7rem]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white/40
            "
          >
            Support
          </h2>

          <ul
            class="
              mb-0 mt-5
              list-none
              space-y-3
              p-0
              text-sm
            "
          >
            <li>
              <button
                type="button"
                class="
                  footer-support-button
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-white
                "
              >
                회사소개
              </button>
            </li>

            <li>
              <button
                type="button"
                class="
                  footer-support-button
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-white
                "
              >
                이용약관
              </button>
            </li>

            <li>
              <button
                type="button"
                class="
                  footer-support-button
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-white
                "
              >
                개인정보처리방침
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="site-container">
        <div
          class="
            flex flex-col
            gap-3
            border-t border-white/10
            py-6
            text-xs
            leading-5
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <span>고객센터 1588-0000</span>

            <span class="mx-2 hidden sm:inline">
              /
            </span>

            <span class="block sm:inline">
              평일 09:00–18:00
            </span>
          </div>

          <small>
            © 2026 ROUNZ Inc. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  `;
}

function initFooterSupportButtons() {
  const supportButtons = document.querySelectorAll(".footer-support-button");

  supportButtons.forEach(button => {
    button.addEventListener("click", () => {
      window.alert("준비 중인 메뉴입니다.");
    });
  });
}

renderFooter();
initFooterSupportButtons();
