
import { useBodyScrollLock } from '../../../hooks';
import { X, LogOut, Settings, CreditCard, Bell, HelpCircle } from 'lucide-react';

export const LoginModal = ({ onClose, onLogin }) => {
    useBodyScrollLock();
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-bg-secondary w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-2xl relative text-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent-purple to-accent-pink mx-auto mb-6 flex items-center justify-center text-3xl">
                    👽
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-gray-400 text-sm mb-8">
                    K/SIGNATURE의 모든 기능을 즐겨보세요.
                </p>
                <button
                    onClick={onLogin}
                    className="w-full bg-[#FEE500] text-black font-bold py-3.5 rounded-xl mb-3 flex items-center justify-center gap-2 hover:bg-[#FDD835] transition-colors"
                >
                    카카오로 3초 만에 시작하기
                </button>
                <button
                    onClick={onLogin}
                    className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                    Google로 계속하기
                </button>
            </div>
        </div>
    );
};

export const MyPageModal = ({ user, onClose, onLogout }) => {
    useBodyScrollLock();
    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div className="relative w-full max-w-md bg-bg-secondary h-full shadow-2xl p-6 animate-in slide-in-from-right duration-300 border-l border-white/10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">마이페이지</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 text-gray-500 hover:text-white" />
                    </button>
                </div>
                <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink p-0.5">
                        <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center overflow-hidden">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                alt="avatar"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{user?.name || "User"}</h3>
                        <span className="px-2 py-0.5 rounded bg-accent-purple/20 text-accent-purple text-xs font-bold border border-accent-purple/20">
                            VIP MEMBER
                        </span>
                    </div>
                </div>
                <div className="space-y-2">
                    {[
                        { label: "알림 설정", icon: Bell },
                        { label: "결제 관리", icon: CreditCard },
                        { label: "고객 센터", icon: HelpCircle },
                        { label: "앱 설정", icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors text-left group"
                        >
                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent-purple/20 group-hover:text-accent-purple transition-colors">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            onLogout();
                            onClose();
                        }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-red-500/10 rounded-xl transition-colors text-left group mt-8"
                    >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-red-500/20 group-hover:text-red-500 transition-colors">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-300 group-hover:text-red-500 transition-colors">
                            로그아웃
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const LegalModal = ({ type, onClose }) => {
    useBodyScrollLock();
    const content = {
        terms: {
            title: "이용약관",
            body: "제 1조 (목적) 본 약관은 K/SIGNATURE 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다...",
        },
        privacy: {
            title: "개인정보처리방침",
            body: "회사는 이용자의 개인정보를 중요시하며, '정보통신망 이용촉진 및 정보보호'에 관한 법률을 준수합니다...",
        },
        notice: {
            title: "법적고지",
            body: "본 서비스에서 제공하는 상품 정보는 통신판매중개자로서의 정보이며, 실제 판매 당사자는 아닙니다...",
        },
    }[type] || { title: "", body: "" };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-bg-secondary w-full max-w-lg rounded-2xl p-6 border border-border-main shadow-2xl relative max-h-[80vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold mb-4">{content.title}</h2>
                <div className="flex-1 overflow-y-auto text-sm text-gray-400 leading-relaxed p-2 bg-black/20 rounded-xl">
                    {content.body}
                    {/* Mock long content */}
                    <br />
                    <br />
                    (이하 생략 - 상세 내용은 법적 검토가 필요합니다.)
                    <div className="h-40"></div>
                </div>
                <button
                    onClick={onClose}
                    className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors"
                >
                    확인
                </button>
            </div>
        </div>
    );
};
