import { useState, useEffect, useLayoutEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue];
};

export const useBodyScrollLock = () => {
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};

export const useFocusTrap = (ref, isActive) => {
    useEffect(() => {
        if (!isActive || !ref.current) return;
        const focusableElements = ref.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const handleTab = (e) => {
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        document.addEventListener("keydown", handleTab);
        firstElement?.focus();
        return () => document.removeEventListener("keydown", handleTab);
    }, [isActive, ref]);
};

export const useImagePreloader = (imageUrls) => {
    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) return;
        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    }, [imageUrls]);
};

export const useMediaQuery = (query) => {
    const getMatches = (query) =>
        typeof window !== "undefined"
            ? window.matchMedia(query).matches
            : false;
    const [matches, setMatches] = useState(getMatches(query));
    useEffect(() => {
        const handleChange = () => setMatches(getMatches(query));
        const matchMedia = window.matchMedia(query);
        matchMedia.addEventListener("change", handleChange);
        return () => matchMedia.removeEventListener("change", handleChange);
    }, [query]);
    return matches;
};
