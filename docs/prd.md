# Agent Flight Recorder PRD v0.1

## 1. 文档目标

本文档定义 DoraHacks The Turing Test Hackathon 2026 参赛项目 `Agent Flight Recorder` 的 MVP 产品需求。

这份 PRD 的第一读者是评委，其次是开发者。它需要同时回答三个问题：

- 这个项目为什么适合 AI DevTools 赛道？
- 它怎样把 SACP 的价值和 Mantle 的链上可信能力结合起来？
- 黑客松期间最小可交付版本到底要做完哪些闭环？

### Implementation Status

本小节只记录当前工程进度，不改变 PRD 的需求范围。

- [x] PRD、工程规范、架构文档已完成。
- [x] GitHub private repo 已创建。
- [x] `feature/project-scaffold` 分支已创建并推送。
- [x] monorepo scaffold 已完成。
- [x] `packages/sacp-core` 最小规则诊断、receipt、canonicalization、hash 与测试已完成。
- [x] `apps/web` 三列工作台 shell 已完成，可 build。
- [x] `contracts` `ReceiptAnchor` skeleton 与基础测试已完成。
- [x] 真实 MetaMask wallet connect 与 anchor transaction。
- [x] Mantle Sepolia 合约部署。
- [x] Mantle Explorer / public RPC verification。
- [x] public frontend demo deployment。
- [x] demo video。
- [x] DoraHacks BUIDL 页面更新并提交审核。

Current verified delivery update (2026-06-14):

- [x] Real MetaMask wallet connect and anchor transaction.
- [x] Mantle Sepolia contract deployment.
- [x] Mantle Explorer / public RPC verification.
- [x] Public frontend demo deployment: `https://agent-flight-recorder-mantle.vercel.app`.
- [x] GitHub repository is public: `https://github.com/aDragon0707/agent-flight-recorder-mantle`.
- [x] Demo video: `https://youtu.be/SfBEMzkSDUM`.
- [x] DoraHacks BUIDL page update: `https://dorahacks.io/buidl/43870`.

一句话定位：

```text
Codex says "done." Agent Flight Recorder makes it prove it.

Agent Flight Recorder turns AI agent work claims into auditable SACP receipts and anchors receipt hashes on Mantle.
```

中文解释：

```text
AI agent 说“done”不等于可信。
Agent Flight Recorder 把 agent 的工作声明转换成可审查 receipt，
再把 receipt hash 写到 Mantle，让用户和评委可以验证这份工作记录确实存在过。
```

核心原则：

```text
No receipt, no trust.
```

## 2. 背景与问题

AI agents 正在被用于写代码、执行工作流、管理钱包、生成报告、调用工具和交接任务。但当 agent 输出 “done”“tested”“deployed”“safe to proceed” 时，用户经常无法确认：

- 它是否真的提供了证据。
- 它是否把不确定结果说成确定完成。
- 它是否越过了需要人类确认的边界。
- 它是否试图把不安全内容写入长期记忆。
- 它的 handoff 是否重复、过期或缺少下一责任人。
- 这次工作记录未来是否还能被验证。

传统日志能记录过程，但经常太长、太私密、太难审查。普通 AI 总结能让日志变短，但不能提供可验证的审计边界。

`Agent Flight Recorder` 的切入点是：不把私密 agent 日志全量上链，而是把 agent 工作转成结构化 SACP receipt，再把 receipt 的 hash 和最小元数据写到 Mantle Sepolia。这样既保护隐私，又给 agent 工作留下可验证的公开锚点。

## 3. 产品定位

`Agent Flight Recorder` 是一个面向 AI agents 的可验证 receipt layer。

它不是完整 AgentOps 平台，不是链上 AI 推理系统，也不是普通日志面板。MVP 的目标是用一个公开可访问的 Web demo 展示端到端闭环：

```text
messy agent output
-> SACP rule-based diagnosis
-> structured SACP receipt
-> canonical receipt hash
-> Mantle Sepolia anchor
-> explorer verification
```

产品在 DoraHacks 中的定位：

- 主赛道：AI DevTools。
- 主要目标：Finalist & Deployment Award。
- 次要目标：AI DevTools Track First Prize。
- 可争取目标：Best UI/UX Award。

正确表述边界：

```text
AI/SACP diagnosis runs off-chain.
The verifiable diagnosis result hash is written on-chain.
```

不应表述为：

```text
AI runs on-chain.
```

## 4. 目标用户

### 4.1 DoraHacks 评委

评委需要在很短时间内判断项目是否真实、完整、可演示、贴合 Mantle 和 AI DevTools。

成功体验：

- 打开公开 demo URL。
- 输入或选择一个 messy agent output。
- 看到诊断结果和 SACP receipt。
- 点击上链。
- 在 Mantle Explorer 打开交易或合约记录。
- 理解这个产品为什么能提升 agent work 的可信度。

### 4.2 AI DevTools 开发者

开发者希望把 agent 输出变成可审查、可追踪、可复用的结构化结果。

成功体验：

