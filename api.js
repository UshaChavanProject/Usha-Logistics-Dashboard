const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/vehicles", async (req, res) => {
  const { offset = 0, limit = 10 } = req.query;
  const [rows] = await db.query("SELECT * FROM fleet LIMIT ? OFFSET ?", [
    parseInt(limit),
    parseInt(offset),
  ]);
  res.json(rows);
});

router.get("/kpis", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS totalDeliveries FROM delivery WHERE delivery_date = CURDATE()"
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("KPI fetch error:", err);
    res.status(500).json({ error: "Failed to load KPI" });
  }
});

module.exports = router;