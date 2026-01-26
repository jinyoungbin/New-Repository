import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import PosesPage from '@/pages/Poses';
import PoseDetailPage from '@/pages/PoseDetail';
import ConsultPage from '@/pages/Consult';
import LoginPage from '@/pages/Login';
import PoseGuidePage from '@/pages/PoseGuide';
import PhotoAnalysisPage from '@/pages/PhotoAnalysis';
import PhotoScoringPage from '@/pages/PhotoScoring';
import MyPage from '@/pages/MyPage';
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
                        <Route path="/guide" element={<PoseGuidePage />} />
                        <Route path="/analysis" element={<PhotoAnalysisPage />} />
                        <Route path="/scoring" element={<PhotoScoringPage />} />
                        <Route path="/me" element={<MyPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