- 能理解 receipt 数据结构。
- 能看到 diagnosis rule 如何判断 unsupported claim、missing evidence、unsafe memory promotion 等问题。
- 能复用 `packages/sacp-core` 中的核心函数。

### 4.3 Agent Workflow 使用者

这类用户关心 agent 说“完成”之后自己是否可以放心继续下一步。

成功体验：

- 能看到 agent 输出中的风险点。
- 能看到下一步应该由 agent 修复，还是由人类 review。
- 能拿到可验证的 receipt hash。

## 5. MVP 范围

### 5.1 必须完成

- 一个公开可访问的前端 demo，不能只停留在 localhost。
- 三列工作台 UI：
  - 左列：messy agent output 输入区和示例选择。
  - 中列：SACP diagnosis 和 structured receipt。
  - 右列：receipt hash、钱包连接、Mantle anchor、explorer verification。
- 规则诊断能力，至少覆盖：
  - unsupported completion claims。
  - missing evidence。
  - unsafe memory promotion。
  - unclear next owner。
  - duplicate or stale handoff。
  - public claims needing stronger boundaries。
- SACP receipt 生成。
- receipt canonicalization。
- receipt hash 生成。
- Mantle Sepolia `ReceiptAnchor` 合约。
- 使用钱包把 receipt hash 和状态元数据写入 Mantle Sepolia。
- 显示 transaction hash 和 Mantle Explorer 链接。
- README 包含 setup、architecture、demo flow、deployed contract address。
- 至少 2 分钟 demo video。
- DoraHacks BUIDL 页面更新 demo URL、GitHub repo、contract address、video。

### 5.2 应该完成

- 三个固定演示样例：
  - agent 声称完成但没有证据。
  - agent 声称测试通过但没有测试输出。
  - agent 试图不安全地提升长期记忆。
- 清晰的状态码和风险解释。
- 一个适合评委截图和录屏的 UI。
- 公开提交前的 release tag：`v0.1-hackathon-submission`。

### 5.3 暂不完成

- 用户账号系统。
- 数据库。
- 完整后端服务。
- 强依赖 OpenAI API。
- IPFS 存储。
- Mantle mainnet 部署。
- ERC-8004 实现。
- LangSmith / Langfuse 级别的完整可观测平台。
- 多 agent 编排平台。

## 6. 核心用户流程

### 6.1 评委演示流程

1. 用户打开公开 demo URL。
2. 用户选择一个 messy agent output 示例，或手动粘贴 agent 输出。
3. 系统运行 SACP 规则诊断。
4. 系统展示诊断结果：
   - status code。
   - detected risks。
   - evidence summary。
   - required fix。
   - next owner。
5. 系统生成 structured SACP receipt。
6. 系统生成 canonical receipt string。
7. 系统生成 receipt hash。
8. 用户连接 MetaMask。
9. 用户确认 Mantle Sepolia 网络。
10. 用户点击 anchor。
11. 钱包发起交易。
12. 交易成功后，系统展示 tx hash 和 explorer link。
13. 用户打开 Mantle Explorer 验证链上记录。

### 6.2 开发者理解流程

1. 开发者阅读 README。
2. 开发者查看 `packages/sacp-core` 的接口。
3. 开发者理解 receipt schema。
4. 开发者运行本地 demo。
5. 开发者部署或调用 `ReceiptAnchor` 合约。

## 7. 功能需求

### 7.1 输入区

左列输入区需要支持：

- 文本框粘贴 messy agent output。
- 选择固定示例。
- 清空输入。
- 运行诊断。

输入区不需要支持文件上传。

### 7.2 规则诊断

MVP 使用确定性规则，不依赖 LLM。

诊断结果至少包含：

- `statusCode`
- `riskLevel`
- `findings`
- `evidenceSummary`
- `requiredFix`
- `nextOwner`

建议状态码：

| 状态码 | 含义 |
| --- | --- |
| `PASS_WITH_EVIDENCE` | agent claim 有基本证据支撑 |
| `NEEDS_EVIDENCE` | 声称完成但证据不足 |
| `NEEDS_HUMAN_REVIEW` | 涉及边界、权限、资金、发布或安全判断 |
| `BLOCKED_UNSAFE_MEMORY` | 存在不安全长期记忆提升 |
| `STALE_OR_DUPLICATE_HANDOFF` | handoff 重复、过期或缺少上下文 |

### 7.3 SACP Receipt

Receipt 需要让 agent 工作从自然语言声明变成可审查对象。

最小字段：

```ts
type SACPReceipt = {
  protocol: "SACP";
  version: "0.1";
  receiptId: string;
  agentId: string;
  taskId: string;
  statusCode: string;
  riskLevel: "low" | "medium" | "high";
  evidenceSummary: string;
  findings: string[];
  requiredFix: string;
  nextOwner: "agent" | "human" | "developer";
  sourceDigest: string;
  createdAt: string;
};
```

### 7.4 Hash 生成

系统需要把 receipt 转成稳定 canonical string，再生成 hash。

要求：

- 同一份 receipt 在同一规则下生成同一个 hash。
- hash 用于链上 anchor。
- UI 中显示完整 hash。
- UI 中说明链上不保存原始私密日志。

