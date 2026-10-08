---
title: "PPT Master：AI 生成的不是图片，是真正可编辑的原生 PowerPoint"
description: "PPT Master 是一个开源 AI 演示文稿工作流，能从 PDF、DOCX、Markdown 等任意素材生成原生可编辑的 .pptx，带母版与版式、原生形状、图表、动画与语音旁白。项目地址：https://github.com/hugohe3/ppt-master"
category: "workflow"
tags: ["PPT Master", "PPT", "AI 工作流", "PowerPoint", "Agent", "skill"]
difficulty: "入门"
date: 2026-09-28
---

## 项目介绍

PPT Master 是一个开源的 AI 演示文稿工作流（MIT 协议，13000+ Star），核心理念只有一句话：**AI 生成的不是一堆排版截图，而是一份真正可以在 PowerPoint 里继续编辑的原生文档。**

项目地址：[https://github.com/hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)

具体来说，它输出的是原生 DrawingML 的 `.pptx`：带母版与版式继承（`p:sldMaster` / `p:sldLayout`）、带调节手柄的原生形状、按需生成可编辑数据的图表与表格、完整的文字/图片/填充/效果模型、页间转场与对象动画、演讲者备注和语音旁白。你在 PowerPoint 里点开任意元素，它们都是真正的 PowerPoint 对象。

形态上，它是一个跑在 AI 编程工具里的工作流（skill）。你在对话里说"用这份 PDF 做一份 PPT"，它就按流程在你本机生成、导出原生可编辑的 `.pptx`。数据不出本地，不订阅任何平台。

## 核心功能

### 1. 全格式素材输入

PDF、DOCX、PPTX、EPUB、HTML、LaTeX、RST、网页链接、Markdown、纯文本，几乎所有能当作 deck 素材的内容都能喂进去。没有文件的话，把文字直接粘贴到对话框里也行。

### 2. 原生可编辑输出（核心差异）

多数 AI PPT 工具把页面导成图片，改一个字要重新生成整页。PPT Master 把 PowerPoint 的原生对象模型真正写进文件里：

- 母版与版式继承，走模板/结构化路线
- 187 种 Office 预设形状，带可调节手柄
- 数据驱动的原生图表和表格对象（加 `--native-charts-and-tables`）
- 原生公式编译为 PowerPoint 可编辑的 OMML
- 转场、进入/强调/路径/退出动画，都是真正的 OOXML 计时与包内部件

### 3. 多路线工作流

| 路线 | 作用 |
|---|---|
| Generate PPTX | 从素材生成新 deck，默认走自由设计，也可指定模板 |
| Edit Native PPTX | 在已有 `.pptx` 里填充新内容，保留原设计，可只编辑选中页面 |
| Create Template | 从参考材料提炼可复用的 Brand/Style/Layout/Deck 工作区 |
| Beautify | 给成品 `.pptx` 追加原生转场、动画和旁白 |

### 4. 实时预览与可视化修改

生成过程中会自动打开浏览器预览地址。可以直接改文字、颜色、字体、字号，拖拽移动元素，方向键微调，Ctrl+Z 撤销。改完点 Apply 写回，或者在页面上写注释交给 AI 重写。

### 5. 语音旁白与视频导出

给演讲者备注按页生成语音旁白，把音频嵌回 PPTX，再用 PowerPoint 导出带旁白和转场的 MP4。默认用 `edge-tts`，可配置云端 provider 获得更高质量音色，也支持用 ElevenLabs / MiniMax / Qwen 等复刻音色。

### 6. 多画布格式

不止 16:9。小册书 3:4、看友圈 1:1、竖版 Story 9:16、A4 打印，同一套流水线指定格式即可。

### 7. 成本透明 + 数据本地

工具免费开源，唯一成本是你自己的 AI 模型用量。除了与 AI 模型的对话外，全流程在你电脑上完成，源文档和产出都不离开本地。

## 使用方法

### 前置条件

- **Python 3.10+**
- **一个具备 Agent 能力的 AI 工具**：Claude Code、Codex CLI、Cursor、Cline 等皆可

### 安装

```bash
git clone https://github.com/hugohe3/ppt-master.git
cd ppt-master
pip install -r requirements.txt
```

Windows 用户建议看项目里的 [Windows 安装指南](https://github.com/hugohe3/ppt-master/blob/main/docs/zh/windows-installation.md)，把 Python 加进 PATH 就能跑通。

### 开始使用

在 Agent 里打开项目文件夹（CLI 工具先 `cd ppt-master`），把素材放进 `projects/` 目录，然后在对话框里说：

```
用 projects/q3-report/sources/report.pdf 这份文件生成一份 PPT
```

默认流程 AI 会先确认设计规范（格式、页数、受众、风格、自由设计或模板），然后走内容分析、排版、生成、导出全程。

### 快速模式

想跳过来回确认，直接说：

```
用 projects/q3-report/sources/report.pdf 快速生成一份 5 页 PPT，不用跟我确认
```

AI 直接执行，不再回来问你。它省掉的是交互和持久规划，不是 PPT 能力。

### 输出位置

成品保存在 `exports/<name>_<timestamp>.pptx`，是可直接编辑的原生 DrawingML。默认还会在 `svg_final/` 生成自包含的页面预览。

### 编辑已有 PPT

把现成 `.pptx` 连同素材给 AI，说"套模板"即可。Edit Native PPTX 会保留原设计，逐字节保留未改页面，只编辑选中的页面。

## 实用建议

- **模型选择**：追求最佳效果，选大上下文窗口模型（Kimi K3 或 Claude），配 AI 生图模型
- **生成较慢**：10 页约 10-20 分钟，这是逐页串行保证跨页一致性的代价
- **出问题时**：让 AI 重新读 `skills/ppt-master/SKILL.md`，它会回到正轨

## 小结

PPT Master 的差异不在"能生成 PPT"，而在生成的是**有原生深度的 PowerPoint**。母版、版式、形状、图表、公式、动画、旁白都是真正的 OOXML 对象，AI 替你把大部分手工活干掉，剩下的打磨交给你。对需要深度掌控 deck 的场景，这是值得花时间配起来的工作流。

在线示例：[https://hugohe3.github.io/ppt-master-examples/](https://hugohe3.github.io/ppt-master-examples/)
