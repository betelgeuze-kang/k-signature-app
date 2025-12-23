import { Heart } from 'lucide-react';
import { DealGridItem } from './DealGridItem';

export const WishlistTab = ({
    wishlistDeals,
    toggleWishlist,
    handleSelectDeal,
}) => (
    <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-accent-pink" /> 찜한 목록
        </h2>
        {wishlistDeals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-1">
                {wishlistDeals.map((deal) => (
                    <DealGridItem
                        key={deal.id}
                        deal={deal}
                        onSelectDeal={handleSelectDeal}
                        isWishlisted={true}
                        onWishlistToggle={toggleWishlist}
                    />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
                <Heart className="w-12 h-12 stroke-[1.5]" />
                <p>아직 찜한 상품이 없습니다.</p>
            </div>
        )}
    </div>
);