### 7.5 钱包与网络

前端需要支持 MetaMask。

要求：

- 连接钱包。
- 检查 Mantle Sepolia。
- 如果当前网络不是 Mantle Sepolia，引导用户切换。
- 展示当前钱包地址。
- 不读取、不要求、不保存私钥、助记词或钱包密码。

Mantle Sepolia 参数：

```text
RPC: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Symbol: MNT
Explorer: https://sepolia.mantlescan.xyz/
```

### 7.6 合约 Anchor

合约名建议：

```text
ReceiptAnchor
```

最小链上字段：

- `receiptHash`
- `statusCode`
- `agentIdHash`
- `taskIdHash`
- `submitter`
- `timestamp`

建议事件：

```solidity
event ReceiptAnchored(
    bytes32 indexed receiptHash,
    bytes32 indexed agentIdHash,
    bytes32 indexed taskIdHash,
    string statusCode,
    address submitter,
    uint256 timestamp
);
```

### 7.7 Explorer Verification

交易成功后，前端需要展示：

- transaction hash。
- explorer transaction link。
- contract address。
- 简短 verification explanation。

示例解释：

```text
This receipt hash is anchored on Mantle Sepolia. The original agent log stays off-chain; the chain stores a verifiable fingerprint and minimal audit metadata.
```

## 8. 最小接口

后续工程实现应围绕以下接口组织：

```ts
function diagnoseAgentOutput(input: string): Diagnosis;

function buildReceipt(diagnosis: Diagnosis): SACPReceipt;

function canonicalizeReceipt(receipt: SACPReceipt): string;

function hashReceipt(canonicalReceipt: string): `0x${string}`;

async function anchorReceipt(
  receiptHash: `0x${string}`,
  statusCode: string,
  agentIdHash: `0x${string}`,
  taskIdHash: `0x${string}`
): Promise<`0x${string}`>;
```

`anchorReceipt` 返回 transaction hash。

## 9. 建议工程结构

建议使用轻量 monorepo：

```text
agent-flight-recorder-mantle/
  apps/
    web/
      Next.js + TypeScript frontend
  packages/
    sacp-core/
      diagnosis, receipt, canonicalization, hashing
  contracts/
    ReceiptAnchor.sol
    Hardhat deploy and verify scripts
  docs/
    prd.md
    engineering.md
    architecture.md
    demo-script.md
  README.md
```

## 10. 技术栈

MVP 锁定：

- Frontend: `Next.js + TypeScript`
- Styling: 以清晰、密集、开发者工具风格为主
- Wallet / contract calls: `wagmi` 或 `viem`
- Smart contract: `Solidity`
- Contract tooling: `Hardhat`
- Network: `Mantle Sepolia`
- Core package: browser-safe TypeScript

MVP 不强制使用 OpenAI API。

## 11. 验收标准

### 11.1 产品验收

- 评委能在 2-5 分钟内完成完整 demo flow。
- 页面能清楚展示“诊断 -> receipt -> hash -> 上链 -> 验证”。
- 至少 3 个示例能稳定生成不同 receipt。
- receipt hash 能显示在 UI。
- 交易成功后能打开 explorer link。

### 11.2 工程验收

- 项目能本地启动。
- `packages/sacp-core` 可独立测试。
- 合约可部署到 Mantle Sepolia。
- 合约地址写入 README。
- README 包含 setup、architecture、demo flow、deployed contract address。

### 11.3 DoraHacks 提交验收

- public demo URL。
- public GitHub repo。
- deployed contract address。
- Mantle Explorer verification link。
- 至少 2 分钟 demo video。
- BUIDL 页面描述更新为当前实现。

### 11.4 安全验收

- 仓库不包含私钥。
- 仓库不包含 seed phrase。
- 仓库不包含钱包密码。
- 仓库不包含 API key。
- `.env.example` 只包含变量名和占位说明。

## 12. 主要风险与应对

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| Mantle 集成看起来太浅 | 影响 Deployment Award 和生态 fit | 上链保存 hash + 状态 + agent/task hash，并提供 explorer 验证 |
| 诊断像普通 AI 总结器 | 影响 AI DevTools 评分 | 使用明确 rule、status code、required fix、next owner |
| 前端只是静态展示 | 影响 demo 可信度 | 必须接 MetaMask 和真实 Mantle Sepolia 合约 |
| 合约未验证或地址缺失 | 影响提交完整度 | README 和 DoraHacks 页面写清 contract address 与 explorer |
| 范围过大 | 无法按时交付 | MVP 不做账号、数据库、完整后端、mainnet |
| 泄露密钥 | 严重安全风险 | 所有私钥只放本地 env，不提交仓库 |

## 13. 后续路线

黑客松后可扩展：

- 接入 LLM diagnosis API。
- 引入 IPFS 或去中心化存储保存加密 receipt。
- 支持多 agent handoff graph。
- 支持 agent reputation score。
- 支持组织级审计 dashboard。
- 支持更多链或 agent identity 标准。
