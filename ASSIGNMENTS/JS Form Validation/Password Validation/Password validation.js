// Form Validation
const signupForm = document.getElementById("signupForm");
const signupconfirmPassword=document.getElementById("signupconfirmPassword");
const signupPassword = document.getElementById("signupPassword");
const message = document.getElementById("message");

signupForm.addEventListener("input",function(event){
    event.preventDefault();
    //Password validation
    const password = signupPassword.value;
    // console.log(signupForm.elements.signupPassword.value);
    if(!password){
        message.textContent = "Password is required.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }
    //check length of the password
    if(password.length < 8){
        message.textContent = "Password must be atleast 8 characters long.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }
    //check password has UPPERCASE characters
    if(!/[A-Z]/.test(password)){
        message.textContent = "Password must contain atleast 1 UPPERCASE character.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }
    //check password has LOWERCASE characters
    if(!/[a-z]/.test(password)){
        message.textContent = "Password must contain atleast 1 LOWERCASE character.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }
    //check number 
    if(!/\d/.test(password)){
        message.textContent = "Password must contain atleast 1 digit in it.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }
    //check special characters
    if(!/[@#$%&*!]/.test(password)){
        message.textContent = "Password must contain atleast 1 special character in it.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }
    const password1 = signupconfirmPassword.value;
    if(password===password1){
    message.textContent = "Valid password entered";
    message.style.color = "green";
    console.log(message);
   }
    else if(password!==password1){
    message.textContent = "Invalid password entered";
    message.style.color = "red";
    console.log(message);
   }
   

});