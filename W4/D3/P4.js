const jsonOutput = document.getElementById("jsonOutput");

document.getElementById("saveBtn").addEventListener("click", function () {
    const user = {
        name: "Rahul",
        id: 30,
        role: "Software Developer",
        skills: ["HTML", "CSS", "JS"]
    };
    localStorage.setItem("userProfile", JSON.stringify(user));
    jsonOutput.textContent = "user object saved as string to localStorage";

});

document.getElementById("readBtn").addEventListener("click", function () {
    // const user = localStorage.getItem("user");
    // localStorage.setItem("userProfile", JSON.stringify(user));
    // jsonOutput.textContent = "user object read as string to localStorage";
    try {
        const up = localStorage.getItem("userProfile");
        console.log(JSON.parse(up));
        console.log(up);
        jsonOutput.textContent = "userProfile" + up;
    }
    catch(error){
        jsonOutput.textContent= "JASON parsing failed";
    }
    
});