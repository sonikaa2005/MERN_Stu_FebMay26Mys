const asyncFetchBtn = document.getElementById("asyncFetchBtn");
const output = document.getElementById("output");

asyncFetchBtn.addEventListener("click", async function (){
    try{
        const response = await
        fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok) throw new Error("HTTP error: "+response.status); // response status indicates valid or invalid status
        const users=await response.json();
        console.log(users);

        const firstThree = users.slice(0,3);
        output.textContent = JSON.stringify(firstThree,null,2);// to print user profile in display

    }
    catch(error){
        output.textContent="Error:"+error.message;
    }
});