// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
// import { doc, getDoc, updateDoc } from "firebase/firestore";

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     profession: "",
//     profilePic: "",
//   });

//   // Fetch user data from Firestore
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const user = auth.currentUser; // Get the currently logged-in user
//         if (user) {
//           const userRef = doc(db, "users", user.uid); // Access the user's document
//           const docSnap = await getDoc(userRef);

//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//             setFormData({
//               name: docSnap.data().name || "",
//               city: docSnap.data().city || "",
//               profession: docSnap.data().profession || "",
//               profilePic: docSnap.data().profilePic || "",
//             });
//           } else {
//             console.error("No such document!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false); // Stop the loading state
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Handle input changes for the form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission to save updated user data
//   const handleSave = async () => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = doc(db, "users", user.uid); // Reference the user's document
//         await updateDoc(userRef, {
//           name: formData.name,
//           city: formData.city,
//           profession: formData.profession,
//           profilePic: formData.profilePic,
//         });
//         setUserData(formData); // Update local state
//         setIsEditing(false); // Exit editing mode
//         console.log("Profile updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (loading) {
//     return <div style={styles.loader}>Loading...</div>;
//   }

//   if (!userData) {
//     return <div style={styles.error}>Unable to fetch user data.</div>;
//   }

//   return (
//     <div style={styles.container}>
//       {/* Profile Header */}
//       <div style={styles.hero}>
//         <img
//           src={
//             isEditing
//               ? formData.profilePic || "https://via.placeholder.com/150"
//               : userData.profilePic || "https://via.placeholder.com/150"
//           }
//           alt="Profile"
//           style={styles.profileImage}
//         />
//         {isEditing ? (
//           <input
//             type="text"
//             name="profilePic"
//             value={formData.profilePic}
//             onChange={handleChange}
//             placeholder="Profile Picture URL"
//             style={styles.input}
//           />
//         ) : null}

//         {isEditing ? (
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             style={styles.input}
//           />
//         ) : (
//           <h1 style={styles.name}>{userData.name || "No Name Provided"}</h1>
//         )}

//         {isEditing ? (
//           <input
//             type="text"
//             name="profession"
//             value={formData.profession}
//             onChange={handleChange}
//             placeholder="Your Profession"
//             style={styles.input}
//           />
//         ) : (
//           <p style={styles.bio}>
//             {userData.profession || "No Profession Provided"}
//           </p>
//         )}

//         {isEditing ? (
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="Your City"
//             style={styles.input}
//           />
//         ) : (
//           <p style={styles.city}>
//             {userData.city
//               ? `🌍 Lives in ${userData.city}`
//               : "City not provided"}
//           </p>
//         )}
//       </div>

//       {/* Save/Cancel Button Section */}
//       {isEditing ? (
//         <div style={styles.buttonContainer}>
//           <button style={styles.saveButton} onClick={handleSave}>
//             Save
//           </button>
//           <button
//             style={styles.cancelButton}
//             onClick={() => setIsEditing(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <button
//           style={styles.editButton}
//           onClick={() => setIsEditing(true)}
//         >
//           Edit Profile
//         </button>
//       )}
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     fontFamily: "'Poppins', sans-serif",
//     padding: "20px",
//     maxWidth: "900px",
//     margin: "0 auto",
//   },
//   loader: {
//     textAlign: "center",
//     fontSize: "1.5rem",
//     color: "#333",
//     marginTop: "50px",
//   },
//   error: {
//     textAlign: "center",
//     fontSize: "1.5rem",
//     color: "red",
//     marginTop: "50px",
//   },
//   hero: {
//     textAlign: "center",
//     marginBottom: "30px",
//     padding: "20px",
//     backgroundColor: "#f3f4f6",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   profileImage: {
//     width: "150px",
//     height: "150px",
//     borderRadius: "50%",
//     marginBottom: "20px",
//     objectFit: "cover",
//   },
//   name: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   bio: {
//     fontSize: "1.2rem",
//     color: "#666",
//     marginBottom: "5px",
//   },
//   city: {
//     fontSize: "1rem",
//     color: "#555",
//   },
//   input: {
//     width: "80%",
//     padding: "10px",
//     margin: "10px auto",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     fontSize: "1rem",
//     display: "block",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginTop: "20px",
//   },
//   editButton: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     border: "none",
//     cursor: "pointer",
//   },
//   saveButton: {
//     backgroundColor: "#28a745",
//     color: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     border: "none",
//     cursor: "pointer",
//   },
//   cancelButton: {
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    profession: "",
    profilePic: "",
    status: "inactive", // Default status
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setFormData({
              name: data.name || "",
              city: data.city || "",
              profession: data.profession || "",
              profilePic: data.profilePic || "",
              status: data.status || "inactive",
            });
          } else {
            const defaultData = {
              name: "",
              city: "",
              profession: "",
              profilePic: "",
              email: user.email,
              role: "user",
              status: "inactive",
            };
            await setDoc(userRef, defaultData);
            setUserData(defaultData);
            setFormData(defaultData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle saving profile updates
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          name: formData.name,
          city: formData.city,
          profession: formData.profession,
          profilePic: formData.profilePic,
        });
        setUserData(formData);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle status toggle
  const toggleStatus = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const newStatus = formData.status === "active" ? "inactive" : "active";
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { status: newStatus });
        setFormData({ ...formData, status: newStatus });
        setUserData({ ...userData, status: newStatus });
        toast.info(`Status changed to ${newStatus.toUpperCase()}!`);
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  if (loading) {
    return <div style={styles.loader}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.hero}>
        <img
          src={formData.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          style={styles.profileImage}
        />
        {isEditing ? (
          <input
            type="text"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            style={styles.input}
          />
        ) : null}

        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            style={styles.input}
          />
        ) : (
          <h1 style={styles.name}>{userData?.name || "No Name Provided"}</h1>
        )}

        {isEditing ? (
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Your Profession"
            style={styles.input}
          />
        ) : (
          <p style={styles.bio}>
            {userData?.profession || "No Profession Provided"}
          </p>
        )}

        {isEditing ? (
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Your City"
            style={styles.input}
          />
        ) : (
          <p style={styles.city}>
            {userData?.city
              ? `🌍 Lives in ${userData.city}`
              : "City not provided"}
          </p>
        )}
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.toggleButton} onClick={toggleStatus}>
          Toggle Status ({formData.status.toUpperCase()})
        </button>
        {isEditing ? (
          <>
            <button style={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            style={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};



// Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  loader: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
    marginTop: "50px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#f3f4f6",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
    objectFit: "cover",
  },
  name: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  bio: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "5px",
  },
  city: {
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px auto",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    display: "block",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
  },
  toggleButton: {
    backgroundColor: "#17a2b8",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
  },
};

export default Profile;
