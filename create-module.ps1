$moduleName = Read-Host "Introduce el nombre del modulo"


$basePath = Join-Path -Path (Get-Location) -ChildPath "src\modules\$moduleName"


$folders = @(
    "$basePath\application",
    "$basePath\application\use-cases",
    "$basePath\domain",
    "$basePath\domain\dto",
    "$basePath\domain\interfaces",
    "$basePath\infrastructure",
    "$basePath\infrastructure\adapters",
    "$basePath\infrastructure\adapters\output"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
}


$files = @(
    "$basePath\application\use-cases\get$moduleName.use-case.ts",
    "$basePath\domain\dto\$moduleName.dto.ts",
    "$basePath\domain\interfaces\$moduleName.interface.ts",
    "$basePath\infrastructure\$moduleName.routes.ts",
    "$basePath\infrastructure\adapters\output\$moduleName.repo.ts"
)


foreach ($file in $files) {
    New-Item -ItemType File -Path $file -Force | Out-Null
}

Write-Host "La estructura del módulo '$moduleName' se ha creado correctamente en: $basePath" -ForegroundColor Green
