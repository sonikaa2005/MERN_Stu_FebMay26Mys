//Multi-Section Feedback Analyzer

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const typeInput = document.getElementById("type");
const feedbackInput = document.getElementById("feedback");

const submitBtn = document.getElementById("submitBtn");
const container = document.getElementById("container");
const error = document.getElementById("error");
const count = document.getElementById("count");

let total = 0;

submitBtn.addEventListener("click", function(){

let name = nameInput.value.trim();
let email = emailInput.value.trim();
let type = typeInput.value;
let feedback = feedbackInput.value.trim();

error.textContent = "";


if(!name || !email || !type || !feedback){
error.textContent = "All fields are required";
return;
}

let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!emailPattern.test(email)){
error.textContent = "Invalid Email";
return;
}

if(feedback.length < 20){
error.textContent = "Feedback must be at least 20 characters";
return;
}



let label = "";

if(type === "Bug"){
label = "[Needs Review]";
}
else if(type === "Suggestion"){
label = "[Idea]";
}
else{
label = "[Positive]";
}


const card = document.createElement("div");
card.className = "card";


card.innerHTML = `
<h4 class="label">${label}</h4>
<p><strong>Name:</strong> <span class="n"></span></p>
<p><strong>Email:</strong> <span class="e"></span></p>
<p><strong>Type:</strong> <span class="t"></span></p>
<p><strong>Feedback:</strong> <span class="f"></span></p>
<button class="del">Delete</button>
`;

card.querySelector(".n").textContent = name;
card.querySelector(".e").textContent = email;
card.querySelector(".t").textContent = type;
card.querySelector(".f").textContent = feedback;


card.querySelector(".del").addEventListener("click", function(){
card.remove();
total--;
count.textContent = total;
});


container.appendChild(card);

total++;
count.textContent = total;

nameInput.value="";
emailInput.value="";
typeInput.value="";
feedbackInput.value="";

});