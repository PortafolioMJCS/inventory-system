import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  console.log("LOGIN CONTEXT:", login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

     axios.post("http://localhost:8001/api/login", {
      email,
      password
    })
    .then(res => {
      console.log(res.data);
      console.log("ANTES LOGIN");
      login(res.data.user, res.data.token); // ? USAR CONTEXTO
      console.log("DESPUES LOGIN");
    })
    .finally(() => setLoading(false));
  };

  return (


    <div className="container mt-5">
          <h2>Login2</h2>
    
          <input
            className="form-control mb-2"
            placeholder="Email"
            type="email"
             value={email}
            onChange={e => setEmail(e.target.value)}
          />
    
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
    
          <button 
            className="btn btn-primary" 
            onClick={handleLogin}
            disabled={loading}
            >
            {loading ? (
                <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Ingresando...
                </>
            ) : "Login"}
            </button>
        </div>
  );
};

export default Login;