---
title: "Remotion：用 React 写代码，程序化生成视频"
description: "Remotion 是一个用 React 编写视频的框架，把视频当作代码来管理，支持 Agent 自动生成、交互式编辑和程序化批量渲染，可通过 Node.js、AWS Lambda、Vercel 或客户端渲染输出 MP4。项目地址：https://github.com/remotion-dev/remotion"
category: "workflow"
tags: ["Remotion", "React", "视频编程", "程序化视频", "开源框架"]
difficulty: "入门"
date: 2026-10-08
---

## 项目介绍

Remotion 是一个用 React 编写视频的框架（62000+ Star，TypeScript），核心理念是：**视频的源代码就是 React 代码，代码是唯一的真相来源。**

项目地址：[https://github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion)

大多数视频工具是拖拽时间轴，而 Remotion 把视频变成了代码工程：每一帧由 React 组件渲染，动画用 `useCurrentFrame()` 驱动，音视频素材用 `<Video>` `<Audio>` 组件挂载。这意味着你可以用 Git 管理视频版本、用变量驱动内容、接入真实数据源动态生成视频、写自动化测试验证渲染结果。它把视频制作从"手艺活"变成了"工程活"。

Remotion 自称"Video tools for the agent era"（Agent 时代的视频工具），支持三种工作流：AI Agent 自动生成、交互式拖拽编辑、纯代码程序化渲染，随时切换。

## 核心功能

### 1. 三种创作模式

- **Agent 生成**：把需求交给 AI 编程 Agent，自动写 React 组件并渲染视频
- **交互式编辑**：使用内置编辑器拖拽编辑和动画
- **程序化渲染**：连接数据源，用代码管理复杂度，批量生成

React 代码是唯一真相来源，三种模式之间随时切换不丢失信息。

### 2. 丰富的组件库

- **Elements**：视频、音频、图片、序列等基础组件
- **Effects**：可视化滤镜和效果
- **Shapes**：圆形、矩形、三角形等可动画形状
- **Transitions**：场景转场效果库
- **Sound Effects**：音效组件
- **Captions**：字幕渲染组件
- **Fonts**：字体加载和管理

### 3. 多种渲染方式

| 方式 | 说明 |
|---|---|
| Node.js API | 本地或服务端渲染，适合自动化流程 |
| AWS Lambda | 分布式云端渲染，可扩展到百万级视频 |
| Vercel | 在 Vercel 上部署渲染沙箱 |
| 客户端渲染 | 在浏览器中直接渲染，无需服务端 |

### 4. 视频自动化

- **设计系统**：为组织创建可复用的动画素材库
- **批量渲染**：在自己的基础设施上渲染百万级视频
- **应用开发**：发布简单的工具或复杂的视频编辑器

### 5. 嵌入式播放器

提供 `<RemotionPlayer>` 组件，可以在网页应用中嵌入可交互的视频播放器，支持播放控制、帧跳转和时间轴交互。

### 6. 模板系统

提供多种开箱即用的视频模板，涵盖产品演示、社交媒体、数据可视化等场景。

## 使用方法

### 快速开始

如果已安装 Node.js，一行命令即可创建项目：

```bash
npx create-video@latest
```

跟着交互式引导选择模板，创建完成后进入项目目录启动开发服务器：

```bash
cd my-video
npm install
npm run dev
```

浏览器会打开 Remotion Studio，实时预览视频效果。

### 项目结构

一个基本的 Remotion 视频由 Composition 定义：

```tsx
import { Composition } from "remotion";
import { MyVideo } from "./MyVideo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

组件内用 `useCurrentFrame()` 获取当前帧号，驱动动画：

```tsx
import { useCurrentFrame, interpolate } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity }}>Hello Remotion</div>;
};
```

### 渲染输出

本地渲染为 MP4：

```bash
npx remotion render MyVideo out/video.mp4
```

使用 Node.js API 程序化渲染：

```js
import { renderMedia } from "@remotion/renderer";

await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: "out/video.mp4",
});
```

### Agent 集成

Remotion 提供专门的 Agent Skills 文档，AI 编程 Agent 可以读取后自动创建和修改视频项目。详见 [Agent Skills 文档](https://www.remotion.dev/docs/ai/skills)。

### 许可证注意

Remotion 使用的是专有的 Remotion License（源码可见），并非标准开源协议。个人和小团队可以免费使用，但公司达到一定规模或特定使用场景需要购买商业许可证。使用前请阅读 [LICENSE](https://remotion.dev/license) 页面确认是否需要购买。

## 适用场景

- **数据驱动视频**：接入 API 数据自动生成报表视频、体育集锦、个性化营销视频
- **批量内容生产**：模板 + 数据源，一条命令渲染数百条视频
- **产品演示与发布**：用代码精确控制动画时序，做高质量产品宣传片
- **视频编辑器应用**：基于 Player 和 Editor Starter 构建自己的在线视频编辑工具
- **AI Agent 视频生成**：让 AI Agent 直接写 Remotion 代码生成视频

## 小结

Remotion 的核心价值在于把视频变成了一等公民的代码工程：版本控制、数据驱动、自动化测试、批量渲染这些软件工程的能力全都来到了视频领域。62000 Star 说明它确实在"用代码做视频"这个方向上走通了。如果你有前端开发背景，尤其是 React 经验，Remotion 是目前最成熟的程序化视频方案。唯一的注意点是许可证并非标准开源，商业使用前要确认授权要求。
