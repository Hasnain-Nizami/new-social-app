import{signInWithEmailAndPassword,auth} from "./firebaseconfig .js" 

const login = document.getElementById("login")



const loginAccount = ()=>{
    let loginEmail = document.getElementById("loginEmail")
    let loginPassword = document.getElementById("loginPassword")
    if(loginEmail.value == "" || loginPassword.value == ""){
        alert("fill all input field")
        return
    }
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
     
      const user = userCredential.user;
      window.location.href = "./dashboard.html"
     
    })
    .catch((error) => {
      const errorMessage = error.code;
      if(errorMessage == "auth/invalid-email"){
        Swal.fire('Apnay Pas se email nhi likh pehle account create kr lay shabash')
      }else if(errorMessage == "auth/wrong-password"){
        Swal.fire('Ankhay khol k password likh galat likh raha hai')
      }else{
        Swal.fire('chal bohut try kr liya account create kr lay ab')
      }
    });


    loginEmail.value = ""
    loginPassword.value = ""
}
login.addEventListener("click",loginAccount)

