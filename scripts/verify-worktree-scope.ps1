$ErrorActionPreference = "Stop"

$branch = git branch --show-current

if ($branch -eq "main") {
  throw "Do not run implementation work directly on main"
}

$trackedForbidden = @(
  ".env",
  ".env.local",
  "longju-task.md",
  "prize-breakdown.png"
)

foreach ($file in $trackedForbidden) {
  $tracked = git ls-files -- $file
  if ($tracked) {
    throw "Forbidden file is tracked: $file"
  }
}

$staged = git diff --cached --name-only
$forbiddenPatterns = @(
  "^node_modules/",
  "/node_modules/",
  "^apps/web/.next/",
  "/.next/",
  "/dist/",
  "^dist/",
  "/artifacts/",
  "/cache/",
  "/typechain-types/",
  "\.tsbuildinfo$",
  "^\.env",
  "^longju-task\.md$",
  "^prize-breakdown\.png$"
)

foreach ($file in $staged) {
  foreach ($pattern in $forbiddenPatterns) {
    if ($file -match $pattern) {
      throw "Forbidden staged file: $file"
    }
  }
}

Write-Host "verify-worktree-scope: pass"

