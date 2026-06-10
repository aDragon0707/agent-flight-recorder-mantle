# Agent Flight Recorder 工程管理规范 v0.1

## 1. 目标

本文档定义 `Agent Flight Recorder` 黑客松工程的 Git、仓库、分支、提交、发布和安全管理规范。

目标不是建立复杂团队流程，而是在单人或小团队高速开发中保持四件事：

- 可追踪：每个阶段知道改了什么。
- 可回滚：`main` 始终保持可提交状态。
- 可公开：DoraHacks 提交前仓库能整理为 public。
- 可验证：README、demo URL、contract address、explorer link 和视频材料齐全。

## 2. 仓库策略

正式仓库名：

```text
agent-flight-recorder-mantle
```

建议先 private 开发，提交 DoraHacks 前改为 public。

当前本地目录 `F:\Turing test` 可作为规划和临时工作区。正式工程开始时，建议创建独立仓库目录，避免把早期截图、乱码文件或临时材料混进公开 repo。

正式仓库结构：

```text
agent-flight-recorder-mantle/
  apps/
    web/
      Next.js frontend
  packages/
    sacp-core/
      SACP diagnosis, receipt, canonicalization, hashing
  contracts/
    ReceiptAnchor.sol
    Hardhat config, deploy scripts, tests
  docs/
    prd.md
    engineering.md
    architecture.md
    demo-script.md
    submission-checklist.md
  README.md
  .gitignore
  .env.example
```

## 3. 分支策略

使用轻量 Git flow：

```text
main
feature/prd-docs
feature/web-mvp
feature/sacp-core
feature/contracts
feature/wallet-anchor
feature/submission-materials
```

规则：

- `main` 保持可运行、可提交、可公开。
- 每个功能分支只解决一个阶段目标。
- 合并前至少完成对应 verification。
- 不在 `main` 上堆大量未验证改动。
- 黑客松最后提交前从 `main` 打 release tag。

## 4. Commit 规范

使用简洁语义化 commit：

```text
docs: add PRD v0.1
docs: add engineering workflow
feat: add SACP diagnosis core
feat: add receipt anchor contract
feat: connect wallet anchor flow
test: add receipt hashing tests
chore: configure hardhat mantle sepolia
fix: handle wrong wallet network
```

建议类型：

| 类型 | 用途 |
| --- | --- |
| `docs` | 文档、README、提交材料 |
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `test` | 测试 |
| `chore` | 配置、依赖、脚本 |
| `refactor` | 不改变行为的结构调整 |

每个 commit 应该能回答：

- 这次改动服务哪个阶段？
- 是否能被 review？
- 是否引入 secret 或私密信息？

## 5. PR / 合并 Checklist

即使是单人开发，也建议用 PR checklist 做自检。

### 5.1 文档 PR

- [ ] 没有未完成占位。
- [ ] PRD 范围、非目标、验收标准清楚。
- [ ] Mantle Sepolia 参数正确。
- [ ] 不包含私钥、助记词、钱包密码或 API key。

### 5.2 前端 PR

- [ ] 本地能启动。
- [ ] 三列工作台可用。
- [ ] 三个 demo sample 可运行。
- [ ] receipt hash 可生成。
- [ ] 错误状态有清楚提示。
- [ ] 移动端不出现明显布局重叠。

### 5.3 SACP Core PR

- [ ] `diagnoseAgentOutput` 有测试。
- [ ] `buildReceipt` 有测试。
- [ ] `canonicalizeReceipt` 对同一输入稳定。
- [ ] `hashReceipt` 输出 `0x` 开头的 bytes32 hash。
- [ ] 规则诊断结果可解释。

### 5.4 合约 PR

- [ ] `ReceiptAnchor.sol` 有测试。
- [ ] event 字段与前端一致。
- [ ] 部署脚本支持 Mantle Sepolia。
- [ ] verify 脚本或命令写入 README。
- [ ] 合约地址不硬编码到不可维护位置。

### 5.5 提交材料 PR

- [ ] README 包含 setup。
- [ ] README 包含 architecture overview。
- [ ] README 包含 deployed contract address。
- [ ] README 包含 demo URL。
- [ ] README 包含 explorer link。
- [ ] demo video 链接可访问。
- [ ] DoraHacks BUIDL 描述与实际实现一致。

## 6. Release 策略

黑客松提交前打 tag：

```text
v0.1-hackathon-submission
```

