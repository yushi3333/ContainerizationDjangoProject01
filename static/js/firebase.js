import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendSignInLinkToEmail, 
  signInWithEmailLink, 
  isSignInWithEmailLink 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyACcf2Gklwlk49JFYmyKsJCthcXuLJzj6E",
    authDomain: "cloudfinal-33aec.firebaseapp.com",
    projectId: "cloudfinal-33aec",
    storageBucket: "cloudfinal-33aec.firebasestorage.app",
    messagingSenderId: "993334870171",
    appId: "1:993334870171:web:7afc72d4f01e608a88463e",
    measurementId: "G-E2P5L7S5E4"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.getElementById('signup-form');
  console.log(signupForm);  
  
  if (signupForm) {
      signupForm.addEventListener('submit', function(event) {
        
          
          const email = document.querySelector('input[name="email"]').value;
          const password = document.querySelector('input[name="password"]').value;
          const username = document.querySelector('input[name="username"]').value;

          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  const user = userCredential.user;

                  setDoc(doc(db, 'users', user.uid), {
                      username: username,
                      email: email,
                      password: password
                  });

                  
              })
              .catch((error) => {
                  alert(error.message);
              });
      });
  } else {
      console.log('Signup form not found');
  }
});

const usernameLog = document.getElementById('UsernameLog');
const emailLog = document.getElementById('EmailLog');
const changeEmail = document.getElementById('ChangeEmail');
const changeUsername = document.getElementById('ChangeUsername');

usernameLog.style.display = 'block';
emailLog.style.display = 'none';

changeEmail.addEventListener('click', function() {
    usernameLog.style.display = 'none';
    emailLog.style.display = 'block';
});


changeUsername.addEventListener('click', function() {
    emailLog.style.display = 'none';
    usernameLog.style.display = 'block';
});

const sendCodeButton = document.getElementById('sendCodeButton');
if (sendCodeButton) {
    sendCodeButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        if (!email) {
            alert('Please enter the address.');
            return;
        }

        
        const actionCodeSettings = {
            url: `${window.location.origin}/complete-signup?email=${encodeURIComponent(email)}`, 
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                alert('We have sent the link！');
            })
            .catch((error) => {
                console.error('error:', error);
                alert('error。');
            });
    });
}
