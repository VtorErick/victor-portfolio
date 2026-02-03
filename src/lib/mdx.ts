import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content')

export type Post = {
    slug: string
    meta: {
        title: string
        date: string
        excerpt: string
        tags?: string[]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
    content: string
}

export function getPostBySlug(slug: string, lang: 'es' | 'en' = 'es'): Post | undefined {
    try {
        const realSlug = slug.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, lang, `${realSlug}.mdx`)

        if (!fs.existsSync(fullPath)) {
            return undefined
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            meta: data as Post['meta'],
            content
        }
    } catch {
        return undefined
    }
}

export function getAllPosts(lang: 'es' | 'en' = 'es'): Post[] {
    const langDirectory = path.join(postsDirectory, lang)

    if (!fs.existsSync(langDirectory)) {
        return []
    }

    const files = fs.readdirSync(langDirectory)
    const posts = files.map((file) => {
        const slug = file.replace(/\.mdx$/, '')
        return getPostBySlug(slug, lang)
    }).filter((post): post is Post => post !== undefined)

    // Sort posts by date
    return posts.sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1))
}
