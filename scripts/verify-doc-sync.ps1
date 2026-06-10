$ErrorActionPreference = "Stop"

$requiredFiles = @(
  "docs/prd.md",
  "docs/architecture.md",
  "README.md",
  "specs/spec-graph.json",
  "specs/status.json",
  "specs/task-board.md",
  "docs/handoff.md",
  "docs/project-acceptance.md"
)

foreach ($file in $requiredFiles) {
  if (!(Test-Path $file)) {
    throw "Missing required sync file: $file"
  }
}

$prd = Get-Content -Raw -Path "docs/prd.md"
$architecture = Get-Content -Raw -Path "docs/architecture.md"
$readme = Get-Content -Raw -Path "README.md"
$board = Get-Content -Raw -Path "specs/task-board.md"
$graph = Get-Content -Raw -Path "specs/spec-graph.json" | ConvertFrom-Json
$status = Get-Content -Raw -Path "specs/status.json" | ConvertFrom-Json
$handoff = Get-Content -Raw -Path "docs/handoff.md"

if ($prd -notmatch "Implementation Status") {
  throw "PRD is missing Implementation Status"
}

if ($architecture -notmatch "Implementation Status") {
  throw "Architecture is missing Implementation Status"
}

if ($readme -notmatch "scaffold stage") {
  throw "README is missing scaffold status"
}

$boardRows = @{}
$board -split "`n" | ForEach-Object {
  $line = $_.Trim()
  if (!$line.StartsWith("|")) {
    return
  }
  if ($line -match "^\|\s*ID\s*\|") {
    return
  }
  if ($line -match "^\|\s*-+\s*\|") {
    return
  }

  $cells = $line.Trim("|").Split("|") | ForEach-Object { $_.Trim() }
  if ($cells.Count -lt 7) {
    return
  }

  $id = $cells[0]
  if ($id -match "^\d{3}-") {
    $boardRows[$id] = [pscustomobject]@{
      Task = $cells[1]
      Block = $cells[2]
      Status = $cells[3]
      Branch = ($cells[4] -replace '`', "")
      Evidence = ($cells[5] -replace '`', "")
      DocsSync = $cells[6]
    }
  }
}

foreach ($spec in $graph.specs) {
  $id = $spec.id
  $item = $status.items.$id

  if (!$item) {
    throw "status.json missing spec $id"
  }

  if (!$boardRows.ContainsKey($id)) {
    throw "Task board missing row for spec $id"
  }

  $row = $boardRows[$id]

  if ($row.Status -ne $item.status) {
    throw "Task board status mismatch for $id. Board=$($row.Status), status.json=$($item.status)"
  }

  if ($row.Branch -ne $item.branch) {
    throw "Task board branch mismatch for $id. Board=$($row.Branch), status.json=$($item.branch)"
  }

  if ($item.status -eq "verified") {
    if ($row.Evidence -ne $item.evidence) {
      throw "Task board evidence mismatch for $id. Board=$($row.Evidence), status.json=$($item.evidence)"
    }

    if ($row.DocsSync -eq "-") {
      throw "Verified spec $id has no docs sync entry in task board"
    }

    if ($architecture -notmatch [regex]::Escape($id)) {
      throw "Architecture is missing verified spec id $id"
    }
  }
}

$currentSpecFiles = Get-ChildItem -Path "specs" -Filter "$($status.currentSpec)*.md" -File
if (!$currentSpecFiles) {
  throw "Missing current spec file for $($status.currentSpec)"
}

if ($handoff -notmatch [regex]::Escape($status.currentSpec)) {
  throw "Handoff is missing current spec $($status.currentSpec)"
}

foreach ($property in $status.items.PSObject.Properties) {
  $id = $property.Name
  $item = $property.Value
  if ($item.status -eq "verified") {
    $verifiedSpecFiles = Get-ChildItem -Path "specs" -Filter "$id*.md" -File
    if (!$verifiedSpecFiles) {
      throw "Missing verified spec file for $id"
    }
  }
}

Write-Host "verify-doc-sync: pass"
