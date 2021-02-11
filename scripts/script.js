// Script.js

var productList = document.getElementById("product-list");

window.addEventListener('DOMContentLoaded', () => {
  if (! localStorage.getItem("productItems")) {

    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => localStorage.setItem("productItems", JSON.stringify(data)))
    .then(populateItems);
  } else {
    // console.log("items found: ");
    console.log(JSON.parse(localStorage.getItem("productItems")).length);
    populateItems();
    console.log(localStorage.getItem("cartItems"));
  }
  // localStorage.clear();s


});

function populateItems() {
  let items = JSON.parse(localStorage.getItem("productItems") || "[]");
  items.forEach(element => {
    let item = document.createElement("product-item");
    item.setAttribute("img", element.image);
    item.setAttribute("title", element.title);
    item.setAttribute("price", element.price);
    item.setAttribute("alt", element.title);
    item.setAttribute("id", element.id);
    productList.appendChild(item);
  });
  // console.log(items[1]);
}
