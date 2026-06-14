$ErrorActionPreference = "Stop"

$graphPath = "specs/spec-graph.json"
$statusPath = "specs/status.json"

if (!(Test-Path $graphPath)) {
  throw "Missing $graphPath"
}

if (!(Test-Path $statusPath)) {
  throw "Missing $statusPath"
}

$graph = Get-Content -Raw -Path $graphPath | ConvertFrom-Json
$status = Get-Content -Raw -Path $statusPath | ConvertFrom-Json
$known = @{}

foreach ($spec in $graph.specs) {
  $known[$spec.id] = $spec
}

$allowedStatuses = @("planned", "in_progress", "implemented", "verified", "blocked")
$items = $status.items.PSObject.Properties

foreach ($item in $items) {
  $id = $item.Name
  $value = $item.Value

  if (!$known.ContainsKey($id)) {
    throw "Status contains unknown spec: $id"
  }

  if ($allowedStatuses -notcontains $value.status) {
    throw "Spec $id has invalid status: $($value.status)"
  }

  if ($value.status -eq "verified") {
    $requires = @($known[$id].requires)
    foreach ($required in $requires) {
      $requiredStatus = $status.items.$required.status
      if ($requiredStatus -ne "verified") {
        throw "Spec $id is verified before dependency $required"
      }
    }
  }
}

if (!$known.ContainsKey($status.currentSpec)) {
  throw "currentSpec is not in graph: $($status.currentSpec)"
}

Write-Host "verify-spec-graph: pass"

