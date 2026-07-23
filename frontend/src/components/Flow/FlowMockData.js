/* ==========================================================
   SKF P-VSM Flow Engine
   FlowMockData.js
 
   Mock Manufacturing Orders used to demo the Flow Playback
   Engine before a real backend is wired up.
 
   Each MO is expressed as an ordered list of FLOW_ROUTES ids
   (see FlowRoutes.js) — the exact same ids the future backend
   contract will resolve to via findEdgeId(currentStep, nextStep)
   in FlowUtils.js. Nothing here is hardcoded pixel geometry;
   it is pure sequence data.
========================================================== */
 
export const mockMO = [
  { mo: "MO1001", type: "Bearing Assembly" },
  { mo: "MO1002", type: "Rework" },
  { mo: "MO1003", type: "Inspection" },
  { mo: "MO1004", type: "Scrap" },
];
 
/* ==========================================================
   MO -> ordered edge-id journey
 
   Edge ids reference FLOW_ROUTES entries, so each segment
   already carries its correct color/type (material / return /
   scrap) — the playback engine does not need to guess colors,
   it simply follows the edge definitions.
========================================================== */
 
export const MO_ROUTES = {
 
  // DM -> SHO -> Transit -> Channel -> Bearing -> Accurate -> FPS
  MO1001: [
    "dm-sho",
    "sho-transit",
    "transit-channel",
    "channel-bearing",
    "bearing-accurate",
    "accurate-fps",
  ],
 
  // DM -> SHO -> Transit -> Channel -> Rework -> Channel (return)
  // -> Bearing -> Packing -> FPS
  MO1002: [
    "dm-sho",
    "sho-transit",
    "transit-channel",
    "channel-rework",
    "channel-rework-return",
    "channel-bearing",
    "bearing-packing",
    "packing-fps",
  ],
 
  // DM -> SHO -> Transit -> Channel -> Bearing -> Accurate
  // -> Packing (return) -> FPS
  MO1003: [
    "dm-sho",
    "sho-transit",
    "transit-channel",
    "channel-bearing",
    "bearing-accurate",
    "accurate-packing-return",
    "packing-fps",
  ],
 
  // DM -> SHO -> Transit -> Channel -> Disassembly -> Common Scrap
  MO1004: [
    "dm-sho",
    "sho-transit",
    "transit-channel",
    "channel-disassembly",
    "disassembly-scrap",
  ],
 
};
 
export default mockMO;
 