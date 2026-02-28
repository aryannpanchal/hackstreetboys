"use client";

import { useState } from "react";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    EcgBloodoxygenTimeDifference: "",
    BloodGlucoseEcgDifference: "",
    RRMin: "",
    RRMax: "",
    HeartRate: "",
    BreatheRate: "",
    HeartRateVariability: "",
    BloodOxygen: "",
    AvgGlucoseReading: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setPrediction(data.prediction);
    } else {
      alert("Prediction failed!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hyperglycemia Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block font-medium">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-4 p-4 bg-green-200 text-green-900 rounded">
          Prediction: {prediction}
        </div>
      )}
    </div>
  );
}
