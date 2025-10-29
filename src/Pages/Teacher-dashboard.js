import React from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaPlus, FaChartBar, FaUser, FaCog, FaTable } from "react-icons/fa";
import { useEffect,useState } from "react";
const TeacherDashboard = () => {

const [teacherData,setTeacherData]=useState(null);
const emailId= sessionStorage.getItem("emailId");

useEffect(() => {
    // Fetch teacher data from backend
    const fetchTeacherData = async () => {
      try {
        const response = await fetch("http://localhost:3001/teacher/fetchTeacherData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId }), // Replace dynamically if needed
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }

        const result = await response.json();
        setTeacherData(result.data);
        console.log(teacherData);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      } 
    };

    fetchTeacherData();
  }, [emailId]); // Runs once on component mount











  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🎓 Feedback System</h2>
        <p className="panel">Teacher Panel</p>

        <ul className="menu">
          <li className="active">🏠 Dashboard</li>
          <li><FaPlus /> Create Form</li>
          <li><FaTable /> Manage Forms</li>
          
          <li><FaUser /> Profile</li>
          <li><RiLogoutBoxRFill />Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-card">
          {teacherData && (
  <h2>Welcome, Prof.  {teacherData.teacherName}👋</h2>
)} 
         
          <p>Here’s a summary of your recent feedback performance.</p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <p>Total Forms</p>
            <h3>12</h3>
          </div>
          <div className="stat-card">
            <p>Total Responses</p>
            <h3>245</h3>
          </div>
          <div className="stat-card">
            <p>Avg. Rating</p>
            <h3>4.4 ⭐</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
