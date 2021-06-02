let shopId = document.getElementById("shopid");
let shopTotalPrice = document.getElementById("shoptotal");


shopId.innerHTML = localStorage.getItem("orderId");
shopTotalPrice.innerHTML = (localStorage.getItem("total") / 100 + " €");

function removeStorage() {
  localStorage.removeItem("total");
  localStorage.removeItem("myShopContent");
  localStorage.removeItem("orderId");
};

window.addEventListener('unload', function (e) {
  removeStorage();
});
