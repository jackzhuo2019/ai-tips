---
title: "MoneyPrinterTurbo：输入一个主题，AI 全自动生成高清短视频"
description: "MoneyPrinterTurbo 是一个开源的一站式 AI 短视频生成工具，只需提供视频主题或关键词，即可自动完成脚本撰写、素材匹配、配音、字幕、配乐和剪辑，输出竖屏/横屏/方形短视频，并支持一键发布到 TikTok、Instagram 和 YouTube Shorts。项目地址：https://github.com/harry0703/MoneyPrinterTurbo"
category: "workflow"
tags: ["MoneyPrinterTurbo", "短视频", "AI 视频生成", "自动化", "开源工具"]
difficulty: "入门"
date: 2026-09-30
---

## 项目介绍

MoneyPrinterTurbo 是一个开源的一站式 AI 短视频生成工具（MIT 协议），GitHub 已超过 127000 Star。核心理念一句话就能说清：**你给一个主题或关键词，它自动把脚本、素材、配音、字幕、配乐、剪辑全部搞定，输出一条高清短视频。**

项目地址：[https://github.com/harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)

它不是一个单一的 AI 模型，而是一条完整的自动化工作流：先用大语言模型写脚本，再根据脚本内容去素材库匹配视频片段（或用 AI 文生视频生成原创画面），同时用 TTS 引擎生成配音，自动生成字幕，配上背景音乐，最后合成为成片。整个流程不需要你手动剪辑，适合做知识科普、资讯速览、生活分享等批量短视频内容。

## 核心功能

### 1. 四种使用方式

- **AI Agent**：直接对 AI Agent 说一句话，自动完成安装、配置和生成
- **WebUI**：浏览器界面操作，可视化配置所有参数
- **API**：提供 REST API，方便接入自动化流程和二次开发
- **CLI**：纯命令行生成，适合无图形界面或批量任务

### 2. 脚本自动生成

支持 AI 自动生成或改写多语言视频脚本，也可以直接使用自定义脚本。接入了主流大模型服务：Kimi / Moonshot AI、OpenAI、Anthropic Claude、Google Gemini、DeepSeek、阿里云通义千问、Azure OpenAI、火山引擎方舟、xAI Grok、MiniMax、小米 MiMo 等，同时兼容 OpenRouter、Ollama、LiteLLM 等统一网关和本地运行环境。

### 3. 多源视频与图片素材

- **本地素材**：上传自己的图片和视频
- **免费库存**：Pexels、Pixabay、Coverr
- **AI 文生视频**：MiniMax H3（768P/2K，4~15 秒）、火山引擎 Seedance、WaveSpeed AI、OFox、MuAPI 等多个模型
- **AI 文生图**：OpenAI 兼容接口，可连接云端服务或自定义图片网关

支持调整片段时长、画面适配方式和素材匹配顺序，适配不同画幅和叙事节奏。

### 4. 配音系统

内置多种 TTS 引擎，按需选择：

- **Edge TTS**：免费，无需 API Key，开箱即用
- **Azure Speech V2**：微软云端语音，高质量
- **SiliconFlow / Google Gemini / 小米 MiMo / MiniMax / ElevenLabs**：多平台可选
- **Chatterbox / Kokoro**：可自托管
- **Fish Audio / ModelBest VoxCPM**：支持音色复刻

WebUI 中可选 Provider 和音色，提供试听和完整配音预览。

### 5. 字幕生成

两种模式可选：

- **edge**：基于 TTS 时间戳生成，速度快，不需要 GPU（默认）
- **whisper**：使用本地 faster-whisper 转写音频，字幕时间轴更精准，首次使用需下载模型

字幕样式可调字体、位置、颜色、大小、描边和背景。

### 6. 背景音乐

支持随机选取、本地指定和 AI 生成三种方式，可独立控制音量。项目自带默认音乐库，也可以放自己的音频进去。

### 7. 多画幅输出

- 竖屏 9:16（1080x1920）：适合抖音、TikTok、YouTube Shorts
- 横屏 16:9（1920x1080）：适合 B 站、YouTube
- 方形 1:1（1080x1080）：适合 Instagram

### 8. 一键跨平台发布

生成完成后可自动上传至 TikTok、Instagram 和 YouTube Shorts，无需手动导出再上传。

### 9. 批量生成

支持一次性生成多条成片，CLI 支持 JSON 批量任务清单（最多 100 个任务），单个任务失败不影响后续执行。

## 使用方法

### 方式一：AI Agent（最简单）

如果你的 AI Agent 支持读取 Skill 文档并操作本地终端，直接发送：

```text
使用这个 Skill：https://raw.githubusercontent.com/harry0703/MoneyPrinterTurbo/main/docs/skill/SKILL.md
帮我生成一个主题为"人工智能如何改变普通人的日常生活"的视频。
```

Agent 会自动完成安装、配置和视频生成，缺少 API Key 时才会询问你。

### 方式二：Windows 一键启动包

1. 前往 [Releases 页面](https://github.com/harry0703/MoneyPrinterTurbo/releases/latest) 下载 .7z 压缩包
2. 解压后双击 update.bat 更新到最新代码
3. 双击 start.bat 启动，浏览器会自动打开 WebUI

注意：解压路径不要有中文、特殊字符和空格。

### 方式三：本地部署

需要 Python 3.11+，推荐使用 uv：

```bash
git clone https://github.com/harry0703/MoneyPrinterTurbo.git
cd MoneyPrinterTurbo
uv python install 3.11
uv sync --frozen
```

启动 WebUI：

```bash
# Windows
.\webui.bat

# macOS / Linux
sh webui.sh
```

启动 API 服务：

```bash
uv run python main.py
```

纯命令行生成：

```bash
uv run python cli.py --video-subject "人工智能如何改变日常生活"
```

### 方式四：Docker 部署

```bash
cd MoneyPrinterTurbo
docker compose -f docker-compose.release.yml up
```

WebUI 访问 http://127.0.0.1:8501，API 文档访问 http://127.0.0.1:8080/docs。

### 方式五：Google Colab 在线体验

不想装环境的话，可以直接在 Google Colab 中运行，项目 README 中有一键打开的链接。

### 配置 API Key

首次启动会自动创建 config.toml 配置文件。使用云端服务前，在 WebUI 的基础设置中填入对应平台的 API Key。Edge TTS 免费且不需要 Key，可以先体验基础流程。

## 配置要求

| 项目 | 最低配置 | 推荐配置 | 理想配置 |
|---|---|---|---|
| CPU | 4 核 | 6~8 核 | 8 核及以上 |
| 内存 | 4 GB | 8 GB | 16 GB 及以上 |
| GPU | 非必须 | 4 GB 显存 | 8 GB 显存及以上 |

如果主要依赖云端 LLM、云端 TTS 和在线素材源，CPU 和内存比 GPU 更重要。启用 faster-whisper 或批量生成时，GPU 会明显提升速度。

## 适用场景

- **知识科普短视频**：给一个主题，自动生成脚本配素材配音字幕全套
- **资讯速览**：批量生成多条热点速览视频
- **多语言内容**：脚本和配音均支持多语言，适合做海外内容
- **内容矩阵运营**：API + CLI 批量生成，接入自动化发布流程

## 小结

MoneyPrinterTurbo 的价值在于把短视频制作的全链路打包成了一条自动化流水线。从脚本到成片，中间的素材匹配、配音、字幕、配乐、剪辑都不需要人介入，127000 Star 也说明它确实击中了很多人的需求。对于需要批量生产短视频内容的人来说，这是目前最完整的开源方案之一。免费起步（Edge TTS + Pexels 免费素材），想要更高质量再按需接入付费 API，成本完全可控。
