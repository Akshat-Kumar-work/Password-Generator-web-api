const passwordDisplay = document.querySelector("[data-password-display]"); /*element having pass data fetched-*/
const copyBtn = document.querySelector("[data-copy]"); /*button which copy password fetched*/
const copyMsg = document.querySelector("[data-copyMsg]"); /*span element having message when copied a pass*/ 
const lengthDisplay = document.querySelector("[data-length-no]"); /*para showing length of data, is fetched*/
const inputSlider = document.querySelector("[data-length-slider]"); /*slider element fetched*/ 
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");/* indicator which change color acc to strenght of password*/ 
const generateBtn = document.querySelector(".generateButton"); 
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~@#$%^&*(){}:"|;<>?|';

let password =" ";
let passwordLength =10;
let checkbox=1;
handleSlider(); /*calling function to move the slider acc to passlength*/

//set strength circle color grey;


// this slider function sets length of password
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText =passwordLength;
};

function setIndicator (color){
    indicator.style.backgroundColor=color;
    //shadow;
};

//this function provide random interger from max to min
function getRandomInteger(min,max){
    Math.floor(Math.random() * (max-min)) +  min;  /* it give random integer from min to max*/
};

// this function provide random no from 0 to 9
function generateRandomNumber(){
    return getRandomInteger(0,9);
};

//this function provide random askii value and convert into string , a askii value is 97 and z askii value is 123
function generateLowercase(){
  return String.fromCharCode(getRandomInteger(97,123)) ;
};

//this function provide random askii value and convert into string , A askii value is 65 and Z askii value is 91
function generateUppercase(){
   return String.fromCharCode(getRandomInteger(65,91)) ;
 };

 //this function generate the random no and use it as a index of symbols string 
 function generateSymbol(){
    const RandomNUM = generateRandomNumber(0,symbols.length);
    return symbols.charAt(RandomNUM);
 };

 //it will decide generated pass is strong weak or average
function calcStrength(){

    let haveuppercase = false ;
    let havelowercase = false ;
    let haveNum = false ;
    let havesymbol = false ;

    if(uppercaseCheck.checked) haveuppercase = true;
    if(lowercaseCheck.checked) havelowercase = true;
    if(numbersCheck.checked) haveNum = true;
    if(symbolsCheck.checked) havesymbol = true;

    if(haveuppercase && hasLower && haveNum && havesymbol && passwordLength >=0){
        setIndicator("#0f0");
    }
    else if ((havelowercase|| haveuppercase) && (haveNum || havesymbol) && password>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
};

//it will copy the generated password and show copid text when pass is copied 
async function toCopyPass (){
try{
    await navigator.clipboard.writeText(passwordDisplay.value); /*this method will copy value present in passwordDisplay*/
    copyMsg.innerText = "copied"
}
catch(e){
    copyMsg.innerText = "Failed";
}

    //this make the copied mess visible by adding active class present in css file
   copyMsg.classList.add("active");

   setTimeout(()=> {
    copyMsg.classList.remove("active");
   },3000);
    
};

/*setting event listner on slider which  update the value of length display*/
inputSlider.addEventListener('input',(e)=>{
    passwordLength= e.target.value; /*it will update the value into password length variable*/
    handleSlider(); /*calling handle slider function to update the pass length*/ 
});

/*setting event listner on copy button to copy content on click */
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        toCopyPass();
    }
});


generateBtn.addEventListener('click',()=>{
    
})