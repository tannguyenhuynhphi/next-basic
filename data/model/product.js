class ProductModel {
  constructor(CustomerId, Name, Address, PhoneNumber) {
    this.customerId = CustomerId;
    this.name = Name;
    this.address = Address;
    this.phoneNumber = PhoneNumber;
  }
  getCustomerId() {
    return this.customerId;
  }
  setCustomerId(customerId) {
    this.customerId = customerId;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getAddress() {
    return this.address;
  }
  setAddress(address) {
    this.address = address;
  }
  getPhoneNumber() {
    return this.phoneNumber;
  }
  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
}
export { ProductModel };
