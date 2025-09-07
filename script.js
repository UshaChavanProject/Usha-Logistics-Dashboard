const tableBody = document.querySelector("#fleet-table tbody");
const kpiCount = document.getElementById("kpi-count");
const socket = io();

// Skeleton elements
const kpiSkeleton = document.getElementById("kpi-skeleton");
const kpiValue = document.getElementById("kpi-value");
const fleetSkeleton = document.getElementById("fleet-skeleton");
const fleetDataBody = document.getElementById("fleet-data");
const button = document.getElementById("refresh-kpi");

button.addEventListener("click", () => {
  // Visual feedback
  button.classList.add("active");

  // Reset display
  if (kpiValue) kpiValue.style.display = "none";
  if (kpiSkeleton) {
    kpiSkeleton.style.display = "inline";
    kpiSkeleton.textContent = "⏳";
  }

  // Fetch KPI data
  fetch("/api/kpis")
    .then((res) => res.json())
    .then((data) => {
      if (kpiSkeleton) kpiSkeleton.style.display = "none";
      if (kpiValue) {
        kpiValue.style.display = "inline";
        kpiValue.textContent = data.totalDeliveries;
      } else {
        kpiCount.textContent = data.totalDeliveries;
      }
    })
    .catch((err) => {
      console.error("Error loading KPI:", err);
      if (kpiSkeleton) kpiSkeleton.textContent = "❌ Error";
      else kpiCount.textContent = "Error";
    });

  // Remove active class after 1 second
  setTimeout(() => {
    button.classList.remove("active");
  }, 1000);
});

// Listen for real-time location updates
socket.on("locationUpdate", (data) => {
  const now = new Date().toLocaleTimeString();

  const statusClass =
    data.status === "active"
      ? "status-active"
      : data.status === "completed"
      ? "status-completed"
      : "status-inactive";

  // Hide skeleton and show real table body
  if (fleetSkeleton && fleetSkeleton.style.display !== "none") {
    fleetSkeleton.style.display = "none";
    fleetDataBody.style.display = "table-row-group";
  }

  let row = document.getElementById(`vehicle-${data.vehicleId}`);

  if (row) {
    row.querySelector(".name").textContent = data.name;
    row.querySelector(".status").textContent = data.status;
    row.querySelector(".status").className = `status ${statusClass}`;
    row.querySelector(".lat").textContent = data.lat.toFixed(4);
    row.querySelector(".lng").textContent = data.lng.toFixed(4);

    // Only update timestamp if status is not completed
    if (data.status !== "completed") {
      row.querySelector(".updated").textContent = now;
    }
  } else {
    const newRow = document.createElement("tr");
    newRow.id = `vehicle-${data.vehicleId}`;
    newRow.innerHTML = `
      <td>${data.vehicleId}</td>
      <td class="name">${data.name}</td>
      <td class="status ${statusClass}">${data.status}</td>
      <td class="lat">${data.lat.toFixed(4)}</td>
      <td class="lng">${data.lng.toFixed(4)}</td>
      <td class="updated">${
        data.status === "completed" ? "Delivered" : now
      }</td>
    `;
    fleetDataBody.appendChild(newRow);
  }
});
