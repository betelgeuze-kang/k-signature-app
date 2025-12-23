export const SkeletonHero = () => (
    <div className="relative h-[450px] sm:h-[500px] w-full flex items-center justify-center">
        <div className="w-[280px] sm:w-[350px] h-[400px] sm:h-[480px] rounded-3xl bg-bg-secondary border border-border-main animate-pulse overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-t from-[#231B3A] to-bg-secondary"></div>
        </div>
    </div>
);

export const SkeletonCard = () => (
    <div className="min-w-[200px] sm:min-w-[240px] flex flex-col gap-3">
        <div className="aspect-[4/5] rounded-[24px] bg-bg-secondary border border-border-main animate-pulse relative overflow-hidden"></div>
        <div className="px-1 space-y-2">
            <div className="h-5 bg-bg-secondary rounded w-3/4 animate-pulse"></div>
        </div>
    </div>
);
