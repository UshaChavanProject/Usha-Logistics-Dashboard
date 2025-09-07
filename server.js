const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const db = require("./db");
const apiRoutes = require("./routes/api");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));
app.use("/api", apiRoutes);

io.on("connection", (socket) => {
  console.log("Client connected");

async function broadcastFleetUpdates() {
  try {
    const [vehicles] = await db.query("SELECT * FROM fleet");
    vehicles.forEach((vehicle) => {
      const isCompleted = vehicle.status === "completed";

      const update = {
        vehicleId: vehicle.vehicle_id,
        name: vehicle.name,
        status: vehicle.status,
        lat: isCompleted
          ? vehicle.location_lat
          : vehicle.location_lat + Math.random() * 0.001,
        lng: isCompleted
          ? vehicle.location_lng
          : vehicle.location_lng + Math.random() * 0.001,
      };

      socket.emit("locationUpdate", update);
    });
  } catch (err) {
    console.error("Error fetching fleet data:", err);
  }
}

  setInterval(broadcastFleetUpdates, 1000);
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});