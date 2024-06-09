
var form = document.getElementsByTagName("form");
// login
var loginEmailInput = document.getElementById('loginEmail');
var loginPassInput = document.getElementById('loginPass');
var loginSubmit = document.getElementById('loginSubmit');
// signup
var signupNameInput = document.getElementById('signupName');
var signupEmailInput = document.getElementById('signupEmail');
var signupPassInput = document.getElementById('signupPass');
var signupSubmit = document.getElementById('signupSubmit');

// signup validation icons
var signupEmailValidIcon = document.querySelector('.signup-email-valid');
var signupNameValidIcon = document.querySelector('.signup-name-valid');
var signupPassValidIcon = document.querySelector('.signup-pass-valid');
var signupShowIcon = document.getElementById('signupShowIcon');

// login validation icons
var loginEmailValidIcon = document.querySelector('.login-email-valid');
var loginPassValidIcon = document.querySelector('.login-pass-valid');
var loginShowIcon = document.getElementById('loginShowIcon');


// toggle show password icon
loginShowIcon.addEventListener('click' , function(){
    if(loginPassInput.type == "password" ){
        loginPassInput.type = "text";
        loginShowIcon.classList.add('fa-eye')
        loginShowIcon.classList.remove('fa-eye-slash')

    }else{
        loginPassInput.type = "password"
        loginShowIcon.classList.remove('fa-eye')
        loginShowIcon.classList.add('fa-eye-slash')
    }
})

signupShowIcon.addEventListener('click' , function(){
    if(signupPassInput.type == "password" ){
        signupPassInput.type = "text";
        signupShowIcon.classList.add('fa-eye')
        signupShowIcon.classList.remove('fa-eye-slash')

    }else{
        signupPassInput.type = "password"
        signupShowIcon.classList.remove('fa-eye')
        signupShowIcon.classList.add('fa-eye-slash')
    }
})


//animation vars
var moveToSignUp = document.getElementById("moveToSignUp");
var moveToLogIn = document.getElementById("moveToLogIn");

var loginForm = document.querySelector('.login-form');
var loginContent = document.querySelector('.login-box .content')
var signupForm = document.querySelector('.signup-form')
var signupContent = document.querySelector('.signup-box .content')
var signupBox = document.querySelector('.signup-box')
var loginBox = document.querySelector('.login-box')
var shape = document.querySelector('.shape');


var registeredEmails ;


if(localStorage.getItem('emailsContainer') == null){
    registeredEmails = [];
}else{
    registeredEmails = JSON.parse(localStorage.getItem('emailsContainer'));
};


// cancel form default action
for( var i = 0 ; i < form.length ; i++){
    form[i].addEventListener('submit' , function(e){
        e.preventDefault();
    });
}





/* animation part */

//container
document.querySelector('.container').classList.remove('standard-ani')
document.querySelector('.container').classList.add('start-ani')
setTimeout(function(){
    document.querySelector('.container').classList.add('standard-ani')
    document.querySelector('.container').classList.remove('start-ani')

},3500)

//login box

setTimeout(function(){
    document.querySelector('.container .login-box .content').classList.remove('start-right')
    document.querySelector('.container .login-box .login-form').classList.remove('start-left')
} ,3000)

//login animation (out)

moveToSignUp.addEventListener('click' , function(){
    document.title = 'Register'

    shape.classList.remove('shape1')
    shape.classList.add('shape2')

    loginBox.classList.remove('z-3')
    signupBox.classList.remove('z-n1')

    loginForm.classList.remove('in-left')
    loginForm.classList.add('out-left')
    loginContent.classList.remove('in-right')
    loginContent.classList.add('out-right')
    setTimeout(function(){
        loginBox.classList.add('opacity-0')
        // signupBox.classList.remove('z-n1')
    } , 500)

    signupForm.classList.replace('default-signup-form' , 'in-right')
    signupForm.classList.remove('out-right')
    signupForm.classList.add('in-right')
    signupContent.classList.replace('default-signup-content' , 'in-right')
    signupContent.classList.remove('out-left')
    signupContent.classList.add('in-left')

    clearInputs();
    returnInputsToDefaultStyle();

    loginShowIcon.classList.add('d-none');
    signupShowIcon.classList.add('d-none');
});

// signup animation (in)

moveToLogIn.addEventListener('click' , function(){
    toLogin();
    loginShowIcon.classList.add('d-none');
    signupShowIcon.classList.add('d-none');
});

