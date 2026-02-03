"use client"

import { useEffect, useState } from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function Comments() {
    const { language } = useLanguageContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'VtorErick/victor-portfolio');
        script.setAttribute('data-repo-id', 'R_kgDOQNil8g');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'DIC_kwDOQNil8s4C1zIg');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
        script.setAttribute('data-lang', language);
        script.setAttribute('data-loading', 'lazy');
        script.async = true;
        script.crossOrigin = 'anonymous';

        const commentsDiv = document.getElementById('giscus-comments');
        if (commentsDiv) {
            commentsDiv.innerHTML = '';
            commentsDiv.appendChild(script);
        }
    }, [mounted, language]);

    return (
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <h3 className="text-2xl font-bold mb-8 text-[var(--foreground)]">
                {language === 'es' ? 'Comentarios' : 'Comments'}
            </h3>
            <div id="giscus-comments" />
        </div>
    );
}
