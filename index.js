// javascript

    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
    import { getDatabase, set, ref, update, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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
  const shoppingListInDB = ref(database, "shoppingList");

  
 
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
      email: email,
      comments: "This is the where your messages will appear"
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
    const uid = user.uid;


    var addComment = document.getElementById("profile-toolbar");
    var lastComment = document.getElementById("comments");
    lastComment.innerHTML = ref(database, "users/" + uid + "/" + comments);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    
    const inputFieldEl = document.getElementById("input-field")
    const addButtonEl = document.getElementById("add-button")
    const shoppingListEl = document.getElementById("shopping-list")

    addButtonEl.addEventListener("click", function() {
        let inputValue = inputFieldEl.value
        
        push(shoppingListInDB, inputValue)
        
        clearInputFieldEl()
    })

    onValue(shoppingListInDB, function(snapshot) {
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
        
            clearShoppingListEl()
            
            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let currentItemID = currentItem[0]
                let currentItemValue = currentItem[1]
                
                appendItemToShoppingListEl(currentItem)
            }    
        } else {
            shoppingListEl.innerHTML = "No items here... yet"
        }
    })

    function clearShoppingListEl() {
        shoppingListEl.innerHTML = ""
    }

    function clearInputFieldEl() {
        inputFieldEl.value = ""
    }

    function appendItemToShoppingListEl(item) {
        let itemID = item[0]
        let itemValue = item[1]
        
        let newEl = document.createElement("li")
        
        newEl.textContent = itemValue
        
        newEl.addEventListener("dblclick", function() {
            let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
            
            remove(exactLocationOfItemInDB)
        })
        
        shoppingListEl.append(newEl)
    };
    addComment.innerHTML = `<div class="container">
    <input type="text" id="input-field" placeholder="Pizza">
    <button id="add-button">Add to cart</button>
    <ul id="shopping-list">
    </ul>
    </div>`;
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
