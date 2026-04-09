let password = document.querySelector("#password");
let message = document.querySelector("#message");
let strength = document.querySelector("#stregth");
let eyeIcon = document.getElementById("eye-icon");
let generateBtn = document.querySelector(".generate-btn");

let passwordLength = 12;

let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerCase = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

const allChars = upperCase + lowerCase + numbers + symbols;

function generatePassword() {
  let randomPassword = "";
  randomPassword += upperCase[Math.floor(Math.random() * upperCase.length)];
  randomPassword += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  randomPassword += numbers[Math.floor(Math.random() * numbers.length)];
  randomPassword += symbols[Math.floor(Math.random() * symbols.length)];

  while (passwordLength > randomPassword.length) {
    randomPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }
  console.log('password is:',randomPassword)
  password.value = randomPassword;
}

function copyPassword(){
    password.select()
    document.execCommand("copy")
}

eyeIcon.onclick = ()=>{
    if(password.type=='password'){
        password.type = "text"
        eyeIcon.innerText = 'visibility'
    }
    else{
        password.type = "password"
        eyeIcon.innerText = 'visibility_off'
    }
}