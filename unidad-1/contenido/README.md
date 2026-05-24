# Guía de contenido – Unidad 1

## Propósito de la unidad
Esta unidad introduce la base arquitectónica de aplicaciones React mantenibles en contextos empresariales. El foco no es únicamente “que funcione”, sino que el código sea entendible, escalable y preparado para equipos múltiples, cambios frecuentes y necesidades reales del negocio.

## Competencias a desarrollar
- Analizar estructuras de proyecto y justificar su organización.
- Aplicar patrones avanzados de componentes sin sobreingeniería.
- Diseñar componentes cohesivos, reutilizables y con APIs consistentes.
- Refactorizar aplicaciones existentes minimizando riesgo técnico.

---

## 1.1 Organización estructural de aplicaciones

### Arquitectura por dominios (feature-based)
La organización por dominios agrupa archivos por capacidad de negocio y no por tipo técnico. En lugar de tener carpetas globales como `components`, `hooks` o `services`, se agrupa por módulos como `users`, `orders` o `billing`.

**Ventajas empresariales**
- Reduce el costo de navegación en proyectos grandes.
- Facilita ownership por equipo o squad.
- Mejora el aislamiento de cambios y el versionado interno de capacidades.

**Buenas prácticas**
- Mantener una carpeta por feature con componentes, hooks, servicios y pruebas relacionadas.
- Exponer una API clara del feature mediante archivos índice o puntos de entrada definidos.
- Evitar dependencias cruzadas innecesarias entre features.

**Caso de uso**
Un portal académico puede separar `courses`, `enrollments` y `notifications` como dominios independientes. Así, cada equipo puede evolucionar su feature sin afectar al resto.

### Organización por capas
Dentro de cada dominio es útil separar responsabilidades por capas ligeras:
- **UI / components:** renderizado y composición visual.
- **hooks / state:** lógica de presentación y estado local.
- **services / repositories:** acceso a datos y comunicación externa.
- **model / adapters:** normalización y transformación de datos.

**Tip empresarial**
Las capas deben existir para reducir acoplamiento, no para volver el proyecto burocrático. Si una feature es simple, puede iniciar con menos capas y evolucionar después.

### Modularización estratégica
Modularizar no significa fragmentar en exceso. Una modularización sana:
- crea límites claros,
- reduce el impacto de cambios,
- y preserva la velocidad de entrega.

**Señales de buena modularización**
- un módulo tiene un propósito claro,
- sus dependencias son explícitas,
- y puede entenderse sin recorrer todo el proyecto.

### Escalabilidad de proyectos React
Escalar un proyecto React implica escalar:
- el código,
- la colaboración del equipo,
- la velocidad de incorporación de nuevos desarrolladores,
- y la capacidad de refactorizar sin romper funcionalidades.

**Anti-patrones comunes**
- carpeta `components` global con cientos de archivos sin criterio de dominio,
- hooks “utilitarios” que terminan con lógica de negocio mezclada,
- componentes gigantes que concentran render, estado, fetching y reglas del negocio.

---

## 1.2 Patrones avanzados de componentes

### Container vs Presentational
Este patrón separa la lógica de orquestación del renderizado visual.

- **Container:** obtiene datos, compone estado y coordina acciones.
- **Presentational:** recibe props y se enfoca en mostrar la interfaz.

**Cuándo conviene**
- cuando una misma vista debe presentarse con diferentes fuentes de datos,
- cuando queremos reutilizar UI sin duplicar lógica,
- cuando necesitamos testear la vista en aislamiento.

### Compound Components
Permiten construir APIs expresivas como `Tabs`, `Tabs.List`, `Tabs.Trigger` y `Tabs.Panel`.

**Beneficios**
- mejor experiencia de consumo,
- composición flexible,
- menor prop drilling cuando se usa contexto interno.

**Riesgos**
- una implementación opaca puede dificultar el debugging,
- usar contexto sin criterio puede introducir renders innecesarios.

### Higher-Order Components (conceptual)
Un HOC es una función que recibe un componente y devuelve otro componente con capacidades adicionales.

**Uso actual**
Aunque hoy suelen preferirse hooks y composición, los HOC siguen apareciendo en librerías existentes y bases de código heredadas. Es importante entenderlos para migraciones y mantenimiento.

