---
title: "Browser Use：让 AI 像人一样操控浏览器，开源 Browser Agent 首选"
description: "Browser Use 是一个开源的浏览器自动化 Agent（MIT 协议），让大模型控制浏览器完成网页操作，支持多种 LLM、自定义工具、云端浏览器、CAPTCHA 处理，可用 Python 库或 CLI 集成。项目地址：https://github.com/browser-use/browser-use"
category: "workflow"
tags: ["Browser Use", "浏览器自动化", "AI Agent", "Web 交互", "开源工具", "Python"]
difficulty: "进阶"
date: 2026-10-09
---

## 项目介绍

Browser Use 是一个开源的浏览器自动化 Agent 框架（MIT 协议），核心目标是让大语言模型像人类一样操控浏览器：打开网页、点击按钮、填表单、处理验证码、完成多步骤任务。

项目地址：[https://github.com/browser-use/browser-use](https://github.com/browser-use/browser-use)

它解决的问题非常直接：传统浏览器自动化（Selenium、Playwright）需要写死每一步操作流程，一个页面结构变了脚本就废了。Browser Use 把浏览器操作交给 LLM 来决策——你只需要描述任务目标，Agent 自己看页面、理解内容、决定下一步操作。比如"帮我在 GitHub 上找到 browser-use 仓库的 Star 数量"，Agent 会自己打开浏览器、搜索、导航到仓库页面、读取 Star 数字并返回结果。

项目由 Magnus Müller 和 Gregor Žunič 创建，总部在苏黎世和旧金山。除了开源 Python 库，还提供 Cloud API（托管浏览器 + Agent）和 CLI（给现有 coding agent 加浏览器控制能力）。自带的 BU2 模型是专门为浏览器自动化优化的，在 Browser Use Benchmark V2 上表现领先。

## 核心功能

### 1. LLM 驱动的浏览器操作

Agent 接收自然语言任务描述，自主控制浏览器完成操作。支持 OpenAI、Anthropic、Google、Ollama 本地模型等多种 LLM，也支持自家的 BU2 模型。Agent 自动理解页面内容、判断当前状态、决定下一步动作。

### 2. 三种使用方式

| 方式 | 适用场景 |
|---|---|
| Python 库 | 在自己的代码中运行 Agent，可自定义工具、结构化输出 |
| CLI | 给 Claude Code、Codex 等 coding agent 加浏览器控制能力 |
| Cloud API | 全托管，提交任务即可，无需管理浏览器和 Agent |

### 3. 自定义工具扩展

通过 `Tools` 注册自定义函数，Agent 可以在浏览器操作外调用外部 API、读写文件、查询数据库等。比如注册一个"获取当前 UTC 时间"的工具，Agent 在需要时自动调用。

### 4. 云端浏览器

Browser Use Cloud 提供托管浏览器，内置隐身模式、住宅代理、CAPTCHA 处理，适合需要绕过反爬检测的场景。本地 Python 库通过 `Browser(use_cloud=True)` 即可连接。

### 5. BU2 专用模型

Browser Use 自研的 BU2 模型专门针对浏览器自动化优化，在 Benchmark V2 的高难度任务集上表现领先。也支持通过 `ChatBrowserUse` 调用 Claude、GPT、Gemini 等模型。

### 6. Claude 工具集集成

提供 Browser Use toolset for Claude，实现全部 31 种浏览器操作动作，可作为 Claude 的浏览器工具使用。同时内置 Bash 工具，支持数据处理和文件写入。

### 7. 身份认证支持

- 本地浏览器：`Browser.from_system_chrome()` 复用已有 Chrome 配置文件，保持登录状态
- 云端浏览器：通过 profile sync 同步 Cookie，适合需要登录态的任务

### 8. 丰富的周边生态

| 仓库 | 功能 |
|---|---|
| Browser Harness | CLI 工具，给 AI agent 浏览器控制能力 |
| Browser Harness JS | JavaScript 版本，给 JS agent 控制 |
| Browser Use Pi | 基于 Pi 的 TypeScript 浏览器 Agent |
| Cloud SDK | 集成 Browser Use Cloud 到应用 |
| Video Use | 用 coding agent 编辑视频 |
| macOS Harness | 控制 Mac 应用、浏览器和文件 |
| Benchmark | 浏览器任务基准测试 |

## 使用方法

### 方式一：Python 库（最灵活）

**1. 安装**（需要 Python >= 3.11）：

```bash
# 使用 uv 安装
uv add browser-use
```

**2. 配置 API Key**：

```bash
# .env 文件
OPENAI_API_KEY=your-key
# 可选：使用 BU2 模型或云端浏览器
# BROWSER_USE_API_KEY=your-key
```

**3. 编写 Agent**：

```python
import asyncio

from browser_use import Agent, ChatBrowserUse
from dotenv import load_dotenv

load_dotenv()

async def main():
    # 使用 BU2 模型（推荐），或换成 ChatOpenAI(model='gpt-4o')
    llm = ChatBrowserUse(model='bu-2-0')
    agent = Agent(
        task="Find the number of stars of the browser-use repo",
        llm=llm,
        # browser=Browser(use_cloud=True),  # 可选：使用云端浏览器
    )
    result = await agent.run()
    print(result.final_result())

if __name__ == "__main__":
    asyncio.run(main())
```

**4. 运行**：

```bash
uv run agent.py
```

### 方式二：CLI（给 coding agent 加浏览器）

在 Claude Code、Codex 等 agent 中粘贴：

```text
Install or upgrade browser-use to the latest stable version with uv using Python 3.12,
run `browser-use skill install` to register the skill, and connect it to my browser.
```

### 方式三：自定义工具

```python
from browser_use import ActionResult, Agent, ChatBrowserUse, Tools
import asyncio
from datetime import datetime, timezone

tools = Tools()

@tools.action(description='Get the current UTC time.')
def get_current_time() -> ActionResult:
    return ActionResult(extracted_content=datetime.now(timezone.utc).isoformat())

async def main():
    agent = Agent(
        task="What is the current UTC time?",
        llm=ChatBrowserUse(model='bu-2-0'),
        tools=tools,
    )
    result = await agent.run()
    print(result.final_result())

asyncio.run(main())
```

### 方式四：Cloud API（全托管）

通过 Browser Use Cloud 提交任务，无需管理浏览器和 Agent，直接获取结果。新用户注册有 $15 额度。

## 适用场景

- **自动化网页操作**：填表单、提交申请、批量操作，省去手动重复劳动
- **信息采集与验证**：搜价、比价、查库存，需要理解页面语义而非简单抓取
- **测试与 QA**：用自然语言描述测试用例，Agent 自动执行浏览器操作
- **coding agent 增强**：通过 CLI 给 Claude Code、Codex 等加上浏览器操作能力
- **需要登录态的任务**：复用本地 Chrome 配置文件或云端 profile，保持登录状态
- **复杂数据流程**：注册自定义工具，让 Agent 在浏览器操作外调用 API、处理文件

## 小结

Browser Use 是目前开源浏览器 Agent 领域最成熟的项目之一。把"看页面→理解内容→决定操作"的决策交给 LLM，不再需要写死操作流程，页面结构变化也不影响任务执行。三种使用方式覆盖了从快速试用到生产部署的全链路：Python 库适合深度定制，CLI 适合给现有 coding agent 加浏览器能力，Cloud API 适合不想管理基础设施的团队。MIT 协议和本地模型支持（Ollama）让它可以完全免费使用。如果你的工作流涉及大量网页操作，Browser Use 值得作为核心组件来考虑。