function toLogin(){
        document.title = 'Login'

    shape.classList.add('shape1');
    shape.classList.remove('shape2');

    signupContent.classList.replace( 'in-right' , 'out-left'  );
    signupForm.classList.replace( 'in-right' , 'out-right'  );
    signupContent.classList.add('out-left');
    signupContent.classList.remove('in-left');

    loginForm.classList.replace('out-left' , 'in-left');
    loginContent.classList.replace('out-right' , 'in-right');
    loginBox.classList.remove('opacity-0');

    loginBox.classList.add('z-3');

    clearInputs();
    returnInputsToDefaultStyle();


    setTimeout(function(){
        signupBox.classList.add('z-n1')
    } , 500)
}


////////////////////////////////////////////////////////// sign up part ///////////////////////////////////////////////////

// signup submit///////////////////////
signupSubmit.addEventListener('click' , function(){

    if(dataExist() == true){
        document.getElementById('signupExistMsg').classList.remove("d-none");
        document.querySelector('.empty-inputs-signup').classList.add('d-none');
        document.querySelector('.success-inputs-signup').classList.add('d-none');

        switchInputsToInvalidStyle();
    }
    else if (signupNameValidation() == true && signupEmailValidation() == true && signupPassValidation() == true){

        var account = {
            userName : signupNameInput.value,
            userEmail : signupEmailInput.value,
            userPass : signupPassInput.value
        }

        registeredEmails.push(account);

        localStorage.setItem('emailsContainer' , JSON.stringify(registeredEmails))

        document.querySelector('.empty-inputs-signup').classList.add('d-none')
        document.querySelector('.success-inputs-signup').classList.remove('d-none')

        setTimeout(function(){
            toLogin();
        } ,2500)
    }
    else if(signupNameInput.value == '' && signupEmailInput.value == '' && signupPassInput.value == ''){
        document.querySelector('.empty-inputs-signup').classList.remove('d-none')
        document.querySelector('.success-inputs-signup').classList.add('d-none')

        switchInputsToInvalidStyle();
    }
    else if (signupNameValidation() == false || signupEmailValidation() == false || signupPassValidation() == false){
        document.getElementById('signupHintMsg').classList.remove('d-none')
        document.querySelector('.success-inputs-signup').classList.add('d-none')
    }

})


// check if email used before//////////////////

function dataExist() {
    for (var i = 0; i < registeredEmails.length; i++) {
        if (registeredEmails[i].userEmail == signupEmailInput.value || registeredEmails[i].userName == signupNameInput.value ) {
            return true;
        }
    }
}


// close signup exist msg///////////////////////////////

document.querySelector('.close-exist-window').addEventListener('click' , function(){
    closeSignupExistMsg()
})

function closeSignupExistMsg(){
    document.getElementById('signupExistMsg').classList.add("moves-out");
    setTimeout(function(){
        document.getElementById('signupExistMsg').classList.add('d-none')
        document.getElementById('signupExistMsg').classList.remove('moves-out')
    } , 1000)
}


// close signup hints msg/////////////////////////////////

document.querySelector('.close-hint-window').addEventListener('click' , function(){
    closeSignupHintMsg()
})

function closeSignupHintMsg(){
    document.getElementById('signupHintMsg').classList.add("moves-out");
    setTimeout(function(){
        document.getElementById('signupHintMsg').classList.add('d-none')
        document.getElementById('signupHintMsg').classList.remove('moves-out')
    } , 1500)
}


//clear inputs////////////////

function clearInputs(){

    // clear signup inputs
    signupEmailInput.value = null;
    signupNameInput.value = null;
    signupPassInput.value = null

    document.querySelector('.empty-inputs-signup').classList.add('d-none')
    document.querySelector('.success-inputs-signup').classList.add('d-none')



    //clear login inputs
    loginEmailInput.value = null;
    loginPassInput.value = null;

    document.querySelector('.empty-inputs-login').classList.add('d-none')
    document.querySelector('.success-inputs-login').classList.add('d-none')
    document.querySelector('.wrong-inputs-login').classList.add('d-none')
}


// return Inputs To Default Style/////////////////////

