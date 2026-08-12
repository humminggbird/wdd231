import setupMenu from "./nav.mjs";

setupMenu();

const summary = document.querySelector("#summary");

const params = new URLSearchParams(window.location.search);

const fields = [
  { key: "fullname", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "region", label: "Region" },
  { key: "usage", label: "What the power is for" },
  { key: "budget", label: "Budget in cedis" },
  { key: "view", label: "Panels you are interested in" },
  { key: "message", label: "Message" }
];

const list = document.createElement("dl");
list.classList.add("specs");

let found = 0;

fields.forEach((field) => {
  const value = params.get(field.key);

  if (value !== null && value !== "") {
    const term = document.createElement("dt");
    term.textContent = field.label;

    const answer = document.createElement("dd");
    answer.textContent = value;

    list.append(term, answer);
    found = found + 1;
  }
});

if (found === 0) {
  const note = document.createElement("p");
  note.classList.add("message");
  note.textContent = "No enquiry details were sent. Please fill in the form again.";
  summary.append(note);
} else {
  summary.append(list);
}
