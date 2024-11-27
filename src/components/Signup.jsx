// import React, { useState } from "react";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// const Signup = () => {
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const [role, setRole] = useState("user");
//    const [error, setError] = useState("");

//    const handleSignup = async (e) => {
//       e.preventDefault();
//       try {
//          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//          const user = userCredential.user;
//          await setDoc(doc(db, role, user.uid), {
//             email: email,
//             role: role,
//          });
//          console.log("User created successfully");
//       } catch (err) {
//          setError(err.message);
//       }
//    };

//    return (
//       <div style={styles.container}>
//          <div style={styles.formContainer}>
//             <h2 style={styles.heading}>Signup</h2>
//             {error && <p style={styles.error}>{error}</p>}
//             <form onSubmit={handleSignup} style={styles.form}>
//                <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   style={styles.input}
//                />
//                <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   style={styles.input}
//                />
//                <select
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   required
//                   style={styles.input}
//                >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                </select>
//                <button type="submit" style={styles.button}>Sign Up</button>
//             </form>
//             <p style={styles.link}>
//                Already have an account? <a href="/login">Login</a>
//             </p>
//          </div>
//       </div>
//    );
// };

// const styles = {
//    container: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#f3f4f6',
//    },
//    formContainer: {
//       backgroundColor: '#ffffff',
//       padding: '30px',
//       borderRadius: '8px',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       maxWidth: '400px',
//       width: '100%',
//       textAlign: 'center',
//    },
//    heading: {
//       marginBottom: '20px',
//       fontSize: '1.8rem',
//       color: 'black',
//    },
//    form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px',
//    },
//    input: {
//       padding: '10px',
//       marginBottom: '15px',
//       border: '1px solid #cccccc',
//       borderRadius: '4px',
//       fontSize: '1rem',
//    },
//    button: {
//       backgroundColor: '#28a745',
//       color: 'white',
//       border: 'none',
//       padding: '10px',
//       borderRadius: '4px',
//       fontSize: '1rem',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//    },
//    error: {
//       color: 'red',
//       marginBottom: '10px',
//       fontSize: '0.9rem',
//    },
//    link: {
//       fontSize: '1rem',
//       marginTop: '10px',
//    },
// };

// export default Signup;




import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [role, setRole] = useState("user");
   const [error, setError] = useState("");

   const handleSignup = async (e) => {
      e.preventDefault();
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         
         // Set document in the "users" collection with the user role
         await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: role,
            name: "",
            city: "",
            profession: "",
            profilePic: "",
         });
         console.log("User created successfully");
      } catch (err) {
         setError(err.message);
      }
   };

   return (
      <div style={styles.container}>
         <div style={styles.formContainer}>
            <h2 style={styles.heading}>Signup</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSignup} style={styles.form}>
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
               />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
               />
               <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  style={styles.input}
               >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
               </select>
               <button type="submit" style={styles.button}>Sign Up</button>
            </form>
            <p style={styles.link}>
               Already have an account? <a href="/login">Login</a>
            </p>
         </div>
      </div>
   );
};

const styles = {
   container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f4f6',
   },
   formContainer: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
   },
   heading: {
      marginBottom: '20px',
      fontSize: '1.8rem',
      color: 'black',
   },
   form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
   },
   input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #cccccc',
      borderRadius: '4px',
      fontSize: '1rem',
   },
   button: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
   },
   error: {
      color: 'red',
      marginBottom: '10px',
      fontSize: '0.9rem',
   },
   link: {
      fontSize: '1rem',
      marginTop: '10px',
   },
};

export default Signup;
