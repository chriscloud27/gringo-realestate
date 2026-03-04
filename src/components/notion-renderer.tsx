import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface RichTextItem {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    code: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  href: string | null;
}

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
}

function RichText({ richText }: { richText: RichTextItem[] }) {
  return (
    <>
      {richText.map((text, i) => {
        const { bold, italic, code, strikethrough, underline } = text.annotations;

        // Apply inline annotations sequentially, innermost first
        let content: React.ReactNode = text.plain_text;
        if (underline) content = <u>{content}</u>;
        if (strikethrough) content = <del>{content}</del>;
        if (italic) content = <em>{content}</em>;
        if (bold) content = <strong>{content}</strong>;
        if (code) content = <code className="bg-gray-100 px-1 rounded text-sm font-mono">{content}</code>;
        if (text.href) {
          content = (
            <a href={text.href} className="text-emerald-700 hover:underline" target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          );
        }

        return <span key={i}>{content}</span>;
      })}
    </>
  );
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id}>
                <RichText richText={block.paragraph.rich_text as RichTextItem[]} />
              </p>
            );
          case "heading_1":
            return (
              <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">
                <RichText richText={block.heading_1.rich_text as RichTextItem[]} />
              </h1>
            );
          case "heading_2":
            return (
              <h2 key={block.id} className="text-2xl font-semibold mt-6 mb-3">
                <RichText richText={block.heading_2.rich_text as RichTextItem[]} />
              </h2>
            );
          case "heading_3":
            return (
              <h3 key={block.id} className="text-xl font-semibold mt-4 mb-2">
                <RichText richText={block.heading_3.rich_text as RichTextItem[]} />
              </h3>
            );
          case "bulleted_list_item":
            return (
              <li key={block.id}>
                <RichText richText={block.bulleted_list_item.rich_text as RichTextItem[]} />
              </li>
            );
          case "numbered_list_item":
            return (
              <li key={block.id}>
                <RichText richText={block.numbered_list_item.rich_text as RichTextItem[]} />
              </li>
            );
          case "quote":
            return (
              <blockquote key={block.id} className="border-l-4 border-emerald-700 pl-4 italic text-gray-700">
                <RichText richText={block.quote.rich_text as RichTextItem[]} />
              </blockquote>
            );
          case "code":
            return (
              <pre key={block.id} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>
                  <RichText richText={block.code.rich_text as RichTextItem[]} />
                </code>
              </pre>
            );
          case "divider":
            return <hr key={block.id} className="my-8" />;
          case "image": {
            const imgSrc = block.image.type === "external"
              ? block.image.external.url
              : block.image.file.url;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={block.id}
                src={imgSrc}
                alt="Blog image"
                className="rounded-lg w-full my-6"
              />
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
