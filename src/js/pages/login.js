import "../../css/style.css";
import "../../css/pages/auth.css";

import "../modules/header.js";
import "../modules/footer.js";

const form = document.querySelector(".login-form");

const emailInput = document.querySelector("#email");

const passwordInput = document.querySelector("#password");

const passwordToggle = document.querySelector(".password-toggle");

const socialButtons = document.querySelectorAll(".auth__social");

/* ========================================
 * Password
 * ====================================== */

function initPasswordToggle() {
  if (!passwordInput || !passwordToggle) {
    return;
  }

  passwordToggle.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";

    passwordInput.type = isVisible ? "password" : "text";

    passwordToggle.textContent = isVisible
      ? "비밀번호 보기"
      : "비밀번호 숨기기";

    passwordToggle.setAttribute("aria-pressed", String(!isVisible));
  });
}

/* ========================================
 * Form
 * ====================================== */

function initLoginForm() {
  form?.addEventListener("submit", event => {
    event.preventDefault();

    const email = emailInput?.value.trim() ?? "";

    const password = passwordInput?.value.trim() ?? "";

    if (!email || !password) {
      window.alert("이메일과 비밀번호를 모두 입력하세요.");

      if (!email) {
        emailInput?.focus();
      } else {
        passwordInput?.focus();
      }

      return;
    }

    if (emailInput && !emailInput.validity.valid) {
      window.alert("올바른 이메일 형식으로 입력하세요.");

      emailInput.focus();

      return;
    }

    window.alert("로그인되었습니다.");
  });
}

/* ========================================
 * Social
 * ====================================== */

function initSocialLogin() {
  socialButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.classList.contains("auth__social--naver")) {
        window.open(
          "https://nid.naver.com/nidlogin.login",
          "_blank",
          "noopener",
        );

        return;
      }

      if (button.classList.contains("auth__social--kakao")) {
        window.open("https://accounts.kakao.com/login/", "_blank", "noopener");
      }
    });
  });
}

/* ========================================
 * Init
 * ====================================== */

function init() {
  initPasswordToggle();
  initLoginForm();
  initSocialLogin();
}

init();
