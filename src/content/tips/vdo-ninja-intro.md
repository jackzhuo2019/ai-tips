---
title: "VDO.Ninja：用 WebRTC 把远程视频接入 OBS，零延迟直播利器"
description: "VDO.Ninja 是一个基于 WebRTC 的点对点视频传输工具，可以把远程摄像头、手机、屏幕等视频源低延迟接入 OBS、vMix 等直播软件，支持导演控制室、多人房间、WHIP/WHEP、自托管部署，免费开源。项目地址：https://github.com/steveseguin/vdo.ninja"
category: "workflow"
tags: ["VDO.Ninja", "WebRTC", "OBS", "直播", "远程视频", "开源工具"]
difficulty: "入门"
date: 2026-10-08
---

## 项目介绍

VDO.Ninja 是一个基于 WebRTC 的点对点视频传输工具（AGPL-3.0 协议，4000+ Star），核心功能是把远程视频源（手机摄像头、远程电脑屏幕、嘉宾视频等）低延迟地接入 OBS、vMix 等直播制作软件。

项目地址：[https://github.com/steveseguin/vdo.ninja](https://github.com/steveseguin/vdo.ninja)

它前身叫 OBS.Ninja，后来改名为 VDO.Ninja。解决的问题很具体：直播时需要接入远程嘉宾的画面，传统方案要么用 Zoom 等视频会议软件再截屏（画质差、延迟高），要么用专业的 SRT/RTMP 方案（配置复杂）。VDO.Ninja 走了第三条路：浏览器打开链接就能推流，OBS 里加一个 Browser Source 就能接收，全程 WebRTC 点对点传输，延迟通常在几百毫秒以内。

技术上，发布者在浏览器里采集摄像头/麦克风/屏幕，通过 WebRTC 直接传给观看端（OBS Browser Source）。网站只提供前端页面和信令握手服务，音视频数据在大多数情况下点对点直传，不经过中间服务器。免费使用，无需注册，无需安装任何软件。

## 核心功能

### 1. 点对点低延迟传输

音视频通过 WebRTC 直接在设备间传输，不走中间服务器（大多数情况下），延迟通常几百毫秒。对比 RTMP 动辄 2-5 秒的延迟，这个体验对实时对话直播至关重要。

### 2. 手机变无线摄像头

打开手机浏览器访问 VDO.Ninja，手机就变成了一个无线网络摄像头。OBS 端添加对应的 Browser Source 即可接收画面，不需要安装任何 App（也有原生 iOS/Android 应用可选）。

### 3. 导演控制室

提供 Director 功能，可以管理多人房间：邀请嘉宾、控制谁的画面被推送、群组聊天、静音/取消静音参与者。适合多嘉宾直播访谈场景。

### 4. OBS 原生插件

除了 Browser Source 方式，还有专门的 OBS 插件，可以直接在 OBS 里发布和接收 VDO.Ninja 流，自动将房间参与者添加为 OBS 源。

### 5. WHIP/WHEP 支持

支持 WHIP（推流）和 WHEP（拉流）协议，可以和 OBS 31+ 的 WHIP 功能直接对接，也支持自托管 SFU。

### 6. Meshcast 分布式分发

一对一没问题，但一对多时发布者的上传带宽会成瓶颈。Meshcast 服务接收一份流然后分发给多个观看者，减轻发布者的上传压力。

### 7. 丰富的周边工具

| 工具 | 功能 |
|---|---|
| Electron Capture | 桌面应用，无边框捕获 VDO.Ninja 画面 |
| Social Stream Ninja | 聚合 YouTube/Twitch 等平台弹幕到 OBS 叠加层 |
| Caption.Ninja | 浏览器实时字幕和翻译叠加 |
| Comms | 基于 VDO.Ninja 的制作对讲系统 |
| Raspberry.Ninja | 在树莓派/Linux 上用 Python+GStreamer 推流，无需浏览器 |
| Ninja VST3 Plugin | 在 DAW 里收发 VDO.Ninja 音频 |
| Stream Deck Plugin | 用 Stream Deck 控制 VDO.Ninja |

### 8. 多版本可选

- **稳定版**：vdo.ninja（更新不频繁，保证稳定）
- **Alpha 版**：vdo.ninja/alpha（每日更新，尝鲜功能）
- **Mixer App**：自定义布局混音器
- **白板**：可共享白板
- **电竞Feed管理**：versus.cam

### 9. 隐私设计

视频流设计为点对点私密传输，不经过服务器中转（大多数情况）。如果 IP 隐私是顾虑，可以自托管 TURN 服务器。网站尽量不做数据收集。

## 使用方法

### 最快上手：直接用托管服务

1. 发布端：打开 [vdo.ninja](https://vdo.ninja/)，选择 "Add your Camera to OBS"，允许摄像头/麦克风权限，获得一个推流链接和查看链接
2. 接收端（OBS）：添加 Browser Source，URL 填查看链接，宽度 1920 高度 1080
3. 完成，OBS 里就能看到远程画面了

### 多嘉宾场景

1. 创建一个 Director 房间
2. 把邀请链接发给嘉宾
3. 嘉宾在浏览器里打开链接，授权摄像头
4. Director 控制台里管理谁的画面被推送
5. OBS 里添加对应嘉宾的 Browser Source

### 自托管部署

前端是纯静态文件，无需构建步骤：

```bash
# 克隆仓库
git clone https://github.com/steveseguin/vdo.ninja.git
cd vdo.ninja

# 本地预览
python -m http.server 8080 --bind 127.0.0.1
```

生产部署需要 HTTPS（手机等远程设备要求 HTTPS 才能访问摄像头），可以用 Docker 部署：

```bash
# 参考 docker-vdon 项目
# https://github.com/steveseguin/docker-vdon
```

完全离线部署参考 [offline_deployment](https://github.com/steveseguin/offline_deployment)，包含本地信令服务器和证书配置。

### 自托管注意事项

自托管前端不会自动部署后端信令、TURN 和中继服务。需要额外配置：
- **信令服务器**：参考 [websocket_server](https://github.com/steveseguin/websocket_server)
- **TURN 服务器**：参考项目内的 turnserver.md
- 自托管后默认仍使用公共信令服务，除非显式配置 `wss=` 或 `wss2=` 参数

## 适用场景

- **远程嘉宾直播**：访谈、播客连线，嘉宾浏览器打开链接就能参与
- **手机无线摄像头**：多机位拍摄，手机变无线摄像机接入 OBS
- **电竞直播**：远程选手画面接入，配合 Game Capture 工具
- **企业直播**：多地办公室画面汇总到一个直播流
- **教育直播**：远程教师画面 + 屏幕共享接入直播
- **制作对讲**：Comms 工具提供制作团队实时通话

## 小结

VDO.Ninja 在"远程视频接入直播"这个细分领域做得非常深入。WebRTC 点对点传输保证了低延迟，浏览器即用免安装降低了嘉宾参与门槛，导演控制室和周边工具生态覆盖了直播制作的全链路。4000 Star 对于一个细分工具来说已经很高了，而且它还是免费托管 + 开源自托管的模式。如果你做直播需要接入任何远程视频源，VDO.Ninja 是目前最省事的方案，没有之一。
