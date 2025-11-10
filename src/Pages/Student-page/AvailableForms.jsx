import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AvailableForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const stuEmail =
        sessionStorage.getItem("studentEmail") ||
        localStorage.getItem("studentEmail") || Cookies.get("studentEmail");


 useEffect(() => {
  const fetchForms = async () => {
    try {
      
      if (!stuEmail) {
        console.error("Student email not found in storage");
        setForms([]);
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3001/feedbackResponse/getAvailableForms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stuEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setForms(Array.isArray(data.forms) ? data.forms : []);
      } else {
        console.error("Error fetching forms:", data.message);
        setForms([]);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  fetchForms();
}, []);


  if (loading) return <p>Loading available forms...</p>;

  return (
    <div className="available-forms">
      <h2>📋 Available Feedback Forms</h2>
      {forms.length === 0 ? (
        <p>No forms available for your semester/section.</p>
      ) : (
        forms.map((form) => (
          <div key={form._id} className="form-card">
            <h3>{form.formTitle}</h3>
            <p><b>Course:</b> {form.courseName}</p>
            <p><b>Semester:</b> {form.targetSemester}</p>
            <p><b>Section:</b> {form.section}</p>
            <p><b>Description:</b> {form.description}</p>
            <button onClick={() => navigate(`/student/form/${form._id}`)}>
              📝 Fill Form
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableForms;
