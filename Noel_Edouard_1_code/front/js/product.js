

//Utilisation de searchParams
let idProduct = new URL(window.location.href).searchParams.get('id');

function getCart() {
    let productValues = [];
    if (localStorage.getItem("product") != null) {
      productValues = JSON.parse(localStorage.getItem("product"));
      
    }
    return productValues;
   
  }
  let panierDejaStorage = getCart();
 
//Appel de l'API avec Fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {

//Trouver le produit sélectionné avec son id
    let findProduct = () => {
        return data.find((product) => product._id === idProduct);
    };

    let myProduct = findProduct();

//Creation des variables pour affichage le produit sur la page
    let afficherProduit = () => {
        let productName = document.getElementsByTagName('title');
        let productImg = document.createElement("img");
        let title = document.querySelector('#title');
        let price = document.querySelector('#price');
        let description = document.querySelector('#description');
        let colors = document.querySelector('#colors');

//Affichage du produit sur la page
        document.querySelector(".item__img").appendChild(productImg);
        productImg.setAttribute("src", `${myProduct.imageUrl}`);
        productImg.setAttribute("alt", `${myProduct.altTxt}`);
        productName[0].textContent = myProduct.name
        title.textContent = myProduct.name
        price.textContent = myProduct.price
        description.textContent = myProduct.description

//Affichage de la sélection des couleurs
    //Affichage de la sélection des couleurs
    for (let i in myProduct.colors) {
        colors.insertAdjacentHTML(
            'beforeend',
            `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`
        );
    };
};
afficherProduit();
})

let CreerPanier = document.getElementById("addToCart")
CreerPanier.addEventListener("click",function(e) {
    
    if (document.querySelector("#colors").value == "" ||document.querySelector('#quantity').value <= 0){
                window.confirm("Veuilez choisir une couleur ou une quantité");
e.preventDefault();} // on empeche la diffusion du formulaire si mal remplit
else{ // sinon on appelle on crée une fonction pour créer le panier 
    let Basket = () => {
        // Récupération des datas
        let quantity = document.querySelector('#quantity'); 
        let colors = document.querySelector('#colors');
        let name = document.querySelector('#title');
        // Mise en forme data et et preparation localStorage
        let panierDejaStorage = JSON.parse(localStorage.getItem("product"));
        let productValues = {
            id: idProduct,
            quantity: Number(quantity.value),
            colors: colors.value,
         name : name.textContent,
         emp : idProduct + colors.value,
            
        }
        
        
        // Pop up de confirmation, pour valider auprès de l'utilisateur son action. Il serait intéressant de mieux designer celui-ci
        const popupConfirmation = () => {
            if(window.confirm(`${name.textContent} ${colors.value} en: ${quantity.value} exemplaires a bien été ajouté au panier
            Consultez le panier OK ou revenir à l'accueil ANNULER`)){
                window.location.href =" cart.html";
            }
        else{
            window.location.href =" index.html";
        }}
        
        let indice = 0;
        // vérification des données stockées dans le localStorage et envoie des data relevées précédemment 
if (!panierDejaStorage) {
    panierDejaStorage = [];
    
    panierDejaStorage.push(productValues);
    localStorage.setItem("product", JSON.stringify(panierDejaStorage));
    popupConfirmation();
   
   
        }
        //Avant de stock dans local storage, on verifie si id et couleurs sont =, si = alors on incremente qty
        else {
            for (let i = 0; i < panierDejaStorage.length; i++) {
                if (panierDejaStorage[i].id === productValues.id && panierDejaStorage[i].colors === productValues.colors) {
                    panierDejaStorage[i].quantity = productValues.quantity;
                    indice = 1;
                }
            }
            //Si pas égale, on stop la boucle et on push le panier dans local storage
            if (indice == 0) {
                panierDejaStorage.push(productValues);
            }

            localStorage.setItem("product", JSON.stringify(panierDejaStorage));
            popupConfirmation();
        }

        
      }
     
        
      Basket();
           
       
}

});
// Go to cart.js pour la page panier 


