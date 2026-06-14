$ErrorActionPreference = "Stop"

$statusPath = "specs/status.json"
$acceptancePath = "docs/project-acceptance.md"

if (!(Test-Path $statusPath)) {
  throw "Missing $statusPath"
}

if (!(Test-Path $acceptancePath)) {
  throw "Missing $acceptancePath"
}

function Strip-Code($Value) {
  if ($null -eq $Value) {
    return ""
  }
  return (($Value.ToString()).Trim() -replace '`', "")
}

function Parse-AcceptanceRows {
  $rows = @{}
  $lines = Get-Content -Encoding utf8 -Path $acceptancePath

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

    $rows[$cells[0]] = [pscustomobject]@{
      Status = $cells[1]
      Evidence = Strip-Code $cells[2]
      LastVerified = $cells[3]
    }
  }

  return $rows
}

$specToAcceptanceBlock = @{
  "000-scaffold" = "Scaffold"
  "001-wallet-detection" = "Wallet Detection"
  "002-wallet-connect" = "Wallet Connect"
  "003-mantle-network-check" = "Mantle Network Check"
  "004-mantle-network-switch" = "Mantle Network Switch"
  "005-contract-deploy" = "Contract Deploy"
  "006-anchor-transaction" = "Anchor Transaction"
  "007-explorer-verification" = "Explorer Verification"
  "008-public-demo-deploy" = "Public Demo Deploy"
  "009-submission-package" = "DoraHacks Submission"
}

$status = Get-Content -Raw -Encoding utf8 -Path $statusPath | ConvertFrom-Json
$acceptanceRows = Parse-AcceptanceRows

foreach ($property in $status.items.PSObject.Properties) {
  $specId = $property.Name
  $item = $property.Value

  if ($item.status -ne "verified") {
    continue
  }

  if (!$specToAcceptanceBlock.ContainsKey($specId)) {
    throw "No project acceptance mapping for verified spec $specId"
  }

  $block = $specToAcceptanceBlock[$specId]
  if (!$acceptanceRows.ContainsKey($block)) {
    throw "Project acceptance ledger is missing block '$block' for spec $specId"
  }

  $row = $acceptanceRows[$block]
  if ($row.Status -ne "verified") {
    throw "Project acceptance block '$block' must be verified because $specId is verified. Current status: $($row.Status)"
  }

  if ([string]::IsNullOrWhiteSpace($item.evidence)) {
    throw "Verified spec $specId has no evidence path in status.json"
  }

  if ($row.Evidence -ne $item.evidence) {
    throw "Project acceptance evidence mismatch for $specId. Ledger=$($row.Evidence), status.json=$($item.evidence)"
  }
}

Write-Host "verify-project-acceptance: pass"
