//** innerText & text content
// innerText:visible rendered text only
// textContent: all text nodes regardless of CSS
// innerHTML: allows reading or writing HTML markup inside an element */

const message = document.getElementById("message");

const textContent = document.getElementById("textContentBtn");

const reset = document.getElementById("resetBtn");

const box = document.getElementById("box");

document.getElementById("innerTxtBtn").addEventListener("click",function(){
    message.innerText="Updated using inneText";
});

document.getElementById("textContentBtn").addEventListener("click",function(){
    message.textContent="Updated using textContent";
});

document.getElementById("resetBtn").addEventListener("click",function(){
    message.innerText="Original message";
});

document.getElementById("innerHTMLBtn").addEventListener("click",function(){
    box.innerHTML ="<strong>Original</strong> content";
});