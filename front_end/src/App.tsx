import { Home, Myaccount, Dashboard, Register, Login } from "@/components";

import Header from "@/components/Header";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const URL = window.location.hostname.includes("localhost")
  ? "http://localhost/"
  : "/";

function App() {
  const [user, setUser] = useState(null);
  const [bal, setBal] = useState(null);
  const UPDATE = { setUser: setUser, setBal: setBal };

  console.log(user, bal);

  return (
    <div className="pl-2 pr-4">
      <Header host={URL} user={{ user: user, bal: bal }} />
      <div className=" min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/myaccount"
            element={<Myaccount update={UPDATE} host={URL} />}
          />
          <Route path="/register" element={<Register host={URL} />} />
          <Route path="/login" element={<Login host={URL} />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard update={UPDATE} user={user} bal={bal} host={URL} />
            }
          />
        </Routes>
      </div>
      <div className="h-4 mt-12 bg-black"></div>
    </div>
  );
}

export default App;
