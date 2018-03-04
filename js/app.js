document.addEventListener('DOMContentLoaded', () => {//loading the DOM before we mess with it    
    const form = document.getElementById('registrar');
    const name = document.querySelector('#name');  
    const email = document.querySelector("#mail");
    const nameLabel = name.previousElementSibling;  
    const emailLabel = email.previousElementSibling;

    const jobRolesFieldset = document.querySelectorAll("fieldset")[0];
    const jobSelect = document.querySelector("#title");  
    const jobAllOptions = jobSelect.children;  
    const otherOption = jobSelect.lastElementChild;
    const otherBox = document.querySelector("#other-title");    
    
    const designDrop = document.querySelector("#design");    
    const colorDiv = document.querySelector("#colors-js-puns");
    const colorDrop = document.querySelector("#color");
    const colorList = colorDrop.children;

    const activityFieldset = document.querySelector(".activities");
    const activityLabel = document.querySelector(".activities legend");
    const activityCheckbox = document.querySelectorAll("input[type=checkbox]");
    const priceSpan = document.querySelector("#priceSpan");

    const paymentSelect = document.querySelector("#payment");
    const paymentLabel = paymentSelect.previousElementSibling;
    const sectionCreditCard = document.querySelector("#credit-card");
    const sectionPayPal = sectionCreditCard.nextElementSibling;
    const sectionBitCoin = sectionPayPal.nextElementSibling;
    
    // INITIAL ON LOAD HAPPENINGS
    name.focus(); //Focusing on the name field 1st and foremost
    paymentSelect.value = "credit card" //payment field starts on credit card
    sectionPayPal.style.display = "none";//hide paypal
    sectionBitCoin.style.display = "none";//hide bitcoin

//  ”Job Role” section of the form
//  Showing the other box when other is selected
    otherBox.style.display = "none";//hiding box
    jobRolesFieldset.onchange = function otherJobShow(e) { 
        if(e.target.value === "other") { 
        otherBox.style.display = "block";//showing box then focusing on it
        otherBox.focus();
        }
        else {
        otherBox.style.display = "none";
        }    
    }

//  "Shirt Color" coordination
    colorDiv.style.display = "none";//hiding color selection until a shirt type is selected
    designDrop.onchange = function otherJobShow(e) { 
        if(e.target.value === "js puns") {
            colorDiv.style.display = "block";     
            colorDrop.value = 'cornflowerblue';
            for(let i = 0; i < colorList.length; i++){
                if(i <= 2) {
                    colorList[i].style.display = "block";//Showing first 3 selections(for js puns)
                }
                else {
                    colorList[i].style.display = "none";//Hiding last 3 selections(for js puns)
                }
            }
        }
        else if(e.target.value === "heart js") {
            colorDiv.style.display = "block";
            colorDrop.value = 'tomato';
            for(let i = 0; i < colorList.length; i++){
                if(i > 2) {
                    colorList[i].style.display = "block";//Showing last 3 selections(for heart js)
                }
                else {
                    colorList[i].style.display = "none";//Hiding first 3 selections(for heart js)
                }
            }
        }
        else {
            colorDiv.style.display = "none";
        }    
    }
    //Every time an activity checkbox is checked...
    activityFieldset.addEventListener('change', (e) => {
     activityCheck();//Disable conflicting times
     disableChoice();//Style disabled activities
     priceSpan.textContent = "Total: $" + calculateTotal();//Change the calculated total on html
     if(calculateTotal() === 0) {//if total is $0 we hide the total span
        priceSpan.textContent = "";
     }
});
//Function to see if activity is checked and if it conflicts with another.
//If there is a conflict it will then disable the conflicting activities.
function activityCheck() {
            if(activityCheckbox[1].checked) { //BOX TWO Tuesday 9am-12pm,
                activityCheckbox[3].disabled = true;                
            }
            else { 
                activityCheckbox[3].disabled = false;                
            }
            if(activityCheckbox[2].checked) { //BOX THREE Tuesday 1pm-4pm,
                activityCheckbox[4].disabled = true;                               
            }
            else { 
                activityCheckbox[4].disabled = false;                            
            } 
            if(activityCheckbox[3].checked) { //BOX FOUR Tuesday 9am-12pm,
                activityCheckbox[1].disabled = true;                
            }
            else { 
                activityCheckbox[1].disabled = false;                
            }
            if(activityCheckbox[4].checked) { //BOX FIVE Tuesday 1pm-4pm,
                activityCheckbox[2].disabled = true;                
            }
            else { 
                activityCheckbox[2].disabled = false;                
            }               
      }
//  Function to style the disabled activities
    function disableChoice() {    
                activityCheckbox.forEach(function(i) {
                if(i.disabled){//if the activity is disabled put a line through it and gray it out
                    i.parentNode.style.textDecoration = "line-through";
                    i.parentNode.style.color = "#ccc";
                }
                else {//if the activity is available keep it black and with no line through it
                    i.parentNode.style.textDecoration = "none";
                    i.parentNode.style.color = "#000";
                }    
        });
    }
//  Function for calculating the total from each box and returning the final total    
    function calculateTotal() {
        let total = 0;
        for(let i = 0; i < activityCheckbox.length; i++) {//loop through each activity            
            if(activityCheckbox[i].checked) {//if that activity is checked...
                if(i != 0) {//...add 100 dollars to the total if it's not the main conference
                    total += + 100;
                }
                else {//...if it is the main conference add 200 dollars
                    total += + 200;
                }
            }
            // if(activityCheckbox[i] == false){//if that activity is not checked...
            //     total = total;//do not add anything to the total for that box
            // }          
        }
        return total;  
    }
//  Credit card, paypal, bitcoin hidden or shown based on payment selection
    paymentSelect.onchange = function otherJobShow(e) { 
        if(e.target.value ==="credit card") { //show credit card
            sectionCreditCard.style.display = "block";
            sectionPayPal.style.display = "none";
            sectionBitCoin.style.display = "none";
            paymentLabel.innerHTML = 'I&#8217;m going to pay with:';
        }
        else if(e.target.value ==="paypal") { //show paypal
            sectionCreditCard.style.display = "none";
            sectionPayPal.style.display = "block";
            sectionBitCoin.style.display = "none";
            paymentLabel.innerHTML = 'I&#8217;m going to pay with:';
        }
        else if(e.target.value ==="bitcoin") { //show bitcoin
            sectionCreditCard.style.display = "none";
            sectionPayPal.style.display = "none";
            sectionBitCoin.style.display = "block";
            paymentLabel.innerHTML = 'I&#8217;m going to pay with:';
        }
        else {
            sectionCreditCard.style.display = "none";//hides other div if payment selection is not selected
            sectionPayPal.style.display = "none";
            sectionBitCoin.style.display = "none";
            paymentLabel.innerHTML = 'I&#8217;m going to pay with: <span class="validationText">*Please Select a Payment Method.</span>';
        }
}

//  Submit button doesn't reload page until all fields are legit
    form.addEventListener('submit',(e)=> {
        let userName = name.value;
        let validated = false;
        let nameValidation = false;
        let emailValidation = false;
        let checkboxValidation = false;
        let creditcardValidation = false;
//  NAME FIELD
    if(userName.length > 0) {//if there is a name present          
        nameValidation = true;
        name.style.borderColor = "green";
        nameLabel.innerHTML = "Name:"
    }
    else {//if there is no name present
        nameValidation = false;
        name.style.borderColor = "red";
        name.focus();
        nameLabel.innerHTML = 'Name: <span class="validationText">*Please enter your name before submitting.</span>'
    }
///////////////////////////////////////
//EMAIL FIELD
// "email === string + at + string2 + com"

let emailValue = email.value;


if(/(.+)@(.+){2,}\.(.+){2,}/.test(emailValue)){
    emailValidation = true;
    email.style.borderColor = "green";
    emailLabel.innerHTML = "Email:";
} 
else {
    emailValidation = false;
    email.style.borderColor = "red";
    emailLabel.innerHTML = 'Email: <span class="validationText">*Please enter valid email. ex(email@domain.com)</span>';
    if(!nameValidation){
        name.focus();
    }
    else {
        email.focus();
    }
}

///////////////////////////////////////
//CHECKBOX FIELD
if(calculateTotal() > 0) {//if the total price is not 0...
    checkboxValidation = true;
    activityLabel.innerHTML = "Register for Activities"
}
else {//if there is no total price...
    checkboxValidation = false;    
    activityLabel.innerHTML = 'Register for Activities <span class="validationText">*Please select at least one activity before submitting.</span>'    
    if(!nameValidation){
        name.focus();
    }
    else if (!emailValidation){
        email.focus();
    }
    else {
        activityLabel.focus();
    }
}
///////////////////////////////////////
const cardNum = document.querySelector("#cc-num");
const cardValue = cardNum.value;
const cardNumLabel = cardNum.previousElementSibling;
const zipCode = document.querySelector("#zip");
const zipValue = zipCode.value;
const zipCodeLabel = zipCode.previousElementSibling;
const cvv = document.querySelector("#cvv");
const cvvValue = cvv.value;
const cvvLabel = cvv.previousElementSibling;
//PAYMENT FIELD
if(paymentSelect.value === "credit card"){//if credit card selected...
    if(cardValue.length >= 13 && cardValue.length <= 16 && zipValue.length === 5 && cvvValue.length === 3 && !isNaN(cardValue) && !isNaN(zipValue) && !isNaN(cvvValue)) {
        creditcardValidation = true;
    }
    if(cardValue.length <13 || cardValue.length > 16 || isNaN(cardValue)) {//card number validation
        creditcardValidation = false;        
        if(cardValue.length === 0) {
            cardNumLabel.innerHTML = 'Card Number: <span class="validationText small">*Please enter a card number</span>';
        cardNum.style.borderColor = "red";
        }
        else if (isNaN(cardValue)){
            cardNumLabel.innerHTML = 'Card Number: <span class="validationText small">*Please enter numerical value</span>';
        cardNum.style.borderColor = "red";
        }
        else {
        cardNumLabel.innerHTML = 'Card Number: <span class="validationText small">*Must be between 13-16 digits</span>';
        cardNum.style.borderColor = "red";
        }
        if(nameValidation && emailValidation && checkboxValidation){
            cardNum.focus();
        }       
    }
    else {
        cardNumLabel.innerHTML = 'Card Number:'
        cardNum.style.borderColor = "green";
    }

    if(zipValue.length !== 5) {//zip code validation
        creditcardValidation = false;
        zipCodeLabel.innerHTML = 'Zip Code: <span class="validationText small">*Invalid Zip</span>';
        zipCode.style.borderColor = "red";
        if(nameValidation && emailValidation && checkboxValidation && cardValue.length >= 13 && cardValue.length <= 16 && !isNaN(cardValue)){
            zipCode.focus();
        }
    }
    else {
        zipCodeLabel.innerHTML = 'Zip Code:'
        zipCode.style.borderColor = "green";
    }

    if(cvvValue.length !== 3) {//cvv value validation
        creditcardValidation = false;
        cvvLabel.innerHTML = 'CVV: <span class="validationText small">*Must be 3 digits</span>';
        cvv.style.borderColor = "red";
        if(nameValidation && emailValidation && checkboxValidation && cardValue.length >= 13 && cardValue.length <= 16 && !isNaN(cardValue) && zipValue.length === 5 && !isNaN(zipValue)){
            cvv.focus();
        }
    }
    else {
        cvvLabel.innerHTML = 'CVV:'
        cvv.style.borderColor = "green";
    }
    
    if(isNaN(zipValue)){
        zipCodeLabel.innerHTML = 'Zip Code: <span class="validationText small">*Invalid Zip</span>';
    zipCode.style.borderColor = "red";
    }
    if(isNaN(cvvValue)){
        cvvLabel.innerHTML = 'CVV: <span class="validationText small">*Must use digits</span>';
    cvv.style.borderColor = "red";
    }    
}
else if(paymentSelect.value === "select_method") {
    creditcardValidation = false;
    if(nameValidation && checkboxValidation){
        paymentSelect.focus();
    }
}
else {    
    creditcardValidation = true;
}
///////////////////////////////////////

        

        if(nameValidation && emailValidation && checkboxValidation && creditcardValidation) {//If all conditions are legit, you may submit
            validated = true;
        }
        else {
            validated = false;//If even 1 condition shows bare? You aint goin nowhere
        }
        console.log(userName.length);
        if(!validated) {
        e.preventDefault();  
        }     
    });

///////////////end of page load//////////////
});