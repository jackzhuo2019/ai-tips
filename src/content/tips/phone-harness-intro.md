---
title: "Phone Harness：让 AI Agent 控制你的手机，iPhone 和 Android 都支持"
description: "Phone Harness 是一个让 Claude Code、Codex 等 AI Agent 控制真实手机的开源工具，iPhone 通过 Mac 的 iPhone Mirroring 控制，Android 通过 adb 控制，无需越狱或安装任何东西，支持截屏、OCR、点击、滑动、输入等操作。项目地址：https://github.com/ShawnPana/phone-harness"
category: "workflow"
tags: ["Phone Harness", "手机自动化", "AI Agent", "iPhone", "Android", "adb", "开源工具"]
difficulty: "进阶"
date: 2026-10-10
---

## 项目介绍

Phone Harness 是一个让 AI Agent 控制真实手机的开源工具，核心思路是把手机屏幕变成 agent 可以"看"和"操作"的界面。Agent 能看到手机屏幕、点击按钮、输入文字、读取结果，完全像人类操作手机一样。

项目地址：[https://github.com/ShawnPana/phone-harness](https://github.com/ShawnPana/phone-harness)

它解决的问题是：手机上的操作长期是自动化的盲区。传统的手机自动化要么需要 root/越狱，要么需要写 Appium 测试脚本，门槛高且不灵活。Phone Harness 走了一条不一样的路——iPhone 通过 macOS 的 iPhone Mirroring 功能把手机画面投到 Mac 窗口里，Harness 截取这个窗口做 OCR 识别文字并获取可点击坐标；Android 则直接用 adb 的 screencap 截屏 + accessibility tree 读取文字 + input 模拟操作。两边暴露同一套 helper API，agent 不用关心底层差异。

支持 Claude Code、Codex 等主流 coding agent，通过 skill 注册后 agent 可以直接调用。也提供云端手机服务（Phone Harness Cloud），无需自己连接设备。

## 核心功能

### 1. iPhone 控制（通过 iPhone Mirroring）

利用 macOS 的 iPhone Mirroring 功能，把 iPhone 画面渲染为 Mac 窗口。Harness 通过 Apple Vision 框架做 OCR 识别文字并获取可点击坐标，通过 HID 级事件发送点击、滑动和输入操作。无需越狱，无需 Xcode，手机上不需要安装任何东西。

### 2. Android 控制（通过 adb）

使用 adb 作为传输层：screencap 截屏、accessibility tree 读取文字、input 模拟触摸和输入。支持 USB 或 Wi-Fi 连接，不需要窗口。在 macOS、Linux、Windows 上均可运行。

### 3. 统一 API

iPhone 和 Android 使用同一套 helper 函数，agent 不需要关心平台差异：

| Helper | 功能 |
|---|---|
| `open_app(name)` | 打开应用 |
| `tap(x, y)` | 点击坐标 |
| `tap_text(text)` | 点击指定文字 |
| `type_text(text)` | 输入文字 |
| `screenshot()` | 截屏 |
| `ocr()` | OCR 识别屏幕文字 |
| `swipe(...)` | 滑动操作 |

### 4. Agent Skill 集成

安装在 PATH 上后通过 `phone-harness skill` 注册为 agent skill。`SKILL.md` 文件是 agent 的日常操作指南，agent 可以自主查阅全部可用 helper。

### 5. 云端手机

Phone Harness Cloud 提供托管 Android 手机，功能完整、helpers 不变：

```bash
phone-harness cloud login     # 浏览器授权
phone-harness cloud start     # 启动专属手机，应用和登录态保留
phone-harness cloud stop      # 停止计费，手机保留
```

前 100 分钟免费，支持 `ls`、`watch`、`history`、`start --temp`（临时手机）等命令。

### 6. 健康检查

`phone-harness --doctor` 检查整个链路是否正常：连接、权限、OCR 引擎等。

## 使用方法

### 设置

在 Claude Code 或 Codex 中粘贴：

```text
Set up phone-harness for me. Clone https://github.com/ShawnPana/phone-harness
into ~/.phone-harness, read `install.md` first, install it so `phone-harness`
is a command on my PATH, and register it as an agent skill named phone-harness
using `phone-harness skill` as the body. Then read `onboarding.md` and walk
me through it.
```

Agent 会引导你完成需要手动操作的部分：

- **iPhone**：配对 iPhone Mirroring，授予 Mac 的 Accessibility 和 Screen Recording 权限
- **Android**：开启开发者选项，批准 adb 调试授权

### 基本操作

直接用 helper 脚本控制手机：

```bash
phone-harness <<'PY'
open_app("Notes")
tap_text("New Note")
type_text("hello from the harness")
print([o["text"] for o in ocr()][:10])
PY
```

Helpers 已预导入，不需要 import。通过 agent 自然交互时，agent 会自动选择合适的 helper 完成任务。

### 平台切换

```bash
phone-harness config set platform ios
# 或
phone-harness config set platform android
```

### 通过 Agent 执行任务

安装好 skill 后，直接对 Claude Code 或 Codex 说自然语言任务，比如"B отк за мне Waymo to Delah Coffee"，agent 会自动调用 helper 完成操作：打开 Waymo app、点击叫车、输入地址、确认。

## 适用场景

- **手机操作自动化**：日常重复的手机操作交给 agent 完成，省时省力
- **App 测试**：用自然语言描述测试流程，agent 在真机上执行
- **coding agent 扩展**：给 Claude Code、Codex 等加上手机控制能力，打通桌面+手机全链路
- **无设备开发**：用 Cloud 手机进行测试，不需要手头有真机
- **辅助场景**：对于不便手动操作手机的情况，用 agent 代为处理

## 已知限制

- iPhone 锁屏会暂停 Mirroring；Android PIN 锁需要用户手动解锁
- OCR 只能识别文字，不能识别图标，无标签控件需要截图 + 视觉模型配合
- 不支持多点触控、摄像头和 Face ID 流程
- DRM 视频会渲染黑屏
- 连接手机始终需要用户自己操作

## 小结

Phone Harness 在"让 AI agent 控制手机"这个领域做了一个非常实用的方案。iPhone 走 iPhone Mirroring + Apple Vision OCR，Android 走 adb + accessibility tree，两套底层技术统一到同一 API，agent 不用关心差异。不需要越狱或 root，手机上不安装任何东西，这两点对易用性帮助很大。Skill 注册和 agent 集成让它在 Claude Code、Codex 中开箱即用，Cloud 手机提供无设备选项。虽然在多点触控和 DRM 等方面有局限，但在大多数手机自动化场景中已经够用。如果你想让 coding agent 也能操作手机，Phone Harness 是目前最省事的选择。
