import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const contentDirectory = join(process.cwd(), "content");

export interface MarkdownContent {
  title: string;
  content: string;
}

export async function getMarkdownContent(
  ...pathSegments: string[]
): Promise<MarkdownContent> {
  const filePath = join(contentDirectory, ...pathSegments);
  const fileContents = readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "链接到此标题",
      },
      content: {
        type: "element",
        tagName: "span",
        properties: { className: ["anchor-icon"], ariaHidden: true },
        children: [{ type: "text", value: "#" }],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    title: data.title || pathSegments[pathSegments.length - 1],
    content: processedContent.toString(),
  };
}

export async function getDocContent(slug: string): Promise<MarkdownContent> {
  return getMarkdownContent("docs", `${slug}.md`);
}
