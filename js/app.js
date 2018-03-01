document.addEventListener('DOMContentLoaded', () => {//loading the DOM before we mess with it    
    const form = document.getElementById('registrar');
    const name = document.querySelector('#name');    

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
    const activityCheckbox = document.querySelectorAll("input[type=checkbox]");
    const priceSpan = document.querySelector("#priceSpan");

    const paymentSelect = document.querySelector("#payment");
    const sectionCreditCard = document.querySelector("#credit-card");
    const sectionPayPal = sectionCreditCard.nextElementSibling;
    const sectionBitCoin = sectionPayPal.nextElementSibling;
             
    name.focus(); //Focusing on the name field 1st and foremost
    paymentSelect.value = "credit card" //payment field starts on credit card

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
        }
        else if(e.target.value ==="paypal") { //show paypal
            sectionCreditCard.style.display = "none";
            sectionPayPal.style.display = "block";
            sectionBitCoin.style.display = "none";
        }
        else if(e.target.value ==="bitcoin") { //show bitcoin
            sectionCreditCard.style.display = "none";
            sectionPayPal.style.display = "none";
            sectionBitCoin.style.display = "block";
        }
        else {
            sectionCreditCard.style.display = "none";//hides other div if payment selection is not selected
            sectionPayPal.style.display = "none";
            sectionBitCoin.style.display = "none";
        }
}
// If any of the following validation errors exist, prevent the user from submitting the form:
// Name field can't be blank
// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
// Must select at least one checkbox under the "Register for Activities" section of the form.
// If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
// Credit card field should only accept a number between 13 and 16 digits
// The zipcode field should accept a 5-digit number
// The CVV should only accept a number that is exactly 3 digits long




//  Submit button doesn't reload page until all fields are legit

    form.addEventListener('submit',(e)=> {
        let userName = name.value;
        let validated = true;
        let nameValidation = false;
        let emailValidation = false;
        
//NAME FIELD
        if(userName.length < 1) {           
            nameValidation = false;
        }
        else {
            nameValidation = true;
        }
///////////////////////////////////////
//
        

        if(nameValidation) {//If all conditions are legit, you may submit
            validated = true;
        }
        else {
            validated = false;//If even 1 condition is so bare? You aint goin nowhere
        }
        console.log(userName.length);
        if(!validated) {
        e.preventDefault();  
        }     
    });

///////////////end of page load//////////////
});