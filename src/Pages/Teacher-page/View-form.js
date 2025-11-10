import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ViewForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [expandedForm, setExpandedForm] = useState(null);
  const [expandedFormQuestions, setExpandedFormQuestions] = useState({});

  const emailId =
    sessionStorage.getItem("emailId") ||
    localStorage.getItem("emailId") ||
    Cookies.get("teacherEmail");

  // ✅ Fetch all teacher forms
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/teacher/teacherForms/${emailId}`
        );
        const data = await res.json();
        setForms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, [emailId]);

  // ✅ Delete a form
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    try {
      const res = await fetch(`http://localhost:3001/teacher/deleteForm/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setForms((prev) => prev.filter((form) => form._id !== id));
        setMessage("🗑 Form deleted successfully");
      } else {
        setMessage(data.message || "Failed to delete form");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("❌ Error deleting form");
    }
  };

  // ✅ Toggle expand + fetch questions dynamically
  const toggleExpand = async (id) => {
    if (expandedForm === id) {
      setExpandedForm(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/teacher/getQuestions/${id}`);
      const data = await res.json();

      if (res.ok) {
        setExpandedForm(id);
        setExpandedFormQuestions((prev) => ({
          ...prev,
          [id]: data.questions || [],
        }));
      } else {
        alert(data.message || "Error fetching form questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // ✅ Format form creation date
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffHours = (now - date) / (1000 * 60 * 60);

    if (diffHours < 24) return "Yesterday";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <p>Loading forms...</p>;

  return (
    <div className="view-container">
      <h2>📋 My Feedback Forms</h2>
      {message && <p className="message">{message}</p>}

      {forms.length === 0 ? (
        <p>No forms created yet.</p>
      ) : (
        <div className="form-list">
          {forms.map((form) => (
            <div key={form._id} className="form-card">
              <div className="form-header">
                <div>
                  <h3>{form.formTitle}</h3>
                  <p><b>Course:</b> {form.courseName}</p>
                  <p><b>Semester:</b> {form.semester}</p>
                  <p><b>Description:</b> {form.description}</p>
                  <small>🕒 Created: {formatDate(form.createdAt)}</small>
                </div>

                <div className="actions">
                  <button onClick={() => toggleExpand(form._id)}>
                    {expandedForm === form._id
                      ? "🔼 Hide Questions"
                      : "🔽 View Questions"}
                  </button>

                  <button
                    onClick={() =>
                      (window.location.href = `/teacher/edit/${form._id}`)
                    }
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/student/form/${form._id}`
                      )
                    }
                  >
                    🔗 Copy Link
                  </button>

                  <button
                    onClick={() => handleDelete(form._id)}
                    className="delete-btn"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>

              {/* ✅ Show questions if expanded */}
              {expandedForm === form._id && (
                <div className="question-section">
                  <h4>Questions:</h4>
                  {expandedFormQuestions[form._id] &&
                  expandedFormQuestions[form._id].length > 0 ? (
                    expandedFormQuestions[form._id].map((q, i) => (
                      <div key={i} className="question-item">
                        <p>
                          <b>Q{i + 1}:</b> {q.questionText || "Untitled Question"}
                        </p>
                        <p>
                          Type:{" "}
                          <b>
                            {q.questionType
                              ? q.questionType.toUpperCase()
                              : "TEXT"}
                          </b>
                        </p>
                        {q.options && q.options.length > 0 && (
                          <ul>
                            {q.options.map((opt, idx) => (
                              <li key={idx}>{opt}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No questions found.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewForms;
