
/* Création des variables */
let idCamera = "";
let description = "";
let imageUrl = "";
let name = "";
let price = "";
let productShopping = document.getElementById("shopping-product");
let productList = document.getElementById("ProductList");
let buy = document.getElementById("shopping");

/* ..... Appel de la fonction AJAX et création de la structure HTML ..... */
async function getOneCamera() {
      idCamera = location.search.substring(3);
      const detailCameras = await AJAX_GET("http://localhost:3000/api/cameras/" + idCamera);
      description = detailCameras.description;
      imageUrl = detailCameras.imageUrl;
      name = detailCameras.name;
      price = detailCameras.price;
      console.log(detailCameras);


      /* structure index.HTML */

      let productContenant = document.createElement("div");
      let productImage = document.createElement("div");
      let productDetails = document.createElement("div");
      let productPhoto = document.createElement("img");
      let productName = document.createElement("h3");
      let productDescription = document.createElement("h4");
      let productSelect = document.createElement("p");
      let productQuantitySelect = document.createElement("select");
      let productQuantity = document.createElement("p");
      let productOptionsSelect = document.createElement("select");
      let productPrice = document.createElement("p");

      /* Agencement des éléments index HTML */
      productList.appendChild(productContenant);
      productContenant.appendChild(productImage);
      productImage.appendChild(productPhoto);
      productContenant.appendChild(productDetails);
      productDetails.appendChild(productName);
      productDetails.appendChild(productDescription);
      productDetails.appendChild(productQuantity);
      productDetails.appendChild(productQuantitySelect);
      productDetails.appendChild(productSelect);
      productDetails.appendChild(productOptionsSelect);
      productDetails.appendChild(productPrice);


      /* Attributs aux balises index HTML */
      productPhoto.setAttribute("src", detailCameras.imageUrl);
      productPhoto.setAttribute("alt", "Photo de caméra");
      productQuantitySelect.setAttribute("aria-label", "Default select example");
      productQuantitySelect.setAttribute("id", "quantity-choice");
      productQuantitySelect.setAttribute("name", "quantity-choice");
      productOptionsSelect.setAttribute("aria-label", "Default select example");
      productOptionsSelect.setAttribute("id", "lenses-choice");
      productOptionsSelect.setAttribute("name", "lenses-choice");

      /* Classes des éléments */
      productContenant.classList.add("produit_contenant", "card");
      productImage.classList.add("image");
      productDetails.classList.add("card-body", "text-center", "description");
      productSelect.classList.add("Product-select");
      productDescription.classList.add("product-description");
      productQuantitySelect.classList.add("custom-select");
      productOptionsSelect.classList.add("custom-select");
      productPhoto.classList.add("card-img", "product-image");
      productName.classList.add("produits_nom", "card-title");
      productPrice.classList.add("produits_prix", "card-text");

      /* Contenu des balises index HTML */
      productName.textContent = detailCameras.name;
      productDescription.textContent = detailCameras.description;
      productSelect.textContent = "Choisissez votre lentille";
      productQuantity.textContent = "Choisissez votre quantité";
      productPrice.textContent = (detailCameras.price / 100 + " €");

      /* Création des choix de lentilles */
      lensesSelect(productOptionsSelect,detailCameras.lenses);

      /* Création des quantités produits */
      quantitySelect(productQuantitySelect);

};

function lensesSelect ($select,lenses) {
      const numberLenses = lenses.length;
      for (let i = 0; i < numberLenses; i++) {
            let optionLens = document.createElement("option");
            $select.appendChild(optionLens);
            optionLens.textContent = lenses[i];
            console.log(lenses[i]);
      }
}

function quantitySelect ($select) {
      for (let quantity = 1; quantity < 6; quantity++) {
            let optionQuantity = document.createElement("option");
            $select.appendChild(optionQuantity);
            optionQuantity.innerHTML = quantity;
            console.log(quantity);
      };

}

class myShop {
      constructor(idCamera, selectedQuantity, selectedLenses, description, imageUrl, name, price) {
            this.idCamera = idCamera;
            this.selectedQuantity = selectedQuantity;
            this.selectedLenses = selectedLenses;
            this.description = description;
            this.imageUrl = imageUrl;
            this.name = name;
            this.price = price;
      }
}


function initShopContent() {
      let myShopContent = JSON.parse(localStorage.getItem("myShopContent"));
      if (myShopContent === null) {
            myShopContent = [];
      }
      console.log(myShopContent);
      return myShopContent;
      
}
let myShopContent = initShopContent ();

productShopping.textContent = myShopContent.length;

buy.addEventListener("click", function (e) {
      let selectedLenses = document.getElementById('lenses-choice').value;
      let selectedQuantity = document.getElementById('quantity-choice').value;
      console.log(selectedLenses);
      console.log(selectedQuantity);
      let shop = new myShop(idCamera, selectedQuantity, selectedLenses, description, imageUrl, name, price);
      myShopContent.push(shop);
      localStorage.setItem("myShopContent", JSON.stringify(myShopContent));
      productShopping.textContent = myShopContent.length;
      console.log(myShopContent);
      console.log(myShopContent.length);
      alert("Cet article a été ajouté dans votre panier");
});

getOneCamera();


