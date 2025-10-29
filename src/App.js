
import { BrowserRouter , Routes ,useLocation, Navigate,Route } from "react-router-dom";

import Font from "./Pages/Font";
import StuLog from "./Pages/Student-Login";
import Dashboard from "./Pages/Dashboard";
import StuReg from "./Pages/Student-Register";
import TeaReg from "./Pages/Teacher-Register";
import TeacherLog from "./Pages/Teacher-Login";
import AdminLog from "./Pages/Admin-Login";
import AdminDashboard from "./Pages/Admin-dashboard";
import TeacherDashboard from "./Pages/Teacher-dashboard";
import ApprovedStudent from "./Pages/Admin-page/Approved-student";
import ApprovedTeacher from "./Pages/Admin-page/Approved-teacher";
import ApproveStudent from "./Pages/Admin-page/Approve-student";
import ApproveTeacher from "./Pages/Admin-page/Approve-teacher";
function App() {


  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
     
      <Route exact path="/" element={<Font />} />
      <Route exact path="/student_login" element={<StuLog />} />
       <Route exact path="/student_registration" element={<StuReg />} />
       <Route exact path="/teacher_registration" element={<TeaReg/>} />
       <Route exact path="/teacher_login" element={<TeacherLog/>} />
       <Route exact path="/admin_login" element={<AdminLog/>} />
      <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/teacher_dashboard" element={<TeacherDashboard />} />
      <Route exact path="/admin_dashboard" element={<AdminDashboard />} >
  
       <Route index element={<Navigate to="approve_teacher" replace />} />
      <Route exact path="approve_teacher" element={<ApproveTeacher/>} />
      <Route exact path="approve_student" element={<ApproveStudent />} />
      <Route exact path="approved_teacher" element={<ApprovedTeacher />} />
      <Route exact path="approved_student" element={<ApprovedStudent />} />
      </Route>
    </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
