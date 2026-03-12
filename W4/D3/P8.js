const asyncFetchBtn = document.getElementById("asyncFetchBtn");
const output = document.getElementById("output");

asyncFetchBtn.addEventListener("click", async function () { //async,await
    output.textContent = "Loading user...";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts//10"); //await=to make wait untill response is recieved
        if (!response.ok) throw new Error("HTTP error:" + response.status);
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
    }
    catch(error) {
        output.textContent = "Error: " + error.message;
    }
});