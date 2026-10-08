---
title: "Kokoro-FastAPI：把 Kokoro-82M 变成 OpenAI 兼容的本地 TTS API"
description: "Kokoro-FastAPI 是一个 Docker 化的 FastAPI 封装，把 Kokoro-82M 文本转语音模型变成 OpenAI 兼容的 API 端点，支持 CPU/GPU/AMD/Apple Silicon，多语言、多说话人、语音混合、声音调校、SSML、时间戳字幕和 Web UI。项目地址：https://github.com/remsky/Kokoro-FastAPI"
category: "workflow"
tags: ["Kokoro-FastAPI", "TTS", "Kokoro-82M", "OpenAI 兼容", "Docker", "开源工具"]
difficulty: "入门"
date: 2026-10-08
---

## 项目介绍

Kokoro-FastAPI 是一个 Docker 化的 FastAPI 封装项目（Apache-2.0 协议，5500+ Star），把 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 这个只有 82M 参数却效果出色的 TTS 模型包装成 OpenAI 兼容的语音 API。一行 Docker 命令就能在本地跑起来，任何支持 OpenAI TTS 的客户端都能直接接入。

项目地址：[https://github.com/remsky/Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)

Kokoro-82M 本身是一个轻量级但质量很高的文本转语音模型，支持英语、中文、日语、法语、西班牙语、意大利语、印地语和巴西葡萄牙语。Kokoro-FastAPI 在它之上加了一层完整的 API 服务：OpenAI 兼容端点、多说话人对话、语音混合与别名、参考音频声音调校、SSML、逐词时间戳字幕、流式输出、Web UI，以及全平台 Docker 镜像（CPU/NVIDIA/AMD/Apple Silicon）。Docker 镜像已累计下载超过 260 万次。

## 核心功能

### 1. OpenAI 兼容 API

端点兼容 OpenAI 的 `/v1/audio/speech`，任何使用 OpenAI TTS 的代码改个 `base_url` 就能切换到本地 Kokoro：

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8880/v1", api_key="not-needed"
)

with client.audio.speech.with_streaming_response.create(
    model="kokoro",
    voice="af_sky+af_bella",
    input="Hello world!"
) as response:
    response.stream_to_file("output.mp3")
```

### 2. 多平台 Docker 镜像

预构建多架构镜像，模型权重内置，拉下来直接跑：

| 平台 | 命令 |
|---|---|
| CPU（笔记本/服务器） | `docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest` |
| NVIDIA GPU | `docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu:latest` |
| AMD GPU（实验性） | `docker run --device=/dev/kfd --device=/dev/dri -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-rocm:latest` |
| Apple Silicon | `./start-gpu_mac.sh`（原生 MPS 加速） |

### 3. 语音混合与别名

- **加权混合**：用比例混合多个声音，比如 `"af_bella(2)+af_sky(1)"` 得到 67%/33% 的混合音色
- **别名**：给复杂的混合起短名，请求中用别名引用，比如 `"narrator"` 映射到 `"af_bella(2)+af_sky"`
- 混合后的 voicepack 自动保存，下次直接复用

### 4. 多说话人对话

用 `[voice:...]` 标签在文本中切换说话人，一段文本生成多人对话音频：

```bash
curl -X POST http://localhost:8880/v1/audio/speech \
  -d '{"model":"kokoro","voice":"af_heart",
       "input":"旁白开场。[voice:af_bella] 你觉得怎么样？[voice:am_michael] 挺好的。",
       "allow_voice_tags":true}' --output dialogue.mp3
```

也支持结构化的 `/dev/dialogue` 端点，按 turn 定义对话。

### 5. 声音调校（参考音频）

上传 3~30 秒的参考音频，模型会朝那段声音的方向调校（调校而非克隆，是同一个"邻里"而非精确匹配）。调校后的声音可以保存为新的 voicepack。

### 6. 流式输出

支持流式返回 PCM 数据，首 token 延迟：
- GPU 约 300ms
- CPU（M3 Pro）约 <1s
- CPU（老 i7）约 3500ms

适合实时语音对话场景。

### 7. 时间戳字幕

生成逐词或逐块的时间戳，可以做字幕同步、阅读高亮等。配合内置的 Readalong Web UI，可以边听边看文字高亮。

### 8. 多种音频格式

支持 mp3、wav、opus、flac、aac、pcm 六种输出格式。

### 9. 内联控制标记

文本中可以嵌入控制标记：
- `[pause:1.5s]` — 插入静音
- `[Worcester](/wˈʊstər/)` — 指定 IPA 发音
- `[voice:am_michael]` — 切换说话人

### 10. 多语言支持

英语（US/GB）、西班牙语、法语、印地语、意大利语、日语、巴西葡萄牙语、中文普通话。

## 使用方法

### 最快上手：Docker 一行命令

```bash
# 无 GPU
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest

# 有 NVIDIA GPU
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu:latest
```

启动后：
- API 端点：http://localhost:8880
- API 文档：http://localhost:8880/docs
- Web UI：http://localhost:8880/web

### Docker Compose 部署

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/gpu   # 或 docker/cpu 或 docker/rocm
docker compose up --build
```

### 直接运行（uv）

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI

# Linux/macOS
./start-cpu.sh   # 或 ./start-gpu.sh

# Windows
.\start-cpu.ps1  # 或 .\start-gpu.ps1
```

### 集成到现有应用

因为 API 兼容 OpenAI，可以直接接入：
- **OpenWebUI**：在 TTS 设置里把端点指向 `http://localhost:8880/v1`
- **SillyTavern**：作为 TTS 后端
- **Home Assistant**：通过 Wyoming 或 OpenAI TTS 集成
- **任何 OpenAI SDK**：改 `base_url` 即可

## 适用场景

- **本地 TTS 服务**：不想用付费 API，想在本地跑一个高质量 TTS 服务
- **AI 对话/助手**：给 AI 应用加语音输出，OpenAI 兼容接口接入零改动
- **有声书/阅读器**：长时间文本转语音，配合时间戳做字幕同步
- **多角色对话**：一段文本生成多人对话音频，适合做播客或故事
- **语音原型开发**：快速验证 TTS 效果，不依赖外部服务
- **隐私敏感场景**：所有推理在本地，文本不上传

## 小结

Kokoro-FastAPI 把 Kokoro-82M 这个小而美的 TTS 模型变成了一个开箱即用的本地服务。它的核心价值不在模型本身（虽然 82M 参数能达到这个质量已经很惊人），而在于围绕模型搭了一套完整的工程化封装：OpenAI 兼容 API 让接入成本为零，Docker 镜像让部署成本为零，多说话人/语音混合/声音调校让创作空间足够大。5500 Star 和 260 万次 Docker 拉取说明社区认可度很高。如果你需要一个免费、本地、高质量的 TTS 方案，这是目前最省事的选择之一。
