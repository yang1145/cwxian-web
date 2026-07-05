import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

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

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    title: data.title || pathSegments[pathSegments.length - 1],
    content: processedContent.toString(),
  };
}

export async function getDocContent(slug: string): Promise<MarkdownContent> {
  return getMarkdownContent("docs", `${slug}.md`);
}
