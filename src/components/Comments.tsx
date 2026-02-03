"use client"

import Giscus from '@giscus/react';
import { useUIContext } from '@/contexts/UIContext';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function Comments() {
    const { language } = useLanguageContext();

    // Dynamic theme based on system/toggle could be complex, sticking to a safe default or checking class
    // For simplicity, we can let Giscus inherit or be specific.
    // Ideally, communicate with ThemeContext if available to toggle light/dark_dimmed.

    return (
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <h3 className="text-2xl font-bold mb-8 text-[var(--foreground)]">
                {language === 'es' ? 'Comentarios' : 'Comments'}
            </h3>
            <Giscus
                id="comments"
                repo="VtorErick/victor-portfolio"
                repoId="R_kgDOQNil8g"
                category="General"
                categoryId="DIC_kwDOQNil8s4C1zIg"
                mapping="pathname"
                term="Welcome to my blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="transparent_dark"
                lang={language}
                loading="lazy"
            />
        </div>
    );
}
