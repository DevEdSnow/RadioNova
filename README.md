# 📻 RadioNova

<div align="center">

# 🎙️ RadioNova

### Tu radio, tus estaciones, en cualquier momento.

<p align="center">

![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge\&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Status](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge)

</p>

</div>

---

# 📌 Descripción

**RadioNova** es una aplicación móvil para escuchar **estaciones de radio por Internet** desde cualquier lugar.

La aplicación permite explorar diferentes estaciones, reproducir transmisiones en tiempo real y guardar emisoras favoritas para acceder rápidamente a ellas.

El proyecto está diseñado para ofrecer una experiencia sencilla, rápida y moderna para disfrutar de la radio desde dispositivos móviles.

---

# 🎧 Características

## 📻 Estaciones de Radio

* Explorar estaciones disponibles.
* Reproducir transmisiones en vivo.
* Pausar y reanudar reproducción.
* Cambiar entre estaciones.
* Visualizar información de la estación.
* Mostrar nombre y género de la emisora.

## ❤️ Favoritos

* Agregar estaciones a favoritos.
* Eliminar estaciones favoritas.
* Acceso rápido a las emisoras favoritas.
* Persistencia de favoritos.

## 🔎 Búsqueda

* Buscar estaciones por nombre.
* Buscar por género musical.
* Filtrar estaciones.
* Explorar diferentes categorías.

## 🎵 Reproductor

* Reproducción de audio en streaming.
* Controles de reproducción.
* Estación actualmente activa.
* Información de la canción cuando está disponible.
* Reproducción en segundo plano.

## 🌎 Exploración

* Estaciones locales.
* Estaciones internacionales.
* Música.
* Noticias.
* Deportes.
* Rock.
* Pop.
* Electrónica.
* Música regional.
* Podcasts y otros contenidos.

---

# 📱 Interfaz

RadioNova cuenta con una interfaz enfocada en la experiencia de reproducción:

```text
┌─────────────────────────────┐
│         📻 RadioNova        │
│                             │
│ 🔎 Buscar estación...       │
│                             │
│  ⭐ Favoritos               │
│                             │
│  📻 Estaciones              │
│                             │
│  ┌───────────────────────┐  │
│  │ 🎵 Radio Nova FM      │  │
│  │ Pop • México          │  │
│  │                  ▶️   │  │
│  └───────────────────────┘  │
│                             │
│ ─────────────────────────── │
│ 🎵 Radio Nova FM            │
│        ⏮️  ▶️  ⏭️           │
└─────────────────────────────┘
```

---

# 🛠️ Tecnologías

### Aplicación móvil

* React Native
* TypeScript
* Expo
* Expo Router
* Expo Audio

### Desarrollo

* Node.js
* npm
* Git
* GitHub

### Datos

La aplicación puede utilizar una API de estaciones de radio para obtener información como:

* Nombre de la estación.
* URL del streaming.
* País.
* Idioma.
* Género.
* Logo.
* Información de la transmisión.

---

# 📂 Estructura del Proyecto

```text
radionova/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── audio/
│
├── src/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── player.tsx
│   │   ├── favorites.tsx
│   │   └── stations.tsx
│   │
│   ├── components/
│   │   ├── StationCard.tsx
│   │   ├── Player.tsx
│   │   ├── SearchBar.tsx
│   │   └── CategoryCard.tsx
│   │
│   ├── hooks/
│   │   ├── useRadio.ts
│   │   └── useFavorites.ts
│   │
│   ├── services/
│   │   └── radioApi.ts
│   │
│   ├── types/
│   │   └── station.ts
│   │
│   ├── store/
│   │   └── radioStore.ts
│   │
│   └── constants/
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/radionova.git
```

Entrar al proyecto:

```bash
cd radionova
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Iniciar Expo

```bash
npx expo start
```

Después puedes ejecutar la aplicación utilizando:

* 📱 Expo Go
* 🤖 Android Emulator
* 🍎 iOS Simulator
* 🌐 Web

---

# 🎙️ Arquitectura del reproductor

El reproductor recibe la URL de streaming de una estación:

```text
Usuario
   │
   ▼
Selecciona estación
   │
   ▼
RadioNova Player
   │
   ▼
URL de Streaming
   │
   ▼
📻 Estación de Radio
   │
   ▼
🎵 Audio en tiempo real
```

---

# 🌐 Integración con estaciones

Las estaciones pueden almacenarse mediante una API o una fuente externa.

Ejemplo de una estación:

```json
{
  "id": "radio-001",
  "name": "Radio Nova FM",
  "country": "Mexico",
  "language": "Spanish",
  "genre": "Pop",
  "streamUrl": "https://example.com/stream",
  "logo": "https://example.com/logo.png"
}
```

---

# 🔒 Consideraciones

La aplicación no almacena las transmisiones de radio. RadioNova funciona como cliente para reproducir los streams proporcionados por las estaciones.

Las URLs de streaming y los contenidos reproducidos pertenecen a sus respectivos proveedores.

---

# 🚀 Funcionalidades Futuras

* 🌙 Modo oscuro.
* 🚗 Integración con Android Auto.
* 🎧 Reproducción en segundo plano.
* 🔔 Notificaciones del reproductor.
* 🎵 Información de canción actual.
* ❤️ Sincronización de favoritos.
* 🌎 Estaciones de todo el mundo.
* 📍 Estaciones cercanas mediante ubicación.
* 📊 Estadísticas de reproducción.
* 🔊 Ecualizador.
* ⏰ Temporizador de apagado.
* 📱 Widgets.
* 🔐 Cuenta de usuario.
* ☁️ Sincronización en la nube.
* 🎙️ Control mediante comandos de voz.

---

# 📊 Roadmap

| Funcionalidad                 | Estado |
| ----------------------------- | :----: |
| Reproductor de radio          |    ✅   |
| Listado de estaciones         |    ✅   |
| Búsqueda                      |    ✅   |
| Favoritos                     |    ✅   |
| Categorías                    |    ✅   |
| Reproducción en segundo plano |   🚧   |
| Información de canciones      |   🚧   |
| Android Auto                  |   📋   |
| Widgets                       |   📋   |
| Sincronización en la nube     |   📋   |
| Ecualizador                   |   📋   |

**Leyenda:**

* ✅ Completado
* 🚧 En desarrollo
* 📋 Planeado

---

# 🤝 Contribuciones

Las contribuciones son bienvenidas.

1. Realiza un Fork del proyecto.
2. Crea una rama:

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios.

4. Haz commit:

```bash
git commit -m "feat: agregar nueva funcionalidad"
```

5. Envía los cambios:

```bash
git push origin feature/nueva-funcionalidad
```

6. Abre un Pull Request.

---

# 📜 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Consulta el archivo `LICENSE` para obtener más información.

---

# 👨‍💻 Autor

Desarrollado como una aplicación móvil de radio por Internet utilizando **React Native, Expo y TypeScript**.

---

<div align="center">

# 📻 RadioNova

### Escucha. Descubre. Conecta.

**Radio • Música • Noticias • Deportes • Streaming**

⭐ Si te gusta el proyecto, no olvides darle una estrella en GitHub.

</div>

