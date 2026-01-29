import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useUserData } from '@/hooks/useUserData';
import { SavedAnalysis, SavedScore, deleteAnalysisResult, deleteCustomPose, deleteScoringResult } from '@/lib/userData';
import { LocalizedText } from '@/lib/photoAnalysis';
import { POSES, Pose } from '@/data/poses';
import styles from './MyPage.module.css';

export default function MyPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { userData } = useUserData();

    // UI State
    // UI State
    const [activeTab, setActiveTab] = useState<'analysis' | 'poses' | 'scoring'>('analysis');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const [selectedAnalysis, setSelectedAnalysis] = useState<SavedAnalysis | null>(null);
    const [selectedPose, setSelectedPose] = useState<Pose | null>(null);
    const [selectedScore, setSelectedScore] = useState<SavedScore | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Helper to safely get text
    const getText = (obj: LocalizedText | string | undefined) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        const lang = i18n.language.startsWith('ko') ? 'ko' : 'en';
        return obj[lang] || obj['en'] || '';
    };

    if (!user) {
        return <div className={styles.container}>Loading...</div>;
    }

    const analyzedCount = userData?.history.length || 0;
    const customPoses = userData?.customPoses || [];
    const savedCount = (userData?.savedPoseIds.length || 0) + customPoses.length;

    // Filter saved poses and merge with custom poses
    const staticSavedPoses = POSES.filter(p => userData?.savedPoseIds.includes(p.id));
    const allSavedPoses = [...customPoses, ...staticSavedPoses];

    return (
        <main className={styles.container}>
            <div className={styles.profileCard}>
                <img src={user.profileImage} alt={user.nickname} className={styles.avatar} />
                <h1 className={styles.name}>{user.nickname}</h1>
                {user.isKakao && <span className={styles.badge}>Kakao User</span>}

                <div className={styles.statsGrid}>
                    <div
                        className={`${styles.statItem} ${activeTab === 'analysis' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('analysis'); setPage(1); }}
                    >
                        <span className={styles.statValue}>{analyzedCount}</span>
                        <span className={styles.statLabel}>{t('mypage.analyzed_count')}</span>
                    </div>
                    <div
                        className={`${styles.statItem} ${activeTab === 'scoring' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('scoring'); setPage(1); }}
                    >
                        <span className={styles.statValue}>{userData?.scoringHistory?.length || 0}</span>
                        <span className={styles.statLabel}>Scores</span>
                    </div>
                    <div
                        className={`${styles.statItem} ${activeTab === 'poses' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('poses'); setPage(1); }}
                    >
                        <span className={styles.statValue}>{savedCount}</span>
                        <span className={styles.statLabel}>{t('mypage.saved_count')}</span>
                    </div>
                </div>

                {/* No Header "Recent Activity" anymore, implied by tab */}

                <div className={styles.emptyState}>
                    {activeTab === 'analysis' ? (
                        <>
                            {analyzedCount > 0 ? (
                                <>
                                    <div className={styles.historyList}>
                                        {userData?.history
                                            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                                            .map((item) => {
                                                // Summary text logic...
                                                let summaryText = '';
                                                if (item.lighting && typeof item.lighting === 'object' && item.lighting.type) {
                                                    summaryText = `${getText(item.lighting.type)}`;
                                                }
                                                if (item.pose && typeof item.pose === 'object') {
                                                    summaryText += `, ${getText(item.pose)}`;
                                                }
                                                if (!summaryText) summaryText = (item as any).summary || 'Analyzed Photo';

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={styles.historyItem}
                                                        onClick={() => setSelectedAnalysis(item)}
                                                        style={{ cursor: 'pointer', position: 'relative' }}
                                                    >
                                                        <img
                                                            src={item.thumbnail || 'https://placehold.co/100x100/eeeeee/999999?text=No+Img'}
                                                            alt="Thumbnail"
                                                            className={styles.historyThumb}
                                                        />
                                                        {/* Text removed as per request, just image */}
                                                        <div style={{ flex: 1 }}></div>
                                                        <button
                                                            className={styles.deleteBtn}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (window.confirm(t('mypage.confirm_delete', 'Are you sure you want to delete this?'))) {
                                                                    deleteAnalysisResult(user.id, item.id);
                                                                }
                                                            }}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    {/* Pagination Controls */}
                                    {Math.ceil(analyzedCount / ITEMS_PER_PAGE) > 1 && (
                                        <div className={styles.pagination}>
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                className={styles.pageBtn}
                                            >
                                                &lt;
                                            </button>
                                            <span className={styles.pageInfo}>{page} / {Math.ceil(analyzedCount / ITEMS_PER_PAGE)}</span>
                                            <button
                                                disabled={page === Math.ceil(analyzedCount / ITEMS_PER_PAGE)}
                                                onClick={() => setPage(p => Math.min(Math.ceil(analyzedCount / ITEMS_PER_PAGE), p + 1))}
                                                className={styles.pageBtn}
                                            >
                                                &gt;
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                t('mypage.empty_activity')
                            )}
                        </>
                    ) : activeTab === 'scoring' ? (
                        <>
                            {(userData?.scoringHistory?.length || 0) > 0 ? (
                                <>
                                    <div className={styles.historyList}>
                                        {userData!.scoringHistory
                                            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                                            .map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={styles.historyItem}
                                                    onClick={() => setSelectedScore(item)}
                                                    style={{ cursor: 'pointer', position: 'relative' }}
                                                >
                                                    <img
                                                        src={item.thumbnail || 'https://placehold.co/100x100/eeeeee/999999?text=No+Img'}
                                                        alt="Thumbnail"
                                                        className={styles.historyThumb}
                                                    />
                                                    <div className={styles.historyInfo}>
                                                        <div className={styles.historyText}>
                                                            <span style={{ fontWeight: 'bold', color: '#FF6B6B', fontSize: '1.2rem' }}>
                                                                {item.score}pts
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={styles.deleteBtn}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (window.confirm(t('mypage.confirm_delete', 'Are you sure you want to delete this?'))) {
                                                                deleteScoringResult(user.id, item.id);
                                                            }
                                                        }}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                    {/* Pagination Controls */}
                                    {Math.ceil((userData?.scoringHistory?.length || 0) / ITEMS_PER_PAGE) > 1 && (
                                        <div className={styles.pagination}>
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                className={styles.pageBtn}
                                            >
                                                &lt;
                                            </button>
                                            <span className={styles.pageInfo}>{page} / {Math.ceil((userData?.scoringHistory?.length || 0) / ITEMS_PER_PAGE)}</span>
                                            <button
                                                disabled={page === Math.ceil((userData?.scoringHistory?.length || 0) / ITEMS_PER_PAGE)}
                                                onClick={() => setPage(p => Math.min(Math.ceil((userData?.scoringHistory?.length || 0) / ITEMS_PER_PAGE), p + 1))}
                                                className={styles.pageBtn}
                                            >
                                                &gt;
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ padding: 20 }}>No scoring history yet. Try the Scoring feature!</div>
                            )}
                        </>
                    ) : (
                        <>
                            {savedCount > 0 ? (
                                <>
                                    <div className={styles.historyList}>
                                        {allSavedPoses
                                            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                                            .map((pose) => (
                                                <div
                                                    key={pose.id}
                                                    className={styles.historyItem}
                                                    onClick={() => setSelectedPose(pose)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img
                                                        src={pose.imageUrl}
                                                        alt={pose.title}
                                                        className={styles.historyThumb}
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                    <div className={styles.historyInfo}>
                                                        <div className={styles.historyDate} style={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                                                            {pose.category}
                                                        </div>
                                                        <div className={styles.historyText}>{pose.title}</div>
                                                    </div>
                                                    {/* Only custom poses (starting with 'custom-') can be deleted */}
                                                    {pose.id.startsWith('custom-') && (
                                                        <button
                                                            className={styles.deleteBtn}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (window.confirm(t('mypage.confirm_delete', 'Are you sure you want to delete this?'))) {
                                                                    deleteCustomPose(user.id, pose.id);
                                                                }
                                                            }}
                                                        >
                                                            🗑️
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    {/* Pagination Controls */}
                                    {Math.ceil(savedCount / ITEMS_PER_PAGE) > 1 && (
                                        <div className={styles.pagination}>
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                className={styles.pageBtn}
                                            >
                                                &lt;
                                            </button>
                                            <span className={styles.pageInfo}>{page} / {Math.ceil(savedCount / ITEMS_PER_PAGE)}</span>
                                            <button
                                                disabled={page === Math.ceil(savedCount / ITEMS_PER_PAGE)}
                                                onClick={() => setPage(p => Math.min(Math.ceil(savedCount / ITEMS_PER_PAGE), p + 1))}
                                                className={styles.pageBtn}
                                            >
                                                &gt;
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ padding: 20 }}>No saved poses yet. Go to Poses tab to find some!</div>
                            )}
                        </>
                    )}
                </div>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    {t('mypage.logout')}
                </button>
            </div>

            {/* Analysis Detail Modal */}
            {selectedAnalysis && (
                <div className={styles.modalOverlay} onClick={() => setSelectedAnalysis(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setSelectedAnalysis(null)}>✕</button>
                        <div className={styles.modalScrollable}>
                            <img
                                src={selectedAnalysis.thumbnail || 'https://placehold.co/400x300/eeeeee/999999?text=No+Img'}
                                alt="Result"
                                className={styles.modalImage}
                            />
                            <div className={styles.recipeGrid}>
                                {selectedAnalysis.camera ? (
                                    <>
                                        <div className={styles.recipeItem}>
                                            <div className={styles.iconBox}>☀️</div>
                                            <div className={styles.infoBox}>
                                                <span className={styles.label}>{t('analysis.lighting')}</span>
                                                <div className={styles.value}>{getText(selectedAnalysis.lighting?.type)}</div>
                                            </div>
                                        </div>
                                        <div className={styles.recipeItem}>
                                            <div className={styles.iconBox}>📷</div>
                                            <div className={styles.infoBox}>
                                                <span className={styles.label}>{t('analysis.angle')}</span>
                                                <div className={styles.value}>{getText(selectedAnalysis.camera?.angle)}</div>
                                            </div>
                                        </div>
                                        <div className={styles.recipeItem}>
                                            <div className={styles.iconBox}>🧘</div>
                                            <div className={styles.infoBox}>
                                                <span className={styles.label}>{t('analysis.pose')}</span>
                                                <div className={styles.value} style={{ fontSize: '0.95rem' }}>{getText(selectedAnalysis.pose)}</div>
                                            </div>
                                        </div>
                                        {selectedAnalysis.tips && (
                                            <div className={styles.tipBox}>
                                                <span className={styles.label} style={{ color: '#4ECDC4' }}>{t('analysis.tip')}</span>
                                                <p className={styles.tipText}>"{getText(selectedAnalysis.tips)}"</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        <p>Detailed analysis not available for old records.</p>
                                        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{(selectedAnalysis as any).summary}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pose Detail Modal */}
            {selectedPose && (
                <div className={styles.modalOverlay} onClick={() => setSelectedPose(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setSelectedPose(null)}>✕</button>
                        <div className={styles.modalScrollable}>
                            <img
                                src={selectedPose.imageUrl}
                                alt={selectedPose.title}
                                className={styles.modalImage}
                                style={{ maxHeight: '400px', objectFit: 'contain', background: '#f8f8f8' }}
                            />
                            <div style={{ marginBottom: 20 }}>
                                <span style={{
                                    background: '#FEE500', padding: '4px 12px', borderRadius: '100px',
                                    fontSize: '0.8rem', fontWeight: 'bold', color: '#333'
                                }}>
                                    {selectedPose.category}
                                </span>
                                <h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{selectedPose.title}</h2>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{selectedPose.description}</p>
                            </div>

                            <div className={styles.tipBox}>
                                <span className={styles.label} style={{ color: '#4ECDC4' }}>TIPS</span>
                                <ul style={{ paddingLeft: 20, margin: '10px 0', color: '#555' }}>
                                    {selectedPose.tips.map((tip, idx) => (
                                        <li key={idx} style={{ marginBottom: 5 }}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Score Detail Modal */}
            {selectedScore && (
                <div className={styles.modalOverlay} onClick={() => setSelectedScore(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setSelectedScore(null)}>✕</button>
                        <div className={styles.modalScrollable}>
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: '50%', background: `conic-gradient(#FF6B6B ${selectedScore.score * 3.6}deg, #eee 0deg)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'
                                }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'white', width: 70, height: 70, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedScore.score}
                                    </span>
                                </div>
                                <h2 style={{ marginTop: 10 }}>{getText(selectedScore.title)}</h2>
                            </div>

                            <div className={styles.recipeGrid}>
                                <div className={styles.recipeItem}>
                                    <div className={styles.infoBox} style={{ width: '100%' }}>
                                        <span className={styles.label}>Composition</span>
                                        <div className={styles.value}>{selectedScore.criteria.composition}/100</div>
                                    </div>
                                </div>
                                <div className={styles.recipeItem}>
                                    <div className={styles.infoBox} style={{ width: '100%' }}>
                                        <span className={styles.label}>Lighting</span>
                                        <div className={styles.value}>{selectedScore.criteria.lighting}/100</div>
                                    </div>
                                </div>
                                <div className={styles.recipeItem}>
                                    <div className={styles.infoBox} style={{ width: '100%' }}>
                                        <span className={styles.label}>Creativity</span>
                                        <div className={styles.value}>{selectedScore.criteria.creativity}/100</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.tipBox} style={{ marginTop: 20 }}>
                                <span className={styles.label} style={{ color: '#4ECDC4' }}>FEEDBACK</span>
                                <p style={{ marginTop: 5, fontWeight: 'bold' }}>👍 Good</p>
                                <p style={{ marginBottom: 10 }}>{getText(selectedScore.feedback.good)}</p>
                                <p style={{ fontWeight: 'bold' }}>💡 Improve</p>
                                <p>{getText(selectedScore.feedback.improvement)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
