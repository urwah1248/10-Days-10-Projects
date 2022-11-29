const form = document.querySelector('form')
const fName = document.getElementById('fName')
const lName = document.getElementById('lName')
const email = document.getElementById('email')
const tof = document.getElementById('tof')

const condition = [false, false, false]

form.addEventListener('submit', e => {
    e.preventDefault();
    checkRequired();
    submitForm();
})

const checkRequired = () => {
    // trim for removing the whitespaces
    const fNameValue = fName.value.trim();
    const lNameValue = lName.value.trim();
    const emailValue = email.value.trim();
    const tofChecked = tof.checked;

    console.log(tofChecked);
	if(fNameValue === '') {
		setErrorFor(fName, 'First Name cannot be blank');
	}else{
		checkLength(fName, "First Name cannot exceed 10 characters")
	}

	if(lNameValue === '') {
		setErrorFor(lName, 'Last Name cannot be blank');
	} else {
		checkLength(lName, "Last Name cannot exceed 10 characters")
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	}else {
		checkEmail(email);
	}
    if(!tofChecked){
        setErrorFor(tof, "You are required to agree to our Terms and Conditions")
    }else{
        setSuccessFor(tof)
    }
}

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className="form-control error"
    small.innerText = message
}
const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className="form-control success"
    if(input==fName){
        condition[0] = true
    } else if(input==lName){
        condition[1] = true
    } else if(input==email){
        condition[2] = true
    }
}

const checkLength = (input, message) => {
    if(input.value.length>10){
        setErrorFor(input, message)
    }
    else{
        setSuccessFor(input)
    }
}
const checkEmail = (input) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.value.match(mailformat)){
        setSuccessFor(email)
    }
    else{
        setErrorFor(email, "You entered an invalid email address")
    }
}
const submitForm = () => {
    if(condition[0]==true && condition[1]==true && condition[2]==true){
        location.replace("./thankyou.html")
    }
}