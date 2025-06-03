import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import Toast from "./components/toast/Toast.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </Router>
      <Toast />
    </>
  );
}

export default App;
