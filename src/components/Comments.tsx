"use client"

import { useEffect, useRef } from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function Comments() {
    const { language, mounted } = useLanguageContext();
    const scriptLoadedRef = useRef(false);

    // Mount giscus only once, after hydration
    useEffect(() => {
        // Wait for hydration to complete
        if (!mounted) return;
        
        // Check if giscus script is already loaded
        if (scriptLoadedRef.current || document.querySelector('script[data-giscus]')) return;
        
        scriptLoadedRef.current = true;

        const theme = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'dark'
            : 'light';

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';

        script.setAttribute('data-giscus', 'true');
        script.setAttribute('data-repo', 'VtorErick/victor-portfolio');
        script.setAttribute('data-repo-id', 'R_kgDOQNil8g');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'DIC_kwDOQNil8s4C1zIg');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', theme);
        script.setAttribute('data-lang', language);

        const commentsDiv = document.getElementById('giscus-comments');
        if (commentsDiv) {
            commentsDiv.appendChild(script);
        }
    }, [mounted]);

    // Update language and theme without remounting giscus
    useEffect(() => {
        if (!mounted) return;

        const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
        if (!iframe) return;

        const theme = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'dark'
            : 'light';

        iframe.contentWindow?.postMessage(
            {
                giscus: {
                    setConfig: {
                        theme,
                        lang: language,
                    },
                },
            },
            'https://giscus.app'
        );
    }, [language, mounted]);

    return (
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <h3 className="text-2xl font-bold mb-8 text-[var(--foreground)]">
                {language === 'es' ? 'Comentarios' : 'Comments'}
            </h3>
            <div id="giscus-comments" />
        </div>
    );
}
