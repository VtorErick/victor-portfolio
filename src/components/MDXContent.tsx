import { MDXRemote } from 'next-mdx-remote/rsc'

interface MDXContentProps {
    content: string
}

const components = {
}

export async function MDXContent({ content }: MDXContentProps) {
    return (
        <div className="prose prose-lg dark:prose-invert prose-headings:text-[var(--foreground)] prose-a:text-[var(--link)] prose-strong:text-[var(--foreground)] text-[var(--foreground)]/80 max-w-none">
            <MDXRemote source={content} components={components} />
        </div>
    )
}
