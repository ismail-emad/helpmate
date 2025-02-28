import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WorkerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/worker/login", { email, password });
      if(response.data.success){
        localStorage.setItem("workerToken", response.data.token);
        navigate("/worker/dashboard");
      }else{
        if(response.data.message=="worker not registered") navigate("/worker/register");
        if(response.data.message=="invalid email or password") alert("invalid email or password");
      }
   
    }catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Worker Login</h2>
      <input className="register-input" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input className="register-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="register-button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default WorkerLogin;
