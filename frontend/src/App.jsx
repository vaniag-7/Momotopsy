import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <div className="decorator-top-right"></div>
      <div className="decorator-bottom-left"></div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login isSignup={false} />} />
        <Route path="/signup" element={<Login isSignup={true} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
