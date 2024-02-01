class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );

    this._likeIcon.addEventListener("click", () => this._handleLikeIcon());

    this._trashIcon.addEventListener("click", () => this._handleDeleteCard());
  }

  _handleLikeIcon() {
    this._likeIcon.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardTitleElement.textContent = this.name;
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;
    this._likeIcon = this._cardElement.querySelector(".card__like-button");
    this._trashIcon = this._cardElement.querySelector(".card__trash-button");
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
