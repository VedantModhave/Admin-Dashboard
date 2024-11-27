// import React, { useState } from "react";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const navigate = useNavigate();

//    const handleLogin = async (e) => {
//       e.preventDefault();
//       try {
//          const userCredential = await signInWithEmailAndPassword(auth, email, password);
//          const userId = userCredential.user.uid;
//          // Handle navigation based on role here (optional logic)
//          navigate("/dashboard");
//       } catch (error) {
//          alert(error.message);
//       }
//    };

//    return (
//       <div style={styles.container}>
//          <div style={styles.formContainer}>
//             <h2 style={styles.heading}>Login</h2>
//             <form onSubmit={handleLogin} style={styles.form}>
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
//                <button type="submit" style={styles.button}>Login</button>
//             </form>
//             <p style={styles.link}>
//                Don't have an account? <a href="/" style={styles.signupLink}>Sign Up</a>
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
//    link: {
//       fontSize: '1rem',
//       marginTop: '15px',
//    },
//    signupLink: {
//       color: '#007bff',
//       textDecoration: 'none',
//    },
// };

// export default Login;




import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch user data from Firestore
      const userDoc = doc(db, "users", userId);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userRole = userData.role; // Access the 'role' field from Firestore

        // Navigate based on the user's role
        if (userRole === "admin") {
          navigate("/dashboard"); // Admin navigates to /dashboard
        } else if (userRole === "user") {
          navigate("/profile"); // Regular user navigates to /profile
        } else {
          alert("User role not found");
        }
      } else {
        alert("User data not found in Firestore");
      }
    } catch (error) {
      alert(error.message); // Show error message if any error occurs
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
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
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.link}>
          Don't have an account? <a href="/" style={styles.signupLink}>Sign Up</a>
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
  link: {
    fontSize: '1rem',
    marginTop: '15px',
  },
  signupLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Login;
