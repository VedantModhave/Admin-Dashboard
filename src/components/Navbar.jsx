import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import '../../styles/Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Fetch user details from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser({ id: currentUser.uid, ...userDocSnap.data() });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return null; // Don't render navbar if not logged in
  }

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="navbar-right">
        <Link to={`/profile/${user.id}`} className="profile-link">
          <img src={user.profilePic} alt="Profile" className="profile-icon" />
        </Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
