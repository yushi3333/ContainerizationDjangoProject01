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
    apiKey: "AIzaSyBZm2WeRuOiKE8kB2jDaUHaFKqwnl9aU3Y",
    authDomain: "cloudfinalproject-d5e96.firebaseapp.com",
    projectId: "cloudfinalproject-d5e96",
    storageBucket: "cloudfinalproject-d5e96.firebasestorage.app",
    messagingSenderId: "903257436088",
    appId: "1:903257436088:web:3fb896cace49a9b988e94d",
    measurementId: "G-R1HGPV1XTV"
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