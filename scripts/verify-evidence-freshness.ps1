$ErrorActionPreference = "Stop"

$statusPath = "specs/status.json"

if (!(Test-Path $statusPath)) {
  throw "Missing $statusPath"
}

$status = Get-Content -Raw -Path $statusPath | ConvertFrom-Json

foreach ($property in $status.items.PSObject.Properties) {
  $id = $property.Name
  $item = $property.Value

  if ($item.status -ne "verified") {
    continue
  }

  if ([string]::IsNullOrWhiteSpace($item.evidence)) {
    throw "Verified spec $id has no evidence path"
  }

  if (!(Test-Path $item.evidence)) {
    throw "Verified spec $id evidence file does not exist: $($item.evidence)"
  }

  $content = Get-Content -Raw -Path $item.evidence

  if ($content -notmatch [regex]::Escape($item.commit)) {
    throw "Evidence for $id does not contain commit $($item.commit)"
  }

  if ($content -notmatch "## Commands") {
    throw "Evidence for $id is missing Commands section"
  }

  if ($content -notmatch "## Results") {
    throw "Evidence for $id is missing Results section"
  }
}

Write-Host "verify-evidence-freshness: pass"

