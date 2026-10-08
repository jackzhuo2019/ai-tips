---
title: "Video Shotcraft：让 AI Agent 变成电影级产品视频工作室"
description: "Video Shotcraft 是一个 AI agent skill，把 Claude Code 或 Codex 变成动态设计工作室：157 张镜头配方卡、214 种运动风格、完整的 Remotion 视频模板，用自然语言生成电影级产品宣传片。项目地址：https://github.com/Vincentwei1021/video-shotcraft"
category: "workflow"
tags: ["Video Shotcraft", "视频制作", "Remotion", "Agent", "skill", "产品宣传"]
difficulty: "入门"
date: 2026-09-29
---

## 项目介绍

Video Shotcraft 是一个 AI agent skill，核心能力是把 Claude Code 或 Codex 变成一个动态设计工作室。给它一个产品，它就能完成分镜、动画、音效设计，用 [Remotion](https://www.remotion.dev/)（基于 React 的视频框架）输出一段电影级的产品宣传片、营销视频、发布会视频或功能演示。

项目地址：[https://github.com/Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)

和大多数 AI 视频工具不同，它不是生成一堆随机片段拼在一起，而是有一套完整的制作方法论：真实页面截图、2.5D 摄影机运动、节拍同步剪辑、电影级音效。整个流程从分镜规划到最终渲染都在 agent 里完成。

内置资源包括 157 张镜头配方卡、214 种运动风格预览、149 个音效素材（覆盖 16 个场景类别）、5 首 BGM，以及一套完整的可运行视频模板。

## 核心功能

### 1. 镜头配方卡系统

这是项目的核心。157 张镜头配方卡覆盖 10 个功能类别，每张卡片记录了：镜头目的、能量级别、建议时长、参数说明、实现要点和常见坑。不是模糊的"描述"，而是可以直接指导 Remotion 组件实现的精确规格。

### 2. 214 种运动风格预览

每种风格都有对应的 Remotion TSX 实现，包含真实的缓动曲线和时间参数。所有预览都可以在 [在线 Gallery](https://vincentwei1021.github.io/video-shotcraft/) 里搜索、筛选、切换变体。

### 3. 完整视频模板：Ink Press

内置一套经过验证的完整模板：36.2 秒、1920x1080、30fps、10 个镜头，纸墨琥珀风格，包含 2.5D 真实页面摄影机运动、标题卡、转场和完整的电影级音效。直接套用即可产出同质量成片。

### 4. Motion Workbench（浏览器编辑台）

视频交付后会打开一个类似剪映的浏览器编辑台，把成片拆成镜头/转场/字幕/音效轨道。可以选中任意镜头改文案、字号、颜色，移动、裁剪、变速，从库里拖拽任意运动预设，再用 Remotion 导出。预览和渲染帧一致（像素级验证）。

### 5. 剪映项目导出

成片可导出为剪映草稿：按镜头切板（可调速/重排/调色），字幕重建为原生文本轨（内容/大小/颜色可改），音效和 BGM 落在独立音频轨。在 macOS 剪映专业版 11.2 上验证通过。

### 6. 一键切换主题

模板支持 Ink Press、Modern Light、Midnight、Sage、Coral、Iris、Deep Ocean、Obsidian Violet、Vintage Kraft 九种电影主题，在 workbench 里切换且保留已有编辑。

## 使用方法

### 安装

**最简单的方式**：直接把仓库链接丢给 agent。

```text
Install this skill for me: https://github.com/Vincentwei1021/video-shotcraft
```

Agent 会自动 clone 并链接到 skills 目录。也可以手动安装：

```bash
npx skills add Vincentwei1021/video-shotcraft
```

或者 git clone 后手动链接：

```bash
git clone https://github.com/Vincentwei1021/video-shotcraft.git
cd video-shotcraft
ln -s "$(pwd)" ~/.claude/skills/video-shotcraft   # Claude Code
# 或
ln -s "$(pwd)" ~/.codex/skills/video-shotcraft    # Codex
```

### 创作

装好后，在 agent 对话框里直接说需求：

```text
Use video-shotcraft to create a promo for my desktop product.
Use the deck-deal-flyin and row-embed shot cards to present this feature.
Design a product close-up inspired by spotlight-hero-card.
```

不指定镜头卡的话，skill 会先介绍内置模板并询问是否使用，也可以在 [Gallery](https://vincentwei1021.github.io/video-shotcraft/) 里先挑好镜头再开始。

### 套用模板

想最快拿到成片，直接套 Ink Press 模板：

```text
Use video-shotcraft to make a promo for my product with the Ink Press template.
```

Agent 会把你的产品截图、文案和品牌信息替换进去，复刻同样的质量。模板本身会换入你的素材，不是从零开始做。

### 交付后编辑

```bash
node workbench/scripts/open.mjs <project>
```

浏览器里打开 Motion Workbench，按轨道拆开的镜头、转场、字幕、音效都可以直接改，改完用 Remotion 导出。

## 包含内容一览

| 内容 | 说明 |
|---|---|
| 157 张镜头配方卡 | 目的、能量、时长、参数、实现要点、常见坑 |
| 214 种运动预览 | 覆盖 214 种风格，Gallery 可搜索筛选 |
| Remotion 实现 | 每张卡对应调好的 TSX 组件，含真实缓动和时序参数 |
| 完整视频模板 | 36.2 秒、1920x1080、30fps、10 镜头的 Ink Press |
| 组件和素材 | 2.5D 页面摄影机、字幕、闪光切、数字滚动、音效、截图脚本 |
| 制作方法论 | 截图、视觉方向、分镜、音效设计、节拍同步、最终 QA |
| 剪映项目导出 | 按镜头切板、原生字幕轨、独立音频轨 |
| Motion Workbench | 交付后浏览器编辑台，拖拽式轨道编辑 |

## 适用场景

主要面向 Web 和桌面产品宣传片，单个镜头卡也可用于功能演示、品牌短片、发布会视频等动态项目。

## 小结

Video Shotcraft 的价值在于把电影级动态设计的制作门槛大幅降低。157 张镜头配方卡相当于一个浓缩的运镜知识库，Remotion 模板保证产出是真正的视频文件而非拼图，Motion Workbench 让交付后还能继续调整。对需要用 AI 产出产品宣传视频的团队，这是值得装的 skill。

在线 Gallery：[https://vincentwei1021.github.io/video-shotcraft/](https://vincentwei1021.github.io/video-shotcraft/)

社区成片展示：[https://vincentwei1021.github.io/video-shotcraft/showcase.html](https://vincentwei1021.github.io/video-shotcraft/showcase.html)
