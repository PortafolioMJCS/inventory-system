import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user, token } = useAuth();

  console.log("APP RENDER", { user, token });

  return (
    <div style={{ padding: 20 }}>
      {!token ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Dashboard />
        </>
      )}
    </div>
  );
}

export default App;