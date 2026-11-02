# Bio-Link Profile

A customizable personal profile page built with **HTML, CSS, and JavaScript**. Create your own unique bio-link page with animated visual effects, social media links, profile information, and a personalized background.

**Everything is managed through a single configuration file:** `js/config.js`.

---

## Overview

This project provides a fully customizable profile page with a collection of visual effects and interactive elements.

### Features

- **Dynamic Background:** Video background with audio activated by user interaction.
- **Rain Animation:** Animated particles with mouse-responsive parallax.
- **Cursor Effects:** Custom cursor with an animated sparkle trail.
- **Name Distortion:** TV-style static and interference effect.
- **Animated Status:** Typewriter effect with automatic typing and deletion.
- **Interactive Profile Card:** 3D tilt effect controlled by mouse movement, with mobile support.
- **Discord Information:** Display username, avatar, and presence status without requiring an API.
- **Custom Badges:** Display badges and roles with hover descriptions.
- **Social Media Integration:** Custom social links with glowing icons.
- **Personalized Appearance:** Custom fonts, colors, backgrounds, and cursor images.
- **Centralized Settings:** Configure the entire page from one JavaScript file.

---

## Project Layout

```text
project/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── config.js
│   └── script.js
│
└── assets/
    ├── avatar.jpg
    ├── background.mp4
    ├── cursor.png
    ├── favicon.png
    │
    ├── badges/
    │
    ├── fonts/
    │
    └── icons/
        ├── instagram.png
        ├── spotify.png
        ├── tiktok.png
        │
        └── status/
            ├── online.png
            ├── idle.png
            ├── dnd.png
            └── offline.png
```

### Main files

| File | Description |
|---|---|
| `index.html` | Main page structure |
| `css/style.css` | Layout, styling, and visual effects |
| `js/config.js` | Main customization settings |
| `js/script.js` | Animations and interactive functionality |

### Assets directory

| Directory / File | Purpose |
|---|---|
| `avatar.jpg` | Profile picture |
| `background.mp4` | Background video |
| `cursor.png` | Custom mouse cursor |
| `favicon.png` | Browser tab icon |
| `badges/` | Profile badges and roles |
| `fonts/` | Custom typography |
| `icons/` | Social media icons |
| `icons/status/` | Discord presence icons |

---

## Installation

Getting started requires no package installation, compilation, or build process.

1. Clone or download the repository.
2. Add your images, videos, icons, and other assets to the `assets/` directory.
3. Open `js/config.js`.
4. Customize the settings with your personal information.
5. Launch `index.html` using a local development server.

