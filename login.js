// javascript

  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
    import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCVCKJshURcHXbFiPb1TyhspwlAwoh4tks",
    authDomain: "realtime-database-3b1f1.firebaseapp.com",
    databaseURL: "https://realtime-database-3b1f1-default-rtdb.firebaseio.com",
    projectId: "realtime-database-3b1f1",
    storageBucket: "realtime-database-3b1f1.appspot.com",
    messagingSenderId: "744407916779",
    appId: "1:744407916779:web:b6c05ce38d87ea80e3deae"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();
 
signUp.addEventListener("click", (e) => {

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let username = document.getElementById('username').value;  
createUserWithEmailAndPassword(auth, email, password,)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    set(ref(database, "users/" + user.uid),{
      username: username,
      email: email
    })
    alert("user created!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
    // ..
  });
 });

 login.addEventListener("click",(e)=> {
  let email = document.getElementById('email2').value;
  let password = document.getElementById('password2').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const dt = new Date();

        update(ref(database, "users/" + user.uid),{
          last_login: dt,
          
        })
        alert("User loged in!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });

 })

 const user = auth.currentUser;
 onAuthStateChanged(auth, (user) => {
  if (user) {
    var addComment = document.getElementById("profile-toolbar")
    addComment.innerHTML = `<input id="new-c" placeholder="new comment"><button id="post" onclick="newComment">Add new!</button>`;

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

logout.addEventListener("click", (e)=> {
  signOut(auth).then(() => {
  // Sign-out successful.
  alert("BYEEEEE");
}).catch((error) => {
  // An error happened.
  const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
});
});

function addComment () {

}

function signIn () {
  
}