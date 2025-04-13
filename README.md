# LoadTest

## comandos de ejecucion

docker run --rm -v C:\Users\Julio\OneDrive\Documentos\GitHub\LoadTest\scripts:/scripts grafana/k6 run /scripts/stages.js

## Exportar datos

docker run --rm -v "C:\Users\Julio\OneDrive\Documentos\GitHub\LoadTest\scripts:/scripts" grafana/k6 run --out json=/scripts/resultados.json /results/breaking-point-detailed.js
