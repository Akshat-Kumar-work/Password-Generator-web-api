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
let checkcount= 0;
handleSlider(); /*calling function to move the slider acc to passlength*/

setIndicator("white");


// this slider function sets length of password on user interface
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText =passwordLength;
}

function setIndicator (color){
    indicator.style.backgroundColor=color;
    //shadow;
}

//this function provide random interger from max to min
function getRandomInteger(min,max){
   return Math.floor(Math.random() * (max-min)) +  min;  /* it give random integer from min to max*/
}
// this function provide random no from 0 to 9
function generateRandomNumber(){
    return getRandomInteger(0,9);
}

//this function provide random askii value and convert into string , a askii value is 97 and z askii value is 123
function generateLowercase(){
  return String.fromCharCode(getRandomInteger(97,123)) ;
}

//this function provide random askii value and convert into string , A askii value is 65 and Z askii value is 91
function generateUppercase(){
   return String.fromCharCode(getRandomInteger(65,91)) ;
 }

 //this function generate the random no and use it as a index of symbols string 
 function generateSymbol(){
    const RandomNUM = generateRandomNumber(0,symbols.length);
    return symbols.charAt(RandomNUM);
 }

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

    if(haveuppercase && havelowercase && (haveNum || havesymbol) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if ((havelowercase|| haveuppercase) && (haveNum || havesymbol) && password>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

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
    
}

/*setting event listner on slider which  update the value of length display*/
inputSlider.addEventListener('input',(e)=>{
    passwordLength= e.target.value; /*it will update the value into password length variable*/
    handleSlider(); /*calling handle slider function to update the pass length*/ 
})

/*setting event listner on copy button to copy content on click */
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        toCopyPass(); 
    }
})

//any change on checkbox checkcount is incremented
function handleCheckBoxChange(){
 checkcount =0;
 allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked){
        checkcount++;
    }
 })

//special condition - if password length is less than checkcount , then password length is equal to check count
if(passwordLength< checkcount){
    passwordLength = checkcount;
    handleSlider(); //updating ui
}
}


//if any change occur on checkbox it will start the loop again to check the checkbox by incrementing them
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

//this function shuffle the password
function shufflePassword(array) {
    //Fisher Yates Method , it is a algo used to shuffle the password
    for (let i = array.length - 1; i > 0; i--) { //loop from last index to zero in password
        const j = Math.floor(Math.random() * (i + 1)); //getting the random element j from the password
        const temp = array[i]; //at last swapping the last digit and with j
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el)); //adding the each element of an array into string  
    return str;
}

generateBtn.addEventListener('click',()=>{
      //no checkbox checked
      if(checkcount == 0){
        return;
      }
      //if all four checkbox checked and password length is less than 4 by slider
      else if (passwordLength < checkcount ){
        passwordLength = checkcount;
        handleSlider();
      }

      //to find new password
      console.log("Starting the Journey");
      //remove old password
      password=" ";

      //putting stuff mentioned through checkboxes


    //   if(uppercaseCheck.checked){
    //     password += generateUppercase();
    //   }
    //   else if (lowercaseCheck.checked){
    //     password += generateLowercase();
    //   }
    //   else if (numbersCheck.checked){
    //     password += generateRandomNumber();
    //   }
    //   else if (symbolsCheck.checked){
    //     password += generateSymbol();
    //   }

    let funcArr = []; //this array contain functions to generate diff characters

    if(uppercaseCheck.checked){  //if uppercase is checked its function will store in funcArr
        funcArr.push(generateUppercase);} 

     if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);}

     if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);}

     if(symbolsCheck.checked){
         funcArr.push(generateSymbol);}

    // checked 4 element addition in password
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i](); //in this the bracket is calling the function present inside the funcArr[i] 
    }
    console.log("Compulsory addition done");

       //remaining addition = selected passwordlength by slider - total checked element
       for(let i=0; i<passwordLength-funcArr.length; i++) {
        
        let randIndex = getRandomInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex] (); //in this the bracket is calling the  function present in funcArr[randIndex]

    }
    console.log("Remaining adddition done")
      
    //shufling password to make it random
    password = shufflePassword(Array.from(password)); //sending password in form of array
    console.log("Shuffling done");

    //displaying pass
    passwordDisplay.value = password;
    console.log("UI adddition done");

    //calculate strength calling
    calcStrength();


});