function returnInputsToDefaultStyle(){
    // signup inputs////////////////////

        //name
        signupNameValidIcon.classList.remove('fa-user-check')
        signupNameValidIcon.classList.add('fa-user')
    
        signupNameValidIcon.classList.remove('text-success')
    
        signupNameValidIcon.classList.remove('fa-user-xmark')
        signupNameValidIcon.classList.add('fa-user')
    
        signupNameValidIcon.classList.remove('text-danger')
        signupNameInput.style.removeProperty('border-bottom')
        
        // email
        signupEmailValidIcon.classList.add('fa-solid')
        signupEmailValidIcon.classList.add('fa-envelope')
    
        signupEmailValidIcon.classList.remove('fa-envelope-circle-check')
        signupEmailValidIcon.classList.remove('bi')
        signupEmailValidIcon.classList.remove('bi-envelope-x-fill')
    
        signupEmailValidIcon.classList.remove('text-success')
        signupEmailValidIcon.classList.remove('text-danger')
        signupEmailInput.style.removeProperty('border-bottom')
    
        //password
    
        signupPassValidIcon.classList.remove('text-danger')
        signupPassValidIcon.classList.remove('text-success')
        signupPassInput.style.removeProperty('border-bottom')

        // login inputs////////////////////

        //email
        loginEmailValidIcon.classList.remove('fa-envelope-circle-check')
        loginEmailValidIcon.classList.add('fa-solid')

        loginEmailValidIcon.classList.remove('bi-envelope-x-fill')
        loginEmailValidIcon.classList.remove('bi')
    
        loginEmailValidIcon.classList.remove('text-success')
    
        loginEmailValidIcon.classList.remove('fa-user-xmark')
        loginEmailValidIcon.classList.add('fa-envelope')
    
        loginEmailValidIcon.classList.remove('text-danger')
        loginEmailInput.style.removeProperty('border-bottom')
        
        //pass
        loginPassValidIcon.classList.remove('text-danger')
        loginPassValidIcon.classList.remove('text-success')
        loginPassInput.style.removeProperty('border-bottom')

        
}


// return signup inputs to invalid style/////////////////////

function switchInputsToInvalidStyle(){
    //signup//////////////////////////

    //name
    signupNameValidIcon.classList.remove('fa-user')
    signupNameValidIcon.classList.add('fa-user-xmark')
    signupNameValidIcon.classList.add('text-danger')

    signupNameValidIcon.classList.remove('fa-user-check')
    signupNameValidIcon.classList.remove('text-success')

    signupNameInput.style.removeProperty('border-bottom')

    signupNameInput.style.cssText= `
    border-bottom: 2px solid #dc3545 !important;`



    //email
    signupEmailValidIcon.classList.add('bi')
    signupEmailValidIcon.classList.add('bi-envelope-x-fill')
    signupEmailValidIcon.classList.add('text-danger')

    signupEmailValidIcon.classList.remove('fa-solid')
    signupEmailValidIcon.classList.remove('fa-envelope')
    signupEmailValidIcon.classList.remove('fa-envelope-circle-check')
    signupEmailValidIcon.classList.remove('text-success')

    signupEmailInput.style.removeProperty('border-bottom')

    signupEmailInput.style.cssText= `
    border-bottom: 2px solid #dc3545 !important;`
    

    document.querySelector('.signup-name-container').classList.add("shake");
    document.querySelector('.signup-email-container').classList.add("shake");
    document.querySelector('.signup-pass-container').classList.add("shake");

    setTimeout(function(){
    document.querySelector('.signup-email-container').classList.remove("shake");
    document.querySelector('.signup-name-container').classList.remove("shake");
    document.querySelector('.signup-pass-container').classList.remove("shake");
    } ,1000)

    //pass

    signupPassValidIcon.classList.remove('text-success')
    signupPassValidIcon.classList.add('text-danger')

    signupPassInput.style.removeProperty('border-bottom')

    signupPassInput.style.cssText= `
    border-bottom: 2px solid #dc3545 !important;`

    // login////////////////////////////

    //email
    loginEmailValidIcon.classList.add('bi')
    loginEmailValidIcon.classList.add('bi-envelope-x-fill')
    loginEmailValidIcon.classList.add('text-danger')

    loginEmailValidIcon.classList.remove('fa-solid')
    loginEmailValidIcon.classList.remove('fa-envelope')
    loginEmailValidIcon.classList.remove('fa-envelope-circle-check')
    loginEmailValidIcon.classList.remove('text-success')

    loginEmailInput.style.removeProperty('border-bottom')

    loginEmailInput.style.cssText= `
    border-bottom: 2px solid #dc3545 !important;`

    //pass
    loginPassValidIcon.classList.remove('text-success')
    loginPassValidIcon.classList.add('text-danger')

    loginPassInput.style.removeProperty('border-bottom')

    loginPassInput.style.cssText= `
    border-bottom: 2px solid #dc3545 !important;`

    document.querySelector('.login-email-container').classList.add("shake");
    document.querySelector('.login-pass-container').classList.add("shake");

    setTimeout(function(){
    document.querySelector('.login-pass-container').classList.remove("shake");
    document.querySelector('.login-email-container').classList.remove("shake");
    } ,1000)

}


