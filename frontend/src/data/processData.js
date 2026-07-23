import {
  FaWarehouse,
  FaChartLine,
  FaTruck,
  FaBoxOpen,
  FaNetworkWired,
  FaPallet,
  FaBoxes,
  FaWrench,
  FaSyncAlt,
  FaBullseye,
  FaBox,
  FaTrash,
  FaShieldAlt,
} from "react-icons/fa";

export const processData = {
  topRow: [
    {
      id: "dm-store",
      title: "DM Store",
      subtitle: "Material Storage",
      icon: FaWarehouse,
      type: "main",
    
    },
    {
      id: "sho",
      title: "SHO",
      subtitle: "Shared Handling",
      icon: FaChartLine,
      type: "main",
    },
    {
      id: "transit-buffer",
      title: "Transit Buffer",
      subtitle: "Buffer",
      icon: FaTruck,
      type: "main",
    },
    {
      id: "channel",
      title: "Channel",
      subtitle: "Production",
      icon: FaNetworkWired,
      type: "main",
    },
    {
      id: "bearing-storage",
      title: "Bearing Storage",
      subtitle: "Storage",
      icon: FaPallet,
      type: "main",
    },
  ],

  middleRow: [
    {
      id: "cps",
      title: "CPS",
      subtitle: "Storage",
      icon: FaBoxes,
      type: "channel",
    },
    {
      id: "disassembly",
      title: "Disassembly Area",
      subtitle: "Rework",
      icon: FaWrench,
      type: "channel",
    },
    {
      id: "rework",
      title: "Rework Area",
      subtitle: "Repair",
      icon: FaSyncAlt,
      type: "channel",
    },
  ],

  rightSection: [
    {
      id: "accurate",
      title: "Accurate",
      subtitle: "Inspection",
      icon: FaBullseye,
      type: "quality",
    },
    {
      id: "auto-packing",
      title: "Auto Packing",
      subtitle: "Packing",
      icon: FaBox,
      type: "quality",
    },
  ],

  bottom: {
    id: "common-scrap",
    title: "Common Scrap",
    subtitle: "Scrap",
    icon: FaTrash,
    type: "scrap",
  },

  fps: {
    id: "fps",
    title: "FPS",
    subtitle: "Finished Product",
    icon: FaShieldAlt,
    status: "Finished",
    type: "quality",
  },
};