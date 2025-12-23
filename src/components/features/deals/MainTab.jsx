import { SkeletonHero } from '../../common/Skeletons';
import { HeroCoverFlow } from './HeroCoverFlow';
import { CategoryCarousel } from './CategoryCarousel';
import { SlidersHorizontal, Monitor } from 'lucide-react';

export const MainTab = ({
    activeDropTab,
    setActiveDropTab,
    isLoadingHero,
    heroData,
    handleSelectDeal,
    sortBy,
    setSortBy,
    categoryDeals,
    wishlist,
    toggleWishlist,
    isLoadingCategory,
    getSortedDeals,
}) => (
    <>
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-1 gap-4">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight italic">
                    WEEKLY{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal">
                        DROPS
                    </span>
                </h1>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {["테크", "패션", "리빙", "게이밍", "이벤트", "기타"].map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveDropTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${activeDropTab === tab
                                        ? "bg-[#FAFAFA] text-black border-transparent shadow"
                                        : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {tab}
                            </button>
                        )
                    )}
                </div>
            </div>
            {isLoadingHero ? (
                <SkeletonHero />
            ) : (
                <HeroCoverFlow deals={heroData} onSelectDeal={handleSelectDeal} />
            )}
        </div>
        <div className="flex justify-end mb-4 px-2">
            <div className="relative inline-block">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-bg-secondary border border-border-main text-white py-2 pl-4 pr-10 rounded-xl text-xs font-bold focus:outline-none focus:border-accent-purple"
                >
                    <option value="recommend">추천순</option>
                    <option value="price_asc">낮은 가격순</option>
                    <option value="price_desc">높은 가격순</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <SlidersHorizontal className="w-4 h-4" />
                </div>
            </div>
        </div>
        {["tech", "fashion", "living", "gaming", "event", "etc"].map(
            (cat) => (
                <CategoryCarousel
                    key={cat}
                    title={cat.charAt(0).toUpperCase() + cat.slice(1)}
                    categoryId={cat}
                    icon={Monitor}
                    deals={getSortedDeals(categoryDeals[cat])}
                    wishlist={wishlist}
                    onWishlistToggle={toggleWishlist}
                    onSelectDeal={handleSelectDeal}
                    isLoading={isLoadingCategory}
                />
            )
        )}
    </>
);
