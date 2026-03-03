import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPost, getPageBlocks } from "@/lib/notion";
import { NotionRenderer } from "@/components/notion-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const t = await getTranslations("blog");

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">← {t("backToBlog")}</Link>
          </Button>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-8">
            {t("publishedOn")}{" "}
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <NotionRenderer blocks={blocks} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
