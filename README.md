# Solar System 3D Simulation – Ayan Banerjee

## 🌍 Overview
This project is a 3D simulation of our solar system using Three.js. It includes:
- All 8 planets orbiting a central Sun.
- Realistic lighting, orbit and rotation.
- Speed controls for each planet.
- Pause/resume functionality.

## 🚀 How to Run
1. Extract the zip file.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge).
3. Use sliders to control speed.
4. Click "Pause" to freeze or resume animation.

## 📦 Files
- `index.html`: Main HTML structure
- `style.css`: Styling and layout
- `script.js`: Three.js logic and animation
- `README.md`: Project guide


## How It Works

    ### Tooltip on Hover

- Mouse movements are tracked and converted to normalized device coordinates for Three.js.
- A raycaster shoots a ray from the camera through the mouse position to detect intersections with planet meshes.
- When the ray intersects a planet, an HTML tooltip is positioned near the cursor displaying the planet’s name.
- Tooltip position is clamped so it never goes off the screen.
- If no planet is hovered, the tooltip is hidden.

    ### Animation Loop

- Each frame, planets update their positions based on their orbit speeds.
- The raycaster updates and the tooltip adjusts its visibility and position accordingly.
- Scene is rendered continuously for smooth animation.

---

    ## Getting Started

        ### Prerequisites

- A modern web browser supporting WebGL.
- Internet connection to load Three.js from CDN or download Three.js locally.

        ### Installation

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Interact with the simulation by moving the mouse over planets, adjusting sliders, and toggling pause or theme.

---

    ## Usage

- Move your mouse over planets to see their names appear in the tooltip.
- Use the sliders below the canvas to adjust each planet's orbital speed.
- Click **Pause** to stop animation, click **Resume** to continue.
- Click **Toggle Theme** to switch between light and dark modes.

---

## File Structure

- `index.html` — Main HTML page containing the canvas and UI elements.
- `style.css` — Styles for tooltip, buttons, sliders, and layout.
- `main.js` — JavaScript code with Three.js setup, animation loop, raycasting, and UI handling.

---

## Dependencies

- [Three.js](https://threejs.org/) — JavaScript 3D library for rendering and animation.
