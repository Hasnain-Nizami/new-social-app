import{signOut,auth,onAuthStateChanged,doc,getDoc,deleteDoc,db,updateDoc,addDoc,collection,serverTimestamp,getDocs,storage ,ref, uploadBytesResumable, getDownloadURL} from "./firebaseconfig .js"

let username = document.querySelectorAll(".username")
let profileimg = document.querySelectorAll(".profileimg")
let logout = document.getElementById("logout")
let postText = document.getElementById("postText")
let email = document.getElementById("email")
let editprofilepic = document.getElementById("editprofile")


// let activeUser; 
// let onlineUserName;
// let onlineGmail; 
let activeUser ;
let activeUserId;
window.addEventListener("load", loadpost);
let parent = document.querySelector(".parent"); 

async function loadpost() {
  const querySnapshot = await getDocs(collection(db, "post"));
  querySnapshot.forEach(async(docs) => {
    const {text, userID, time ,postUrl} = docs.data(); 
    const docRef = doc(db, "users", userID); 
    const docSnap = await getDoc(docRef);
    const {email,username,profilepic} = docSnap.data()
    postfun(username, text, email, time, docs.id, postUrl,profilepic );
  });
}




//////////////////////////////////////////user check its active or not///////////////////////////////////////////// 
onAuthStateChanged(auth, (user) => {
  
  if (user) {
    let main = document.querySelector(".Main")
    const uid = user.uid;
    activeUser = user
    const callback = async()=>{
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
          main.style.display = "block"
          activeUser = docSnap.data()
          activeUserId = docSnap.id
         
          email.innerHTML = activeUser.email
          username.forEach((ele)=>{
            ele.innerHTML = activeUser.username
          })
          if(activeUser.profilepic !== ""){
            profileimg.forEach((ele)=>{
              ele.src = activeUser.profilepic
            })
          }else{
            profileimg.forEach((ele)=>{
              ele.src = "./assets/126044187-isolated-object-of-avatar-and-dummy-symbol-collection-of-avatar-and-image-stock-symbol-for-web.jpg"
            })
          }
          
        } else {
        
          console.log("No such document!");
        }

      }
      callback()

    } else {
      window.location.href= "./login.html"
    }
    
  });
///////////////////////////////////////////post function////////////////////////////////////////////
let postbtn = document.getElementById("postbtn");

postbtn.addEventListener("click", createpost);
let close = document.getElementById("close")

async function createpost() {
 
  const obj = {
    name: `${activeUser.username}`,
    userID: `${activeUserId}`,
    email: `${activeUser.email}`,
    text: `${postText.value}`,
    time: serverTimestamp(),
  }
  const file = document.getElementById("inp")
  
  if(file.files[0] !== undefined){
       const image = await uploadImage(file)
       obj.postUrl = image
  }

  const response = await addDoc(collection(db, "post"),obj);

  const docRef = doc(db, "post", response.id); // Changed "posts" to "post"
  const docSnap = await getDoc(docRef);
  
  postfun(
    activeUser.username,
    postText.value,
    activeUser.email,
    docSnap.data().time,
    response.id,
    obj.postUrl,
    activeUser.profilepic
    );

  }
  
  function postfun(username, text, email, time, id, postUrl,profilepic) {
    console.log(id);
    let div = document.createElement("div");
  div.innerHTML = `<div class="sec" id ="${id}">
    <div class="inpt">
    <div class="post">
    <p class="image">
    <img src=${profilepic ? profilepic : "./assets/126044187-isolated-object-of-avatar-and-dummy-symbol-collection-of-avatar-and-image-stock-symbol-for-web.jpg"} alt="">
    </p>
        <div class="detail">
          <h6 class="username">${username}</h6>
          <div class="detai">
          <p>${email}</p> 
          <p>${time.toDate().toLocaleString()}
          </div>
          </div>
          </div>
         ${activeUser.email == email? ` <div class="nav-item dropdown">
         <a class="nav-link dropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         <i class="fa-solid fa-ellipsis-vertical"></i>
         </a>
         <ul class="dropdown-menu">
           <li><a class="dropdown-item" href="#" id="del" onclick="del(this)">Delete</a></li>
           <li><hr class="dropdown-divider"></li>
           <li><a class="dropdown-item" href="#">Update</a></li>
         </ul>
       </div>`: ""}
          </div>
          <div class="posttext">
          <p>${text}</p>
          </div>
          ${postUrl ? `<div class="postimg">
          <img src=${postUrl}>
          </div>` : ""}
          
          </div>`;
          parent.prepend(div);

          close.click()
        }

let profilepic = document.getElementById("inputGroupFile02")
let update = document.getElementById("update")
update.addEventListener("click",edtpic)
async function edtpic(){
  
  if(profilepic.files[0] !== undefined){
       const image = await uploadImage(profilepic)
       const washingtonRef = doc(db, "users", activeUserId);

       await updateDoc(washingtonRef, {
       profilepic: image
      });
      profileimg.forEach((elem)=>{
          elem.src = image
      })
}


}

//////////////////////////////logout functoin/////////////////////////
  
logout.addEventListener("click",()=>{

signOut(auth).then(() => {
  window.location.replace("./login.html")
}).catch((error) => {
  // An error happened.
});
})


async function del(elem){
      let parent = elem.parentNode.parentNode.parentNode.parentNode.parentNode
    await deleteDoc(doc(db, "post", parent.id)); 
    parent.remove()
}
window.del = del


//////////////////////////////////////////////////////////////////////////


const uploadImage = (ele)=>{
  return new Promise((resolve,reject)=>{
          // Create the file metadata
    const file = ele.files[0]
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    reject(error)
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL)
    });
  }
);
  })
} 