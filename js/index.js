
//Globle variables
var errors = "";
var flName;
var phone;
var creditCardNum;
var expiryMonth;
var expiryYear;
var creditCardNumRegex;
var expiryMonthRegex;
var expiryYearRegex;
var tShirtsQuantity;
var jeansQuantity;
var hoodiesQuantity;
var sweatShirtsQuantity;
var jacketsQuantity;
var nameText; 
var userPhone; 
var textTshirt;
var textJeans;
var textHoodies;
var textSShirt;
var textJacket;
var tshirtPrice = 7.99;
var jeanPrice = 20.00;
var hoodiesPrice = 24.99;
var sweatShirtPrice = 9.99;
var jacketPrice = 55.99;
var tshirtTotal = 0.0;
var jeansTotal = 0.0;
var hoodiesTotal = 0.0;
var sweatShirtTotal = 0.0;
var jacketTotal = 0.0;
var receiptOutput;
var receiptMainContent;
var subTotal = 0.0;
var taxGST = 0.0;
var Total = 0.0;



function formCheckout() {
     errors = "";

    //Regex format for credit card number. credit card expiry month and year.
    creditCardNumRegex = /^[0-9]{4}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}/;
    // expiry month regex reference from : https://stackoverflow.com/questions/20430391/regular-expression-to-match-credit-card-expiration-date
    expiryMonthRegex = /^0[1-9]|1[0-2]$/;
    expiryYearRegex = /^[0-9]{4}$/;
    // [2-9]{1}[0-9]{2}[0-9], [2-9]{1}[0-9]{3}
    

    //fetch all the input value from all the field such as name, phone, credit card number, expiry month and year
    flName = document.getElementById('userName').value;
    phone = document.getElementById('phone').value;
    creditCardNum = document.getElementById('creditCardNum').value;
    expiryMonth = document.getElementById('expiryMonth').value;
    expiryYear = document.getElementById('expiryYear').value;

    //fetching all proudct's quantity value from input field
    tShirtsQuantity = document.getElementById('tShirtsQuantity').value;
    jeansQuantity = document.getElementById('jeansQuantity').value;
    hoodiesQuantity = document.getElementById('hoodiesQuantity').value;
    sweatShirtsQuantity = document.getElementById('sweatShirtsQuantity').value;
    jacketsQuantity = document.getElementById('jacketsQuantity').value;


    //validation for all the input such as name, phone, credit card number, expiry month, and year
    //Below validation will just make sure name field is not empty and not a number, only accept string
    if(flName.trim() == '' || !isNaN(flName)) {
            
        errors += 'Name field is required!<br>';  
    }

    //Below validation will make sure phone field is not empty and accept on numbers
    if(phone.trim() == '' || isNaN(phone)) {
        errors += 'Phone field required!<br>';  
    }

    //Below validation will validate the credit card number format 
    if(!creditCardNumRegex.test(creditCardNum)) {
        errors += 'Credit Card Number format is invalid, please eneter valid number (ex:1111-1111-1111-1111)!<br>';  
    }

    //Below validation will validate the credit card number expiry month format 
    if(!expiryMonthRegex.test(expiryMonth)) {

        errors += 'Expiration month is invalid, please enter valid month (ex:01-12)!<br>';  
    }

    //Below validation will validate the credit card number expiry year format
    if(!expiryYearRegex.test(expiryYear)) {

        errors += 'Expiration year is invalid, please enter valid year (ex: 2022, 2023)!<br>';  
    }

    //All the below conditions will validate the quantity input field only accept numbers and not a string for woman T-Shirts, Denim Jeans, Hoodie, Sweat Shirt, and Jacket
    if(isNaN(tShirtsQuantity))
    {
        errors += 'Please enter quantity in numbers for Woman T-Shirt!<br>';  
    }

    if(isNaN(jeansQuantity)) {
        errors += 'Please enter quantity in numbers for Denim Jeans!<br>';  
    }
    if(isNaN(hoodiesQuantity)) {
        errors += 'Please enter quantity in numbers for Hoodies!<br>';  
    }
    if(isNaN(sweatShirtsQuantity)) {
        errors += 'Please enter quantity in numbers for Sweat Shirts!<br>';  
    }
    if(isNaN(jacketsQuantity)) {
        errors += 'Please enter quantity in numbers for Puffer Jackets!<br>';  
    }
    
    //Below condition shows error if any
    if(errors != '') {
        document.getElementById('errors').innerHTML = errors;
        
    }
    
    else {
        //else part will generate the receipt when there is no error
        document.getElementById('errors').innerHTML = '';
        //function call for all the functionality to generate a receipt
        generateReceipt();
    }

    return false;
}

