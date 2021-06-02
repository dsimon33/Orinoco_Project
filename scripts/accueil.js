
/* Lien avec l'API */


async function getAllCameras() {
        const cameras = await AJAX_GET("http://localhost:3000/api/cameras");
        console.log(cameras);


        let productLists = document.getElementById("ProductLists");

        /* structure index.HMTL */
        cameras.forEach((camera) => {
                let productContenant = document.createElement("div");
                let productDescription = document.createElement("div");
                let productPhoto = document.createElement("img");
                let productName = document.createElement("h3");
                let productPrice = document.createElement("p");
                let productAttachment = document.createElement("a");

                /* Agencement des éléments index HTML */
                productLists.appendChild(productContenant);
                productContenant.appendChild(productPhoto);
                productContenant.appendChild(productDescription);
                productDescription.appendChild(productName);
                productDescription.appendChild(productPrice);
                productDescription.appendChild(productAttachment);

                /* Classes des éléments */
                productContenant.classList.add("produits_contenant", "card");
                productDescription.classList.add("card-body", "text-center");
                productPhoto.classList.add("card-img-top");
                productName.classList.add("produits_nom", "card-title");
                productPrice.classList.add("produits_prix", "card-text");
                productAttachment.classList.add("btn", "btn-info");

                /* Attributs aux balises index HTML */
                productPhoto.setAttribute("src", camera.imageUrl);
                productPhoto.setAttribute("alt", "Photo de caméra");
                productAttachment.setAttribute("href", "pages/produits.html?id" + camera._id);

                /* Contenu des balises index HTML */
                productName.textContent = camera.name;
                productPrice.textContent = (camera.price / 100 + "€");
                productAttachment.textContent = "en savoir plus";
        });
};

/* Apparition du nombre de sélection d'article déja ajouter au caddie */

function ShoppingQuantity() {
        let productShopping = document.getElementById("shopping-index");
        const myShop = JSON.parse(localStorage.getItem("myShopContent"));
        if (myShop === null) {
                productShopping.textContent = "0";
        } else {
                productShopping.textContent = myShop.length;
        }
        console.log(productShopping.textContent);
};

getAllCameras();
ShoppingQuantity();









