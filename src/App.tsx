import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import PosesPage from '@/pages/Poses';
import PoseDetailPage from '@/pages/PoseDetail';
import ConsultPage from '@/pages/Consult';
import LoginPage from '@/pages/Login';
import { initKakao } from '@/lib/kakao';

// Initialize Kakao SDK
initKakao();

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/poses" element={<PosesPage />} />
                        <Route path="/poses/:id" element={<PoseDetailPage />} />
                        <Route path="/consult" element={<ConsultPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