打 tag 前必须确认：

- `main` 是最新提交。
- public demo URL 可访问。
- Mantle Sepolia contract address 可用。
- explorer link 可打开。
- README 指向最新地址和视频。
- GitHub repo 已改为 public。
- 没有 secret 泄露。

建议 release notes：

```text
Agent Flight Recorder v0.1

- Rule-based SACP diagnosis for messy agent outputs.
- Structured SACP receipt generation.
- Canonical receipt hashing.
- Mantle Sepolia ReceiptAnchor contract.
- Public frontend demo with wallet-based anchoring and explorer verification.
```

## 7. 环境变量与 Secret 管理

禁止提交：

- wallet private key。
- seed phrase。
- wallet password。
- API key。
- RPC provider private endpoint。
- cookies、tokens、session。

允许提交：

- `.env.example`
- public contract address。
- public explorer URL。
- public wallet address。
- public RPC URL。

`.env.example` 示例：

```text
NEXT_PUBLIC_MANTLE_SEPOLIA_CHAIN_ID=5003
NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz
NEXT_PUBLIC_RECEIPT_ANCHOR_ADDRESS=0x0000000000000000000000000000000000000000
```

部署合约时需要的私钥只能放在本地 `.env`，并确保 `.gitignore` 忽略：

```text
.env
.env.local
.env.*.local
```

## 8. 验证命令规划

实际工程初始化后，建议固定以下命令。

```text
npm run dev
npm run build
npm run lint
npm run test
npm run test:contracts
npm run deploy:mantle-sepolia
npm run verify:mantle-sepolia
```

文档阶段的验证方式：

```text
检查 docs/prd.md 和 docs/engineering.md 是否存在。
检查文档是否包含核心用户流程、接口、验收标准和安全边界。
检查文档是否没有未完成占位。
```

## 9. 开发阶段顺序

### Phase 1: 文档与规格

输出：

- `docs/prd.md`
- `docs/engineering.md`
- `docs/architecture.md`
- `README.md` 初版

验收：

- 范围清楚。
- 技术栈清楚。
- 提交清单清楚。

### Phase 2: 仓库初始化

输出：

- `apps/web`
- `packages/sacp-core`
- `contracts`
- root package scripts。

验收：

- 本地能安装依赖。
- 基础 build 能跑。

### Phase 3: SACP Core

输出：

- `diagnoseAgentOutput`
- `buildReceipt`
- `canonicalizeReceipt`
- `hashReceipt`

验收：

- 三个 demo sample 测试通过。
- 同一 receipt hash 稳定。

### Phase 4: Frontend MVP

输出：

- 三列工作台。
- sample selector。
- diagnosis panel。
- receipt panel。
- hash panel。

验收：

- 评委能在页面上看懂完整逻辑。

### Phase 5: Smart Contract

输出：

- `ReceiptAnchor.sol`
- Hardhat tests。
- Mantle Sepolia deploy script。
- verify command。

验收：

- 合约部署到 Mantle Sepolia。
- 合约在 explorer 可查。

### Phase 6: Wallet + Anchor

输出：

- MetaMask connect。
- Mantle Sepolia network check。
- anchor transaction。
- explorer link。

验收：

- 真实交易可在 explorer 验证。

### Phase 7: Submission

输出：

- public demo URL。
- public GitHub repo。
- deployed contract address。
- demo video。
- DoraHacks BUIDL 页面更新。

验收：

- 外部评委无需本地环境也能理解和验证项目。

## 10. Public 前检查

公开仓库前执行人工检查：

- [ ] 没有 `.env`。
- [ ] 没有 private key。
- [ ] 没有 seed phrase。
- [ ] 没有 wallet password。
- [ ] 没有 API key。
- [ ] 没有无关截图或临时聊天记录。
- [ ] README 中所有链接可访问。
- [ ] contract address 是最新部署地址。
- [ ] demo URL 是公开可访问地址。
- [ ] license 和 attribution 清楚。

## 11. 最小 README 要求

README 至少包含：

- Project overview。
- Why Mantle。
- Demo flow。
- Tech stack。
- Architecture overview。
- Local setup。
- Contract deployment。
- Deployed contract address。
- Demo URL。
- Explorer link。
- Security note。

README 的第一屏必须让评委快速理解：

```text
Agent Flight Recorder makes AI agent work auditable by turning messy outputs into SACP receipts and anchoring receipt hashes on Mantle.
```
