const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));

const dob = document.getElementById("dob");
dob.addEventListener("blur", () => verifyAge(dob));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The email is not in the correct format.");
    element.reportValidity();
  } else element.setCustomValidity("");
}

function verifyAge(element) {
  const today = new Date();
  const birthDate = new Date(element.value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18 || age > 55) {
    element.setCustomValidity(
      "You must be between 18 and 55 years of age to continue."
    );
    element.reportValidity();
  } else element.setCustomValidity("");
}
const retrieveEntries = () => {
  let users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    return users;
  }
  return [];
};

const displayEntries = () => {
  let users = retrieveEntries();

  const tableEntries = users
    .map((user) => {
      let namec = `<td class="border px-4 py-2">${user.name}</td>`;
      let emailc = `<td class="border px-4 py-2">${user.email}</td>`;
      let passwordc = `<td class="border px-4 py-2">${user.password}</td>`;
      let dobc = `<td class="border px-4 py-2">${user.dob}</td>`;
      let acceptTermsc = `<td class="border px-4 py-2">${user.acceptTerms}</td>`;
      const row = `<tr>${namec}${emailc}${passwordc}${dobc}${acceptTermsc}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="border px-4 py-2"><tr><th class="border px-4 py-2">Name</th><th class="border px-4 py-2">Email</th><th class="border px-4 py-2">Password</th><th class="border px-4 py-2">Date of Birth</th><th class="border px-4 py-2">Accepted terms and conditions?</th>${tableEntries}</table>`;
  document.getElementById("entries").innerHTML = table;
};
let users = retrieveEntries();
const saveUserForm = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptTerms: acceptTerms,
  };
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  displayEntries();
  document.getElementById("entrybox").classList.remove("hidden");
};

let form = document.getElementById("form");
form.addEventListener("submit", saveUserForm);
