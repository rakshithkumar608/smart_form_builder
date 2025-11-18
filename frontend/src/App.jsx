import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormEditor from "./pages/FormEditor";
import FormPublic from "./pages/FormPublic";
import { AuthProvider } from "./context/AuthContext";

// import Topbar from "./components/Topbar";
// import LeftPanel from "./components/LeftPanel";
// import FieldBlock from "./components/FieldBlock";
// import FormCanvas from "./components/FormCanvas";
// import RightPanel from "./components/RightPanel";
// import FormPreview from "./components/FormPreview";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/topbar" element={<Topbar />} />
          <Route path="/left" element={<LeftPanel />} />
          <Route path="/field" element={<FieldBlock />} />
          <Route path="/canva" element={<FormCanvas />}/>
          <Route path="/right" element={<RightPanel />}/>
          <Route path="/form" element={<FormPreview />}/> */}
          <Route path="/forms/:id/edit" element={<FormEditor />} />
          <Route path="/forms/:slug" element={<FormPublic />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
