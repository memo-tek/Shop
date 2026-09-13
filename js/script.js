const cartStorageKey = "sneakr-cart-count";
const storedCartCount = Number.parseInt(
  window.localStorage.getItem(cartStorageKey) || "0",
  10,
);
let cartCount = Number.isNaN(storedCartCount) ? 0 : storedCartCount;

const cartCountElement = document.querySelector("#cart-count");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-link-container");
const cartLink = document.querySelector("#cart-link");

const featuredShoes = [
  { name: "Air Max 270", price: "$129.99", image: "../img/one.png" },
  { name: "Air Max 270", price: "$129.99", image: "../img/two.png" },
  { name: "Air Max 270", price: "$129.99", image: "../img/three.png" },
];

function renderFeaturedShoes() {
  const cardContainer = document.querySelector("#card-container");

  if (!cardContainer) {
    return;
  }

  featuredShoes.forEach((shoe) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.className = "card-img";
    image.src = shoe.image;
    image.alt = shoe.name;

    const bottomCard = document.createElement("div");
    bottomCard.className = "bottom-card";

    const details = document.createElement("div");
    details.className = "bottom-left-card";

    const name = document.createElement("p");
    name.className = "card-shoe-name";
    name.textContent = shoe.name;

    const price = document.createElement("p");
    price.className = "card-price";
    price.textContent = shoe.price;

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "card-btn";
    addButton.textContent = "+";
    addButton.setAttribute("aria-label", `Add ${shoe.name} to cart`);

    details.append(name, price);
    bottomCard.append(details, addButton);
    card.append(image, bottomCard);
    cardContainer.append(card);
  });
}

function updateCartCount() {
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
  window.localStorage.setItem(cartStorageKey, String(cartCount));
}

renderFeaturedShoes();
updateCartCount();

document.querySelectorAll(".card-btn").forEach((button) => {
  button.addEventListener("click", () => {
    cartCount += 1;
    updateCartCount();
  });
});

document.querySelectorAll(".favorite-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") === "true";
    const icon = button.querySelector("i");

    button.setAttribute("aria-pressed", String(!isFavorite));
    button.setAttribute(
      "aria-label",
      isFavorite ? "Add Passion to favorites" : "Remove Passion from favorites",
    );
    icon.classList.toggle("fa-regular", isFavorite);
    icon.classList.toggle("fa-solid", !isFavorite);
  });
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (cartLink) {
  cartLink.addEventListener("click", (event) => {
    event.preventDefault();
  });
}

const shopNowButton = document.querySelector("#shop-now-btn");
const discoverButton = document.querySelector("#discover-btn");
const ourStoryButton = document.querySelector("#our-story-btn");

shopNowButton?.addEventListener("click", () => {
  document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" });
});

discoverButton?.addEventListener("click", () => {
  document.querySelector("#advertisment-container")?.classList.add("is-highlighted");
});

ourStoryButton?.addEventListener("click", () => {
  document.querySelector("#mission")?.scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#form-status");
  if (status) {
    status.textContent = "Thanks! Your message has been sent.";
  }
  event.currentTarget.reset();
});
