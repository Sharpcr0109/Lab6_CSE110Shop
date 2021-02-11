// product-item.js

var cartCount = document.getElementById("cart-count");

class ProductItem extends HTMLElement {
  static get observedAttributes() {
    return ['img', 'title', 'price', 'id'];
  }
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    let wrapper = document.createElement("li");
    wrapper.setAttribute("class", "product");

    let imgSrc;
    if (this.hasAttribute("img")) {
      imgSrc = this.getAttribute("img");
    }
    this.productImg = document.createElement("img");
    this.productImg.src = imgSrc;


    let imgAlt;
    if (this.hasAttribute("alt")) {
      imgAlt = this.getAttribute("alt");
    }
    this.productImg.alt = imgAlt;


    let titleText;
    if (this.hasAttribute("title")) {
      titleText = this.getAttribute("title");
    }
    this.Title = document.createElement("p");
    this.Title.setAttribute("class", "title");
    this.Title.innerHTML= titleText;


    let priceText;
    if (this.hasAttribute("price")) {
      priceText = this.getAttribute("price");
    }
    this.price = document.createElement("p");
    this.price.setAttribute("class", "price");
    this.price.innerHTML= priceText;

    this.addButton = document.createElement("button");
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    this.addButton.innerHTML = cartItems.indexOf(String(this.getAttribute("id"))) != -1 ? "Remove from Cart": "Add to Cart";
    this.addButton.onclick = function() {
      let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (this.addButton.innerHTML == "Add to Cart") {
        this.addButton.innerHTML = "Remove from Cart";
        if (this.hasAttribute("id")) {
          cartItems.push(this.getAttribute("id"));
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
        alert('Added to Cart!');
      } else {
        this.addButton.innerHTML = "Add to Cart";
        cartCount.innerHTML = Number(cartCount.innerHTML) - 1;
        alert('Removed from Cart!');
        if (this.hasAttribute("id")) {
          let index = cartItems.indexOf(this.getAttribute("id"));
          if (index != -1) {
            cartItems.splice(index, 1);
          }
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
        
      }
      cartCount.innerHTML = cartItems.length;
      console.log(this.getAttribute("id"));
      console.log(cartItems);
    }.bind(this);




    let style = document.createElement('style');

    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;

    shadow.appendChild(wrapper);
    shadow.appendChild(style);
    wrapper.appendChild(this.productImg);
    wrapper.appendChild(this.Title);
    wrapper.appendChild(this.price);
    wrapper.appendChild(this.addButton);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "price") {
      this.price.innerHTML = newValue;
    }
    if (name == "title") {
      this.Title.innerHTML = newValue;
    }
    if (name == "img") {
      this.productImg.setAttribute("src", newValue);
    }
    if (name == "alt") {
      this.productImg.setAttribute("alt", newValue);
    }

    if (name == "id") {
      let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      
      this.addButton.innerHTML = cartItems.indexOf(String(newValue)) != -1 ? "Remove from Cart": "Add to Cart";
      cartCount.innerHTML = cartItems.length;
    }
  }

}

customElements.define('product-item', ProductItem);