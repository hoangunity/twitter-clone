import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/profile"} element={<ProfilePage />} />
          <Route path={"/login"} element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
