// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import { getDatabase, set, ref, get, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// import { storage } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';

// const firebaseConfig = {
//     apiKey: "AIzaSyBm3UC_TCpO0Y_yUFnG3nQNjdZeir3wqX4",
//     authDomain: "clone-of-x.firebaseapp.com",
//     databaseURL: "https://clone-of-x-default-rtdb.firebaseio.com",
//     projectId: "clone-of-x",
//     storageBucket: "clone-of-x.appspot.com",
//     messagingSenderId: "309786442519",
//     appId: "1:309786442519:web:bcd80e8ac6be220b64d552"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// const auth = getAuth(app);

// document.getElementById('btn').addEventListener('click',uploadImage)

// async function uploadImage() {
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//       // Get a reference to the Firebase Storage
//       const storageRef = storage().ref();
//       // Create a reference to the file you want to upload
//       const imageRef = storageRef.child('images/' + file.name);

//       // Upload the file
//       try {
//         const snapshot = await imageRef.put(file);

//         // Update progress bar
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(`Upload is ${progress}% done`);

//         // Handle successful upload
//         console.log('Image uploaded successfully!');

//         // Get the download URL of the uploaded image
//         const downloadURL = await snapshot.ref.getDownloadURL();
//         console.log('File available at', downloadURL);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     } else {
//       console.error('No file selected.');
//     }
//   }
