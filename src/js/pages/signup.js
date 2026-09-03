import "../../css/style.css";
import "../../css/signup.css";

import "../modules/header.js";
import "../modules/footer.js";

const form = document.querySelector(".signup-form");

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const passwordInput = document.querySelector("#password");

const passwordConfirmInput = document.querySelector("#password-confirm");

const passwordToggle = document.querySelector(".password-toggle");

const socialButtons = document.querySelectorAll(".auth__social");

/* ========================================
 * Password
 * ====================================== */

function initPasswordToggle() {
  if (!passwordInput || !passwordConfirmInput || !passwordToggle) {
    return;
  }

  passwordToggle.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";

    const nextType = isVisible ? "password" : "text";

    passwordInput.type = nextType;

    passwordConfirmInput.type = nextType;

    passwordToggle.textContent = isVisible
      ? "비밀번호 보기"
      : "비밀번호 숨기기";

    passwordToggle.setAttribute("aria-pressed", String(!isVisible));
  });
}

/* ========================================
 * Form
 * ====================================== */

function initSignupForm() {
  form?.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput?.value.trim() ?? "";

    const email = emailInput?.value.trim() ?? "";

    const password = passwordInput?.value.trim() ?? "";

    const passwordConfirm = passwordConfirmInput?.value.trim() ?? "";

    if (!name || !email || !password || !passwordConfirm) {
      window.alert("모든 항목을 입력하세요.");

      if (!name) {
        nameInput?.focus();
      } else if (!email) {
        emailInput?.focus();
      } else if (!password) {
        passwordInput?.focus();
      } else {
        passwordConfirmInput?.focus();
      }

      return;
    }

    if (emailInput && !emailInput.validity.valid) {
      window.alert("올바른 이메일 형식으로 입력하세요.");

      emailInput.focus();

      return;
    }

    if (password.length < 8) {
      window.alert("비밀번호는 8자 이상 입력하세요.");

      passwordInput?.focus();

      return;
    }

    if (password !== passwordConfirm) {
      window.alert("비밀번호가 일치하지 않습니다.");

      passwordConfirmInput?.focus();

      return;
    }

    window.alert("회원가입이 완료되었습니다.");
  });
}

/* ========================================
 * Social
 * ====================================== */

function initSocialSignup() {
  socialButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.classList.contains("auth__social--naver")) {
        window.open(
          "https://nid.naver.com/user2/join/agree",
          "_blank",
          "noopener",
        );

        return;
      }

      if (button.classList.contains("auth__social--kakao")) {
        window.open(
          "https://accounts.kakao.com/weblogin/create_account",
          "_blank",
          "noopener",
        );
      }
    });
  });
}

/* ========================================
 * Init
 * ====================================== */

function init() {
  initPasswordToggle();
  initSignupForm();
  initSocialSignup();
}

init();
