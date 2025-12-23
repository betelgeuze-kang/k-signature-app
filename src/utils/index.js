
export const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
        "https://via.placeholder.com/400x500/18122B/888888?text=K/SIGNATURE";
};

export const formatPrice = (price) =>
    new Intl.NumberFormat("ko-KR").format(price);

export const formatCompactNumber = (num) =>
    new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(num);

export const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes("전")) return dateStr;
    const date = new Date(dateStr);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "년 전";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "개월 전";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "일 전";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "시간 전";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "분 전";
    return "방금 전";
};

export const shareContent = async (title, text, url) => {
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            return true;
        } catch (err) {
            return false;
        }
    } else {
        try {
            await navigator.clipboard.writeText(url);
            return "copied";
        } catch (err) {
            return false;
        }
    }
};

export const generatePriceHistory = (basePrice) => {
    const variation = basePrice * 0.1;
    return [
        { month: "5월", price: Math.floor(basePrice + variation * 1.2) },
        { month: "6월", price: Math.floor(basePrice + variation * 0.8) },
        { month: "7월", price: Math.floor(basePrice - variation * 0.5) },
        { month: "8월", price: Math.floor(basePrice + variation * 0.2) },
        { month: "9월", price: Math.floor(basePrice - variation * 1.5) },
        { month: "10월", price: Math.floor(basePrice + variation * 0.5) },
        { month: "11월", price: basePrice },
    ];
};
