$ErrorActionPreference = "Stop"

$files = git ls-files
$patterns = @(
  "PRIVATE_KEY\s*=\s*[A-Za-z0-9_]{12,}",
  "MANTLE_SEPOLIA_PRIVATE_KEY\s*=\s*[A-Za-z0-9_]{12,}",
  "gho_[A-Za-z0-9_]+",
  "github_pat_[A-Za-z0-9_]+",
  "seed phrase:\s+\S+",
  "wallet password:\s+\S+",
  "0x[a-fA-F0-9]{64}"
)

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

