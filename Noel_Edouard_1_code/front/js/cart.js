
//Récupération des infos stocké dans le local storage
//let panierDejaStorage = JSON.parse(localStorage.getItem("product"));
function getCart() {
  let productValues = [];
  if (localStorage.getItem("product") != null) {
    productValues = JSON.parse(localStorage.getItem("product"));
    
  }
  return productValues;
 
}

let productValues = getCart();
// Calcul de la quantité totale du panier 
function computeTotalQuantity() {  
  let cart = getCart();
  let totalQwantity = 0;
  for (let item in cart) {
    totalQwantity += Number(cart[item].quantity);
  }
  return totalQwantity;
  
}
document.querySelector('#totalQuantity').innerHTML = computeTotalQuantity();
let infoTotal=[];
//Affichage des éléments du panier
function afficherPanier() {
  //Si panier vide
  let totalPrice = 0
 
  if (productValues === null || productValues.length == 0) { //si panier vide
      document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
  }
  // si element dans panier
  else {
      for (i = 0; i < productValues.length; i++) {
        let productiD = productValues[i].id;
      let colorproduct= productValues[i].colors;
      let quantityproduct= productValues[i].quantity;
      let emp = productValues[i].emp;
        fetch(`http://localhost:3000/api/products/${productiD}`) // on fetch en fonction de l'iD du produit pour récuperer le prix 
    .then((response) => response.json())
    .then((data) => { // on affiche
      let price = data.price; 
     let totalPriceProduct= price*quantityproduct;  // calcul du cout total par produit 
    totalPrice += totalPriceProduct;   // calcul du prix total
      //affichage de ces elements dans le HTML
      document.querySelector('#cart__items').innerHTML +=`
      <article class="cart__item" data-id="${productiD}" data-color="${colorproduct}">
                  <div class="cart__item__img">
                    <img src="${data.imageUrl}" alt="${data.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${data.name}</h2>
                      <p>couleur :${colorproduct}</p>
                      <p>Prix :${data.price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté :${quantityproduct} </p>
                        <input index="${emp}" onchange="modifierQuantiteArticle(this)"  type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityproduct}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                    <p index="${emp}"  onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
                </div>
                    </div>
                  </div>
                </article>`;
      
  
               
                      
                document.getElementById("totalPrice").innerHTML = totalPrice;
     })
    }
    
    
  
  
  
  }};
    afficherPanier();
   //suppression d'un article
    function supprimerArticle(e) {
     
       let index = e.getAttribute("index");
       let productValues = getCart();  
       for (let i = 0; i < productValues.length; i++) {
       
       if(index === productValues[i].emp){ 
      
        productValues.splice(i, 1);
 
   localStorage.clear("product");
   localStorage.setItem("product", JSON.stringify(productValues));
   location.reload();
 
       }}  
       
       
       
      };

// modification d'un article 

function modifierQuantiteArticle (e){
 
  let nvelleValue = e.value;
  let index = e.getAttribute("index");
  let productValues = getCart();
 
if(nvelleValue<=0 ){  
  nvelleValue= nvelleValue*(-1) ;
}
for (let i = 0; i < productValues.length; i++){
  if(index === productValues[i].emp){

   productValues[i].quantity= nvelleValue; 
   localStorage.clear("product");
   localStorage.setItem("product", JSON.stringify(productValues));
   location.reload();
  
  }
}



};

 ////FORMULAIRE////
//Selection des champs
let formulaire = document.querySelector(".cart__order__form");
let firstName = formulaire.firstName;
let lastName = formulaire.lastName;
let address = formulaire.address;
let city = formulaire.city;
let email = formulaire.email;

//Declaration des RegExp//Verif Prenom
let nameRegExp = /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
firstName.addEventListener("input", function () {
  verificationFirstName(firstName);
});

function verificationFirstName() {
  let testFirstName = nameRegExp.test(firstName.value);
  if (testFirstName == false) {
      firstName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux`;
      return false;
  } else {
      firstName.nextElementSibling.innerHTML = "";
      return true;
  }
}

//Verif Nom de famille
lastName.addEventListener("input", function () {
  verificationLastName(lastName);
});

function verificationLastName() {
  let testlastName = nameRegExp.test(lastName.value);
  if (testlastName == false) {
      lastName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux`;
      return false;
  } else {
      lastName.nextElementSibling.innerHTML = "";
      return true;
  }
}

//Verif Ville
city.addEventListener("input", function () {
  verificationCity(city);
});

function verificationCity() {
  let testCity = nameRegExp.test(city.value);
  if (testCity == false) {
      city.nextElementSibling.innerHTML = `Veuillez saisir une nom de ville valide <br> Ne doit pas contenir de chiffre`;
      return false;
  } else {
      city.nextElementSibling.innerHTML = "";
      return true;
  }
}

//Verif adresse
address.addEventListener("change", function () {
  verificationAddress(address);
});
let addressRegExp = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;
function verificationAddress() {
  let testAddress = addressRegExp.test(address.value);
  if (testAddress == false) {
      address.nextElementSibling.innerHTML = `Veuillez saisir une adresse valide <br> Exemple: <i>10 rue de Paris</i>`;
      return false;
  } else {
      address.nextElementSibling.innerHTML = "";
      return true;
  }
}

//Verif Email
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
email.addEventListener("change", function () {
  verificationEmail(email);
});

function verificationEmail() {
  let testEmail = emailRegExp.test(email.value);
  if (testEmail == false && email.value != "") {
      email.nextElementSibling.innerHTML = "Veuillez saisir une adresse email valide";
      return false;
  } else {
      email.nextElementSibling.innerHTML = "";
      return true;
  }
}
//let productValues = getCart();

let boutonCommander = document.getElementById("order");
boutonCommander.addEventListener("click", function (event) {
  event.preventDefault();
  //Si tous les éléments du formulaire sont  OK
  if (verificationFirstName(firstName) && verificationLastName(lastName) && verificationCity(city) && verificationAddress(address) && verificationEmail(email)) {
    
    
      //Recup ID des produits du panier (seul élément a devoir être envoyé vers serveur)
      function recupIdProduct() {
          let idProduct = [];
          for (let i = 0; i < productValues.length; i++) {
              id = productValues[i].id;
            //  colors = productValues[i].colors;
             // quantity = productValues[i].quantity; // pourrai etre interesant à envoyer aux serveurs pour un envoi commande
              idProduct.push(id);
             
          }
          return idProduct;
      }
      let iD = recupIdProduct();
      let bonDeCommande = { // Création du [] pour l'envoyer en échange du bon de commande 
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: iD,
    };
      
      let options = { // envoie du []
        method: "POST",
        body: JSON.stringify(bonDeCommande),
        headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/api/products/order", options) // on appel l'api pour recevoir notre bonDeCommande
        .then(function (response) {
            return response.json();
        })
        .then(function (data) { // a la recepetion de la data :
            localStorage.clear(); // clear le localstorage, pour afficher un panier vide au client
            let orderId = data.orderId; // on recupere la value du bn de commande
           // console.log(orderId) // pour vérifier 
            window.location.assign(`confirmation.html?orderId=${orderId}`); //on définit un nouvel url
        });
}
});

// Go to confirmation.js pour la page confirmation 
