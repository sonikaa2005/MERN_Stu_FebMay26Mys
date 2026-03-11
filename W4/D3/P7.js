const existingPostBtn = document.getElementById("existingPostBtn");
const missingPostBtn = document.getElementById("missingPostBtn");
const satusOutput = document.getElementById("satusOutput");

function fetchPost(url) {
    statusOutput.textOutput = "Fetching from" + url;
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Http error Status Code:" + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            statusOutput.textContent = "Success: " + JSON.stringify(data, null, 2);
        })
        .catch(function (error) {
            satusOutput.textContent = "Error: " + error.message;
        });
}
existingPostBtn.addEventListener("click",function(){
    fetchPost("https://jsonplaceholder.typicode.com/posts//10");
});

missingPostBtn.addEventListener("click",function(){
    fetchPost("https://jsonplaceholder.typicode.com/posts//101");
});