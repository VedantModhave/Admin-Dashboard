# User Profile Management Dashboard

This is a **User Profile Management Dashboard** project built using **React.js** and **Firebase**. The application allows users to sign up, update their profile information, and manage their account settings. Admin users can manage regular users, including adding, editing, and deleting user profiles. It is designed with a focus on usability, clean design, and a smooth user experience.

## Features

### For Admin Users:
- **Manage Users**: Admins can view all user profiles and manage them (add, edit, delete).
  
### For Regular Users:
- **User Registration**: New users can sign up with their basic details such as name, city, profession, and profile picture.
- **Profile Page**: Users can view and edit their profile information, including name, city, profession, and profile picture.
- **Change Status**: Users can update their status (e.g., "Available" or "Busy") with a different button color to indicate their availability.

### Common Features:
- **Responsive UI**: The user interface is fully responsive, ensuring a seamless experience on both desktop and mobile devices.
- **Firebase Authentication**: User authentication and profile management are handled securely through Firebase Authentication.
- **Firebase Firestore**: All user profile data is stored and retrieved from Firebase Firestore.
- **Firebase Hosting**: The app is hosted on Firebase Hosting, making it easily accessible on the web.

## Technologies Used
- **React.js**: A JavaScript library for building user interfaces.
- **Firebase**:
  - **Firebase Authentication**: For handling user authentication.
  - **Firebase Firestore**: For storing and managing user data.
  - **Firebase Hosting**: For hosting the app on the web.
- **CSS** (or **Styled Components**): For styling the app's components and layout.

## Installation

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/VedantModhave/<repository-name>.git
cd <repository-name>
```
### 2. Install Dependencies
Install the required dependencies using npm:
```bash
npm install
```
3. Set Up Firebase
To connect the app with Firebase:

Go to the Firebase Console.
Create a new Firebase project (or use an existing one).
Enable Firebase Authentication (email/password or other methods as required).
Set up Firebase Firestore and create a collection for user profiles.
Obtain the Firebase config details from the Firebase console and replace them in the firebase.js file.

```
// firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };
```

4. Run the Development Server
After configuring Firebase, run the app in development mode:
```
npm start
```
The app should now be running at http://localhost:3000 in your browser.

Contributing
If you'd like to contribute to this project:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

License
This project is open source and available under the MIT License.
