$ErrorActionPreference = "Stop"

$acceptancePath = "docs/project-acceptance.md"
$readmePath = "README.md"
$onchainPath = "docs/onchain-verification.md"

foreach ($file in @($acceptancePath, $readmePath, $onchainPath)) {
  if (!(Test-Path $file)) {
    throw "Missing final acceptance file: $file"
  }
}

$acceptance = Get-Content -Raw -Path $acceptancePath
$readme = Get-Content -Raw -Path $readmePath
$onchain = Get-Content -Raw -Path $onchainPath

if ($acceptance -match "- \\[ \\]") {
  throw "Final acceptance checklist is not complete"
}

if ($readme -match "not deployed|not available|placeholder") {
  throw "README still contains deployment placeholder language"
}

if ($onchain -match "not deployed|not anchored|not available") {
  throw "On-chain verification ledger is incomplete"
}

$tags = git tag --list "v*-hackathon-submission"
if (!$tags) {
  throw "Missing hackathon submission release tag"
}

Write-Host "verify-final-acceptance: pass"

