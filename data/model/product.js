class ProductModel {
  constructor(
    name,
    detail,
    imageUrl,
    active,
    price,
    promotion,
    quantity,
    dateCreated,
    dateUpdate
  ) {
    this.name = name;
    this.detail = detail;
    this.imageUrl = imageUrl;
    this.active = active;
    this.price = price;
    this.promotion = promotion;
    this.quantity = quantity;
    this.dateCreated = dateCreated;
    this.dateUpdate = dateUpdate;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getDetail() {
    return this.detail;
  }

  setDetail(detail) {
    this.detail = detail;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  getActive() {
    return this.active;
  }

  setActive(active) {
    this.active = active;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    this.price = price;
  }

  getPromotion() {
    return this.promotion;
  }

  setPromotion(promotion) {
    this.promotion = promotion;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getDateCreated() {
    return this.dateCreated;
  }

  setDateCreated(dateCreated) {
    this.dateCreated = dateCreated;
  }

  getDateUpdate() {
    return this.dateUpdate;
  }

  setDateUpdate(dateUpdate) {
    this.dateUpdate = dateUpdate;
  }
}
export { ProductModel };