// signup name validate////////////////////////////////

signupNameInput.addEventListener('input' , function(){
    signupNameValidation()
})

signupNameInput.addEventListener('blur' , function(){
    if(signupNameValidation() == false){
        document.querySelector('.signup-name-container').classList.add("shake");
    }
    setTimeout(function(){
        document.querySelector('.signup-name-container').classList.remove("shake");
    } ,1000)
})

function signupNameValidation(){
    var userName = signupNameInput.value

    var regex = /^[a-zA-Z0-9_-]{3,16}$/;

    if(regex.test(userName) == true){
        signupNameValidIcon.classList.remove('fa-user')
        signupNameValidIcon.classList.add('fa-user-check')
        signupNameValidIcon.classList.add('text-success')

        signupNameValidIcon.classList.remove('fa-user-xmark')
        signupNameValidIcon.classList.remove('text-danger')

        signupNameInput.style.removeProperty('border-bottom')

        signupNameInput.style.cssText= `
        border-bottom: 2px solid #198754 !important;`

        return true;

    }else{
        signupNameValidIcon.classList.remove('fa-user')
        signupNameValidIcon.classList.add('fa-user-xmark')
        signupNameValidIcon.classList.add('text-danger')

        signupNameValidIcon.classList.remove('fa-user-check')
        signupNameValidIcon.classList.remove('text-success')

        signupNameInput.style.removeProperty('border-bottom')

        signupNameInput.style.cssText= `
        border-bottom: 2px solid #dc3545 !important;`

        return false;
    }
}


// signup email validate///////////////////////////////////

signupEmailInput.addEventListener('input' , function(){
    signupEmailValidation();
})

signupEmailInput.addEventListener('blur' , function(){
    if(signupEmailValidation() == false){
        document.querySelector('.signup-email-container').classList.add("shake");
    }
    setTimeout(function(){
        document.querySelector('.signup-email-container').classList.remove("shake");
    } ,1000)
})

function signupEmailValidation(){
    var userEmail = signupEmailInput.value

    var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


    if(regex.test(userEmail) == true){
        signupEmailValidIcon.classList.add('fa-solid')
        signupEmailValidIcon.classList.remove('fa-envelope')

        signupEmailValidIcon.classList.add('fa-envelope-circle-check')
        signupEmailValidIcon.classList.add('text-success')

        signupEmailValidIcon.classList.remove('bi-envelope-x-fill')
        signupEmailValidIcon.classList.remove('bi')
        signupEmailValidIcon.classList.remove('text-danger')

        signupEmailInput.style.removeProperty('border-bottom')

        signupEmailInput.style.cssText= `
        border-bottom: 2px solid #198754 !important;`

        return true;
    }else{
        signupEmailValidIcon.classList.add('bi')
        signupEmailValidIcon.classList.add('bi-envelope-x-fill')
        signupEmailValidIcon.classList.add('text-danger')

        signupEmailValidIcon.classList.remove('fa-solid')
        signupEmailValidIcon.classList.remove('fa-envelope')
        signupEmailValidIcon.classList.remove('fa-envelope-circle-check')
        signupEmailValidIcon.classList.remove('text-success')

        signupEmailInput.style.removeProperty('border-bottom')

        signupEmailInput.style.cssText= `
        border-bottom: 2px solid #dc3545 !important;`

        return false;
    }
}


// signup pass validate//////////////////////////

signupPassInput.addEventListener('input' , function(){
    signupPassValidation();
    signupShowIcon.classList.remove('d-none')
    if(signupPassInput.value == ''){
        signupShowIcon.classList.add('d-none')
    }
})

signupPassInput.addEventListener('blur' , function(){
    if(signupPassValidation() == false){
        document.querySelector('.signup-pass-container').classList.add("shake");
    }
    setTimeout(function(){
        document.querySelector('.signup-pass-container').classList.remove("shake");
    } ,1000)
})

