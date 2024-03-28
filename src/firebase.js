import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyByscATTXymv2j_r4q9Ky-IHY0tVJXzvXI",
    authDomain: "snap-chat-clone-85f14.firebaseapp.com",
    projectId: "snap-chat-clone-85f14",
    storageBucket: "snap-chat-clone-85f14.appspot.com",
    messagingSenderId: "468325897989",
    appId: "1:468325897989:web:097693664e59a6d138096c",
    measurementId: "G-9BHTSCP1FR"

  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebase.auth();
  const storage = firebase.storage()
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,db,storage,provider}