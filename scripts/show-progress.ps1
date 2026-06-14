$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Read-Json($Path) {
  if (!(Test-Path $Path)) {
    throw "Missing $Path"
  }
  Get-Content -Raw -Encoding utf8 -Path $Path | ConvertFrom-Json
}

function Strip-Code($Value) {
  if ($null -eq $Value) {
    return ""
  }
  return (($Value.ToString()).Trim() -replace '`', "")
}

function Parse-TaskBoard {
  $rows = @{}
  $lines = Get-Content -Encoding utf8 -Path "specs/task-board.md"

  foreach ($line in $lines) {
    $trimmed = $line.Trim()
    if (!$trimmed.StartsWith("|")) {
      continue
    }

    $cells = $trimmed.Trim("|").Split("|") | ForEach-Object { $_.Trim() }
    if ($cells.Count -lt 7) {
      continue
    }

    $id = $cells[0]
    if ($id -match "^\d{3}-") {
      $rows[$id] = [pscustomobject]@{
        Task = $cells[1]
        Block = $cells[2]
        Status = $cells[3]
        Branch = Strip-Code $cells[4]
        Evidence = Strip-Code $cells[5]
        DocsSync = $cells[6]
      }
    }
  }

  return $rows
}

function Parse-Acceptance {
  $rows = @()
  $lines = Get-Content -Encoding utf8 -Path "docs/project-acceptance.md"

  foreach ($line in $lines) {
    $trimmed = $line.Trim()
    if (!$trimmed.StartsWith("|")) {
      continue
    }

    $cells = $trimmed.Trim("|").Split("|") | ForEach-Object { $_.Trim() }
    if ($cells.Count -lt 4) {
      continue
    }

    if ($cells[0] -eq "Block" -or $cells[0] -match "^-+$") {
      continue
    }

    $rows += [pscustomobject]@{
      Block = $cells[0]
      Status = $cells[1]
      Evidence = Strip-Code $cells[2]
      LastVerified = $cells[3]
    }
  }

  return $rows
}

$taskExplanations = @{
  "000-scaffold" = [pscustomobject]@{
    Technical = "建立 pnpm workspace、web、sacp-core、contracts 和治理门禁。"
    Plain = "先把项目地基搭好，让后面每一步都能安装、构建、测试和验收。"
    Decision = "不需要。这个任务已经完成。"
  }
  "001-wallet-detection" = [pscustomobject]@{
    Technical = "检测浏览器运行时是否存在 window.ethereum injected provider。"
    Plain = "看用户浏览器里有没有装小狐狸钱包，但不点连接、不授权、不拿地址。"
    Decision = "不需要。这个任务边界很小，可以直接执行。"
  }
  "002-wallet-connect" = [pscustomobject]@{
    Technical = "请求用户授权连接钱包，拿到公开钱包地址。"
    Plain = "让用户点一次连接钱包，系统知道是哪个公开地址在操作。"
    Decision = "需要。这里会弹钱包授权，需要确认 UI 文案和授权时机。"
  }
  "003-mantle-network-check" = [pscustomobject]@{
    Technical = "确认钱包当前是否在 Mantle Sepolia。"
    Plain = "检查钱包是不是切到了比赛要用的 Mantle 测试网。"
    Decision = "不需要。按 Mantle Sepolia 作为默认测试网络执行。"
  }
  "004-mantle-network-switch" = [pscustomobject]@{
    Technical = "请求钱包切换到 Mantle Sepolia。"
    Plain = "帮用户把钱包网络切到正确测试网。"
    Decision = "需要。这里会触发钱包弹窗，需要确认失败提示。"
  }
  "005-contract-deploy" = [pscustomobject]@{
    Technical = "把 ReceiptAnchor 合约部署到 Mantle Sepolia。"
    Plain = "把我们用来记录 receipt hash 的合约放到链上。"
    Decision = "需要。部署会使用本地私钥和测试币，执行前必须人工确认。"
  }
  "006-anchor-transaction" = [pscustomobject]@{
    Technical = "把 receipt hash 写入已部署合约。"
    Plain = "把 AI 工作记录的指纹写到链上留痕。"
    Decision = "需要。这里会发起真实测试网交易。"
  }
  "007-explorer-verification" = [pscustomobject]@{
    Technical = "用 Mantle Explorer 验证交易和事件。"
    Plain = "让评委能在区块浏览器里看到这次记录。"
    Decision = "不需要。按交易 hash 和合约 event 验证即可。"
  }
  "008-public-demo-deploy" = [pscustomobject]@{
    Technical = "部署公开前端 demo。"
    Plain = "给评委一个不用本地安装也能打开的网页。"
    Decision = "需要。要确认部署平台和公开 URL。"
  }
  "009-submission-package" = [pscustomobject]@{
    Technical = "整理 DoraHacks 最终提交材料。"
    Plain = "把 GitHub、demo、合约地址、视频都整理到提交页。"
    Decision = "需要。提交前需要人工最终确认。"
  }
}

