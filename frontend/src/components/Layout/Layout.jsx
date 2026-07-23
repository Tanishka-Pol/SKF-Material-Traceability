import React from "react";
import "./Layout.css";
import Legend from "../Legend/Legend";
import Flow from "../Flow/Flow";

import ProcessCard from "../ProcessCard/ProcessCard";
import { processData } from "../../data/processData";


const Layout = () => {
  return (
    <div className="layout-container">
          <Flow />

      <div className="layout-grid">
        

        {/* ===================== MAIN FLOW ===================== */}

        <div className="pillar pillar-dm">
          <ProcessCard
            {...processData.topRow[0]}
            incoming={0}
            outgoing={0}
            status="Not Visited"
          />
        </div>

        <div className="pillar pillar-sho">
          <ProcessCard
            {...processData.topRow[1]}
            incoming={0}
            outgoing={0}
            scrap={0}
            status="Not Visited"
          />
        </div>

        <div className="pillar pillar-transit">
          <ProcessCard
            {...processData.topRow[2]}
            incoming={0}
            outgoing={0}
            scrap={0}
            status="Not Visited"
          />
        </div>

       {/* ===================== CHANNEL GROUP ===================== */}

<div className="pillar pillar-channel">

    <div className="parent-card">
        <ProcessCard
            {...processData.topRow[3]}
            incoming={0}
            outgoing={0}
            scrap={0}
            status="Not Visited"
        />
    </div>

    <div className="channel-grid">

        <div className="cps-card">
            <ProcessCard
                {...processData.middleRow[0]}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Not Visited"
            />
        </div>

        <div className="disassembly-card">
            <ProcessCard
                {...processData.middleRow[1]}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Not Visited"
            />
        </div>

        <div className="rework-card">
            <ProcessCard
                {...processData.middleRow[2]}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Not Visited"
            />
        </div>

        <div className="scrap-card">
            <ProcessCard
                {...processData.bottom}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Not Visited"
            />
       </div>
       </div>
       </div>

        {/* ===================== BEARING GROUP ===================== */}

<div className="pillar pillar-bearing">

    <div className="parent-card">
        <ProcessCard
            {...processData.topRow[4]}
            incoming={0}
            outgoing={0}
            scrap={0}
            status="Not Visited"
        />
    </div>

    <div className="bearing-grid">

        <div className="accurate-card">
            <ProcessCard
                {...processData.rightSection[0]}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Not Visited"
            />
        </div>

        <div className="packing-card">
            <ProcessCard
                {...processData.rightSection[1]}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Not Visited"
            />
        </div>

        <div className="fps-card">
            <ProcessCard
                {...processData.fps}
                incoming={0}
                outgoing={0}
                scrap={0}
                status="Finished"
            />
        </div>
        </div>
       </div>
      </div>
      <Legend />
    </div>
    
  );
};

export default Layout;