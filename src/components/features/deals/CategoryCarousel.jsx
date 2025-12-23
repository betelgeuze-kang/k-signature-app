import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Monitor } from 'lucide-react';
import { DealGridItem } from './DealGridItem';
import { MockApiService } from '../../../api/mockApi';
import { SkeletonCard } from '../../common/Skeletons';

export const CategoryCarousel = ({
    title,
    categoryId,
    icon: Icon = Monitor,
    deals: initialDeals,
    wishlist,
    onWishlistToggle,
    onSelectDeal,
    isLoading,
}) => {
    const scrollRef = useRef(null);
    const [deals, setDeals] = useState(initialDeals);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    useEffect(() => {
        if (initialDeals) setDeals(initialDeals);
    }, [initialDeals]);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth / 1.5
                    : scrollLeft + clientWidth / 1.5;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };
    const handleScroll = useCallback(async () => {
        if (!scrollRef.current || isLoadingMore || !categoryId) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollWidth - (scrollLeft + clientWidth) < 100) {
            setIsLoadingMore(true);
            const moreDeals = await MockApiService.fetchMoreDeals(
                categoryId,
                deals.length
            );
            setDeals((prev) => [...prev, ...moreDeals]);
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, deals?.length, categoryId]);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.addEventListener("scroll", handleScroll);
        return () => el && el.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (isLoading)
        return (
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6 px-1">
                    <div className="w-6 h-6 bg-border-main rounded-full animate-pulse"></div>
                    <div className="w-32 h-8 bg-border-main rounded animate-pulse"></div>
                </div>
                <div className="flex gap-5 overflow-hidden pb-4 px-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        );
    if (!deals || deals.length === 0) return null;
    return (
        <section className="mb-12 relative group/section">
            <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    {Icon && <Icon className="w-6 h-6 text-accent-purple" />} {title}
                </h2>
            </div>
            <button
                onClick={() => scroll("left")}
                aria-label="이전 상품"
                className="absolute left-[-20px] top-[50%] z-30 w-12 h-12 rounded-full bg-bg-secondary/80 border border-white/10 backdrop-blur-md items-center justify-center text-white hidden md:group-hover/section:flex transition-all hover:bg-white hover:text-black shadow-xl"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={() => scroll("right")}
                aria-label="다음 상품"
                className="absolute right-[-20px] top-[50%] z-30 w-12 h-12 rounded-full bg-bg-secondary/80 border border-white/10 backdrop-blur-md items-center justify-center text-white hidden md:group-hover/section:flex transition-all hover:bg-white hover:text-black shadow-xl"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1 snap-x snap-mandatory"
            >
                {deals.map((deal, idx) => (
                    <div
                        key={`${deal.id}-${idx}`}
                        className="min-w-[200px] sm:min-w-[240px] snap-center"
                    >
                        <DealGridItem
                            deal={deal}
                            onSelectDeal={onSelectDeal}
                            isWishlisted={wishlist.includes(deal.id)}
                            onWishlistToggle={onWishlistToggle}
                        />
                    </div>
                ))}
                {isLoadingMore && (
                    <div className="min-w-[100px] flex items-center justify-center snap-center">
                        <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
                    </div>
                )}
            </div>
        </section>
    );
};
