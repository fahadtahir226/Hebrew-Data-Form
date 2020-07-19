import firebase from "./firebase"
export const auth = firebase.auth();


// User login 
export const SignUpCall = () => {
    const email = document.getElementById("email").value;
    let authenticate = auth.createUserWithEmailAndPassword(email, email)
    return authenticate;
}