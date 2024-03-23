class ShoppingListItem {
    constructor(id, name, quantity, purchased) {
      this._id = id;
      this._name = name;
      this._quantity = quantity;
      this._purchased = purchased;
    }
  
    // Getters
    get id() {
      return this._id;
    }
  
    get name() {
      return this._name;
    }
  
    get quantity() {
      return this._quantity;
    }
  
    get purchased() {
      return this._purchased;
    }
  
    // Setters
    set id(value) {
      this._id = value;
    }
  
    set name(value) {
      this._name = value;
    }
  
    set quantity(value) {
      this._quantity = value;
    }
  
    set purchased(value) {
      this._purchased = value;
    }
  }
  
  export default ShoppingListItem;
  