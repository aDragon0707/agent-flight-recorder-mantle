$ErrorActionPreference = "Stop"

$files = git ls-files
$patterns = @(
  "PRIVATE_KEY\s*=[ \t]*[A-Za-z0-9_]{12,}",
  "MANTLE_SEPOLIA_PRIVATE_KEY\s*=[ \t]*[A-Za-z0-9_]{12,}",
  "MNEMONIC\s*=[ \t]*[A-Za-z0-9_]{12,}",
  "SECRET\s*=[ \t]*[A-Za-z0-9_]{12,}",
  "API_KEY\s*=[ \t]*[A-Za-z0-9_]{12,}",
  "gho_[A-Za-z0-9_]+",
  "github_pat_[A-Za-z0-9_]+",
  "seed phrase:\s+\S+",
  "wallet password:\s+\S+"
)
# Note: a bare 0x + 64 hex literal is intentionally NOT flagged. Public on-chain
# artifacts (transaction hashes, block hashes) share that shape and are recorded in
# docs/evidence and onchain-verification. Private keys are caught by the assignment-
# context patterns above (PRIVATE_KEY= / MNEMONIC= / SECRET= / API_KEY=), not by shape.

$excluded = @(
  "pnpm-lock.yaml"
)

foreach ($file in $files) {
  if ($excluded -contains $file) {
    continue
  }

  if (!(Test-Path $file)) {
    continue
  }

  $content = Get-Content -Raw -Path $file -ErrorAction SilentlyContinue
  foreach ($pattern in $patterns) {
    if ($content -match $pattern) {
      throw "Potential secret pattern '$pattern' found in $file"
    }
  }
}

Write-Host "verify-no-secrets: pass"

