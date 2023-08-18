import{auth,createUserWithEmailAndPassword,doc, setDoc,db } from "./firebaseconfig .js";

const create = document.getElementById("create")
const Signin = document.getElementById("Signin")



const signup = ()=>{

    let username = document.getElementById("username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    if(!username.value || !email.value || !password.value){
            alert("fill all input fields")
    }

    let userdata = {
        username: username.value,
        email: email.value,
        password: password.value,
        profilepic:""
    }
    
        createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
        .then( async(userCredential) => {
          const user = userCredential.user.uid;
          const cityRef = doc(db, 'users', user);
          
          await setDoc(cityRef, userdata)
          console.log(cityRef);
          alert("create account")

        })
        .catch((error) => {
          const errorMessage = error.code;
        console.log(errorMessage);
        if(errorMessage == "auth/weak-password"){
           Swal.fire('password 6 charcters se bara dalo')
        }else if(errorMessage == "auth/invalid-email"){
          Swal.fire('Ankhay khol k sahi email likho shabash')
        }
         
        });

        username.value = ""
        email.value = ""
        password.value = ""
}


create.addEventListener("click",signup)



