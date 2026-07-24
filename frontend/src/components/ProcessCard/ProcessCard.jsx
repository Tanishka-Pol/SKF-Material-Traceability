import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaTrashAlt,
  FaExclamationTriangle,
  FaBoxOpen 
} from "react-icons/fa";

import "./ProcessCard.css";

import "./ProcessCard.css";

const ProcessCard = ({
  id,
  icon: Icon,
  title,
  subtitle,
  incoming = 0,
  outgoing = 0,
  scrap = 0,
  ir = 0,
  or = 0,
  status = "Not Visited",
  type = "main",
}) => {
  console.log("PROCESS CARD RENDERING");
  
  const showIncoming =
  id === "cps" ||
  id === "rework" ||
  id === "disassembly" ||
  id === "fps";

const showOutgoing =
  id === "dm-store" ||
  id === "transit-buffer" ||
  id === "channel" ||
  id === "cps" ||
  id === "rework" ||
  id === "disassembly" ||
  id === "accurate" ||
  id === "auto-packing" ||
  id === "fps";

const showScrap =
  id === "sho" ||
  id === "common-scrap";

console.log("ProcessCard ID:", id);

  return (
    <div className={`process-card-blueprint ${type}`} data-flow-id={id}>
      <FaExclamationTriangle
        className="delta-icon-corner"
    />

      {/* Header */}
      <div className="card-header-bp">

        <div className="header-top-row">

          <div className="process-icon-box">
            {Icon && <Icon size={14} />}
          </div>

          <div className="title-wrapper">

           <h4 className="process-title">
              {title}
            </h4>

            <p className="process-subtitle">
              {subtitle}
            </p>

          </div>

          <div className="delta-indicator">
            <FaExclamationTriangle />
          </div>
        </div>

      </div>

      <div className="divider-bp"></div>

      {/* Metrics */}

      <div className="card-body-bp">

        <div className="metrics-grid">

       {showIncoming && (
          <div className="metric-col">
            <FaArrowDown className="metric-icon incoming-icon" />

            <span className="metric-label">
              Incoming
            </span>

            <span className="metric-value value-incoming">
              {incoming}
            </span>

            <span className="metric-unit">
              PCS
            </span>
          </div>
        )}
        {id === "dm-store" && (
          <>
            <div className="metric-col">
              <FaBoxOpen className="metric-icon leftover-icon" />
              <span className="metric-label">IR</span>
              <span className="metric-value value-outgoing">
                {ir}
              </span>
              <span className="metric-unit">PCS</span>
            </div>

            <div className="metric-col">
              <FaBoxOpen className="metric-icon leftover-icon" />
              <span className="metric-label">OR</span>
              <span className="metric-value value-outgoing">
                {or}
              </span>
              <span className="metric-unit">PCS</span>
            </div>
          </>
        )}

        {showOutgoing && (
          <div className="metric-col">

            <FaBoxOpen className="metric-icon leftover-icon" />

            <span className="metric-label">
              Outgoing
            </span>

            <span className="metric-value value-outgoing">
              {outgoing}
            </span>

            <span className="metric-unit">
              PCS
            </span>

          </div>
        )}

        {showScrap && (
          <div className="metric-col">

            <FaTrashAlt className="metric-icon scrap-icon" />

            <span className="metric-label">
              Scrap
            </span>

            <span className="metric-value value-scrap">
              {scrap}
            </span>

            <span className="metric-unit">
              PCS
            </span>

          </div>
        )}

        {id === "sho" && (
          <div className="metric-col">

            <FaArrowUp className="metric-icon outgoing-icon" />

            <span className="metric-label">
              Leftover
            </span>

            <span className="metric-value value-outgoing">
              {outgoing}
            </span>

            <span className="metric-unit">
              PCS
            </span>

          </div>
        )}

        </div>

      </div>

      {/* Footer */}

      <div className="card-footer-bp">

        <div
          className={`status-pill-bp ${
            status === "Finished"
              ? "pill-finished"
              : "pill-not-visited"
          }`}
        >
          {status}
        </div>

      </div>

    </div>
  );
};

export default ProcessCard;