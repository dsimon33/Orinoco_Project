/* Variables pour la zone alert */
let alert = document.getElementById("alert");

/* Variables pour la zone chariot */
let shopList = document.getElementById("shopList");

/* Lecture des données du localstorage */
const myShop = JSON.parse(localStorage.getItem("myShopContent"));
console.log(myShop);


/* Création si chariot vide */
function shopCreate() {
  if ((myShop === null) || (myShop.length === 0)) {
    console.log("Le chariot est vide");
    /* Création de la structure HTML pour chariot vide */
    let productContenant = document.createElement("div");
    let productImgEmpty = document.createElement("img");
    let productTexteEmpty = document.createElement("p");

    /* Agencement des éléments pour chariot vide */
    shopList.appendChild(productContenant);
    productContenant.appendChild(productImgEmpty);
    productContenant.appendChild(productTexteEmpty);

    /* Attribut aux balises chariot vide */
    productContenant.setAttribute("div", "empty")
    productImgEmpty.setAttribute("src", "../images/chariotvide.jpg");
    productImgEmpty.setAttribute("alt", "image de chariot vide");

    /* Création classes de éléments chariot vide */
    productImgEmpty.classList.add("img-empty")
    productTexteEmpty.classList.add("texte-empty")

    /* Contenu des balises chariot vide */
    productTexteEmpty.textContent = "Oups, Votre chariot est vide, remplissez le grâce à notre gamme d'appareils photos";
  }

  /* Création si produits dans le chariot */
  else {
    console.log("le chariot contient des articles");

    let total = 0;

    /* ---- Création d'une zone alert pour le formulaire ---- */

    /* Création de la structure */
    let alertDiv = document.createElement("div");
    let titleAlert = document.createElement("h7");
    let texteAlert = document.createElement("p");
    let linkAlert = document.createElement("a");
    let btnAlert = document.createElement("button");
    let spanAlert = document.createElement("span");

    /* Agencement des éléments */
    alert.appendChild(alertDiv);
    alertDiv.appendChild(titleAlert);
    alertDiv.appendChild(texteAlert);
    alertDiv.appendChild(linkAlert);
    alertDiv.appendChild(btnAlert);
    btnAlert.appendChild(spanAlert);


    /* Création classes */
    alertDiv.classList.add("alert", "alert-info", "alert-dismissible", "fade", "show");
    titleAlert.classList.add("alert-heading");
    linkAlert.classList.add("alert-link");
    btnAlert.classList.add("close");

    /* Attribut aux balises */
    alertDiv.setAttribute("role", "alert");
    linkAlert.setAttribute("href", "#form");
    btnAlert.setAttribute("type", "button");
    btnAlert.setAttribute("data-dismiss", "alert");
    btnAlert.setAttribute("aria-label", "Close");
    spanAlert.setAttribute("aria-hidden", "true");

    /* Contenu des balises */
    titleAlert.textContent = "Vous avez des articles dans votre Caddie";
    texteAlert.textContent = "Merci de remplir le formulaire avant de confirmer votre achat :";
    linkAlert.textContent = "accédez au formulaire";
    spanAlert.innerHTML = "&times;";


    /* ----- Création de la zone d'affichage des articles du caddie ---- */

    myShop.forEach((shop, index) => {
      console.log(shop);
      console.log(index);

      console.log(shop.price);
      const sTotalPrice = shop.price * shop.selectedQuantity;
      total += sTotalPrice;

      console.log(sTotalPrice);


      /* Création de la structure HTML pour chariot */
      let productShop = document.createElement("div");
      let productChoice = document.createElement("div");
      let productPhoto = document.createElement("img");
      let productName = document.createElement("h2");
      let productLenses = document.createElement("div");
      let lensesChoice = document.createElement("h3");
      let productQuantity = document.createElement("div");
      let quantity = document.createElement("h4");
      let productPrice = document.createElement("div");
      let price = document.createElement("h5");
      let productPriceTotal = document.createElement("div");
      let priceTotal = document.createElement("h6");
      let deleteProduct = document.createElement("div");
      let buttonDelete = document.createElement("button");

      /* Agencement des éléments pour chariot */
      shopList.appendChild(productShop);
      productShop.appendChild(productChoice);
      productChoice.appendChild(productPhoto);
      productChoice.appendChild(productName);
      productShop.appendChild(productLenses);
      productLenses.appendChild(lensesChoice);
      productShop.appendChild(productQuantity);
      productQuantity.appendChild(quantity);
      productShop.appendChild(productPrice);
      productPrice.appendChild(price);
      productShop.appendChild(productPriceTotal);
      productPriceTotal.appendChild(priceTotal);
      productShop.appendChild(deleteProduct);
      deleteProduct.appendChild(buttonDelete);

      /* Création classes de éléments chariot */
      productShop.classList.add("shop");
      productChoice.classList.add("card-body", "text-center", "product-shop");
      productPhoto.classList.add("card-img-top");
      productName.classList.add("produits_nom", "card-title");
      productLenses.classList.add("product-lenses");
      lensesChoice.classList.add("lenses-choice");
      productQuantity.classList.add("product-quantity");
      quantity.classList.add("quantity");
      productPrice.classList.add("product-price");
      price.classList.add("price");
      productPriceTotal.classList.add("product-pricetotal");
      priceTotal.classList.add("pricetotal");
      buttonDelete.classList.add("btn", "btn-danger");

      /* Attribut aux balises chariot */
      productPhoto.setAttribute("src", shop.imageUrl);
      productPhoto.setAttribute("alt", "photo de caméra");
      deleteProduct.setAttribute("id", "delete-button");
      buttonDelete.setAttribute("type", "button");

      /* Contenu des balises chariot */
      productName.textContent = shop.name;
      lensesChoice.textContent = ("Lentilles :  " + shop.selectedLenses);
      quantity.textContent = ("quantité :  " + shop.selectedQuantity);
      price.textContent = ("Prix :  " + shop.price / 100 + " €");
      priceTotal.innerHTML = ("Total article :  " + sTotalPrice / 100 + " €");
      buttonDelete.textContent = "Supprimer";

      /* Suppression des éléments du chariot */
      buttonDelete.addEventListener("click", function (e) {
        myShop.splice(index, 1);
        localStorage.setItem("myShopContent", JSON.stringify(myShop));
        location.reload();
      });


    });

    /* ----- Création de la zone d'affichage du prix total du chariot ---- */

    /* Création de la stucture HTML */
    let productTotalPrice = document.createElement("div");
    let totalPrice = document.createElement("p");

    /* Agencement des éléments */
    shopList.appendChild(productTotalPrice);
    productTotalPrice.appendChild(totalPrice);

    /* Classes des éléments */
    totalPrice.classList.add("total-price");

    /* calcul du prix total du chariot et affichage de ceui-ci*/

    totalPrice.textContent = "Montant total du Caddie :   " + (total / 100 + " €");

    /* sauvegarde dans le local storage du prix total du panier pour la page de confirmation */

    localStorage.setItem("total", total);
    console.log(total);


    /*  ---- Création du formulaire ---- */

    let form = document.getElementById("form");

    /* Création de la structure */
    let firstNameDiv = document.createElement("div");
    let firstNameLabel = document.createElement("label");
    let firstNameDivDiv = document.createElement("div");
    let firstNameInput = document.createElement("input");
    let firstNameSpanIco = document.createElement("span");
    let fisrtNameSpanTxt = document.createElement("span");
    let lastNameDiv = document.createElement("div");
    let lastNameLabel = document.createElement("label");
    let lastNameDivDiv = document.createElement("div");
    let lastNameInput = document.createElement("input");
    let lastNameSpanIco = document.createElement("span");
    let lastNameSpanTxt = document.createElement("span");
    let addressDiv = document.createElement("div");
    let addressLabel = document.createElement("label");
    let addressDivDiv = document.createElement("div");
    let addressInput = document.createElement("input");
    let addressSpanIco = document.createElement("span");
    let addressSpanTxt = document.createElement("span");
    let cityDiv = document.createElement("div");
    let cityLabel = document.createElement("label");
    let cityDivDiv = document.createElement("div");
    let cityInput = document.createElement("input");
    let citySpanIco = document.createElement("span");
    let citySpanTxt = document.createElement("span");
    let emailDiv = document.createElement("div");
    let emailLabel = document.createElement("label");
    let emailDivDiv = document.createElement("div");
    let emailInput = document.createElement("input");
    let emailSpanIco = document.createElement("span");
    let emailSpanTxt = document.createElement("span");
    let emailSmall = document.createElement("small");
    let buttonDiv = document.createElement("div");
    let buttonCommand = document.createElement("button");


    /* Agencement des éléments */

    form.appendChild(firstNameDiv);
    firstNameDiv.appendChild(firstNameLabel);
    firstNameDiv.appendChild(firstNameDivDiv);
    firstNameDivDiv.appendChild(firstNameInput);
    firstNameDivDiv.appendChild(firstNameSpanIco);
    firstNameDiv.appendChild(fisrtNameSpanTxt);
    form.appendChild(lastNameDiv);
    lastNameDiv.appendChild(lastNameLabel);
    lastNameDiv.appendChild(lastNameDivDiv);
    lastNameDivDiv.appendChild(lastNameInput);
    lastNameDivDiv.appendChild(lastNameSpanIco);
    lastNameDiv.appendChild(lastNameSpanTxt);
    form.appendChild(addressDiv);
    addressDiv.appendChild(addressLabel);
    addressDiv.appendChild(addressDivDiv);
    addressDivDiv.appendChild(addressInput);
    addressDivDiv.appendChild(addressSpanIco);
    addressDiv.appendChild(addressSpanTxt);
    form.appendChild(cityDiv);
    cityDiv.appendChild(cityLabel);
    cityDiv.appendChild(cityDivDiv);
    cityDivDiv.appendChild(cityInput);
    cityDivDiv.appendChild(citySpanIco);
    cityDiv.appendChild(citySpanTxt);
    form.appendChild(emailDiv);
    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailDivDiv);
    emailDivDiv.appendChild(emailInput);
    emailDivDiv.appendChild(emailSpanIco);
    emailDiv.appendChild(emailSpanTxt);
    emailDiv.appendChild(emailSmall);
    form.appendChild(buttonDiv);
    buttonDiv.appendChild(buttonCommand);

    /* Classes des éléments */

    firstNameDiv.classList.add("form-group");
    firstNameDivDiv.classList.add("group");
    lastNameDiv.classList.add("form-group");
    lastNameDivDiv.classList.add("group");
    addressDiv.classList.add("form-group");
    addressDivDiv.classList.add("group");
    cityDiv.classList.add("form-group");
    cityDivDiv.classList.add("group");
    emailDiv.classList.add("form-group");
    emailDivDiv.classList.add("group");
    firstNameInput.classList.add("form-control");
    lastNameInput.classList.add("form-control");
    addressInput.classList.add("form-control");
    cityInput.classList.add("form-control");
    emailInput.classList.add("form-control");
    emailSmall.classList.add("form-text", "text-muted");
    buttonDiv.classList.add("button");
    buttonCommand.classList.add("btn", "btn-primary");

    /* Attributs aux balises */
    firstNameLabel.setAttribute("for", "firstname");
    lastNameLabel.setAttribute("for", "lastname");
    addressLabel.setAttribute("for", "address");
    cityLabel.setAttribute("for", "city");
    emailLabel.setAttribute("for", "email");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("id", "firstname");
    firstNameInput.setAttribute("aria-describedby", "firstname");
    firstNameInput.setAttribute("placeholder", "entrez votre prénom");
    firstNameInput.setAttribute("minlenght", "2");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("id", "lastname");
    lastNameInput.setAttribute("aria-describedby", "lastname");
    lastNameInput.setAttribute("placeholder", "entrez votre nom");
    addressInput.setAttribute("type", "text");
    addressInput.setAttribute("id", "address");
    addressInput.setAttribute("aria-describedby", "address");
    addressInput.setAttribute("placeholder", "entrez votre adresse");
    cityInput.setAttribute("type", "text");
    cityInput.setAttribute("id", "city");
    cityInput.setAttribute("aria-describedby", "city");
    cityInput.setAttribute("placeholder", "entrez votre ville en indiquant son code postal");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", "email");
    emailInput.setAttribute("aria-describedby", "emailHelp");
    emailInput.setAttribute("placeholder", "entrez votre adresse email");
    emailSmall.setAttribute("id", "emailHelp");
    firstNameInput.setAttribute("aria-required", "true");
    lastNameInput.setAttribute("aria-required", "true");
    addressInput.setAttribute("aria-required", "true");
    cityInput.setAttribute("aria-required", "true");
    emailInput.setAttribute("aria-required", "true");
    buttonCommand.setAttribute("type", "submit");
    buttonCommand.setAttribute("id", "submitBtn");
    firstNameSpanIco.setAttribute("id", "firstnameSpanIco");
    fisrtNameSpanTxt.setAttribute("id", "firstnameSpanTxt");
    lastNameSpanIco.setAttribute("id", "lastnameSpanIco");
    lastNameSpanTxt.setAttribute("id", "lastnameSpanTxt");
    addressSpanIco.setAttribute("id", "addressSpanIco");
    addressSpanTxt.setAttribute("id", "addressSpanTxt");
    citySpanIco.setAttribute("id", "citySpanIco");
    citySpanTxt.setAttribute("id", "citySpanTxt");
    emailSpanIco.setAttribute("id", "emailSpanIco");
    emailSpanTxt.setAttribute("id", "emailSpanTxt");


    /* Contenu des Balises */
    firstNameLabel.textContent = "Prénom : ";
    lastNameLabel.textContent = "Nom : ";
    addressLabel.textContent = "Adresse : ";
    cityLabel.textContent = "Ville : ";
    emailLabel.textContent = "Adresse e-mail : ";
    emailSmall.textContent = "Nous vous informons que votre e-mail ne sera jamais partagé avec qui que ce soit."
    buttonCommand.textContent = "Validez votre commande";


  };
}
shopCreate();

