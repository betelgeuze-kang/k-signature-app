import { MOCK_DB, CATEGORY_DEALS_MOCK, generateMockDeals } from '../constants';

export const MockApiService = {
    fetchHeroDeals: async (category) =>
        new Promise((r) =>
            setTimeout(
                () => r(MOCK_DB.hero[category] || MOCK_DB.hero["테크"]),
                1000
            )
        ),
    fetchCategoryDeals: async () =>
        new Promise((r) => setTimeout(() => r(CATEGORY_DEALS_MOCK), 1200)),
    fetchMoreDeals: async (category, currentCount) =>
        new Promise((r) =>
            setTimeout(() => {
                r(generateMockDeals(category, 5, currentCount));
            }, 1000)
        ),
    fetchCommunityPosts: async (filter = "전체") =>
        new Promise((r) =>
            setTimeout(() => {
                if (filter === "전체") r(MOCK_DB.posts);
                else r(MOCK_DB.posts.filter((p) => p.category === filter));
            }, 600)
        ),
    submitComment: async (postId, comment) =>
        new Promise((r) =>
            setTimeout(
                () =>
                    r({
                        success: true,
                        newComment: { user: "나", badge: "newbie", text: comment },
                    }),
                500
            )
        ),
    searchDeals: async (query) =>
        new Promise((r) =>
            setTimeout(() => {
                const allDeals = [
                    ...Object.values(MOCK_DB.hero).flat(),
                    ...Object.values(CATEGORY_DEALS_MOCK).flat(),
                ];
                const lowerQuery = query.toLowerCase();
                r(
                    allDeals.filter(
                        (d) =>
                            d.title.toLowerCase().includes(lowerQuery) ||
                            d.mall.toLowerCase().includes(lowerQuery)
                    )
                );
            }, 800)
        ),
};
