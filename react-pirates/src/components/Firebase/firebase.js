import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBaf1jz4MIJkH2EjxcHJAjE4ODlNdQLVHc",
  authDomain: "d-d-pirates.firebaseapp.com",
  databaseURL: "https://d-d-pirates.firebaseio.com",
  projectId: "d-d-pirates",
  storageBucket: "d-d-pirates.appspot.com",
  messagingSenderId: "423889760258"
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;