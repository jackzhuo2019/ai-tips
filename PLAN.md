# AI Tips - AI 使用技巧分享站

## 目标
面向公众的 AI 使用技巧内容站，持续更新，支持评论和订阅，便于传播分享。

## 技术栈
- **框架**: Astro (静态站点生成器)
- **样式**: Tailwind CSS
- **评论**: Giscus (基于 GitHub Discussions)
- **订阅**: RSS feed (邮件订阅后期再加)
- **部署**: Vercel / Cloudflare Pages

## 内容结构

### 分类
1. MCP 工具 — windows-mcp 及其他 MCP server 使用技巧
2. 提示词 — prompt engineering 技巧
3. 工作流 — 自动化、多步编排经验
4. 模型经验 — 各家模型特性与使用心得
5. 实战案例 — 真实场景的完整应用

### 文章 frontmatter

    title: 文章标题
    category: 分类名
    tags: [标签1, 标签2]
    difficulty: 入门 | 进阶 | 高阶
    date: 2026-09-26
    cover: 封面图路径 (可选)
    description: 摘要

## 页面规划
1. **首页** — 站点介绍 + 分类入口 + 最新技巧列表 + 搜索
2. **分类页** — 按分类浏览所有技巧
3. **文章页** — 正文 + 标签 + 相关技巧 + 评论区
4. **标签页** — 按标签聚合
5. **关于页** — 站点说明

## 功能清单
- [x] Markdown 内容写作 (Content Collections)
- [x] 分类 / 标签 / 搜索
- [x] Giscus 评论
- [x] RSS 订阅
- [x] SEO (sitemap, meta, Open Graph)
- [ ] 邮件订阅 (后期)
- [ ] 暗色主题切换

## 目录结构

    ai-tips/
    ├── src/
    │   ├── content/
    │   │   └── tips/           # 技巧文章 (Markdown)
    │   ├── layouts/
    │   │   └── TipLayout.astro  # 文章页布局
    │   ├── components/
    │   │   ├── Header.astro
    │   │   ├── Footer.astro
    │   │   ├── TipCard.astro
    │   │   ├── CategoryNav.astro
    │   │   └── Comments.astro
    │   ├── pages/
    │   │   ├── index.astro      # 首页
    │   │   ├── tips/
    │   │   │   └── [...slug].astro  # 文章页
    │   │   ├── category/
    │   │   │   └── [category].astro  # 分类页
    │   │   ├── tags/
    │   │   │   └── index.astro  # 标签索引
    │   │   ├── about.astro      # 关于页
    │   │   └── rss.xml.js       # RSS feed
    │   └── styles/
    │       └── global.css
    ├── public/
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── package.json
    └── PLAN.md

## 推进步骤
1. 初始化 Astro 项目 + Tailwind
2. 搭建布局组件 (Header, Footer, 布局)
3. 配置 Content Collections + 写第一篇示范文章 (windows-mcp)
4. 首页 + 分类页 + 文章页 + 标签页
5. 接 Giscus 评论 + RSS
6. SEO 配置 (sitemap, Open Graph)
7. 样式打磨
