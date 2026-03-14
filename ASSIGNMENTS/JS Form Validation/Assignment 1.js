// FAQ Builder with Dynamic Section

const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const addBtn = document.getElementById("addBtn");
const faqContainer = document.getElementById("faqContainer");
const error = document.getElementById("error");

addBtn.addEventListener("click", function () {

let question = questionInput.value.trim();
let answer = answerInput.value.trim();

error.textContent = "";



if (question.length < 5) {
error.textContent = "Question must be at least 5 characters";
return;
}

if (answer.length < 15) {
error.textContent = "Answer must be at least 15 characters";
return;
}



const emptyMsg = document.getElementById("emptyMsg");
if (emptyMsg) {
emptyMsg.remove();
}

const faq = document.createElement("div");
faq.className = "faq";

const q = document.createElement("h4");
q.textContent = question;


q.insertAdjacentHTML(
"beforeend",
`<span class="badge">FAQ</span>`
);



const a = document.createElement("p");
a.textContent = answer;



const delBtn = document.createElement("button");
delBtn.textContent = "Delete";



delBtn.addEventListener("click", function () {
faq.remove();

if (faqContainer.children.length === 0) {

const msg = document.createElement("p");
msg.id = "emptyMsg";
msg.textContent = "No FAQs available";

faqContainer.appendChild(msg);

}

});



faq.appendChild(q);
faq.appendChild(a);
faq.appendChild(delBtn);

faqContainer.appendChild(faq);



questionInput.value = "";
answerInput.value = "";

});