
// GET ORDER FROM LOCALSTORAGE
let order = JSON.parse(localStorage.getItem("bsj_order") || "[]");

// ---------------- SHOP ----------------
if(document.getElementById("orderBox")){

let box = document.getElementById("orderBox");
let totalEl = document.getElementById("total");

let total = 0;

order.forEach(i=>{
box.innerHTML += `<div class="item">${i.name} x${i.qty} - $${i.price*i.qty}</div>`;
total += i.price * i.qty;
});

totalEl.textContent = total;

// AI speech
speak("Your order is ready for confirmation");

}

function confirmOrder(){

speak("Order confirmed. Preparing delivery.");

document.getElementById("music").play().catch(()=>{});

setTimeout(()=>{
window.location.href="track.html";
},2000);

localStorage.setItem("bsj_active_order", JSON.stringify(order));
localStorage.removeItem("bsj_order");
}

function goTrack(){
window.location.href="track.html";
}

// ---------------- TRACK ----------------
if(document.getElementById("car")){

let car = document.getElementById("car");
let status = document.getElementById("status");
let ai = document.getElementById("ai");
let bar = document.getElementById("progress");
let finish = document.getElementById("finish");

let pos = 0;

let interval = setInterval(()=>{

pos += 2;
car.style.left = pos + "px";
bar.style.width = pos + "%";

if(pos < 20){
status.textContent = "Preparing food...";
ai.textContent = "AI: Kitchen is working";
}

if(pos >= 20 && pos < 50){
status.textContent = "Driver picked order";
ai.textContent = "AI: Driver left restaurant";
speak("Driver picked your order");
}

if(pos >= 50 && pos < 80){
status.textContent = "On the way...";
ai.textContent = "AI: Driver is moving";
}

if(pos >= 80){
status.textContent = "Almost arrived";
ai.textContent = "AI: Near destination";
}

if(pos >= 100){
clearInterval(interval);
status.textContent = "Delivered";
ai.textContent = "AI: Order completed";
finish.style.display="block";
speak("Order delivered. Enjoy your meal");
}

},120);

}

function restart(){
location.reload();
}

// ---------------- AI SPEECH ----------------
function speak(text){
let msg = new SpeechSynthesisUtterance(text);
msg.lang = "en-US";
speechSynthesis.speak(msg);
}
