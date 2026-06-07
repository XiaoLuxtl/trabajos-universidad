# Trabajos universitarios

Repositorio de **referencia** para entregas escolares. Cada carpeta contiene el HTML público que se enlaza desde el archivo `.docx` correspondiente entregado en la plataforma de la universidad.

> El entregable oficial de cada materia es el `.docx`. Aquí solo se publica el material HTML interactivo que cada `.docx` cita como apoyo visual.

## Trabajos

| # | Materia | Actividad | Tipo | Ver |
|---|---------|-----------|------|-----|
| 1 | Estadística Multivariada | Actividad Formativa 1 · Menú digital interactivo | Menú navegable + mini-quiz | [Abrir](https://XiaoLuxtl.github.io/trabajos-universidad/estadistica-multivariada/) |
| 2 | Desarrollo Sustentable | Tarea 1–3 · Infografía ilustrada | Infografía interactiva | [Abrir](https://XiaoLuxtl.github.io/trabajos-universidad/desarrollo-sustentable/) |
| 3 | Fundamentos de Seguridad Informática | Actividad Formativa 1 · Mapa conceptual | Mapa conceptual + diagrama de relaciones | [Abrir](https://XiaoLuxtl.github.io/trabajos-universidad/seguridad-informatica/) |

## Estructura del repositorio

```
trabajos-universidad/
├── README.md                       (este archivo)
├── .gitignore                      (excluye .py, .docx, .md auxiliar, venv, etc.)
├── estadistica-multivariada/
│   └── index.html                  (menú interactivo)
├── desarrollo-sustentable/
│   └── index.html                  (infografía interactiva)
└── seguridad-informatica/
    └── index.html                  (mapa conceptual)
```

## Política de publicación

Por seguridad y privacidad, en este repositorio **solo se publican los archivos HTML públicos** (renombrados a `index.html` dentro de cada carpeta). Nunca se suben scripts `.py`, archivos `.docx` generados, `.md` auxiliares, ni artefactos intermedios.

## Stack

- HTML5 + CSS3 (variables, grid, flex)
- JavaScript vanilla
- Librerías vía CDN: Google Fonts, Font Awesome 6, Chart.js, Mermaid
- Sin build step, sin backend, funciona offline tras la primera carga

---

_Maintenido por [XiaoLux](https://github.com/XiaoLuxtl)._
