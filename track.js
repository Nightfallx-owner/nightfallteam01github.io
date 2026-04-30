let map = L.map('map').setView([41.2995,69.2401],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'BSJ'
}).addTo(map);

let start=[41.31,69.24];
let end=[41.28,69.27];

L.marker(start).addTo(map).bindPopup("Restaurant");
L.marker(end).addTo(map).bindPopup("You");

let carIcon=L.icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/744/744465.png",
iconSize:[40,40]
});

let car=L.marker(start,{icon:carIcon}).addTo(map);

let i=0;

let move=setInterval(()=>{

i++;

let lat=start[0]+(end[0]-start[0])*i/100;
let lng=start[1]+(end[1]-start[1])*i/100;

car.setLatLng([lat,lng]);

if(i===20) status.innerText="Cooking food...";
if(i===60) status.innerText="On the way...";
if(i===100){
status.innerText="Delivered 🚀 BAAA!";
clearInterval(move);
}

},120);
