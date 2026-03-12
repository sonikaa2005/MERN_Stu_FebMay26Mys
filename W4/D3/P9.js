const asyncFetchBtn = document.getElementById("asyncFetchBtn");
const output = document.getElementById("output");
const postIdInput = document.getElementById("postIdInput");

asyncFetchBtn.addEventListener("click", async function () {
    //output.textContent = "Loading user...";
    const id = postIdInput.value.trim();
    if (id === "") {
        output.textContent = "Post ID is required.";
        return;
    }
    const numericID = Number(id);
    console.log(numericID);
    if (numericID > 100) {
        output.textContent = "invalid";
        return;
    }
    try {
        output.textContent = "Fetching post ..";
        const response = await
            fetch("https://jsonplaceholder.typicode.com/posts/"+numericID); //await=to make wait untill response is recieved
        if (!response.ok) throw new Error("HTTP error:" + response.status);
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
    }
    catch (error) {
        output.textContent = "Error: " + error.message;
    }
});