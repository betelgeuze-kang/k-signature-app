import { Home, Search, Heart, MessageCircle } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }) => {
    const navItems = [
        { id: "deals", icon: Home, label: "홈" },
        { id: "search", icon: Search, label: "검색" },
        { id: "wishlist", icon: Heart, label: "찜" },
        { id: "community", icon: MessageCircle, label: "톡" },
    ];
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-main/95 backdrop-blur-xl border-t border-border-main flex items-center justify-around z-[90] pb-safe">
            {navItems.map((item) => {
                const isActive =
                    activeTab === item.id ||
                    (item.id === "deals" &&
                        !["search", "wishlist", "community"].includes(activeTab));
                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        aria-label={item.label}
                        className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive
                                ? "text-accent-purple"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        <item.icon
                            className={`w-5 h-5 ${isActive ? "fill-current" : ""}`}
                        />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