function signupPassValidation(){
    var userPass = signupPassInput.value

    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(regex.test(userPass) == true){
        signupPassValidIcon.classList.add('text-success');
        signupPassValidIcon.classList.remove('text-danger');

        signupPassInput.style.removeProperty('border-bottom');

        signupPassInput.style.cssText= `
        border-bottom: 2px solid #198754 !important;`

        return true;
    }else{
        signupPassValidIcon.classList.remove('text-success');
        signupPassValidIcon.classList.add('text-danger');

        signupPassInput.style.removeProperty('border-bottom');

        signupPassInput.style.cssText= `
        border-bottom: 2px solid #dc3545 !important;`

        return false;
    }
}


//////////////////////////////////////////////// login part /////////////////////////////////////////////////////////////////////////

loginSubmit.addEventListener('click' , function(){
    if(loginEmailInput.value == '' || loginPassInput.value == ''){
        document.querySelector('.empty-inputs-login').classList.remove('d-none');
        document.querySelector('.wrong-inputs-login').classList.add('d-none')
        document.querySelector('.success-inputs-login').classList.add('d-none');

        switchInputsToInvalidStyle();

    }else{
        document.querySelector('.wrong-inputs-login').classList.remove('d-none');
        document.querySelector('.empty-inputs-login').classList.add('d-none');


        //email
        loginEmailValidIcon.classList.add('bi')
        loginEmailValidIcon.classList.add('bi-envelope-x-fill')
        loginEmailValidIcon.classList.add('text-danger')
    
        loginEmailValidIcon.classList.remove('fa-solid')
        loginEmailValidIcon.classList.remove('fa-envelope')
        loginEmailValidIcon.classList.remove('fa-envelope-circle-check')
        loginEmailValidIcon.classList.remove('text-success')
    
        loginEmailInput.style.removeProperty('border-bottom')
    
        loginEmailInput.style.cssText= `
        border-bottom: 2px solid #dc3545 !important;`
        
        //pass
        loginPassValidIcon.classList.remove('text-success');
        loginPassValidIcon.classList.add('text-danger');
    
        loginPassInput.style.removeProperty('border-bottom');
    
        loginPassInput.style.cssText= `
        border-bottom: 2px solid #dc3545 !important;`


        document.querySelector('.login-email-container').classList.add("shake");
        document.querySelector('.login-pass-container').classList.add("shake");
    
        setTimeout(function(){
        document.querySelector('.login-pass-container').classList.remove("shake");
        document.querySelector('.login-email-container').classList.remove("shake");
        } ,1000)


    }

    for (var u = 0; u < registeredEmails.length; u++) {
        if (registeredEmails[u].userEmail == loginEmailInput.value && registeredEmails[u].userPass == loginPassInput.value) {
            localStorage.setItem('acc', registeredEmails[u].userName)

            document.querySelector('.success-inputs-login').classList.remove('d-none');

            document.querySelector('.empty-inputs-login').classList.add('d-none');
            document.querySelector('.wrong-inputs-login').classList.add('d-none');


            //email input effects
            loginEmailValidIcon.classList.add('fa-solid');
            loginEmailValidIcon.classList.remove('fa-envelope');
    
            loginEmailValidIcon.classList.add('fa-envelope-circle-check');
            loginEmailValidIcon.classList.add('text-success');
    
            loginEmailValidIcon.classList.remove('bi-envelope-x-fill');
            loginEmailValidIcon.classList.remove('bi');
            loginEmailValidIcon.classList.remove('text-danger');
    
            loginEmailInput.style.removeProperty('border-bottom');
    
            loginEmailInput.style.cssText= `
            border-bottom: 2px solid #198754 !important;`


            // pass input effects
            loginPassValidIcon.classList.add('text-success');
            loginPassValidIcon.classList.remove('text-danger');
    
            loginPassInput.style.removeProperty('border-bottom');
    
            loginPassInput.style.cssText= `
            border-bottom: 2px solid #198754 !important;`

            setTimeout(function(){
                window.location = './pages/home.html'
            } ,2000);

            document.querySelector('.login-pass-container').classList.remove("shake");
            document.querySelector('.login-email-container').classList.remove("shake");
    }
        
}

})


loginPassInput.addEventListener('input' , function(){
    loginShowIcon.classList.remove('d-none')
    if(loginPassInput.value == ''){
        loginShowIcon.classList.add('d-none')
    };
})
