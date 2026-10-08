---
title: "HyperFrames：写 HTML 渲染视频，为 AI Agent 而生"
description: "HyperFrames 是 HeyGen 开源的视频创作框架，用 HTML + CSS + 可寻址动画定义视频，确定性渲染为 MP4，内置 21 个 AI Agent Skills、可复用组件目录和云端渲染，Apache 2.0 协议无商业限制。项目地址：https://github.com/heygen-com/hyperframes"
category: "workflow"
tags: ["HyperFrames", "HTML 视频", "AI Agent", "HeyGen", "开源框架"]
difficulty: "入门"
date: 2026-10-08
---

## 项目介绍

HyperFrames 是 HeyGen 开源的视频创作框架（58000+ Star，Apache 2.0 协议），核心理念一句话：**写 HTML，渲染视频，为 AI Agent 而生。**

项目地址：[https://github.com/heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)

它受 Remotion 启发，但走了一条不同的路：Remotion 的赌注是 React 组件，HyperFrames 的赌注是纯 HTML。你的视频就是一个 `index.html` 文件，用 `data-*` 属性控制时间轴和轨道，用 GSAP、CSS、Lottie、Three.js 等适配器驱动可寻址动画（seekable animation）。渲染器在无头 Chrome 中逐帧截取，用 FFmpeg 编码，同样的输入永远输出同样的视频。

这个设计决定了它的核心优势：AI Agent 已经会写 HTML，不需要学 React 也能直接上手做视频。同时纯 HTML 不需要构建步骤，浏览器里直接预览，人类和 Agent 都能轻松编辑。HeyGen 自己也在生产环境中使用它。

## 核心功能

### 1. HTML 原生创作

视频就是 HTML 文件，用 data 属性控制时间轴：

```html
<div id="stage" data-composition-id="launch" data-start="0"
     data-width="1920" data-height="1080">
  <video class="clip" data-start="0" data-duration="6"
         data-track-index="0" src="intro.mp4" muted></video>
  <h1 id="title" class="clip" data-start="1" data-duration="4"
      data-track-index="1">Launch day</h1>
  <audio data-start="0" data-duration="6" data-track-index="2"
         data-volume="0.5" src="music.wav"></audio>
</div>
```

无需构建步骤，浏览器直接打开就能预览。

### 2. 多动画适配器

不绑定单一动画库，按需选用：

- **GSAP**：专业级动画时间线
- **CSS Keyframes / WAAPI**：原生 Web 动画
- **Lottie**：AE 导出的矢量动画
- **Three.js**：3D 场景
- **Anime.js**：轻量动画库
- **TypeGPU**：GPU 计算动画

所有动画都是可寻址的（seekable），渲染时逐帧定位，保证帧级精确和确定性。

### 3. 21 个 AI Agent Skills

HyperFrames 内置 21 个 Agent Skills，覆盖从规划到渲染的完整制作流程：

**核心路由**：`/hyperframes` 是入口，Agent 读取后自动选择合适的创作工作流。

**创作工作流**（9 个）：

| Skill | 适用场景 |
|---|---|
| `/product-launch-video` | 网站/产品宣传视频（30~90 秒最佳） |
| `/faceless-explainer` | 纯抽象视觉的概念解释视频 |
| `/pr-to-video` | GitHub PR 转变更说明视频 |
| `/embedded-captions` | 为口播视频添加设计感字幕 |
| `/talking-head-recout` | 为口播/访谈视频添加图形叠加层 |
| `/motion-graphics` | 10 秒以内纯动态图形（Logo/标题/数据） |
| `/music-to-video` | 音乐驱动节奏的卡点视频 |
| `/slideshow` | 演示文稿/交互式 Deck |
| `/general-video` | 其他所有视频类型的兜底 |

**领域技能**（6 个）：`/hyperframes-core`（合成契约）、`/hyperframes-animation`（动画系统）、`/hyperframes-keyframes`（关键帧）、`/hyperframes-creative`（创意方向）、`/media-use`（媒体资源管理）、`/hyperframes-cli`（CLI 开发循环）、`/hyperframes-audio`（音频混音）、`/hyperframes-registry`（组件目录）、`/figma`（Figma 导入）。

### 4. 确定性渲染

同一个 HTML 输入，无论在本地、CI 还是云端渲染，输出的视频帧完全一致。这让它天然适合回归测试和自动化内容管线。

### 5. 可复用组件目录

通过 CLI 一键安装现成组件：

```bash
npx hyperframes add flash-through-white   # 着色器转场
npx hyperframes add instagram-follow      # 社交叠加层
npx hyperframes add data-chart             # 动画图表
```

涵盖转场、叠加层、字幕、图表、地图和效果等类型。

### 6. 多种渲染方式

- **本地渲染**：`npx hyperframes render`，无头 Chrome + FFmpeg
- **AWS Lambda**：部署分布式渲染栈，从笔记本或 CI 驱动
- **HeyGen 云端渲染**：`npx hyperframes cloud render`

### 7. frame.md 设计系统

每个品牌都有 design.md，但没有一个是为"镜头"写的。frame.md 是翻译层：把 Web 语境的设计规范反转为镜头语境，同样的 token、同样的规则，但重写为 AI Agent 可以直接用来组合宣传视频的 DESIGN.md 超集。内置数十种设计模板可浏览和混搭。

### 8. Studio 浏览器编辑器

提供浏览器端的合成编辑界面，可以预览和编辑视频项目。

## 使用方法

### 方式一：AI Agent（推荐）

安装 Skill 后直接对话生成视频：

```bash
# Claude Code 插件
claude plugin marketplace add heygen-com/hyperframes
claude plugin install hyperframes@hyperframes

# 或独立 Skill（支持 Codex、Cursor 等）
npx skills add heygen-com/hyperframes
```

然后对 Agent 说：

> Using /hyperframes, create a 10-second product intro with a fade-in title, a background video, and subtle background music.

### 方式二：CLI 手动操作

需要 Node.js 22+ 和 FFmpeg：

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview      # 浏览器实时预览
npx hyperframes render       # 渲染为 MP4
```

其他常用命令：

```bash
npx hyperframes lint          # 检查合成文件
npx hyperframes check         # 验证项目
npx hyperframes snapshot      # 截取快照
npx hyperframes publish       # 发布项目
npx hyperframes doctor        # 诊断环境问题
```

### 方式三：在线体验

访问 [hyperframes.dev](https://www.hyperframes.dev/) 社区 Playground，直接在浏览器中预览、迭代、分享和渲染，无需本地安装。

## HyperFrames vs Remotion

|  | HyperFrames | Remotion |
|---|---|---|
| 创作模型 | HTML + CSS + 可寻址动画 | React 组件 |
| 构建步骤 | 无，index.html 直接播放 | 需要 Bundler |
| Agent 交互 | 纯 HTML 文件 | JSX / React 项目 |
| 分布式渲染 | 本地 + AWS Lambda | Remotion Lambda（成熟的云端渲染） |
| 许可证 | Apache 2.0 | Remotion License（源码可见，商业使用有限制） |

总结来说：想用纯 HTML 做视频、想让 AI Agent 上手更轻、需要完全开源协议，选 HyperFrames；已有 React 技术栈、需要更成熟的云端渲染生态，选 Remotion。

## 适用场景

- **产品发布视频**：从官网 URL 或产品简介生成宣传片
- **PR 变更说明**：把 GitHub PR 转成带动画代码 diff 和解说的视频
- **数据可视化**：图表竞赛、地图动画、统计卡片
- **社交媒体短视频**：动态字幕、叠加层、卡点音乐
- **文档转视频**：把文档、PDF、网站导览转成讲解视频
- **自动化内容管线**：确定性渲染 + CI 回归测试，批量生产

## 小结

HyperFrames 的差异化很清晰：纯 HTML 而非 React，为 AI Agent 而非人类开发者优先设计，Apache 2.0 而非受限许可证。这三点组合起来，让"让 Agent 帮我做个视频"这件事的门槛降到了最低。58000 Star 和 HeyGen 自身的生产使用也验证了它的成熟度。如果你的工作流里已经有 AI 编程 Agent，HyperFrames 是目前最自然的视频生成底座。
