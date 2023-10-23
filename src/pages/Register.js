import React from "react";
// used styled-component to style elements import styles for Login Component
import { SignUpBodyContainer, SignUpConatiner } from "../css/RegisterCss";
// sign up entering email and password - import createUserWithEmailAndPassword and updateProfile from firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
// import storage component from firebase storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// setDoc compoent from firebase to setDoc a new user or document
import { doc, setDoc } from "firebase/firestore";
// import useNavigate to navigate to a specific route using react router dom
import { useNavigate } from "react-router-dom";
// using link tag it can redirect to a route on Click works as a Link
import { Link } from "react-router-dom";
// import toster function
import { createToast } from "../tosterMessages/static_tosterMsg";

// Sign up and setup new user Account
function Register() {
  const navigate = useNavigate();

  // handle submit when user tries to submit the login form
  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(displayName, email, password, file);

    try {
      // setup new user account using email and password
      await createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // get storage componet and add the selected image to the storage
          const storage = getStorage();
          const storageRef = ref(storage, displayName);

          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log("error in upload", error);
            },
            async () => {
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              await getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  console.log("File available at", downloadURL);

                  // update profile with name and photo URL
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });

                  // CREATE NEW USER DOCUMENT
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });

                  await setDoc(doc(db, "userChats", res.user.uid), {});

                  navigate("/");
                }
              );
            }
          );
        })
        .catch((error) => {
          console.log("catch error for Auth", error);
        });
    } catch (error) {
      console.log("catch error", error);
      createToast("error", error.code);
    }
  }

  return (
    <>
      <SignUpBodyContainer>
        <SignUpConatiner>
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            {/* enter name */}
            <div>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            {/* enter email */}
            <div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="abc@email.com"
                required
              />
            </div>
            {/* enter password */}
            <div>
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <input type="password" id="password" name="password" required />
            </div>
            <div>
              <input type="file" style={{ display: "none" }} id="file" />
              <label htmlFor="file">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10054/10054290.png"
                  alt="attach simage"
                />
              </label>
              <span style={{ marginLeft: 10, color: "lightcoral" }}>
                Upload Profile Picture
              </span>
            </div>
            <div>
              <button type="submit">Sign up</button>
            </div>
            {/* if register login in */}
            <p>
              Registered ?
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </SignUpConatiner>
      </SignUpBodyContainer>
    </>
  );
}

export default Register;
