---
title: "Windows-MCP 入门：让 AI 操控 Windows 桌面"
description: "Windows-MCP 是一个开源 MCP 服务端，让 AI 通过无障碍树操控 Windows UI：点击、输入、截图、启动应用、执行命令。项目地址：https://github.com/CursorTouch/Windows-MCP"
category: "mcp"
tags: ["windows-mcp", "MCP", "工具配置", "Windows", "UI自动化"]
difficulty: "入门"
date: 2026-09-26
---

## 什么是 Windows-MCP

Windows-MCP 是一个轻量级开源 MCP 服务端，桥接 LLM 与 Windows 操作系统。和依赖计算机视觉的自动化工具不同，它通过 Windows 无障碍树（UIA）来理解界面元素，因此不挑模型——任何 LLM 都能用，无需视觉能力或微调。

项目地址：[https://github.com/CursorTouch/Windows-MCP](https://github.com/CursorTouch/Windows-MCP)（MIT 协议，7000+ Star）

简单来说：装上 Windows-MCP 后，AI 助手能真正"看到"你的屏幕、点击按钮、输入文字、启动应用，完成桌面操作而不是只给建议。

## 安装前提

- **Python 3.13+**（不是 Node.js）
- **uv 包管理器**：安装方式 `pip install uv` 或 `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **Windows 7 / 8 / 10 / 11** 均支持
- 建议将 Windows 系统语言设为英文（其他语言下 App-Tool 可能无法正确识别开始菜单项，可手动禁用该工具）

## 配置步骤

Windows-MCP 支持多种 AI 客户端，核心配置一样——用 `uvx` 运行 `windows-mcp serve`。

### Claude Desktop

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "windows-mcp": {
      "command": "uvx",
      "args": ["windows-mcp", "serve"]
    }
  }
}
```

### Codex CLI

在 `~/.codex/config.toml` 中添加：

```toml
[mcp_servers.windows-mcp]
command = "uvx"
args = ["windows-mcp", "serve"]
```

配置完成后重启客户端即可。首次运行可能需要一两分钟安装依赖，如果超时直接重启即可。

## 核心工具一览

Windows-MCP 的工具大致分三类：

**UI 交互**（核心能力）

- `Screenshot` — 快速截取桌面，附带光标位置和活动窗口信息
- `Snapshot` — 完整桌面状态捕获，包含可交互元素 ID，支持 `use_vision=True` 附带截图
- `Click` / `Move` / `Scroll` — 点击、移动、拖拽、滚动
- `Type` / `Shortcut` — 输入文字、键盘快捷键
- `Wait` / `WaitFor` — 暂停、等待特定元素或窗口出现

**系统操作**

- `App` — 通过开始菜单名称或可执行文件路径启动应用，调整窗口大小和位置
- `PowerShell` — 执行 PowerShell 命令
- `FileSystem` — 读写、复制、移动、删除、搜索文件和目录
- `Process` — 查看运行中的进程、按 PID 或名称终止进程
- `Registry` — 读写 Windows 注册表
- `Clipboard` — 读写系统剪贴板

**其他**

- `Scrape` — 抓取网页内容（带 SSRF 防护）
- `Notification` — 发送 Windows 通知
- `MultiSelect` / `MultiEdit` — 批量选择文件、批量填写输入框

## 实用技巧

### 1. 让 AI 操作桌面软件

告诉 AI："打开记事本，输入今天的会议纪要，保存到桌面"，它会依次调用 App 启动应用、Type 输入内容、Shortcut 触发保存。

### 2. 浏览器自动化

Snapshot 工具支持 `use_dom=True` 模式，专门提取网页 DOM 内容，过滤掉浏览器 UI 元素。支持 Chrome、Edge、Firefox，适合让 AI 自动填表、抓取页面信息。

### 3. 系统巡检

让 AI 截图看桌面状态，再用 PowerShell 查看进程和资源占用，结合 Screenshot 给出可视化反馈。典型操作延迟在 0.2-0.5 秒之间。

## 安全注意

Windows-MCP 拥有完整系统访问权限，能执行不可逆操作，使用时注意：

- 远程访问时务必启用 `--auth-key` 认证和 IP 白名单
- 默认不发出 CORS 头，浏览器无法直接访问；如需开放需显式指定 `--cors-origins`
- 可用 `--tools` 或 `--exclude-tools` 精确控制开放哪些工具，例如禁用 `PowerShell` 和 `Registry`
- 执行敏感操作前让 AI 先说明意图

## 小结

Windows-MCP 的独特之处在于不依赖视觉模型，而是通过无障碍树让任意 LLM 操控 Windows 桌面。配好之后，很多需要手动点击操作的桌面任务可以用自然语言完成，AI 从"建议者"变成了真正的"执行者"。
