const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="product-title">${product.title}</h3>
      <p class="common-para">Category: ${product.category}</p>
      <p class="common-para">Rate: ${product.rating.rate}</p>
      <p class="common-para">Count: ${product.rating.count}</p>
      <h4>Price: $ ${product.price}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick="productDetails(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Single Product Function

const productDetails = (id) =>{
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showSinglePro(data))
}

// Show Single Product 
const showSinglePro = data =>{
  //console.log(data);
  const singleContainer = document.getElementById('detailContainer');
  singleContainer.innerText = '';
  const div = document.createElement("div");
  div.classList.add("productDetails");
  div.innerHTML = `<div class="single-product-details">
    <img class="product-image" src=${data.image}>
    <h3>${data.title}</h3>
    <p class="common-para">Category: ${data.category}</p>
    <p class="common-para">Rate: ${data.rating.rate}</p>
    <p class="common-para">Count: ${data.rating.count}</p>
    <h4>Price: $ ${data.price}</h4>
    <button onclick="addToCart(${data.id},${data.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    `;
    singleContainer.appendChild(div);

}

// Add to Cart Section
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  //document.getElementById(id).innerText =Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
   console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal;
};

