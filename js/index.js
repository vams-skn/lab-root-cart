function updateSubtotal(product) {
  const priceTag = product.querySelector('.price span');
  const quantityTag = product.querySelector('.quantity input');
  let price = parseFloat(priceTag.textContent);
  let quantity = parseInt(quantityTag.value);
  let subTotal = price*quantity;
  const subtotalTag = product.querySelector('.subtotal span');
  subtotalTag.textContent = subTotal;
  return subTotal;
}

function calculateAll() {
  const p = document.getElementsByClassName('product');
  let products = [...p];
  let total = 0;
  products.forEach(product => {
    total += updateSubtotal(product);
  });
  
  let totalTag = document.querySelector('#total-value span');
  totalTag.innerHTML = total;
}

function removeProduct(event) {
  const target = event.currentTarget;
  const productRow = target.closest('.product');
  productRow.remove(); 
  calculateAll(); 
}

function createProduct() {
  console.log('here');
  let productName = document.querySelector('.create-product #input-name');
  let productPrice = document.querySelector('.create-product #input-price');
  if(productName.value && productPrice.value){
    const tableTag = document.querySelector('#cart tbody');
    const newProduct = document.createElement('tr');
    
    newProduct.setAttribute('class','product');
    newProduct.innerHTML = `
      <td class="name"><span>${productName.value}</span></td>
      <td class="price">$<span>${parseFloat(productPrice.value).toFixed(2)}</span></td>
      <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
      <td class="subtotal">$<span>0</span></td>
      <td class="action"><button class="btn btn-remove">Remove</button></td>
    `;
    productName.value = '';
    productPrice.value = '0';

    tableTag.appendChild(newProduct);
    newProduct.querySelector('.btn-remove').addEventListener('click', removeProduct);
  }  
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeProductBtn = document.getElementsByClassName('btn-remove');
  let removeProductBtns = [...removeProductBtn];
  removeProductBtns.forEach(btn => {
    btn.addEventListener('click', removeProduct);
  });
  
  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);
});