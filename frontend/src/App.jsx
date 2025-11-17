import { Link, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FormEditor from './pages/FormEditor';
import FormPublic from "./pages/FormPublic";
import Submission from "./pages/Submission";
import Analytics from "./pages/Analytics";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">
            SmartForms
          </Link>
          <div className="space-x-4">
            <Link to="">Dashboard</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/forms/:id/edit" element={<FormEditor />}/>
          <Route path="/forms/:slug" element={<FormPublic/>}/>
          <Route path="/forms/:id/submission" element={<Submission />}/>
          <Route path="/forms/:id/analytics" element={<Analytics />}/>
        </Routes>
      </main>
    </div>
    </AuthProvider>
  );
};

export default App;
