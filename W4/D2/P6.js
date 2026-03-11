const livePassword=document.getElementById("livePassword");
const message=document.getElementById("message");
livePassword.addEventListener("input",function(){
    const password = livePassword.value;
    if(!password){
        message.textContent = "Password is required.";
        message.style.color = "red";
        livePassword.focus();
        return;
    }
    //check length of the password
    if(password.length < 8){
        message.textContent = "Password must be atleast 8 characters long.";
        message.style.color = "red";
        livePassword.focus();
        return;
    }
    //check password has UPPERCASE characters
    if(!/[A-Z]/.test(password)){
        message.textContent = "Password must contain atleast 1 UPPERCASE character.";
        message.style.color = "red";
        livePassword.focus();
        return;
    }
    //check password has LOWERCASE characters
    if(!/[a-z]/.test(password)){
        message.textContent = "Password must contain atleast 1 LOWERCASE character.";
        message.style.color = "red";
        livePassword.focus();
        return;
    }
    //check number 
    if(!/\d/.test(password)){
        message.textContent = "Password must contain atleast 1 digit in it.";
        message.style.color = "red";
        livePassword.focus();
        return;
    }
    //chech special characters
    if(!/[@#$%&*!]/.test(password)){
        message.textContent = "Password must contain atleast 1 special character in it.";
        message.style.color = "red";
        livePassword.focus();
        return;
    }

    message.textContent = "Valid email & password entered";
    message.style.color = "green";
    console.log("Success!",{email,password});
});