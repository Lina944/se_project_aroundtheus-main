class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getCardElement();
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._likeIcon = this._cardElement.querySelector(".card__like-button");
    this._trashIcon = this._cardElement.querySelector(".card__trash-button");
    this._setEventListeners();
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

  _getCardElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardTitleElement.textContent = this.name;
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;

    return this._cardElement;
  }
}

export default Card;

