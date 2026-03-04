import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID ?? "";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
}

function getPropertyValue(
  properties: PageObjectResponse["properties"],
  key: string,
  type: "title" | "rich_text" | "date" | "multi_select" | "files" | "url" | "select"
): string | string[] | null {
  const prop = properties[key];
  if (!prop) return null;

  switch (type) {
    case "title":
      if (prop.type === "title") {
        return prop.title.map((t) => t.plain_text).join("");
      }
      break;
    case "rich_text":
      if (prop.type === "rich_text") {
        return prop.rich_text.map((t) => t.plain_text).join("");
      }
      break;
    case "date":
      if (prop.type === "date" && prop.date) {
        return prop.date.start;
      }
      break;
    case "multi_select":
      if (prop.type === "multi_select") {
        return prop.multi_select.map((s) => s.name);
      }
      break;
    case "url":
      if (prop.type === "url") {
        return prop.url ?? null;
      }
      break;
    case "select":
      if (prop.type === "select" && prop.select) {
        return prop.select.name;
      }
      break;
  }
  return null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!BLOG_DATABASE_ID) return [];

  try {
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Published",
          direction: "descending",
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const properties = page.properties;
        const title =
          (getPropertyValue(properties, "Title", "title") as string) || "Untitled";
        const slug =
          (getPropertyValue(properties, "Slug", "rich_text") as string) || page.id;
        const excerpt =
          (getPropertyValue(properties, "Excerpt", "rich_text") as string) || "";
        const publishedAt =
          (getPropertyValue(properties, "Published", "date") as string) ||
          new Date().toISOString();
        const tags =
          (getPropertyValue(properties, "Tags", "multi_select") as string[]) || [];
        const coverImage =
          (getPropertyValue(properties, "Cover", "url") as string) || undefined;

        return { id: page.id, slug, title, excerpt, coverImage, publishedAt, tags };
      });
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!BLOG_DATABASE_ID) return null;

  try {
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: { equals: slug },
          },
          {
            property: "Status",
            select: { equals: "Published" },
          },
        ],
      },
    });

    const page = response.results.find(
      (p): p is PageObjectResponse => "properties" in p
    );
    if (!page) return null;

    const properties = page.properties;
    const title =
      (getPropertyValue(properties, "Title", "title") as string) || "Untitled";
    const excerpt =
      (getPropertyValue(properties, "Excerpt", "rich_text") as string) || "";
    const publishedAt =
      (getPropertyValue(properties, "Published", "date") as string) ||
      new Date().toISOString();
    const tags =
      (getPropertyValue(properties, "Tags", "multi_select") as string[]) || [];
    const coverImage =
      (getPropertyValue(properties, "Cover", "url") as string) || undefined;

    return { id: page.id, slug, title, excerpt, coverImage, publishedAt, tags };
  } catch {
    return null;
  }
}

export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results.filter(
      (block): block is BlockObjectResponse => "type" in block
    );
  } catch {
    return [];
  }
}
