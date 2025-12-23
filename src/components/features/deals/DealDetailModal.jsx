import { useState, useRef, useEffect } from 'react';
import { X, Share2, TrendingDown, Flame, ThumbsUp, ThumbsDown, BarChart3, Star, ExternalLink } from 'lucide-react';
import { useBodyScrollLock, useFocusTrap } from '../../../hooks';
import { handleImageError, formatPrice, shareContent, generatePriceHistory } from '../../../utils';
import confetti from 'canvas-confetti';

export const DealDetailModal = ({ deal, onClose, onToast }) => {
    useBodyScrollLock();
    const modalRef = useRef(null);
    useFocusTrap(modalRef, true);
    const [chartVisible, setChartVisible] = useState(false);
    const [tab, setTab] = useState("analysis");
    useEffect(() => setTimeout(() => setChartVisible(true), 100), []);
    useEffect(() => {
        const handlePopState = () => onClose();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);
    if (!deal) return null;
    const history = generatePriceHistory(deal.price);
    const minVal = Math.min(...history.map((h) => h.price));
    const maxVal = Math.max(...history.map((h) => h.price));
    const totalVotes = (deal.buyVotes || 0) + (deal.dontBuyVotes || 0);
    const buyPercentage =
        totalVotes > 0 ? Math.round((deal.buyVotes / totalVotes) * 100) : 50;
    const handleShare = async () => {
        const result = await shareContent(
            deal.title,
            `[K/SIGNATURE] ${deal.title} - ${deal.discount}% 할인 중!`,
            window.location.href
        );
        if (result === "copied") onToast("🔗 링크가 복사되었습니다.");
        else if (result === true) onToast("🚀 공유창을 열었습니다.");
    };
    const handleBuy = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#C4B5FD", "#EC4899", "#2DD4BF", "#FAFAFA"],
        });
        setTimeout(() => window.open("#", "_blank"), 800);
    };
    const reviews = [
        {
            user: "테크충",
            rating: 5,
            text: "배송 진짜 빠르고 상태 너무 좋습니다.",
        },
        {
            user: "얼리어답터",
            rating: 4,
            text: "가성비 최고네요. 고민은 배송만 늦출 뿐.",
        },
        {
            user: "지나가던행인",
            rating: 5,
            text: "역시 믿고 사는 K/SIGNATURE 큐레이션!",
        },
    ];
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            ref={modalRef}
        >
            <div
                className="absolute inset-0 bg-bg-main/90 backdrop-blur-xl"
                onClick={onClose}
            ></div>
            <div className="relative w-full max-w-2xl bg-bg-secondary border border-border-main rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <button
                    onClick={onClose}
                    aria-label="닫기"
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white z-20"
                >
                    <X className="w-6 h-6" />
                </button>
                <button
                    onClick={handleShare}
                    aria-label="공유하기"
                    className="absolute top-4 right-16 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white z-20"
                >
                    <Share2 className="w-6 h-6" />
                </button>
                <div className="overflow-y-auto scrollbar-hide flex-1">
                    <div className="relative h-64 sm:h-72">
                        <img
                            src={deal.imageUrl}
                            alt={deal.title}
                            loading="lazy"
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className="flex gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded bg-accent-purple text-bg-main text-xs font-bold">
                                    {deal.mall}
                                </span>
                                {deal.lowestPrice && (
                                    <span className="px-2 py-0.5 rounded bg-accent-teal text-bg-main text-xs font-bold flex items-center gap-1">
                                        <TrendingDown className="w-3 h-3" /> 최저가
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {deal.title}
                            </h2>
                        </div>
                    </div>
                    <div className="flex border-b border-border-main">
                        <button
                            onClick={() => setTab("analysis")}
                            className={`flex-1 py-3 text-sm font-bold transition-colors ${tab === "analysis"
                                    ? "text-accent-purple border-b-2 border-accent-purple"
                                    : "text-gray-500"
                                }`}
                        >
                            가격 분석
                        </button>
                        <button
                            onClick={() => setTab("review")}
                            className={`flex-1 py-3 text-sm font-bold transition-colors ${tab === "review"
                                    ? "text-accent-purple border-b-2 border-accent-purple"
                                    : "text-gray-500"
                                }`}
                        >
                            실시간 리뷰
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        {tab === "analysis" ? (
                            <>
                                <section className="bg-[#231B3A] rounded-2xl p-4 border border-border-main flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-bold text-white">
                                        <Flame className="w-5 h-5 text-accent-pink" /> 살까
                                        말까?
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-accent-teal/20 text-accent-teal rounded-lg text-xs font-bold">
                                            <ThumbsUp className="w-4 h-4" /> 산다{" "}
                                            {buyPercentage}%
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-border-main text-gray-300 rounded-lg text-xs font-bold">
                                            <ThumbsDown className="w-4 h-4" /> 안삼{" "}
                                            {100 - buyPercentage}%
                                        </button>
                                    </div>
                                </section>
                                <section>
                                    <div className="flex items-center gap-2 mb-4 text-accent-purple">
                                        <BarChart3 className="w-5 h-5" />
                                        <span className="font-bold text-sm tracking-widest uppercase">
                                            Price History
                                        </span>
                                    </div>
                                    <div className="bg-bg-main border border-border-main rounded-2xl p-5 h-48 flex items-end justify-between gap-2">
                                        {history.map((item, idx) => {
                                            const isMin = item.price === minVal;
                                            const range = maxVal - minVal || 1;
                                            const heightPercent =
                                                ((item.price - minVal) / range) * 60 + 20;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                                                >
                                                    {isMin && (
                                                        <span className="text-[10px] text-accent-teal font-bold">
                                                            LOW
                                                        </span>
                                                    )}
                                                    <div
                                                        className={`w-full rounded-t-sm transition-all duration-1000 ease-out ${isMin
                                                                ? "bg-accent-teal shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                                                                : "bg-border-main group-hover:bg-accent-purple"
                                                            }`}
                                                        style={{
                                                            height: chartVisible
                                                                ? `${heightPercent}%`
                                                                : "0%",
                                                        }}
                                                    ></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            </>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((r, i) => (
                                    <div
                                        key={i}
                                        className="bg-[#231B3A]/30 p-4 rounded-xl border border-white/5"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-sm">{r.user}</span>
                                            <div className="flex text-[#FAE100]">
                                                {[...Array(r.rating)].map((_, k) => (
                                                    <Star
                                                        key={k}
                                                        className="w-3 h-3 fill-current"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-300">{r.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-5 border-t border-border-main bg-bg-main/80 backdrop-blur flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">최종 체감가</span>
                            <span className="text-2xl font-bold text-white">
                                {formatPrice(deal.price)}원
                            </span>
                        </div>
                        <button
                            onClick={handleBuy}
                            className="flex-1 bg-accent-teal hover:bg-[#20bba8] text-bg-main font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            구매하러 가기 <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
