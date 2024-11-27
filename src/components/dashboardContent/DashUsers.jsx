import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../../firebase'; // Firebase imports
import { ToastContainer, toast } from 'react-toastify'; // Toastify imports
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import '../../styles/DashUsers.css'; // Import custom CSS for styles

function DashUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({ name: '', email: '', role: 'User' });

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async () => {
    if (newUser.name && newUser.email) {
      try {
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, newUser);
        setNewUser({ name: '', email: '', role: 'User', status: 'Active' }); // Reset the form
        fetchUsers(); // Refresh the user list
        toast.success('User added successfully to the list!', { style: { backgroundColor: 'white', color: 'green' } });
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  };

  // Handle editing a user
  const handleEditUser = async () => {
    if (editedUserData.name && editedUserData.email) {
      try {
        const userDoc = doc(db, 'users', editingUser.id);
        await updateDoc(userDoc, editedUserData);
        setEditingUser(null); // Close the edit form
        setEditedUserData({ name: '', email: '', role: 'User' }); // Reset the form
        fetchUsers(); // Refresh the user list
        toast.success('User details updated successfully!', { style: { backgroundColor: 'white', color: 'green' } });
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await deleteDoc(userDoc);
      fetchUsers(); // Refresh the user list
      toast.success('User deleted successfully from the list!', { style: { backgroundColor: 'white', color: 'green' } });
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  // Handle opening the edit form
  const openEditForm = (user) => {
    setEditingUser(user);
    setEditedUserData({ name: user.name, email: user.email, role: user.role });
  };

  return (
    <div className="users-section">
      {/* <h2>Users List</h2> */}

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              {/* Status is displayed with conditional color */}
              <p>
                Status:{" "}
                <span className={user.status === 'Active' ? 'status-active' : 'tatus-inactive'}>
                  {user.status}
                </span>
              </p>
            </div>
            <div className="user-actions">
              <button className="edit-btn" onClick={() => openEditForm(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit user form */}
      <div className="form-container">
        <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={editingUser ? editedUserData.name : newUser.name}
            onChange={(e) => {
              if (editingUser) {
                setEditedUserData({ ...editedUserData, name: e.target.value });
              } else {
                setNewUser({ ...newUser, name: e.target.value });
              }
            }}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={editingUser ? editedUserData.email : newUser.email}
            onChange={(e) => {
              if (editingUser) {
                setEditedUserData({ ...editedUserData, email: e.target.value });
              } else {
                setNewUser({ ...newUser, email: e.target.value });
              }
            }}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <select
            value={editingUser ? editedUserData.role : newUser.role}
            onChange={(e) => {
              if (editingUser) {
                setEditedUserData({ ...editedUserData, role: e.target.value });
              } else {
                setNewUser({ ...newUser, role: e.target.value });
              }
            }}
            className="form-input"
          >
            <option value="User">Select role</option>
            <option value="User">user</option>
            <option value="Admin">admin</option>
          </select>
        </div>
        <button
          onClick={editingUser ? handleEditUser : handleAddUser}
          className={editingUser ? 'save-btn' : 'add-btn'}
        >
          {editingUser ? 'Save Changes' : 'Add User'}
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default DashUsers;
