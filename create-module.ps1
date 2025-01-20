$moduleName = Read-Host "Introduce el nombre del modulo"

$basePath = Join-Path -Path (Get-Location) -ChildPath "src\modules\$moduleName"

$folders = @(
    $basePath,
    "$basePath\dto",
    "$basePath\interfaces",
    "$basePath\use-cases"
)


foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
}

$files = @(
    "$basePath\$moduleName.controller.ts",
    "$basePath\$moduleName.repo.ts",
    "$basePath\$moduleName.routes.ts",
    "$basePath\dto\$moduleName.dto.ts",
    "$basePath\interfaces\$moduleName.interface.ts",
    "$basePath\use-cases\get$moduleName`s.use-case.ts"
)

# Crear cada archivo
foreach ($file in $files) {
    New-Item -ItemType File -Path $file -Force | Out-Null
}

Write-Host "La estructura del módulo '$moduleName' se ha creado correctamente en: $basePath" -ForegroundColor Green
