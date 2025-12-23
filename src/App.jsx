
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ToastContainer } from './components/common/Toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
// import { notification } from './components/layout/NotificationPanel';

// Features
import { MainTab } from './components/features/deals/MainTab';
import { SearchTab } from './components/features/deals/SearchTab';
import { WishlistTab } from './components/features/deals/WishlistTab';
import { DealDetailModal } from './components/features/deals/DealDetailModal';
import { CommunityTab, CommunityPostModal, WritePostModal } from './components/features/community';
import { LoginModal, MyPageModal, LegalModal } from './components/features/user';

// Hooks & API
import { useLocalStorage } from './hooks';
import { MockApiService } from './api/mockApi';

function App() {
  // --- UI State ---
  const [activeTab, setActiveTab] = useState("deals");
  const [activeDropTab, setActiveDropTab] = useState("테크");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasUnreadNoti, setHasUnreadNoti] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // --- Modals State ---
  const [showLogin, setShowLogin] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);
  const [showLegal, setShowLegal] = useState(null); // 'terms', 'privacy', 'notice'
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // --- Data State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useLocalStorage("recentSearches", []);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  const [heroData, setHeroData] = useState([]);
  const [categoryDeals, setCategoryDeals] = useState({});
  const [communityPosts, setCommunityPosts] = useState([]);

  const [isLoadingHero, setIsLoadingHero] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(null);
  const [sortBy, setSortBy] = useState("recommend");
  const [communityFilter, setCommunityFilter] = useState("전체");

  // --- Toast ---
  const addToast = useCallback((message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      // Hero data (dependent on activeDropTab)
      setIsLoadingHero(true);
      const heroes = await MockApiService.fetchHeroDeals(activeDropTab);
      setHeroData(heroes);
      setIsLoadingHero(false);

      // Category data (fetch once or cache?)
      // For simplicity fetching all initially as per original logic structure roughly
      if (Object.keys(categoryDeals).length === 0) {
        const cats = await MockApiService.fetchCategoryDeals();
        setCategoryDeals(cats);
        setIsLoadingCategory(false);
      }

      // Community posts
      if (activeTab === 'community' && communityPosts.length === 0) {
        const posts = await MockApiService.fetchCommunityPosts("전체");
        setCommunityPosts(posts);
        setIsLoadingPosts(false);
      }
    };
    fetchData();
  }, [activeDropTab, activeTab]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Event Handlers ---
  const handleLogin = () => {
    setUser({ name: "김제니", id: "user_123" });
    setShowLogin(false);
    addToast("환영합니다! 김제니님 👋");
  };

  const handleLogout = () => {
    setUser(null);
    addToast("로그아웃 되었습니다.");
  };

  const handleSearch = useCallback(
    async (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      if (query.trim()) {
        if (activeTab !== "search") setActiveTab("search");
        setIsSearching(true);
        // Debounce could be added here
        try {
          const results = await MockApiService.searchDeals(query);
          setSearchResults(results);
          if (!recentSearches.includes(query) && query.length > 1) {
            setRecentSearches((prev) => [query, ...prev].slice(0, 10));
          }
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    },
    [activeTab, recentSearches, setRecentSearches]
  );

  const removeRecentSearch = (term) => {
    setRecentSearches(prev => prev.filter(t => t !== term));
  };

  const toggleWishlist = useCallback((e, dealId) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const isAdded = !prev.includes(dealId);
      addToast(isAdded ? "찜 목록에 추가되었습니다 ❤️" : "찜 목록에서 삭제되었습니다.");
      return isAdded ? [...prev, dealId] : prev.filter(id => id !== dealId);
    });
  }, [addToast, setWishlist]);

  // Derived state for filtered community posts
  const filteredPosts = useMemo(() => {
    if (communityFilter === '전체') return communityPosts;
    return communityPosts.filter(p => p.category === communityFilter);
  }, [communityPosts, communityFilter]);

  // Sorted deals helper
  const getSortedDeals = useCallback((deals) => {
    if (!deals) return [];
    const d = [...deals];
    if (sortBy === 'price_asc') return d.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') return d.sort((a, b) => b.price - a.price);
    return d; // recommend (default)
  }, [sortBy]);

  // Wishlist deals retrieval
  const wishlistDeals = useMemo(() => {
    const allDeals = [
      ...Object.values(heroData || {}),
      ...Object.values(categoryDeals || {}).flat()
    ];
    // De-duplicate by ID roughly
    const map = new Map();
    allDeals.forEach(d => { if (d.id) map.set(d.id, d); });
    return wishlist.map(id => map.get(id)).filter(Boolean);
  }, [heroData, categoryDeals, wishlist]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg-main text-text-main pb-20 selection:bg-accent-purple/30 font-sans">
        <ToastContainer toasts={toasts} />

        <Header
          scrolled={isScrolled}
          onTabChange={setActiveTab}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onWishlist={() => setActiveTab('wishlist')}
          isAlertOpen={isAlertOpen}
          setAlertOpen={setIsAlertOpen}
          recentSearches={recentSearches}
          onRemoveRecentSearch={removeRecentSearch}
          hasUnreadNoti={hasUnreadNoti}
          onOpenMyPage={() => user ? setShowMyPage(true) : setShowLogin(true)}
        />

        <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6">
          {activeTab === 'deals' && (
            <MainTab
              activeDropTab={activeDropTab}
              setActiveDropTab={setActiveDropTab}
              isLoadingHero={isLoadingHero}
              heroData={heroData}
              handleSelectDeal={setSelectedDeal}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categoryDeals={categoryDeals}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              isLoadingCategory={isLoadingCategory}
              getSortedDeals={getSortedDeals}
            />
          )}

          {activeTab === 'search' && (
            <SearchTab
              searchQuery={searchQuery}
              isSearching={isSearching}
              searchResults={searchResults}
              recentSearches={recentSearches}
              onSearch={handleSearch}
              onRemoveRecentSearch={removeRecentSearch}
              handleSelectDeal={setSelectedDeal}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistTab
              wishlistDeals={wishlistDeals}
              toggleWishlist={toggleWishlist}
              handleSelectDeal={setSelectedDeal}
            />
          )}

          {activeTab === 'community' && (
            <CommunityTab
              posts={filteredPosts}
              filter={communityFilter}
              setFilter={setCommunityFilter}
              setSelectedPost={setSelectedPost}
              setIsWriteModalOpen={() => user ? setIsWriteModalOpen(true) : setShowLogin(true)}
              isLoadingPosts={isLoadingPosts}
            />
          )}
        </main>

        <Footer onOpenLegal={setShowLegal} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Modals */}
        {selectedDeal && (
          <DealDetailModal
            deal={selectedDeal}
            onClose={() => setSelectedDeal(null)}
            onToast={addToast}
          />
        )}
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
          />
        )}
        {showMyPage && (
          <MyPageModal
            user={user}
            onClose={() => setShowMyPage(false)}
            onLogout={handleLogout}
          />
        )}
        {showLegal && (
          <LegalModal
            type={showLegal}
            onClose={() => setShowLegal(null)}
          />
        )}
        {activeTab === 'community' && isWriteModalOpen && (
          <WritePostModal
            onClose={() => setIsWriteModalOpen(false)}
            onToast={addToast}
          />
        )}
        {activeTab === 'community' && selectedPost && (
          <CommunityPostModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onToast={addToast}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
