import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Register, Dashboard } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2500} limit={2} />
    </BrowserRouter>
  );
}

export default App;
