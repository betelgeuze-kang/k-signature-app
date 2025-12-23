import { useState, useRef, useEffect } from 'react';
import { Crown, Search, Trash2, Heart, Bell } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';

export const Header = ({
    scrolled,
    onTabChange,
    onSearch,
    searchQuery,
    onWishlist,
    onAlertToggle, // Unused but kept for API consistency if passed
    isAlertOpen,
    setAlertOpen,
    recentSearches,
    onRemoveRecentSearch,
    hasUnreadNoti,
    onOpenMyPage,
}) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchContainerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <header
                className={`w-full max-w-5xl h-16 rounded-full border border-white/5 backdrop-blur-xl bg-bg-main/70 shadow-2xl flex items-center justify-between px-2 pl-6 transition-all duration-500 ${scrolled ? "w-[95%] max-w-7xl" : "max-w-5xl"
                    }`}
            >
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => {
                        onTabChange("deals");
                        onSearch({ target: { value: "" } });
                    }}
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-accent-purple to-[#A78BFA] shadow-[0_0_15px_rgba(196,181,253,0.3)]">
                        <Crown className="w-4 h-4 text-bg-main" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter hidden sm:block">
                        K/<span className="text-accent-purple">SIGNATURE</span>
                    </span>
                </div>
                <div
                    className="flex-1 max-w-md mx-4 hidden md:block group relative"
                    ref={searchContainerRef}
                >
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search brands..."
                            aria-label="상품 검색"
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-white/5 bg-white/5 focus:bg-white/10 focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/30 transition-all text-sm placeholder-gray-500 text-white"
                            value={searchQuery}
                            onChange={onSearch}
                            onFocus={() => setIsSearchFocused(true)}
                        />
                        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500 group-hover:text-accent-purple transition-colors" />
                    </div>
                    {isSearchFocused &&
                        recentSearches &&
                        recentSearches.length > 0 &&
                        !searchQuery && (
                            <div className="absolute top-12 left-0 right-0 bg-bg-secondary border border-border-main rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 z-50">
                                <div className="text-xs text-gray-500 px-3 py-2">
                                    최근 검색어
                                </div>
                                {recentSearches.map((term, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer group/item"
                                    >
                                        <span
                                            onClick={() => {
                                                onSearch({ target: { value: term } });
                                                setIsSearchFocused(false);
                                            }}
                                            className="flex-1 text-sm text-gray-300 hover:text-white"
                                        >
                                            {term}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveRecentSearch(term);
                                            }}
                                            className="text-gray-600 hover:text-[#EF4444] p-1"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
                <div className="flex items-center gap-2 relative">
                    <button
                        className="p-3 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-accent-pink hidden md:block"
                        onClick={onWishlist}
                        aria-label="찜 목록"
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                    <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block"></div>
                    <button
                        className="p-3 rounded-full hover:bg-white/5 transition-colors relative"
                        onClick={() => setAlertOpen(!isAlertOpen)}
                        aria-label="알림"
                    >
                        <Bell className="w-5 h-5 text-gray-300" />
                        {hasUnreadNoti && (
                            <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse"></span>
                        )}
                    </button>
                    {isAlertOpen && (
                        <NotificationPanel onClose={() => setAlertOpen(false)} />
                    )}
                    <button
                        onClick={onOpenMyPage}
                        className="p-1.5 rounded-full border border-white/10 ml-1"
                        aria-label="사용자 프로필"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold">
                            U
                        </div>
                    </button>
                </div>
            </header>
        </div>
    );
};
