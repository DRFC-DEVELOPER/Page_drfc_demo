(function () {
  const locations = [
    {
      state: "Aguascalientes",
      projects: [{ type: "Reconstrucción", cities: ["Aguascalientes"] }, { type: "Obra Civil", cities: ["Aguascalientes"] }],
    },
    {
      state: "Baja California",
      projects: [{ type: "Reconstrucción", cities: ["Tijuana", "Tecate"] }],
    },
    {
      state: "Chihuahua",
      projects: [{ type: "Reconstrucción", cities: ["Cd. Juárez"] }],
    },
    {
      state: "Ciudad de México",
      projects: [{ type: "Reconstrucción", cities: ["CDMX"] }],
    },
    {
      state: "Colima",
      projects: [{ type: "Obra Civil", cities: ["Manzanillo"] }],
    },
    {
      state: "Durango",
      projects: [{ type: "Construcción", cities: ["Durango"] }],
    },
    {
      state: "Guanajuato",
      projects: [{ type: "Obra Civil", cities: ["Salamanca"] }],
    },
    {
      state: "Guerrero",
      projects: [{ type: "Reconstrucción", cities: ["Acapulco"] }, { type: "Obra Civil", cities: ["Acapulco"] }],
    },
    {
      state: "Morelos",
      projects: [{ type: "Reconstrucción", cities: ["Cuernavaca"] }, { type: "Construcción", cities: ["Cuautla"] }],
    },
    {
      state: "Nuevo León",
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
      projects: [{ type: "Obras Inducidas", cities: ["Querétaro"] }, { type: "Desmontaje de Red", cities: ["Querétaro"] }],
    },
    {
      state: "Sonora",
      projects: [
        { type: "Construcción", cities: ["San Luis Río Colorado"] },
        { type: "Obra Civil", cities: ["San Luis Río Colorado", "Nogales"] },
        { type: "Obras Inducidas", cities: ["San Luis Río Colorado", "Nogales"] },
      ],
    },
    {
      state: "Veracruz",
      projects: [{ type: "Construcción", cities: ["Coatzacoalcos"] }],
    },
  ];

  const locationList = document.getElementById("projects-location-list");
  const stateLabel = document.getElementById("projects-detail-state");
  const projectsList = document.getElementById("projects-detail-projects");
  const locationCount = document.getElementById("project-location-count");

  if (!locationList || !stateLabel || !projectsList || !locationCount) {
    throw new Error("No se pudo inicializar el explorador de proyectos.");
  }

  locationList.innerHTML = locations.map((location, index) => `
    <button class="projects-location-button" type="button" data-location-index="${index}" aria-pressed="false">
      <span class="projects-location-city">${location.state}</span>
      <svg class="projects-location-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8 3l5 5-5 5"></path></svg>
    </button>`).join("");

  const buttons = locationList.querySelectorAll("[data-location-index]");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => selectLocation(index));
  });

  function selectLocation(index) {
    const location = locations[index];
    if (!location) {
      return;
    }

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