### Render Props (análisis comparativo)
Con render props, un componente recibe una función para decidir qué renderizar.

| Patrón | Fortalezas | Debilidades | Uso recomendado |
| --- | --- | --- | --- |
| HOC | reutilización transversal | wrapping profundo | compatibilidad con legado |
| Render Props | control explícito del render | anidamiento visual | lógica reutilizable con alto control |
| Hooks + composición | sintaxis moderna y flexible | requiere disciplina de diseño | proyectos React actuales |

### Controlled vs Uncontrolled Components
- **Controlled:** el valor vive en React y la UI refleja ese estado.
- **Uncontrolled:** el valor vive en el DOM y se accede mediante refs.

**Regla práctica**
En interfaces empresariales, los componentes controlados suelen ser preferibles cuando se requiere validación, auditoría de cambios, filtros complejos o sincronización con otras partes de la pantalla.

---

## 1.3 Diseño profesional de componentes

### Principios de cohesión y bajo acoplamiento
Un componente profesional debe resolver una responsabilidad clara y depender lo mínimo posible de detalles externos.

**Checklist rápido**
- ¿El nombre del componente describe una sola intención?
- ¿Las props representan una API coherente?
- ¿El componente puede reutilizarse sin conocer demasiados detalles del contexto?

### Componentes reutilizables y configurables
Reutilizable no significa hiper-genérico. La meta es equilibrio: suficiente flexibilidad para varios escenarios reales, sin convertir el componente en una “navaja suiza” difícil de mantener.

**Buenas prácticas**
- usar props con semántica clara,
- definir defaults razonables,
- exponer puntos de extensión seguros,
- documentar casos de uso principales.

### API de componentes
Una buena API es intuitiva, predecible y difícil de usar mal.

**Elementos de una API sana**
- nombres consistentes,
- separación entre props obligatorias y opcionales,
- eventos con payloads claros,
- soporte a composición cuando aporta valor.

### Composición avanzada
La composición permite construir soluciones flexibles sin duplicar componentes similares.

**Ejemplos útiles**
- slots mediante `children`,
- compound components,
- wrappers para layout y estados vacíos,
- composición de hooks para encapsular lógica compartida.

**Tip empresarial**
Antes de crear una nueva abstracción, valide si responde a un patrón repetido en al menos dos o tres escenarios reales del producto.

---

## 1.4 Refactorización arquitectónica

### Identificación de deuda estructural
La deuda estructural aparece cuando la forma del código dificulta el cambio. Señales frecuentes:
- archivos con demasiadas responsabilidades,
- dependencias cíclicas o frágiles,
- reglas del negocio mezcladas con JSX,
- carpetas ambiguas como `utils` o `common` sin criterio claro.

### Reorganización de aplicaciones SOFT-629
Para una aplicación base como SOFT-629, la estrategia recomendada es:
1. identificar features de negocio,
2. mover primero archivos sin cambiar comportamiento,
3. extraer lógica repetida a hooks o servicios,
4. definir fronteras de dependencia,
5. validar después de cada paso.

### Evolución progresiva del código
Las refactorizaciones empresariales deben ser incrementales. El objetivo es reducir riesgo y mantener continuidad operativa.

**Estrategia sugerida**
- documentar el estado actual,
- mover estructura antes que reescribir lógica,
- reemplazar piezas por capas,
- medir impacto con revisiones funcionales y técnicas.

**Errores a evitar**
- intentar reescribir toda la aplicación en un solo sprint,
- cambiar arquitectura y comportamiento al mismo tiempo,
- introducir abstracciones sin necesidad probada.

---

## Reto práctico de la unidad
**Refactorización estructural de aplicación base**

### Objetivo
Tomar una aplicación React con estructura plana y reorganizarla hacia una arquitectura por dominios, incorporando principios de diseño profesional y patrones de componentes donde aporten valor.

### Entregables sugeridos
- mapa antes/después de la estructura,
- justificación arquitectónica,
- componentes refactorizados,
- riesgos identificados y decisiones tomadas.

### Criterios de evaluación
- claridad estructural,
- coherencia de la API de componentes,
- separación de responsabilidades,
- viabilidad de escalado,
- calidad de la argumentación técnica.
