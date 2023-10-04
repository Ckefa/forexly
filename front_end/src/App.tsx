import { Home, Myaccount, Register, Login } from "@/components";

import Header from "@/components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  const URL = "http://localhost";
  return (
    <div className="pl-2 pr-4">
      <Header />
      <div className=" min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/register" element={<Register host={URL} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className="h-4 mt-12 bg-black"></div>
    </div>
  );
}

export default App;
