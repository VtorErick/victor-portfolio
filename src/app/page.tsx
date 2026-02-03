import { getAllPosts } from '@/lib/mdx'
import HomeClient from './page-client'

export default function Home() {
  const postsEs = getAllPosts('es')
  const postsEn = getAllPosts('en')

  return <HomeClient postsEs={postsEs} postsEn={postsEn} />
}
