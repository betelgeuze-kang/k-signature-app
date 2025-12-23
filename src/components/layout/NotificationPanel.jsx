import { BellRing, X, TrendingDown, Gift } from 'lucide-react';
import { MY_KEYWORDS } from '../../constants';

export const NotificationPanel = ({ onClose }) => (
    <div className="absolute top-16 right-0 w-80 bg-bg-secondary border border-border-main rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-border-main flex items-center justify-between bg-[#231B3A]/50">
            <h3 className="font-bold text-white flex items-center gap-2">
                <BellRing className="w-4 h-4 text-accent-pink" /> 알림 센터
            </h3>
            <button onClick={onClose}>
                <X className="w-4 h-4 text-gray-500 hover:text-white" />
            </button>
        </div>
        <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-1">
                <div className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-teal/20 text-accent-teal flex items-center justify-center shrink-0">
                            <TrendingDown className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-200 font-medium leading-snug group-hover:text-accent-purple transition-colors">
                                찜한 'iPad Air 5' 가격이 5% 하락했습니다!
                            </p>
                            <span className="text-[10px] text-gray-500 mt-1 block">
                                방금 전
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-pink/20 text-accent-pink flex items-center justify-center shrink-0">
                            <Gift className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-200 font-medium leading-snug group-hover:text-accent-purple transition-colors">
                                VIP 등급 달성 축하 쿠폰이 도착했어요 🎉
                            </p>
                            <span className="text-[10px] text-gray-500 mt-1 block">
                                1시간 전
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-border-main">
                <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                    My Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                    {MY_KEYWORDS.map((k) => (
                        <span
                            key={k}
                            className="px-2.5 py-1 rounded-md bg-[#231B3A] border border-white/10 text-xs text-gray-300 flex items-center gap-1.5 hover:border-accent-pink transition-colors"
                        >
                            {k}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
