
const container = document.getElementById("conatiner");

//**Position:
// beforebegin
// afterbegin
// beforeend
// afterend */

document.getElementById("btn").addEventListener("click",function(){
    container.insertAdjacentHTML("beforebegin","<p>Dynamically inserted</p>");
});