import Card from "../componets/Card.js";
import FormValidator from "../componets/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDecriptionInput = document.querySelector(
  "#modal-description-input"
);
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");

const cardListElement = document.querySelector(".cards__list");

const cardPictureModal = document.querySelector("#card-picture-modal");
const cardPictureElement = cardPictureModal.querySelector("#modal-picture");
const cardPictureTitle = cardPictureModal.querySelector(
  ".modal__picture-heading"
);

const addCardForm = document.forms["modal-add-form"];
const profileEditForm = document.forms["modal-form"];

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEsc);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEsc);
  // formValidators[].resetValidation();
}

const isEscapeEvent = (e, action) => {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".modal_opened");
    action(activePopup);
  }
};

function handleEsc(e) {
  isEscapeEvent(e, closePopup);
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (e.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleProfileAddSubmit);

function handleProfileEditSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDecriptionInput.value;
  closePopup(profileEditModal);
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  const name = e.target.title.value;
  const link = e.target.link.value;
  renderCard({ name, link }, cardListElement);
  closePopup(cardAddModal);
  e.target.reset();
  formValidators[addCardForm.getAttribute("name")].resetValidation();
}

profileEditButton.addEventListener("click", () => {
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDecriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

function handleImageClick(data) {
  cardPictureElement.src = data.link;
  cardPictureElement.alt = data.name;
  cardPictureTitle.textContent = data.name;
  openPopup(cardPictureModal);
}

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(data, container) {
  const cardElement = createCard(data);
  container.prepend(cardElement);
}

initialCards.forEach(function (data) {
  renderCard(data, cardListElement);
});

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};

// const editFormValidator = new FormValidator(config, profileEditForm);
// editFormValidator.enableValidation();

// const addFormValidator = new FormValidator(config, addCardForm);
// addFormValidator.enableValidation();

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
