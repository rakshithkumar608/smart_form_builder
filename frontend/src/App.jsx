import { Link, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">
            SmartForms
          </Link>
          <div className="space-x-4">
            <Link to="">Dashboard</Link>
            <Link to="">Login</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;
