$ErrorActionPreference = 'Stop'
$raizJogo = Split-Path -Parent $PSScriptRoot
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'antes/index.html') -Destination (Join-Path $raizJogo '1_jogo_e_assets_publicados/vila-betania/index.html')
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'antes/construtor_casas.js') -Destination (Join-Path $raizJogo '1_jogo_e_assets_publicados/casas/construtor_casas.js')
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'antes/LEIA-ME.txt') -Destination (Join-Path $raizJogo 'LEIA-ME.txt')
Write-Host 'Código e instruções da v3 restaurados. Recarregue o navegador.'
