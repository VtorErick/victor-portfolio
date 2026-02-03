"use client"

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useLanguageContext } from '@/contexts/LanguageContext';

const Giscus = dynamic(() => import('@giscus/react'), {
    ssr: false,
    loading: () => <div className="mt-16 pt-8 border-t border-[var(--border)] text-[var(--foreground)]/60">Loading comments...</div>
});

export default function Comments() {
    const { language } = useLanguageContext();

    return (
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <h3 className="text-2xl font-bold mb-8 text-[var(--foreground)]">
                {language === 'es' ? 'Comentarios' : 'Comments'}
            </h3>
            <Suspense fallback={<div className="text-[var(--foreground)]/60">Loading comments...</div>}>
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
                    theme="dark"
                    lang={language}
                    loading="lazy"
                />
            </Suspense>
        </div>
    );
}
