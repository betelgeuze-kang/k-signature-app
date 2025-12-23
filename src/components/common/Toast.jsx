import { CheckCircle2 } from 'lucide-react';

export const ToastContainer = ({ toasts }) => (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
        {toasts.map((t) => (
            <div
                key={t.id}
                className="pointer-events-auto bg-bg-secondary/90 backdrop-blur-md border border-accent-purple/30 text-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex items-center gap-3 animate-in slide-in-from-top-2 fade-in duration-300"
            >
                <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                <span className="text-sm font-medium">{t.message}</span>
            </div>
        ))}
    </div>
);
