---
title: "prompts.chat：全球最大的开源 AI 提示词库，143k+ Star"
description: "prompts.chat（原 Awesome ChatGPT Prompts）是全世界最大的开源 AI 提示词库，143k+ GitHub Star，GitHub Staff Pick，支持 ChatGPT/Claude/Gemini/Llama 等主流模型，提供 CLI、MCP Server、Claude 插件集成，可自托管部署。项目地址：https://github.com/f/prompts.chat"
category: "prompt"
tags: ["prompts.chat", "提示词", "Prompt Engineering", "开源", "MCP", "ChatGPT"]
difficulty: "入门"
date: 2026-10-09
---

## 项目介绍

prompts.chat（原名 Awesome ChatGPT Prompts）是全球最大的开源 AI 提示词库，143k+ GitHub Star，GitHub Staff Pick。2022 年 12 月创建，是互联网上第一个 prompt library，被 Forbes 报道，Harvard、Columbia 引用，获得 40+ 学术引用，Hugging Face 上最受好评的数据集。

项目地址：[https://github.com/f/prompts.chat](https://github.com/f/prompts.chat)

它最初是为 ChatGPT 整理的提示词合集，随 GitHub Star 数飙升成为现象级项目后，逐步扩展为一个完整的提示词平台：提供在线浏览网站、交互式 Prompt Engineering 教程书、儿童 AI 互动教学游戏，支持自托管部署和通过 CLI / MCP Server / Claude 插件集成到工作流中。所有提示词以 CC0 公共领域协议发布，可以随意使用。

## 核心功能

### 1. 海量提示词库

收录数百条经过社区验证的提示词，覆盖各种角色设定和任务场景：翻译官、面试官、编程助手、写作教练、心理咨询师、英语口语伙伴等。每条提示词都是一个角色描述（"Act as X"），直接复制即可使用。所有提示词兼容 ChatGPT、Claude、Gemini、Llama、Mistral 等主流模型。

### 2. 在线浏览与搜索

prompts.chat 网站提供可视化的提示词浏览界面，支持搜索和筛选，比直接读 Markdown 文件体验好很多。社区贡献的新提示词会自动同步到 GitHub 仓库。

### 3. 交互式 Prompt Engineering 教程

28+ 章节的免费交互式教程，从提示词基础到高级技巧全覆盖：

- 提示词基本原理
- Chain-of-thought 推理
- Few-shot learning
- AI Agent 概念
- 结构化输出控制

适合从零开始系统学习 prompt engineering。

### 4. 儿童互动教学（Prompting for Kids）

面向 8-14 岁儿童的交互式游戏化课程，通过解谜和故事教孩子如何与 AI 对话。这是一个很特别的功能，AI 教育从娃娃抓起。

### 5. 多种集成方式

| 集成方式 | 说明 |
|---|---|
| CLI | `npx prompts.chat` 直接在终端查询提示词 |
| Claude Code 插件 | 通过插件市场安装，在 Claude Code 中使用 |
| MCP Server | 作为 MCP Server 接入任意支持 MCP 的工具 |

MCP Server 配置示例：

```json
{
  "mcpServers": {
    "prompts.chat": {
      "url": "https://prompts.chat/api/mcp"
    }
  }
}
```

### 6. 自托管部署

可以部署自己的私有提示词库，支持自定义品牌、主题和身份认证（GitHub / Google / Azure AD）：

```bash
# 快速创建
npx prompts.chat new my-prompt-library
cd my-prompt-library

# 或手动安装
git clone https://github.com/f/prompts.chat.git
cd prompts.chat
npm install && npm run setup
```

setup 向导会引导配置品牌、主题、认证和功能开关。使用 PostgreSQL 作为数据库，也支持 Docker 部署。

### 7. 多格式数据

提示词提供多种格式下载：

- `prompts.csv` - CSV 格式，方便程序处理
- `PROMPTS.md` - Markdown 原文
- Hugging Face Dataset - 机器学习数据集格式

## 使用方法

### 直接使用

1. 访问 [prompts.chat/prompts](https://prompts.chat/prompts) 浏览提示词
2. 找到合适的提示词，点击复制
3. 粘贴到 ChatGPT / Claude / Gemini 等任意 AI 对话工具
4. 替换提示词中的占位内容为自己的实际需求

### CLI 使用

```bash
npx prompts.chat
```

在终端中搜索和查看提示词，不用打开浏览器。

### MCP Server 集成

在你的 MCP 客户端配置中添加 prompts.chat 作为远程 MCP Server：

```json
{
  "mcpServers": {
    "prompts.chat": {
      "url": "https://prompts.chat/api/mcp"
    }
  }
}
```

配置后，AI 工具可以自动查询和使用提示词库中的提示词。

### 贡献提示词

在 [prompts.chat/prompts/new](https://prompts.chat/prompts/new) 提交新提示词，审核通过后会自动同步到 GitHub 仓库。

### 自托管部署

参考 [Self-Hosting Guide](https://github.com/f/prompts.chat/blob/main/SELF-HOSTING.md) 和 [Docker Guide](https://github.com/f/prompts.chat/blob/main/DOCKER.md) 进行私有部署。

## 适用场景

- **新手入门 Prompt Engineering**：通过交互式教程系统学习，从基础到高级
- **日常 AI 使用提效**：直接从库中找到合适的角色提示词，省去自己编写的时间
- **团队私有提示词库**：自托管部署，建立团队内部的提示词积累和共享
- **开发集成**：通过 MCP Server 或 CLI 把提示词库接入自己的 AI 工具链
- **AI 教育**：儿童教学游戏 + 交互式教程，适合教学场景
- **数据研究**：Hugging Face 数据集格式，可直接用于 ML 研究和评测

## 小结

prompts.chat 是 AI 提示词领域的基石项目。2022 年底首个 prompt library，143k+ Star，被 Forbes、Harvard、Columbia 引用，这些背书本身就说明了它的地位。它的价值不仅在于提示词合集本身，更在于它把提示词从"一个小技巧"变成了一个系统性工程：有教程、有社区、有工具链、有自托管方案。如果你刚开始接触 AI 提示词，这是第一站；如果你在搭建团队的提示词工作流，MCP Server 集成和自托管能力也很实用。
