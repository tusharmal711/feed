import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/index.css";

const TeacherLog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/teacher/loginTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // allow cookie from backend
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
         sessionStorage.setItem("emailId", formData.emailId);
        toast.success(data.message || "Login successful!", {
          position: "top-right",
        });

        console.log("Teacher Login response:", data);

        // redirect after toast
        setTimeout(() => {
          navigate("/teacher_dashboard");
        }, 1500);
      } else {
        toast.error(data.error || data.message || "Invalid credentials", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error logging in", { position: "top-right" });
    }
  };

  return (
    <div className="main-container">
      <div className="web-logo">
        <img src="./Images/FeedBacker-logo.png" alt="logo" />
        <span className="web-logo-name">FeedBacker</span>
      </div>

      <div className="container">
        <h2>Teacher Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="text-field">
            <div>
              <label htmlFor="emailId">Email</label>
            </div>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="text-field">
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="stu-log-btn">
            <button type="submit">Login</button>
          </div>
        </form>

        <p className="not-account-reg">
          Don’t have an account?{" "}
          <Link to="/teacher_registration">Register</Link>
        </p>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default TeacherLog;
