window.onload = function () {
  // === Scene Setup ===
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  let camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // === Lighting ===
  const light = new THREE.PointLight(0xffffff, 2, 1000);
  light.position.set(0, 0, 0);
  scene.add(light);

  // === Sun ===
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFDB813 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // === Planets ===
  const planetData = [
    { name: 'Mercury', radius: 1, distance: 8, color: 0xaaaaff, speed: 0.02 },
    { name: 'Venus', radius: 1.2, distance: 11, color: 0xffbb99, speed: 0.015 },
    { name: 'Earth', radius: 1.3, distance: 14, color: 0x3399ff, speed: 0.012 },
    { name: 'Mars', radius: 1.1, distance: 17, color: 0xff6600, speed: 0.01 },
    { name: 'Jupiter', radius: 2.5, distance: 21, color: 0xffcc66, speed: 0.008 },
    { name: 'Saturn', radius: 2.2, distance: 25, color: 0xffff99, speed: 0.006 },
    { name: 'Uranus', radius: 1.8, distance: 29, color: 0x66ccff, speed: 0.005 },
    { name: 'Neptune', radius: 1.7, distance: 33, color: 0x3366ff, speed: 0.004 },
  ];

  const planets = [];
  planetData.forEach((data) => {
    const geo = new THREE.SphereGeometry(data.radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color: data.color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = data.distance;
    scene.add(mesh);
    planets.push({ ...data, mesh, angle: 0 });
  });

  // === Camera Position ===
  camera.position.set(0, 20, 50);
  camera.lookAt(0, 0, 0);

  // === Background Stars ===
  function addStars(count = 700) {
    for (let i = 0; i < count; i++) {
      const starGeo = new THREE.SphereGeometry(0.1, 6, 6);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500
      );
      scene.add(star);
    }
  }
  addStars();

  // === Speed Sliders ===
  const sliders = document.getElementById("sliders");
  const speedControls = {};
  planetData.forEach(data => {
    const label = document.createElement("label");
    label.innerText = `${data.name}: `;
    const input = document.createElement("input");
    input.type = "range";
    input.min = "0.001";
    input.max = "0.05";
    input.step = "0.001";
    input.value = data.speed;
    speedControls[data.name] = parseFloat(input.value);
    input.oninput = (e) => {
      speedControls[data.name] = parseFloat(e.target.value);
    };
    label.appendChild(input);
    sliders.appendChild(label);
    sliders.appendChild(document.createElement("br"));
  });

  // === Pause/Resume Button ===
  let paused = false;
  document.getElementById("toggleBtn").onclick = () => {
    paused = !paused;
    document.getElementById("toggleBtn").innerText = paused ? "Resume" : "Pause";
  };

  // === Theme Toggle Button ===
  document.getElementById("themeToggle").onclick = () => {
     const isLight = document.body.classList.toggle("light");
    if (isLight) {
      scene.background = new THREE.Color(0xf0f0f0);
    } else {
      scene.background = new THREE.Color(0x000000);
    }
  };

  // === Tooltip on Hover ===
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const tooltip = document.getElementById("tooltip");

  // Store last mouse event for pixel coords of tooltip positioning
  let lastMouseEvent = null;

  window.addEventListener("mousemove", (event) => {
    lastMouseEvent = event;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // === Animation Loop ===
  function animate() {
    requestAnimationFrame(animate);

    if (!paused) {
      planets.forEach(p => {
        p.angle += speedControls[p.name];
        p.mesh.position.x = Math.cos(p.angle) * p.distance;
        p.mesh.position.z = Math.sin(p.angle) * p.distance;
        p.mesh.rotation.y += 0.01;
      });
    }

    // Raycast and update tooltip position & content
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

    if (intersects.length > 0 && lastMouseEvent) {
      const planet = planets.find(p => p.mesh === intersects[0].object);
      tooltip.style.display = "block";

      // Clamp tooltip position within viewport bounds
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      let x = lastMouseEvent.clientX + 10;
      let y = lastMouseEvent.clientY + 10;

      x = Math.min(x, window.innerWidth - tooltipWidth - 5);
      y = Math.min(y, window.innerHeight - tooltipHeight - 5);

      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
      tooltip.innerText = planet.name;
    } else {
      tooltip.style.display = "none";
    }

    renderer.render(scene, camera);
  }

  animate();

  // === Responsive Resize ===
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
