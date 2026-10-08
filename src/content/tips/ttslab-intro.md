---
title: "TTSLab：浏览器里免费测试任意 TTS/STT 模型，零成本零数据上传"
description: "TTSLab 是一个开源的文本转语音和语音转文字模型测试平台，所有推理在浏览器本地通过 WebGPU 完成，不上传任何数据，支持模型并排对比、本地缓存、模型目录浏览与投票。项目地址：https://github.com/MbBrainz/ttslab"
category: "workflow"
tags: ["TTSLab", "TTS", "语音合成", "WebGPU", "开源工具"]
difficulty: "入门"
date: 2026-10-08
---

## 项目介绍

TTSLab 是一个开源的 TTS（文本转语音）和 STT（语音转文字）模型测试平台（MIT 协议），核心理念是：**在浏览器里直接跑模型，不花一分钱，不上传一个字节。**

项目地址：[https://github.com/MbBrainz/ttslab](https://github.com/MbBrainz/ttslab)

多数 TTS 测试方案要么调用付费 API，要么本地部署 Python 环境。TTSLab 走了第三条路：利用 WebGPU 让模型直接在浏览器里推理，模型权重下载后缓存在本地，文本和音频数据全程不离开你的设备。对于想快速对比不同 TTS 模型效果、挑选合适语音引擎的开发者来说，这是目前最轻量的方案。

技术栈是 Next.js 16 + Tailwind CSS v4 + ONNX Runtime Web + Transformers.js，前端全 TypeScript。

## 核心功能

### 1. 浏览器内推理

模型通过 WebGPU 或 WASM 在本地运行，不需要后端服务器，不需要 Python 环境，不需要 GPU 驱动配置。打开网页就能用。

### 2. 零数据收集

你输入的文本和生成的音频永远不会离开浏览器。没有埋点上传，没有云端存储，隐私完全自控。这对于处理敏感文本（内部文档、客户信息等）的场景特别重要。

### 3. 并排对比

可以把多个 TTS 或 STT 模型放在一起对比，同一段文本用不同模型生成，直接听效果差异。这是 TTSLab 最实用的功能，省去了逐个模型切换测试的时间。

### 4. 模型目录

内置模型浏览、搜索和投票功能，可以按热度或类型筛选，发现新的 TTS/STT 模型。

### 5. 本地缓存

模型权重首次下载后缓存在本地，后续使用无需重复下载，加载速度和本地文件一样快。

### 6. STT 支持

除了文本转语音，还支持语音转文字（STT）模型的测试，两个方向都能覆盖。

## 使用方法

### 在线体验

直接访问 [ttslab.dev](https://ttslab.dev) 即可使用，需要有 WebGPU 支持的浏览器（Chrome 113+ 或 Edge 113+）。

### 本地部署

需要 Node.js 环境和 pnpm 包管理器：

```bash
git clone https://github.com/MbBrainz/ttslab.git
cd ttslab

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 填入 DATABASE_URL 等变量

# 初始化数据库
pnpm db:push
pnpm db:seed

# 启动开发服务器（需要 --webpack 标志解决 ONNX 别名解析）
pnpm dev
```

打开 http://localhost:3000，使用支持 WebGPU 的浏览器访问即可。

### 浏览器要求

- Chrome 113+ 或 Edge 113+（需要 WebGPU 支持）
- 显存越大能跑的模型越多，但基础模型对硬件要求不高
- 首次加载某个模型时需要下载权重（几十 MB 到几百 MB 不等），之后会缓存

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 16 |
| 样式 | Tailwind CSS v4 |
| 数据库 | Neon Postgres + Drizzle ORM |
| 推理 | ONNX Runtime Web、kokoro-js、Transformers.js |
| 分析 | Vercel Analytics |
| 代码规范 | Biome |

## 适用场景

- **选型对比**：项目需要接入 TTS，想快速对比多个模型的效果和速度
- **隐私场景**：处理敏感文本，不能把内容发送到第三方 API
- **离线开发**：没有网络或网络不稳定时，本地缓存模型后可离线使用
- **学习研究**：想了解不同 TTS 模型的特点和差异
- **成本控制**：零 API 费用，适合个人开发者和小团队

## 小结

TTSLab 的价值在于把 TTS/STT 模型测试的门槛压到了最低：不用装 Python、不用配 GPU 驱动、不用注册 API Key，打开浏览器就能跑。WebGPU 让浏览器内推理速度达到了可用水准，零数据上传则解决了隐私顾虑。虽然 53 Star 说明项目还比较早期，但对于需要快速对比语音模型的开发者来说，这是一个值得收藏的工具。如果你在找一个 TTS 模型但不知道该选哪个，先用 TTSLab 听一遍比看任何文档都直观。
