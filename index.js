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

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();
  let MsgInDB = ref(database, "Msg");
 


///Sig-up///
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

///login-button//
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

////while signed in////
 const user = auth.currentUser;
 onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    var topB = document.getElementById("sign-up-d");
    var midB = document.getElementById("sign-in-d");
    
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    midB.innerHTML = 
    `<p id="imgh"></p>
    <input type="text" id="input-field" placeholder="Say something here!">
    <button id="add-button">Add Message</button>
    <ul id="shopping-list">
    </ul>`;
    topB.innerHTML = `
    <input class="log-btn" type="submit" id="logout" name="logout" value="Sign-out">`;
    logout.addEventListener("click", (e)=> {
      signOut(auth).then(() => {
    
      // Sign-out successful.
      alert("BYEEEEE");
      window.location.reload();
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
            const errorMessage = error.message;
    
            alert(errorMessage);
    });
    });

    
    const inputFieldEl = document.getElementById("input-field")
    const addButtonEl = document.getElementById("add-button")
    const MsgEl = document.getElementById("shopping-list")
    const freeEx = document.getElementById("free-h")
    const shoppingListEl = document.getElementById("free-c")

    onValue(ref(database, "Coupon"), function(snapshot) {
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
        
            clearShoppingListEl()
            
            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let currentItemID = currentItem[0]
                let currentItemValue = currentItem[1]
                freeEx.innerText = "Double click to use coupons!"
                appendItemToShoppingListEl(currentItem)
            }    
        } else {
            shoppingListEl.innerHTML = "Coupons will appear here randomly!"
        }
    })

    function clearShoppingListEl() {
        shoppingListEl.innerHTML = ""
    }

    function appendItemToShoppingListEl(item) {
        let itemID = item[0]
        let itemValue = item[1]
        
        let newEl = document.createElement("li")
        
        newEl.textContent = itemValue
        
        newEl.addEventListener("dblclick", function() {
            let exactLocationOfItemInDB = ref(database, `Coupon/${itemID}`)
            
            remove(exactLocationOfItemInDB)
        })
        
        shoppingListEl.append(newEl)
    }

    addButtonEl.addEventListener("click", function() {
      let inputValue = inputFieldEl.value
      
      push(MsgInDB, inputValue)
      
      clearInputFieldEl()
    })
    
    onValue(MsgInDB, function(snapshot) {
      if (snapshot.exists()) {
          let itemsArray = Object.entries(snapshot.val())
      
          clearMsgEl()
          
          for (let i = 0; i < itemsArray.length; i++) {
              let currentItem = itemsArray[i]
              let currentItemID = currentItem[0]
              let currentItemValue = currentItem[1]
              
              appendItemToMsgEl(currentItem)
          }    
      } else {
          MsgEl.innerHTML = "No items here... yet"
      }
    })
    
    function clearMsgEl() {
      MsgEl.innerHTML = ""
    }
    
    function clearInputFieldEl() {
      inputFieldEl.value = ""
    }
    
    function appendItemToMsgEl(item) {
      let itemID = item[0]
      let itemValue = item[1]
      
      let newEl = document.createElement("li")
      
      newEl.textContent = itemValue
      
      newEl.addEventListener("dblclick", function() {
          let exactLocationOfItemInDB = ref(database, `Msg/${itemID}`)
          
          remove(exactLocationOfItemInDB)
      })
      
      MsgEl.append(newEl)
    };
    // ...
  } else {
    // User is signed out
    // ...
  }
});
