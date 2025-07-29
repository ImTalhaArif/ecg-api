const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

function analyzeECG(ecg) {
  const max = Math.max(...ecg);
  const min = Math.min(...ecg);
  const range = max - min;
  const highCount = ecg.filter(v => Math.abs(v) > 0.9).length;

  if (range > 1.5) {
    return "Possible Ventricular Tachycardia (High amplitude)";
  } else if (range < 0.5) {
    return "Possible Bradycardia or Flatline (Low amplitude)";
  } else if (highCount > 5) {
    return "Irregular pattern detected – Possible Arrhythmia";
  } else {
    return "Normal sinus rhythm";
  }
}

app.post("/api/ecg", (req, res) => {
  const { ecgData } = req.body;
  if (!Array.isArray(ecgData)) {
    return res.status(400).json({ error: "Invalid ECG format" });
  }
  const diagnosis = analyzeECG(ecgData);
  res.json({ diagnosis });
});

module.exports = app;
