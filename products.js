const products=[
"Burger","Pizza","Chicken","Salad","Rice","Pasta","Juice","Wrap",
"Soup","Steak","Sushi","Fries","Oats","Smoothie","Avocado Toast",
"Fruit Bowl","Protein Shake","Sandwich","Ice Cream","Noodles"
];

let html="";
products.forEach(p=>{
html+=`
<div class="card">
<img src="https://source.unsplash.com/300x200/?food,${p}">
<div class="info">
<h3>${p}</h3>
<button onclick="order('${p}')">Add Order</button>
</div>
</div>
`;
});

document.getElementById("grid").innerHTML=html;

function order(p){
let orders=JSON.parse(localStorage.getItem("orders")||"[]");
orders.push(p);
localStorage.setItem("orders",JSON.stringify(orders));
alert(p+" added to order");
}