//function for receipt generation
function generateReceipt() {

    //condtion to check if all the product quantity is greater than zero if any of the product quantity match, this condition will become trues as it checks with (OR sign).
    if (tShirtsQuantity > 0 || jeansQuantity > 0 || hoodiesQuantity > 0 || sweatShirtsQuantity > 0 || jacketsQuantity > 0) {

        //fetching label text content from html file for name, phone, tshirt, jeans, hoodies, sweat shirts amd jackets
        nameText = document.getElementById('nameText').textContent;
        userPhone = document.getElementById('userPhone').textContent;
        textTshirt = document.getElementById('textTshirt').textContent;
        textJeans = document.getElementById('textJeans').textContent;
        textHoodies = document.getElementById('textHoodies').textContent;
        textSShirt = document.getElementById('textSShirt').textContent;
        textJacket = document.getElementById('textJacket').textContent;

        // table created to dispaly name and phone with its value
        receiptOutput = 
        `<h2>Let us set up with clothing style!</h2>
        <table>
            <tr>
                <td class="textBold">${nameText}</td> 
                <td>${flName}</td>
            </tr>
            <tr>
                <td class="textBold">${userPhone}</td>
                <td>${phone}</td>
            </tr>
       </table>`;  

       //append above table variable in div with id receiptHeading
       document.getElementById('receiptHeading').innerHTML = receiptOutput;

       //calculation for total as per quantity for all the products
       tshirtTotal = tShirtsQuantity * tshirtPrice;
       jeansTotal = jeansQuantity * jeanPrice;
       hoodiesTotal = hoodiesQuantity * hoodiesPrice;
       sweatShirtTotal = sweatShirtsQuantity * sweatShirtPrice;
       jacketTotal = jacketsQuantity * jacketPrice;


       //calculation for all the product's Subtotal 
       subTotal = tshirtTotal + jeansTotal + hoodiesTotal + sweatShirtTotal + jacketTotal;
       //calculation for GST tax
       taxGST = subTotal * 0.13;
       //calculation for final total
       Total = subTotal + taxGST;
       
       //Table created to display receipt with items name, quantity, unit price and total price
        receiptMainContent =
       `<table>
           <tr class="trBackground">
               <th class="alignRight">Item</th>
               <th class="alignRight">Quantity</th>
               <th class="alignRight">Unit Price</th>
               <th class="alignRight">Total Price</th>
           </tr>`
   
           //append above table, tr and td variable in div with id receiptMainContent
           document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
   
           //All the below if condtion will check condtion for quantity value greater than zero, to generate tr and td for that perticular product.
           if(tShirtsQuantity > 0){
               receiptMainContent +=  
               `<tr>
                   <td class="alignRight">${textTshirt}</td>
                   <td class="alignRight">${tShirtsQuantity}</td>
                   <td class="alignRight">$${tshirtPrice}</td>
                   <td class="alignRight">$${tshirtTotal.toFixed(2)}</td>
               </tr>`
               //append above table, tr and td variable in div with id receiptMainContent
               document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
           }
       
       
           if(jeansQuantity > 0) {
               receiptMainContent +=  
               `<tr>
                   <td class="alignRight">${textJeans}</td>
                   <td class="alignRight">${jeansQuantity}</td>
                   <td class="alignRight">$${jeanPrice.toFixed(2)}</td>
                   <td class="alignRight">$${jeansTotal.toFixed(2)}</td>
               </tr>`
               document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
           }
       

           if(hoodiesQuantity > 0) {
               receiptMainContent +=  
               `<tr>
                   <td class="alignRight">${textHoodies}</td>
                   <td class="alignRight">${hoodiesQuantity}</td>
                   <td class="alignRight">$${hoodiesPrice}</td>
                   <td class="alignRight">$${hoodiesTotal.toFixed(2)}</td>
               </tr>`
               document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
           }
      

           if(sweatShirtsQuantity > 0) {
               receiptMainContent +=  
               `<tr>
                   <td class="alignRight">${textSShirt}</td>
                   <td class="alignRight">${sweatShirtsQuantity}</td>
                   <td class="alignRight">$${sweatShirtPrice}</td>
                   <td class="alignRight">$${sweatShirtTotal.toFixed(2)}</td>
               </tr>`
               document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
           }
      

           if(jacketsQuantity > 0) {
               receiptMainContent +=  
               `<tr>
                   <td class="alignRight">${textJacket}</td>
                   <td class="alignRight">${jacketsQuantity}</td>
                   <td class="alignRight">$${jacketPrice}</td>
                   <td class="alignRight">$${jacketTotal.toFixed(2)}</td>
               </tr>`
               document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
           }
       
           //if condition to check if subtotal of the products' quanity is greater than $10
           
           if(subTotal > 10) {
                //if condtion is true it will execute and display subtotal, tax GST and final total as well as display block of the receipt container div
                receiptMainContent += 
               `<tr class="trBackground">
                    <th colspan="3" class="alignRight">Sub Total</th>
                    <td class="alignRight">$${subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <th colspan="3" class="alignRight">GST</th>
                    <td class="alignRight">$${taxGST.toFixed(2)}</td>
                </tr>
                <tr class="trBackground">
                    <th colspan="3" class="alignRight">Total</th>
                    <th class="alignRight">$${Total.toFixed(2)}</th>
                </tr>`;
                document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
                document.getElementById('errors').innerHTML = '';
                receiptContainer.style.display = "block";
                
           }
           else {
            //else, when the above condtion is false this part will execute
            //will show the error message and hide the receipt container div
               errors += 'To checkout, product Subtotal should be greater than $10!<br>';  
               document.getElementById('errors').innerHTML = errors;
               receiptContainer.style.display = "none";

       }
  
       //end of table creation  
       receiptMainContent +=
       `</table>`;
       document.getElementById('receiptMainContent').innerHTML = receiptMainContent;
      
   }
   else {
        //this else part will show the error when product quantity will be less than 0 
        //error message save in variable
       errors += 'Please enter the quantity for product!<br>'; 
       //display error message 
       document.getElementById('errors').innerHTML = errors;
       //hide the receipt div using its id = receiptContainer
       receiptContainer.style.display = "none";
       
   }
}



