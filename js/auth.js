const URL = "https://n36-todolist.herokuapp.com";
const singName = document.querySelector(".sign-up__user-name");
const singPassword = document.querySelector(".sign-up__user-password");
const signForm = document.querySelector(".sign-up");
const signBtn = document.querySelector(".sign-up__btn");
const singinForm = document.querySelector(".sign-in");
const loginName = document.querySelector(".sign-in__user-name");
const loginPassword = document.querySelector(".sign-in__user-password");
const signLink = document.querySelector(".sign-up__link");
const signinLink = document.querySelector(".sign-in__link");

signLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.remove("auth-body--sign-up");
  document.body.classList.add("auth-body--sign-in");
});
signinLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("auth-body--sign-up");
  document.body.classList.remove("auth-body--sign-in");
});

async function signUp() {
  const response = await fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      userName: singName.value,
      userPassword: singPassword.value,
    }),
  });
  const data = await response.json();
  console.log(data.token);
  localStorage.setItem("token", JSON.stringify(data.token));
  location.pathname = "index.html";
}
signForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signUp();
});

async function logIn() {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      login: loginName.value,
      password: loginPassword.value,
    }),
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", JSON.stringify(data.token));
    location.pathname = "index.html";
  } else if (data.token === undefined) {
    location.pathname = "auth.html";
  }
}

singinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  logIn();
});
