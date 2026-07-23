import React from "react";
import "./Legend.css";

const Legend = () => {
  return (
    <div className="legend">

      <div className="legend-title">
        Flow Legend
      </div>

      <div className="legend-item">
        <span className="legend-line material"></span>
        <span>Material Flow</span>
      </div>

      <div className="legend-item">
        <span className="legend-line return"></span>
        <span>Return Flow</span>
      </div>

      <div className="legend-item">
        <span className="legend-line scrap"></span>
        <span>Scrap Flow</span>
      </div>

    </div>
  );
};

export default Legend;