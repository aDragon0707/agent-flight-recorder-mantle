$ErrorActionPreference = "Stop"

$files = git ls-files
$patterns = @(
  "(?i)(PRIVATE_KEY|MANTLE_SEPOLIA_PRIVATE_KEY|MNEMONIC|SECRET|API_KEY)\s*=[ \t]*['""]?[A-Za-z0-9_./+=:-]{12,}['""]?",
  "gho_[A-Za-z0-9_]+",
  "github_pat_[A-Za-z0-9_]+",
  "seed phrase:\s+\S+",
  "wallet password:\s+\S+"
)
# Note: a bare 0x + 64 hex literal is intentionally NOT flagged. Public on-chain
# artifacts (transaction hashes, block hashes) share that shape and are recorded in
# docs/evidence and onchain-verification. Secrets are caught only in sensitive
# assignment contexts (PRIVATE_KEY= / MNEMONIC= / SECRET= / API_KEY=), with optional
# surrounding quotes handled on the same line. The value match uses [ \t]* (not \s*)
# after "=" so an empty key cannot borrow the next line's text as its value.

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

