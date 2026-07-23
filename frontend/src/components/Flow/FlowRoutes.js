/* ==========================================================
   SKF P-VSM Dashboard
   FlowRoutes.js

   Single Source of Truth for every connection.
========================================================== */

export const FLOW_ROUTES = [

    /* ======================================================
       MATERIAL FLOW
    ====================================================== */

    {
        id: "dm-sho",
        from: "dm-store",
        to: "sho",
        type: "material"
    },

    {
        id: "sho-transit",
        from: "sho",
        to: "transit-buffer",
        type: "material"
    },

    {
        id: "transit-channel",
        from: "transit-buffer",
        to: "channel",
        type: "material"
    },

    {
        id: "channel-bearing",
        from: "channel",
        to: "bearing-storage",
        type: "material"
    },

    {
        id: "channel-cps",
        from: "channel",
        to: "cps",
        type: "material"
    },

    {
        id: "channel-disassembly",
        from: "channel",
        to: "disassembly",
        type: "material"
    },

    {
        id: "channel-rework",
        from: "channel",
        to: "rework",
        type: "material"
    },

    {
        id: "bearing-accurate",
        from: "bearing-storage",
        to: "accurate",
        type: "material"
    },

    {
        id: "bearing-packing",
        from: "bearing-storage",
        to: "auto-packing",
        type: "material"
    },

    {
        id: "accurate-fps",
        from: "accurate",
        to: "fps",
        type: "material"
    },

    {
        id: "packing-fps",
        from: "auto-packing",
        to: "fps",
        type: "material"
    },
    {
        id: "accurate-packing",
        from: "accurate",
        to: "auto-packing",
        type: "material"
    },



    /* ======================================================
       SCRAP FLOW
    ====================================================== */


    {
    id: "sho-scrap",
    from: "sho",
    to: "common-scrap",
    type: "scrap"
    },

    {
    id: "channel-scrap",
    from: "channel",
    to: "common-scrap",
    type: "scrap",
    },

    {
    id: "disassembly-scrap",
    from: "disassembly",
    to: "common-scrap",
    type: "scrap",
    },

    {
    id: "rework-scrap",
    from: "rework",
    to: "common-scrap",
    type: "scrap",
    },


    /* ======================================================
       RETURN FLOW
    ====================================================== */

    {
        id: "channel-cps-return",
        from: "cps",
        to: "channel",
        type: "return"
    },

    {
        id: "channel-disassembly-return",
        from: "disassembly",
        to: "channel",
        type: "return"
    },

    {
        id: "channel-rework-return",
        from: "rework",
        to: "channel",
        type: "return"
    },

];