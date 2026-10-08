export const SITE_TITLE = "AI Tips";
export const SITE_DESCRIPTION = "AI 使用技巧合集 - MCP 工具、提示词、工作流、模型经验与实战案例";
export const SITE_URL = "https://jackzhuo2019.github.io";

export const CATEGORIES = [
  { slug: "mcp", label: "MCP 工具", description: "windows-mcp 及其他 MCP server 使用技巧" },
  { slug: "prompt", label: "提示词", description: "prompt engineering 技巧与心得" },
  { slug: "workflow", label: "工作流", description: "自动化与多步编排经验" },
  { slug: "model", label: "模型经验", description: "各家模型特性与使用心得" },
  { slug: "case", label: "实战案例", description: "真实场景的完整应用" },
];

export const CATEGORY_MAP: Record<string, { slug: string; label: string; description: string }> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);
