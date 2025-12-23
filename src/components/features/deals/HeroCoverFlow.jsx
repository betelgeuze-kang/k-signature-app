import { useState, useEffect } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useMediaQuery, useImagePreloader } from '../../../hooks';
import { handleImageError, formatPrice } from '../../../utils';

export const HeroCoverFlow = ({ deals, onSelectDeal }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isMobile = useMediaQuery("(max-width: 640px)");
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Derived from data, careful with empty array check
    const imageUrls = deals?.length ? deals.slice(0, 3).map((d) => d.imageUrl) : [];
    useImagePreloader(imageUrls);

    useEffect(() => {
        if (deals && deals.length > 0)
            setActiveIndex(Math.floor(deals.length / 2));
    }, [deals]);

    if (!deals || deals.length === 0) return null;

    const handleSelect = (index) => {
        if (index === activeIndex) onSelectDeal(deals[index]);
        else setActiveIndex(index);
    };
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50)
            setActiveIndex((prev) => (prev < deals.length - 1 ? prev + 1 : 0));
        else if (distance < -50)
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : deals.length - 1));
        setTouchStart(0);
        setTouchEnd(0);
    };
    return (
        <div
            className="relative h-[450px] sm:h-[500px] w-full flex items-center justify-center perspective-[1000px] overflow-hidden select-none"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => setTouchStart(e.clientX)}
            onMouseMove={(e) => {
                if (e.buttons === 1) setTouchEnd(e.clientX);
            }}
            onMouseUp={handleTouchEnd}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {deals.map((deal, index) => {
                    const isActive = index === activeIndex;
                    const diff = index - activeIndex;
                    let zIndex = isActive ? 30 : Math.abs(diff) === 1 ? 20 : 10;
                    let opacity = Math.abs(diff) > 1 ? 0 : isActive ? 1 : 0.5;
                    let blur = isActive ? "blur(0px)" : "blur(4px)";
                    let scale = isActive ? 1 : 0.85;
                    let translateX = isActive ? "0%" : diff > 0 ? "60%" : "-60%";
                    if (isMobile && Math.abs(diff) > 0)
                        translateX = diff > 0 ? "90%" : "-90%";
                    return (
                        <div
                            key={deal.id}
                            onClick={() => handleSelect(index)}
                            className="absolute top-0 w-[280px] sm:w-[350px] h-[400px] sm:h-[480px] transition-all duration-500 ease-out cursor-pointer"
                            style={{
                                transform: `translateX(${translateX}) scale(${scale})`,
                                zIndex,
                                opacity,
                                filter: blur,
                                left: "50%",
                                marginLeft: isMobile ? "-140px" : "-175px",
                            }}
                        >
                            <div className="w-full h-full rounded-3xl overflow-hidden relative border border-border-main bg-bg-secondary shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <img
                                    src={deal.imageUrl}
                                    alt={deal.title}
                                    loading={isActive ? "eager" : "lazy"}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-90"></div>
                                <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
                                    <span className="px-2.5 py-1 rounded-full bg-accent-teal text-bg-main text-xs font-bold tracking-wider">
                                        {deal.tag}
                                    </span>
                                    {deal.timeLeft && (
                                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-xs font-medium flex items-center gap-1.5 text-white">
                                            <Clock className="w-3 h-3 text-accent-pink" />{" "}
                                            {deal.timeLeft}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight text-white">
                                        {deal.title}
                                    </h2>
                                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-bold text-accent-teal">
                                                {deal.discount}%
                                            </span>
                                            <span className="text-xl font-medium text-white">
                                                {formatPrice(deal.price)}
                                            </span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
