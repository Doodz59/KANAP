
// on recupere le n° de commande dans l'url 
let com = new URL(window.location.href).searchParams.get('orderId');
//console.log(com) pour vérifier
// on affiche 
document.getElementById("orderId").textContent += com;