$status = Read-Json "specs/status.json"
$graph = Read-Json "specs/spec-graph.json"
$boardRows = Parse-TaskBoard
$acceptanceRows = Parse-Acceptance
$previousErrorActionPreference = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$branch = git branch --show-current 2>$null
$gitExitCode = $LASTEXITCODE
$ErrorActionPreference = $previousErrorActionPreference
if ($gitExitCode -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
  $branch = "未知"
}
$currentSpec = $status.currentSpec
$currentItem = $status.items.$currentSpec
$currentBoard = $boardRows[$currentSpec]

Write-Host ""
Write-Host "Agent Flight Recorder 项目进度"
Write-Host ""
Write-Host "当前分支：$branch"
Write-Host "当前任务：$currentSpec"
if ($currentItem -and $currentItem.status -eq "planned") {
  Write-Host "下一步建议：开 $($currentItem.branch)"
} elseif ($currentItem -and $currentItem.status -eq "in_progress") {
  Write-Host "下一步建议：继续当前任务 $($currentItem.branch)"
} else {
  Write-Host "下一步建议：查看中文任务板和 handoff"
}

Write-Host ""
Write-Host "任务链路："
for ($index = 0; $index -lt $graph.specs.Count; $index++) {
  $spec = $graph.specs[$index]
  $row = $boardRows[$spec.id]
  if ($row) {
    $number = ($spec.id -split "-")[0]
    Write-Host "[$($row.Status)] $number $($row.Task)"
    if ($index -lt ($graph.specs.Count - 1)) {
      Write-Host "    ↓"
    }
  }
}

Write-Host ""
Write-Host "任务说明："
foreach ($spec in $graph.specs) {
  $row = $boardRows[$spec.id]
  $item = $status.items.$($spec.id)
  $explanation = $taskExplanations[$spec.id]

  if (!$row -or !$item -or !$explanation) {
    continue
  }

  $number = ($spec.id -split "-")[0]
  $evidence = $item.evidence
  if ([string]::IsNullOrWhiteSpace($evidence)) {
    if ($item.status -eq "implemented") {
      $evidenceText = "暂无。代码已实现，等待真实交易/人工验收后才能生成 verified evidence。"
    } else {
      $evidenceText = "暂无，因为还没开始实现。"
    }
  } elseif (Test-Path $evidence) {
    $evidenceText = "$evidence（存在）"
  } else {
    $evidenceText = "$evidence（缺失）"
  }

  Write-Host ""
  Write-Host "$number $($row.Task)"
  Write-Host ""
  Write-Host "技术说法："
  Write-Host $explanation.Technical
  Write-Host ""
  Write-Host "大白话："
  Write-Host $explanation.Plain
  Write-Host ""
  Write-Host "当前状态："
  Write-Host $row.Status
  Write-Host ""
  Write-Host "证据："
  Write-Host $evidenceText
  Write-Host ""
  Write-Host "人类是否需要判断："
  Write-Host $explanation.Decision
}

Write-Host ""
Write-Host "Project Acceptance 总账本："
foreach ($row in $acceptanceRows) {
  Write-Host "- $($row.Block)：$($row.Status)，证据：$($row.Evidence)"
}

$missingEvidence = @()
foreach ($property in $status.items.PSObject.Properties) {
  $id = $property.Name
  $item = $property.Value
  if ($item.status -eq "verified" -and (!(Test-Path $item.evidence))) {
    $missingEvidence += $id
  }
}

Write-Host ""
Write-Host "人类检查结论："
if ($missingEvidence.Count -gt 0) {
  Write-Host "需要先同步文档或证据。缺失证据任务：$($missingEvidence -join ', ')"
} else {
  Write-Host "可以继续推进。"
}




