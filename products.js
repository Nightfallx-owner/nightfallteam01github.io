const products=[
"Burger","Pizza","Chicken","Salad","Rice",
"Pasta","Juice","Wrap","Soup","Steak",
"Sushi","Fries","Oats","Smoothie","Avocado",
"Fruit Bowl","Protein Shake","Sandwich","Ice Cream","Noodles"
];

let grid=document.getElementById("grid");

let cart=JSON.parse(localStorage.getItem("cart")||"[]");

grid.innerHTML=products.map(p=>`
<div class="card">
<img src="https://source.unsplash.com/300x200/?food,${p}">
<div class="info">
<h3>${p}</h3>
<button onclick="add('${p}')">Add</button>
</div>
</div>
`).join("");

function add(p){
cart.push(p);
localStorage.setItem("cart",JSON.stringify(cart));
alert(p+" added");
}

function goOrder(){
if(cart.length===0){
alert("Cart empty!");
return;
}
window.location.href="track.html";
}
