(function () {
  const locations = [
    {
      state: "Aguascalientes",
      x: 842,
      y: 545,
      projects: [{ type: "Reconstrucción", cities: ["Aguascalientes"] }, { type: "Obra Civil", cities: ["Aguascalientes"] }],
    },
    {
      state: "Baja California",
      x: 255,
      y: 195,
      projects: [{ type: "Reconstrucción", cities: ["Tijuana", "Tecate"] }],
    },
    {
      state: "Chihuahua",
      x: 720,
      y: 250,
      projects: [{ type: "Reconstrucción", cities: ["Cd. Juárez"] }],
    },
    {
      state: "Ciudad de México",
      x: 1080,
      y: 725,
      projects: [{ type: "Reconstrucción", cities: ["CDMX"] }],
    },
    {
      state: "Colima",
      x: 786,
      y: 670,
      projects: [{ type: "Obra Civil", cities: ["Manzanillo"] }],
    },
    {
      state: "Durango",
      x: 646,
      y: 430,
      projects: [{ type: "Construcción", cities: ["Durango"] }],
    },
    {
      state: "Guanajuato",
      x: 876,
      y: 580,
      projects: [{ type: "Obra Civil", cities: ["Salamanca"] }],
    },
    {
      state: "Guerrero",
      x: 1010,
      y: 845,
      projects: [{ type: "Reconstrucción", cities: ["Acapulco"] }, { type: "Obra Civil", cities: ["Acapulco"] }],
    },
    {
      state: "Morelos",
      x: 1065,
      y: 790,
      projects: [{ type: "Reconstrucción", cities: ["Cuernavaca"] }, { type: "Construcción", cities: ["Cuautla"] }],
    },
    {
      state: "Nuevo León",
      x: 1076,
      y: 380,
      projects: [
        { type: "Reconstrucción", cities: ["Monterrey"] },
        { type: "Construcción", cities: ["Linares", "Monterrey"] },
        { type: "Inmobiliarios", cities: ["Monterrey"] },
        { type: "Obra Civil", cities: ["Monterrey"] },
        { type: "Desmontaje de Red", cities: ["Monterrey"] },
      ],
    },
    {
      state: "Querétaro",
      x: 955,
      y: 555,
      projects: [{ type: "Obras Inducidas", cities: ["Querétaro"] }, { type: "Desmontaje de Red", cities: ["Querétaro"] }],
    },
    {
      state: "Sonora",
      x: 514,
      y: 220,
      projects: [
        { type: "Construcción", cities: ["San Luis Río Colorado"] },
        { type: "Obra Civil", cities: ["San Luis Río Colorado", "Nogales"] },
        { type: "Obras Inducidas", cities: ["San Luis Río Colorado", "Nogales"] },
      ],
    },
    {
      state: "Veracruz",
      x: 1170,
      y: 600,
      projects: [{ type: "Construcción", cities: ["Coatzacoalcos"] }],
    },
  ];

  const markerContainer = document.getElementById("project-map-markers");
  const locationList = document.getElementById("projects-location-list");
  const stateLabel = document.getElementById("projects-detail-state");
  const projectsList = document.getElementById("projects-detail-projects");
  const locationCount = document.getElementById("project-location-count");

  if (!markerContainer || !locationList || !stateLabel || !projectsList || !locationCount) {
    throw new Error("No se pudo inicializar el mapa interactivo de proyectos.");
  }

  markerContainer.innerHTML = locations.map((location, index) => `
    <g class="project-map-marker" data-location-index="${index}" role="button" tabindex="0" aria-pressed="false" aria-label="${location.state}">
      <circle class="project-marker-halo" r="13"></circle>
      <circle class="project-marker-dot" r="5"></circle>
      <rect class="project-marker-label-bg" x="-76" y="17" width="152" height="25" rx="12.5"></rect>
      <text class="project-marker-label" y="34">${location.state}</text>
    </g>`).join("");

  locationList.innerHTML = locations.map((location, index) => `
    <button class="projects-location-button" type="button" data-location-index="${index}" aria-pressed="false">
      <span class="projects-location-city">${location.state}</span>
      <svg class="projects-location-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8 3l5 5-5 5"></path></svg>
    </button>`).join("");

  const markers = markerContainer.querySelectorAll("[data-location-index]");
  const buttons = locationList.querySelectorAll("[data-location-index]");

  markers.forEach((marker, index) => {
    const location = locations[index];
    marker.setAttribute("transform", `translate(${location.x} ${location.y})`);
    marker.addEventListener("click", () => selectLocation(index));
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectLocation(index);
      }
    });
  });

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => selectLocation(index));
  });

  function selectLocation(index) {
    const location = locations[index];
    if (!location) {
      return;
    }

    markers.forEach((marker, markerIndex) => {
      const isSelected = markerIndex === index;
      marker.classList.toggle("is-selected", isSelected);
      marker.setAttribute("aria-pressed", String(isSelected));
    });

    buttons.forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === index));
    });

    stateLabel.textContent = location.state;
    projectsList.innerHTML = location.projects.map((project) => `
      <div class="projects-detail-project">
        <p class="projects-detail-project-type">${project.type}</p>
        <p class="projects-detail-project-cities">${project.cities.join(", ")}</p>
      </div>`).join("");
  }

  locationCount.textContent = String(locations.length);
  selectLocation(0);
})();
