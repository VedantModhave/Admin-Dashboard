// import React, { useState, useEffect } from "react";
// import { db } from "../firebase"; // Assuming db is your Firestore instance
// import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; // Firestore functions
// import DashUsers from "./dashboardContent/DashUsers";
// import { LineChart, PieChart, Line, Pie, Cell, ResponsiveContainer } from "recharts";
// import "../styles/Dashboard.css";
// import '../styles/DashUsers.css';

// function Dashboard() {
//   const [activePage, setActivePage] = useState('overview');
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);
//   const [data, setData] = useState([
//     { name: "Project 1", value: 1000 },
//     { name: "Project 2", value: 800 },
//     { name: "Project 3", value: 600 },
//     { name: "Project 4", value: 400 },
//     { name: "Project 5", value: 300 },
//     { name: "Project 6", value: 500 },
//     { name: "Project 7", value: 450 },
//     { name: "Project 8", value: 200 },
//   ]);

//   const statusData = [
//     { name: "Active Users", value: activeUsers },
//     { name: "Inactive Users", value: inactiveUsers },
//   ];

//   // Fetch total users and user status (active/inactive) from Firestore
//   useEffect(() => {
//     // Query for total users
//     const usersCollection = collection(db, "users");
//     const unsub = onSnapshot(usersCollection, (snapshot) => {
//       setTotalUsers(snapshot.size); // This will dynamically update as users are added/removed
//     });

//     // Query for active/inactive users
//     const activeQuery = query(usersCollection, where("status", "==", "active"));
//     const inactiveQuery = query(usersCollection, where("status", "==", "inactive"));

//     const unsubActive = onSnapshot(activeQuery, (snapshot) => {
//       setActiveUsers(snapshot.size); // Active user count
//     });

//     const unsubInactive = onSnapshot(inactiveQuery, (snapshot) => {
//       setInactiveUsers(snapshot.size); // Inactive user count
//     });

//     return () => {
//       unsub();
//       unsubActive();
//       unsubInactive();
//     };
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h1>Dashboard</h1>
//         <ul>
//           <li onClick={() => setActivePage('overview')}>Overview</li>
//           <li onClick={() => setActivePage('users')}>Users</li>
//         </ul>
//       </div>

//       <div className="dashboard-content">
//         {activePage === 'overview' && (
//           <>
//             <h1>Admin Dashboard</h1>

//             {/* Overview Data */}
//             <div className="overview-cards">
//               <div className="overview-card">
//                 <h3>Total Users</h3>
//                 <p className="number">{totalUsers}</p>
//               </div>
//               <div className="overview-card">
//                 <h3>Active Users</h3>
//                 <p className="number">{activeUsers}</p>
//               </div>
//               <div className="overview-card">
//                 <h3>Inactive Users</h3>
//                 <p className="number">{inactiveUsers}</p>
//               </div>
//             </div>

//             {/* Visual Overview */}
//             <div className="visual-overview">
//               <div className="chart-container">
//                 <h3>Users Trend on Dashboard</h3>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={data}>
//                     <Line type="monotone" dataKey="value" stroke="#8884d8" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="chart-container">
//                 <h3>Users Status Distribution</h3>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
//                       data={statusData}
//                       dataKey="value"
//                       nameKey="name"
//                       outerRadius={80}
//                       fill="#8884d8"
//                     >
//                       {statusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={index === 0 ? "#82ca9d" : "#ff7300"} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         )}
        
//         {activePage === 'users' && (
//           <>
//             <h2>Users List</h2>
//             <DashUsers />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;








import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Assuming db is your Firestore instance
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; // Firestore functions
import DashUsers from "./dashboardContent/DashUsers";
import { LineChart, PieChart, BarChart, Bar, Line, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList } from "recharts";
import "../styles/Dashboard.css";
import '../styles/DashUsers.css';

function Dashboard() {
  const [activePage, setActivePage] = useState('overview');
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [data, setData] = useState([
    { name: "21st Nov", value: 1 },
    { name: "22nd Nov", value: 2 },
    { name: "23rd Nov", value: 3 },
    { name: "24th Nov", value: 4 },
    { name: "25th Nov", value: 5 },
    { name: "26th Nov", value: 6 },
  ]);

  const statusData = [
    { name: "Active Users", value: activeUsers },
    { name: "Inactive Users", value: inactiveUsers },
  ];

  // Hardcoded data for Location-wise Users (Bar Chart)
  const locationData = [
    { name: "Mumbai", users: 2 },
    { name: "Pune", users: 2 },
    { name: "Nagpur", users: 1 },
    { name: "Nashik", users: 1 },
    { name: "Mumbai Pune", users: 1 },
  ];

  // Fetch total users and user status (active/inactive) from Firestore
  useEffect(() => {
    // Query for total users
    const usersCollection = collection(db, "users");
    const unsub = onSnapshot(usersCollection, (snapshot) => {
      setTotalUsers(snapshot.size); // This will dynamically update as users are added/removed
    });

    // Query for active/inactive users
    const activeQuery = query(usersCollection, where("status", "==", "active"));
    const inactiveQuery = query(usersCollection, where("status", "==", "inactive"));

    const unsubActive = onSnapshot(activeQuery, (snapshot) => {
      setActiveUsers(snapshot.size); // Active user count
    });

    const unsubInactive = onSnapshot(inactiveQuery, (snapshot) => {
      setInactiveUsers(snapshot.size); // Inactive user count
    });

    return () => {
      unsub();
      unsubActive();
      unsubInactive();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          <li
            onClick={() => setActivePage('overview')}
            className={activePage === 'overview' ? 'active' : ''}
          >
            Overview
          </li>
          <li
            onClick={() => setActivePage('users')}
            className={activePage === 'users' ? 'active' : ''}
          >
            Users
          </li>
        </ul>
      </div>

      <div className="dashboard-content">
        {activePage === 'overview' && (
          <>
            <h1>Admin Dashboard</h1>

            {/* Overview Data */}
            <div className="overview-cards">
              <div className="overview-card">
                <h3>Total Users</h3>
                <p className="number">{totalUsers}</p>
              </div>
              <div className="overview-card">
                <h3>Active Users</h3>
                <p className="number">{activeUsers}</p>
              </div>
              <div className="overview-card">
                <h3>Inactive Users</h3>
                <p className="number">{inactiveUsers}</p>
              </div>
            </div>

            {/* Visual Overview */}
            <div className="visual-overview">
              <div className="chart-container">
                <h3>Users Trend on Dashboard</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <Tooltip />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <LabelList dataKey="value" position="top" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-container">
                <h3>Users Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#008000" : "#ff0000"} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    <LabelList dataKey="value" position="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Location-wise Users Bar Chart */}
              <div className="chart-container">
                <h3>Location-wise User Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8">
                      <LabelList dataKey="users" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        
        {activePage === 'users' && (
          <>
            <h2>Users List</h2>
            <DashUsers />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