For local development, you can use [Visual Studio Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

You can also deploy the project using GitHub Pages or another static website hosting service.

---

## Customization

All personal settings are centralized in:

```text
js/config.js
```

There is no need to modify the main JavaScript or CSS files for normal customization.

### 1. Profile Information

| Setting | Description |
|---|---|
| `profileName` | Name displayed on the profile |
| `nameTooltip` | Text displayed when hovering over the name |
| `nameEffect` | Name animation (`"noise"` or `"none"`) |
| `statusText` | Profile status with typewriter animation |
| `tabTitle` | Animated browser tab title |
| `entrySymbol` | Symbol displayed on the entry screen |

### 2. Images and Background

| Setting | Description |
|---|---|
| `avatar` | Profile image location; supports animated GIFs (for example, `assets/avatar.gif`) |
| `backgroundVideo` | Background video file (`.mp4`) |
| `customCursor` | Custom cursor image |
| `avatarDecoration` | Animated avatar decoration URL; use `""` to disable |

### 3. Badges and Roles

Badges can be added, removed, and rearranged directly inside the configuration file.

Example:

```js
badges: [
    { icon: "assets/badges/owner.png", label: "Owner" },
    { icon: "assets/badges/verified.png", label: "Verified" },
]
```

- `icon`: Location of the badge image.
- `label`: Description displayed when hovering over the badge.
- Supported formats: PNG, GIF, and WebP.

There is no fixed limit on the number of badges.

### 4. Discord Profile

| Setting | Description |
|---|---|
| `discordUsername` | Discord username |
| `discordStatus` | Custom status text |
| `discordAvatar` | Discord profile picture |
| `discordPresenceStatus` | Presence indicator |

Available presence values:

```js
"online"
"idle"
"dnd"
"offline"
```

The Discord section is static and does not require an API connection.

### 5. Social Media Links

Social accounts are configured through the `socialLinks` array.

Example:

```js
socialLinks: [
    {
        name: "Instagram",
        url: "https://instagram.com/you",
        icon: "assets/icons/instagram.png"
    },
    {
        name: "GitHub",
        url: "https://github.com/you",
        icon: "assets/icons/github.png"
    },
]
```

You can add, remove, or reorder social links as needed.

Each entry contains:
- `name`: Platform name.
- `url`: Destination URL.
- `icon`: Icon image location.

Custom PNG icons are supported.

### 6. Appearance and Colors

| Setting | Description |
|---|---|
| `cardBorderRadius` | Profile card corner radius |
| `cardBackground` | Card background color, including RGBA transparency |
| `cardTiltIntensity` | Intensity of the 3D tilt effect; `0` disables it |
| `usernameGlow` | Glow color behind the username; `"none"` disables it |
| `iconGlowColor` | Glow color applied to social icons |

### 7. Particles and Cursor Effects

| Setting | Description |
|---|---|
| `particleColor` | Color of the animated particles |
| `particleCount` | Number of particles displayed |
| `particleParallaxStrength` | Mouse parallax intensity; `0` disables it |
| `shootingStarColors` | Colors used by the cursor sparkle effect |
| `shootingStarSize` | Size of the cursor sparkles |

---

## Asset Specifications

For the best visual results, use the following recommended dimensions and formats.

| Asset | Location | Recommended specifications |
|---|---|---|
| Profile picture | `assets/avatar.jpg` or `assets/avatar.gif` | 200 × 200 px minimum, square; animated GIFs are supported |
| Background video | `assets/background.mp4` | MP4, reasonable file size |
| Custom cursor | `assets/cursor.png` | 32 × 32 or 64 × 64 px |
| Favicon | `assets/favicon.png` | 32 × 32 px |
| Badges | `assets/badges/` | PNG, GIF, or WebP |
| Social icons | `assets/icons/` | 96 × 96 px |
| Discord status icons | `assets/icons/status/` | 48 × 48 px |
| Custom font | `assets/fonts/fuente.otf` | OTF, TTF, or WOFF2 |

**Additional notes:**

- Transparent backgrounds are recommended for cursor and icon images.
- Removing unwanted black backgrounds from icons helps preserve the glow effects.
- The cursor click position can be adjusted through `customCursorHotspot` in `config.js`.
- Custom fonts should be named `fuente.otf` and placed inside `assets/fonts/`.

---

## Troubleshooting

**Background video does not play**

Check that the video is named `background.mp4` and located in the `assets/` directory. Some browsers require the page to run through a local server rather than opening the HTML file directly.

**Custom font is not loading**

Verify that the font is named `fuente.otf` and placed inside `assets/fonts/`. The page will use its default font if the custom font is unavailable.

**Badge images have unwanted backgrounds**

Use an image editor or a background-removal service such as [remove.bg](https://www.remove.bg) to obtain transparent images.

**Social media links are missing**

Check the `socialLinks` array in `js/config.js`. Make sure each entry has a valid URL and an existing icon path.

**Profile card is too wide on mobile**

Adjust the `cardMaxWidth` setting in `config.js` to reduce the maximum card width.

---

## License

This project is open source and free to use.

You are welcome to customize the source code, modify its appearance, and adapt it to your own needs.

Credit is appreciated but not mandatory.

---

<div align="center">

**Designed with 🖤**

*Personalize it. Make it yours.*

</div>
