//Concernant l’API, des promesses devront être utilisées pour éviter les callbacks. Il est
// possible d’utiliser des solutions alternatives, comme fetch, celle-ci englobant la promesse.

//Appel de l'API avec Fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {
  //console.log(data) pour vérifier la réception de la data

  for (let i = 0; i < data.length; i++) {          // on appelle tout les éléments de la data avec une boucle. 
    function CreateCart (){
      let product = document.createElement('article'); // on crée les elements constituant nos cartes
      let link = document.createElement('a');
      let picture = document.createElement('img');
      let title = document.createElement('h3');
      let description = document.createElement('p');
      document.querySelector('.items').appendChild(link);
      link.appendChild(product); 
      product.appendChild(picture);
      picture.src = data[i].imageUrl; 
      picture.alt = data[i].altTxt;
      product.appendChild(title);
      title.textContent = data[i].name; 
     product.appendChild(description);
     description.textContent = data[i].description; 
      
      link.href = `product.html?id=${data[i]._id}`; // on prepare le lien vers une page produit personnalisée en fonction de l'ID
    }
    CreateCart ();
    }
    
    //affichage des éléments
   
})  
// Go to product.js pour la page produit 