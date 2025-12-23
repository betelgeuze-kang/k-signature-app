import { Search } from 'lucide-react';
import { DealGridItem } from './DealGridItem';

export const SearchTab = ({
    searchQuery,
    isSearching,
    searchResults,
    recentSearches,
    onSearch,
    onRemoveRecentSearch,
    handleSelectDeal,
    wishlist,
    toggleWishlist,
}) => (
    <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Search className="w-6 h-6 text-accent-purple" />
            {searchQuery ? `'${searchQuery}' 검색 결과` : "검색"}
        </h2>
        {!searchQuery && recentSearches.length > 0 && (
            <div className="mb-8">
                <h3 className="text-sm text-gray-400 font-bold mb-3">최근 검색어</h3>
                <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                        >
                            <span onClick={() => onSearch({ target: { value: term } })}>
                                {term}
                            </span>
                            <button
                                onClick={() => onRemoveRecentSearch(term)}
                                className="hover:text-red-400"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        )}
        {isSearching ? (
            <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-2 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map((deal) => (
                    <DealGridItem
                        key={deal.id}
                        deal={deal}
                        onSelectDeal={handleSelectDeal}
                        isWishlisted={wishlist.includes(deal.id)}
                        onWishlistToggle={toggleWishlist}
                    />
                ))}
            </div>
        ) : searchQuery ? (
            <div className="text-center py-20 text-gray-500">
                검색 결과가 없습니다.
            </div>
        ) : null}
    </div>
);
