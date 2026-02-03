import { Post } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'
import BlogPost from '@/components/BlogPost'

interface BlogPostWrapperProps {
    postEs: Post
    postEn: Post
}

export async function BlogPostWrapper({ postEs, postEn }: BlogPostWrapperProps) {
    // Pre-render MDX content on the server
    // This prevents hydration mismatch issues
    const mdxContentEs = await MDXContent({ content: postEs.content })
    const mdxContentEn = await MDXContent({ content: postEn.content })

    return (
        <BlogPost 
            postEs={postEs} 
            postEn={postEn}
            mdxContentEs={mdxContentEs}
            mdxContentEn={mdxContentEn}
        />
    )
}
