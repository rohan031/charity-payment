const firstName=selectElement("#firstName"),firstNameError=selectElement("#input-error-firstName"),lastName=selectElement("#lastName"),lastNameError=selectElement("#input-error-lastName"),email=selectElement("#email"),emailError=selectElement("#input-error-email"),phoneNumber=selectElement("#phoneNumber"),phoneNumberError=selectElement("#input-error-phoneNumber"),inputState=selectElement("#inputState"),inputStateError=selectElement("#input-error-inputState"),inputDistrict=selectElement("#inputDistrict"),inputDistrictError=selectElement("#input-error-inputDistrict"),pincode=selectElement("#pincode"),pincodeError=selectElement("#input-error-pincode"),address=selectElement("#address"),addressError=selectElement("#input-error-address"),amount=selectElement("#amount"),amountError=selectElement("#input-error-amount"),panNumber=selectElement("#panNumber"),panNumberError=selectElement("#input-error-panNumber"),terms=selectElement("#terms"),termsError=selectElement("#input-error-terms"),title=selectElement("#title"),proceed=selectElement(".proceed"),review=selectElement(".review-details"),donation=selectElement(".donation"),loader=selectElement(".loader"),inputElements=[firstName,lastName,email,phoneNumber,inputState,inputDistrict,pincode,address,amount,panNumber];terms.addEventListener("change",(e=>{e.target.checked&&(termsError.innerHTML="")}));const emailValidation=()=>email.value.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)?(emailError.innerHTML="",!0):(emailError.innerHTML="This is an invalid email!",!1),phoneNumberValidation=()=>phoneNumber.value.trim().match(/^[6-9]\d{9}$/)?(phoneNumberError.innerHTML="",!0):(phoneNumberError.innerHTML="Enter a valid phone number!",!1),pinCodeValidation=()=>pincode.value.trim().match(/^[1-9][0-9]{5}$/)?(pincodeError.innerHTML="",!0):(pincodeError.innerHTML="Enter a valid PIN code!",!1),amountValidation=()=>amount.value.trim().match(/^\d+$/)?(amountError.innerHTML="",!0):(amountError.innerHTML="Donation amount should be in number",!1),panValidation=()=>panNumber.value.trim().match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)?(panNumberError.innerHTML="",!0):(panNumberError.innerHTML="Invalid PAN number!",!1),validateUserInputs=()=>{let e=!1;return""===firstName.value.trim()||null===firstName.value?(e=!0,firstNameError.innerHTML="First name is required to proceed!"):firstNameError.innerHTML="",""===lastName.value.trim()||null===lastName.value?(e=!0,lastNameError.innerHTML="Last name is required to proceed!"):lastNameError.innerHTML="",""===email.value.trim()||null===email.value?(e=!0,emailError.innerHTML="Email is required to proceed!"):(emailError.innerHTML="",(email.value.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)?(emailError.innerHTML="",1):(emailError.innerHTML="This is an invalid email!",0))||(e=!0)),""===phoneNumber.value.trim()||null===phoneNumber.value?(e=!0,phoneNumberError.innerHTML="Phone number is required to proceed!"):(phoneNumberError.innerHTML="",(phoneNumber.value.trim().match(/^[6-9]\d{9}$/)?(phoneNumberError.innerHTML="",1):(phoneNumberError.innerHTML="Enter a valid phone number!",0))||(e=!0)),""===inputState.value.trim()||null===inputState.value?(e=!0,inputStateError.innerHTML="Please select your state to proceed!"):inputStateError.innerHTML="",""===inputDistrict.value.trim()||null===inputDistrict.value?(e=!0,inputDistrictError.innerHTML="Please select your district to proceed!"):inputDistrictError.innerHTML="",""===pincode.value.trim()||null===pincode.value?(e=!0,pincodeError.innerHTML="PIN code is required to proceed!"):(pincodeError.innerHTML="",(pincode.value.trim().match(/^[1-9][0-9]{5}$/)?(pincodeError.innerHTML="",1):(pincodeError.innerHTML="Enter a valid PIN code!",0))||(e=!0)),""===address.value.trim()||null===address.value?(e=!0,addressError.innerHTML="Address is required to proceed!"):addressError.innerHTML="",""===amount.value.trim()||null===amount.value?(e=!0,amountError.innerHTML="Please enter the amount you want to donate!"):(amountError.innerHTML="",(amount.value.trim().match(/^\d+$/)?(amountError.innerHTML="",1):(amountError.innerHTML="Donation amount should be in number",0))||(e=!0)),""===panNumber.value.trim()||null===panNumber.value?(e=!0,panNumberError.innerHTML="Your PAN number is required to proceed!"):(panNumberError.innerHTML="",(panNumber.value.trim().match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)?(panNumberError.innerHTML="",1):(panNumberError.innerHTML="Invalid PAN number!",0))||(e=!0)),e},displayDetails=e=>{const r=document.querySelectorAll(".review-details-wrapper__value-p");let n=0;for(const t in e)n<9&&(r[n].innerHTML=e[t]),n++;loader.style.display="flex",wrapper.classList.add("loading"),setTimeout((()=>{donation.style.display="none",loader.style.display="none",wrapper.classList.remove("loading"),review.style.display="block"}),500)};let userInputs={name:"",email:"",phoneNumber:"",state:"",district:"",pinCode:"",address:"",amountFormatting:"",panNumber:"",amount:""};proceed.addEventListener("click",(e=>{if(e.preventDefault(),!terms.checked)return void(termsError.innerHTML="You need to agree to our Terms and Conditions to proceed.");if(validateUserInputs())return;const r=title.value+" "+firstName.value.trim()+" "+lastName.value.trim();userInputs={name:r,email:email.value.trim(),phoneNumber:"+91 "+phoneNumber.value.trim(),state:inputState.value,district:inputDistrict.value,pinCode:pincode.value,address:address.value,amountFormatting:"₹ "+ +amount.value,panNumber:panNumber.value.trim(),amount:+amount.value},displayDetails(userInputs)}));const previous=selectElement(".previous-review"),proceedReview=selectElement(".proceed-review");previous.addEventListener("click",(()=>{loader.style.display="flex",wrapper.classList.add("loading"),setTimeout((()=>{review.style.display="none",loader.style.display="none",wrapper.classList.remove("loading"),donation.style.display="block"}),500)})),proceedReview.addEventListener("click",(()=>{loader.style.display="flex",wrapper.classList.add("loading");const e={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},body:JSON.stringify(userInputs)};fetch("/paynow",e).then((e=>e.json())).then((e=>{const r=JSON.parse(e.response).body.txnToken;var n={root:"",flow:"DEFAULT",data:{orderId:e.orderId,token:r,tokenType:"TXN_TOKEN",amount:userInputs.amount},handler:{notifyMerchant:function(e,r){console.log("notifyMerchant handler function called"),console.log("eventName => ",e),console.log("data => ",r)}},redirect:!1};window.Paytm&&window.Paytm.CheckoutJS&&window.Paytm.CheckoutJS.init(n).then((function(){loader.style.display="none",wrapper.classList.remove("loading"),window.Paytm.CheckoutJS.invoke()})).catch((function(e){console.log("error => ",e)}))})).catch((e=>console.log(e)))}));
//# sourceMappingURL=donation.156d16ca.js.map
