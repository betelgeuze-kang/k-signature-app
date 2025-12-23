
import React from 'react';
import { Heart } from 'lucide-react';
import { handleImageError, formatPrice } from '../../../utils';

export const DealGridItem = React.memo(
    ({ deal, onSelectDeal, isWishlisted, onWishlistToggle }) => (
        <div
            onClick={() => onSelectDeal(deal)}
            className="group relative flex flex-col gap-3 cursor-pointer"
        >
            <div className="aspect-[4/5] rounded-[24px] overflow-hidden relative bg-bg-secondary border border-white/5 group-hover:border-accent-purple/50 transition-all duration-300">
                <img
                    src={deal.imageUrl}
                    alt={deal.title}
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                        {deal.mall}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        const btn = e.currentTarget;
                        btn.classList.add("animate-heartBounce");
                        setTimeout(
                            () => btn.classList.remove("animate-heartBounce"),
                            400
                        );
                        onWishlistToggle(e, deal.id);
                    }}
                    aria-label="찜하기"
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-20 ${isWishlisted
                            ? "bg-white text-accent-pink"
                            : "bg-black/20 text-white hover:bg-white hover:text-accent-pink border border-white/10"
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                    />
                </button>
            </div>
            <div className="px-1">
                <h3 className="font-bold text-lg leading-snug line-clamp-1 group-hover:text-accent-purple transition-colors">
                    {deal.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                    <div className="text-xl font-bold text-text-main">
                        {formatPrice(deal.price)}
                    </div>
                    <div className="text-sm font-bold text-accent-pink">
                        {deal.discount}%
                    </div>
                </div>
            </div>
        </div>
    )
);
