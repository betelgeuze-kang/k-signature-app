import { useState } from 'react';
import { AlertTriangle, ChevronDown, Home, Search, Heart, MessageCircle } from 'lucide-react';

export const Footer = ({ onOpenLegal }) => {
    const [showBusinessInfo, setShowBusinessInfo] = useState(false);
    return (
        <footer className="border-t border-border-main bg-bg-main pt-12 pb-24 mt-12 text-[#9CA3AF] text-xs">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                            K/SIGNATURE
                        </h3>
                        <p className="max-w-xs leading-relaxed">
                            프리미엄 핫딜 큐레이션 서비스.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => onOpenLegal("terms")}
                            className="hover:text-white transition-colors"
                        >
                            이용약관
                        </button>
                        <button
                            onClick={() => onOpenLegal("privacy")}
                            className="hover:text-white font-bold transition-colors"
                        >
                            개인정보처리방침
                        </button>
                        <button
                            onClick={() => onOpenLegal("notice")}
                            className="hover:text-white transition-colors"
                        >
                            법적고지
                        </button>
                        <button className="hover:text-white transition-colors">
                            제휴문의
                        </button>
                    </div>
                </div>
                <div className="border-t border-border-main pt-6 space-y-4">
                    <button
                        onClick={() => setShowBusinessInfo(!showBusinessInfo)}
                        className="flex items-center gap-1 font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        (주)K-Signature 사업자 정보{" "}
                        {showBusinessInfo ? (
                            <ChevronDown className="w-3 h-3 rotate-180" />
                        ) : (
                            <ChevronDown className="w-3 h-3" />
                        )}
                    </button>
                    {showBusinessInfo && (
                        <div className="space-y-1 text-gray-500 animate-in fade-in slide-in-from-top-2">

                            <p>상호명: Gen Z Deal (개인 운영)</p>
                            <p>이메일: contact@genzdeal.com</p>
                            <p>* 현재 비영리/프리랜서 형태로 운영됩니다.</p>
                        </div>
                    )}
                    <div className="bg-bg-secondary p-4 rounded-xl border border-border-main leading-relaxed">
                        <p className="flex items-start gap-2 mb-2 font-bold text-gray-300">
                            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-accent-pink" />{" "}
                            면책 조항 및 법적 고지
                        </p>
                        <p>
                            1. 본 사이트는 통신판매중개자이며, 통신판매의 당사자가
                            아닙니다. 상품의 주문, 배송, 환불 등 거래에 대한 의무와
                            책임은 각 판매처에 있습니다.
                        </p>
                        <p>
                            2. 제공되는 상품 정보는 실시간으로 변동될 수 있으며, 실제
                            판매처의 정보가 우선합니다.
                        </p>
                    </div>
                    <p className="mt-4 opacity-50 text-center">
                        &copy; 2024 Gen Z Midnight Deal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