/* --------- controle des données saisies par l'utilisateur dans les inputs du formulaire --------- */

/* variables pour controle des données saisies par l'utilisateur dans les inputs du formulaire */
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


/* Regex pour contrôle des champs du formulaire */
let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let checkNumbers = /[0-9]/;
let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;


/* Récupération des spans pour insertion d'un texte de description de la vérification du formulaire*/
let firstNameSpan = document.getElementById("firstnameSpanIco");
let firstNameSpanError = document.getElementById("firstnameSpanTxt");
let lastNameSpan = document.getElementById("lastnameSpanIco");
let lastNameSpanError = document.getElementById("lastnameSpanTxt");
let addressSpan = document.getElementById("addressSpanIco");
let addressSpanError = document.getElementById("addressSpanTxt");
let citySpan = document.getElementById("citySpanIco");
let citySpanError = document.getElementById("citySpanTxt");
let emailSpan = document.getElementById("emailSpanIco");
let emailSpanError = document.getElementById("emailSpanTxt");


/* Validation de la saisie utilisateur */
function validation(event) {
  if (
    checkNumbers.test(firstName.value) == true ||
    checkSpecialCharacter.test(firstName.value) == true ||
    firstName.value == ""
  ) {
    firstNameSpan.innerHTML = "<i class='fas fa-edit fa-2x error'></i>";
    firstNameSpanError.innerHTML = "Veuillez vérifier la saisie de votre prénom, les caractères spéciaux et chiffres ne sont pas autorisés";

  } else {
    firstNameSpan.innerHTML = "<i class='fas fa-edit fa-2x valid'></i>";
    firstNameSpanError.innerHTML = "";
  }

  if (
    checkNumbers.test(lastName.value) == true ||
    checkSpecialCharacter.test(lastName.value) == true ||
    lastName.value == ""
  ) {
    lastNameSpan.innerHTML = "<i class='fas fa-edit fa-2x error'></i>";
    lastNameSpanError.innerHTML = "Veuillez vérifier la saisie de votre nom, les caractères spéciaux et chiffres ne sont pas autorisés";

  } else {
    lastNameSpan.innerHTML = "<i class='fas fa-edit fa-2x valid'></i>";
    lastNameSpanError.innerHTML = "";
  }

  if (
    checkSpecialCharacter.test(address.value) == true ||
    address.value == ""
  ) {
    addressSpan.innerHTML = "<i class='fas fa-edit fa-2x error'></i>";
    addressSpanError.innerHTML = "Veuillez vérifier la saisie de votre adresse, les caractères spéciaux ne sont pas autorisés";

  } else {
    addressSpan.innerHTML = "<i class='fas fa-edit fa-2x valid'></i>";
    addressSpanError.innerHTML = "";
  }

  if (
    checkSpecialCharacter.test(city.value) == true ||
    city.value == ""
  ) {
    citySpan.innerHTML = "<i class='fas fa-edit fa-2x error'></i>";
    citySpanError.innerHTML = "Veuillez vérifier la saisie de votre ville, les caractères spéciaux ne sont pas autorisés";

  } else {
    citySpan.innerHTML = "<i class='fas fa-edit fa-2x valid'></i>";
    citySpanError.innerHTML = "";
  }

  if (
    checkMail.test(email.value) == false ||
    email.value == ""
  ) {
    emailSpan.innerHTML = "<i class='fas fa-edit fa-2x error'></i>";
    emailSpanError.innerHTML = "Veuillez vérifier la saisie de votre e-mail, celui-ci n'est pas conforme";

  } else {
    emailSpan.innerHTML = "<i class='fas fa-edit fa-2x valid'></i>";
    emailSpanError.innerHTML = "";
  }

  if (
    firstNameSpanError.innerText.length == 0 &&
    lastNameSpanError.innerText.length == 0 &&
    addressSpanError.innerText.length == 0 &&
    citySpanError.innerText.length == 0 &&
    emailSpanError.innerText.length == 0
  ) {
    /* Création de l'objet contact */
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    console.log(contact);
    return contact;
  } else {
    console.log("erreur de saisie formulaire")
    return "error";
  };
};

/* ......  envoie a l'API ........ */
function sendOrder(e) {
  e.preventDefault();

  let contact = validation();
  if (contact == "error") {
    console.log(contact);
    return;
  }

  /* let products = myShop.map((product) => {
     return product.idCamera;
   });*/

  let products = [];
  myShop.forEach((product) => {
    for (let i = 0; i < product.selectedQuantity; i++) {
      const productId = product.idCamera;
      products.push(productId);
    }
  });

  console.log(products);

  let url = "http://localhost:3000/api/cameras/order";
  let shop = {
    contact,
    products,
  }
  console.log(shop);

  /* Sauvegarde sur le localstorage du numéro de commande renvoyé par l'API */
  function getOrderId(respId) {
    let orderId = respId.orderId;
    console.log(orderId);
    localStorage.setItem("orderId", orderId);
  }

  /* envoie de l'objet regroupant les données du formulaire et les id des articles commandés */
  async function send(e) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shop),
    });
    if (response.ok) {
      let resId = await response.json();
      getOrderId(resId);
      window.location.href = "confirm.html";
    } else {
      console.log("erreur de serveur :", response.status);
    }
  }
  send();
}
form.addEventListener('submit', sendOrder);


