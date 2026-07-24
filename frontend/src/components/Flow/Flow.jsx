import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Flow.css";

import {
  FLOW_ROUTES,
  FLOW_STYLES,
  computeConnectionPath,
  getCardEl,
  getEdgeById,
  findEdgeId,
  resolveNodeId,
} from "./FlowUtils";

import { mockMO, MO_ROUTES } from "./FlowMockData";

/* ==========================================================
   Playback Engine

   A small, self-contained factory that knows how to reveal
   one edge at a time (draw the line + move a glowing particle
   along it) and glow the destination card when it arrives.

   It only ever touches refs / the DOM directly (never React
   state), so it can run at 60fps without triggering re-renders,
   and it never goes stale — nothing here depends on props.

   This is the piece a future backend integration hooks into:
   window.SKF_FLOW.playSegment("Channel", "Bearing Storage")
   ========================================================== */

function createPlaybackEngine({ pathRefs, lengthsRef, particleRef, tokenRef }) {

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function clearGlow(nodeId) {
    const el = getCardEl(nodeId);
    if (!el) return;
    Object.values(FLOW_STYLES).forEach((s) => el.classList.remove(s.glowClass));
  }

  function glowCard(nodeId, style) {
    const el = getCardEl(nodeId);
    if (!el) return;
    Object.values(FLOW_STYLES).forEach((s) => el.classList.remove(s.glowClass));
    el.classList.add(style.glowClass);
    window.clearTimeout(el.__flowGlowTimeout);
    el.__flowGlowTimeout = window.setTimeout(() => {
      el.classList.remove(style.glowClass);
    }, 1400);
  }

  function resetAll() {

  Object.values(pathRefs.current).forEach((node) => {
    if (!node) return;

    node.style.strokeDasharray = "none";
    node.style.strokeDashoffset = "0";

    node.classList.remove("is-active");
    node.classList.remove("is-revealed");
  });

  if (particleRef.current) {
    particleRef.current.classList.remove("is-visible");
  }

}

  function animateSegment(edgeId, token) {

  return new Promise((resolve) => {

    const node = pathRefs.current[edgeId];
    const edge = getEdgeById(edgeId);

    if (!node || !edge) {
      resolve();
      return;
    }

    const style = FLOW_STYLES[edge.type] || FLOW_STYLES.material;
    const length = lengthsRef.current[edgeId] || node.getTotalLength();

    const particle = particleRef.current;

    if (particle) {
      particle.setAttribute(
        "class",
        `flow-particle is-visible ${style.particleClass}`
      );
    }

    const duration = Math.min(2800, Math.max(1400, length * 2.5));
    const start = performance.now();

    function frame(now) {

      if (tokenRef.current !== token) {
        if (particle) {
          particle.classList.remove("is-visible");
        }
        resolve();
        return;
      }

      const progress = Math.min(1, (now - start) / duration);

      const point = node.getPointAtLength(length * progress);

      if (particle) {
        particle.setAttribute("cx", point.x);
        particle.setAttribute("cy", point.y);
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {

        glowCard(edge.to, style);

        resolve();
      }

    }

    requestAnimationFrame(frame);

  });

}

  async function playRoute(edgeIds, token) {
    for (const edgeId of edgeIds) {
      if (tokenRef.current !== token) return;
      await animateSegment(edgeId, token);
      await wait(90);
    }
  }

  async function playMO(mo, token) {
    const route = MO_ROUTES[mo.mo];
    if (!route) return;
    if (particleRef.current) {
      // First card of every MO journey is DM Store
      glowCard("dm-store", FLOW_STYLES.material);
    }
    await playRoute(route, token);
  }

  async function playAll() {

  const token = ++tokenRef.current;

  resetAll();

  await wait(300);

  while (tokenRef.current === token) {

    for (const mo of mockMO) {

      if (tokenRef.current !== token) return;

      await playMO(mo, token);

      await wait(300);

    }

  }

}

  // Backend-ready single-segment trigger:
  //   window.SKF_FLOW.playSegment("Channel", "Bearing Storage")
  function playSegment(fromStep, toStep) {
    const edgeId = findEdgeId(resolveNodeId(fromStep), resolveNodeId(toStep));
    if (!edgeId) return;
    const token = ++tokenRef.current;
    animateSegment(edgeId, token);
  }

  return { resetAll, playAll, playSegment };

}

/* ==========================================================
   Flow Component
========================================================== */

const Flow = () => {

  const svgRef = useRef(null);
  const pathRefs = useRef({});
  const lengthsRef = useRef({});
  const particleRef = useRef(null);
  const tokenRef = useRef(0);

  const [paths, setPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const engine = useMemo(
    () => createPlaybackEngine({ pathRefs, lengthsRef, particleRef, tokenRef }),
    []
  );

  /* ---------- Layout measurement (unchanged approach) ---------- */

  const recalculate = useCallback(() => {

    const container = document.querySelector(".pvsm-canvas");

    if (!container) return;

    const rect = container.getBoundingClientRect();

    setSvgSize({ width: rect.width, height: rect.height });

    const result = FLOW_ROUTES.map((connection) => {

      const computed = computeConnectionPath(connection, container);

      if (!computed) return null;

      return {
        id: connection.id,
        from: connection.from,
        to: connection.to,
        type: connection.type,
        ...computed,
      };

    }).filter(Boolean);

    setPaths(result);

  }, []);

  useEffect(() => {

    requestAnimationFrame(() => {
      recalculate();
    });

    window.addEventListener("resize", recalculate);

    const container = document.querySelector(".pvsm-canvas");

    let observer;

    if (container) {
      observer = new ResizeObserver(() => {
        recalculate();
      });
      observer.observe(container);
    }

    return () => {
      window.removeEventListener("resize", recalculate);
      observer?.disconnect();
    };

  }, [recalculate]);

  /* ---------- Prime each path for the reveal animation ----------
     Runs whenever geometry is recalculated. Paths that are mid- or
     post-animation ("is-active" / "is-revealed") are left alone so
     a window resize during playback doesn't reset progress. */

  useEffect(() => {

    paths.forEach((path) => {

      const node = pathRefs.current[path.id];
      if (!node) return;

      if (node.classList.contains("is-active") || node.classList.contains("is-revealed")) {
        return;
      }

      const length = node.getTotalLength();
      lengthsRef.current[path.id] = length;

     if (path.type === "scrap") {
      node.style.strokeDasharray = "8 6";
      node.style.strokeDashoffset = "0";
    } else {
      node.style.strokeDasharray = "none";
      node.style.strokeDashoffset = "0";
    }

    });

  }, [paths]);

  /* ---------- Load Flow trigger ----------
     Fired by the header's "Load Flow" button. Since Header.jsx is
     outside this component's scope, it dispatches a plain window
     CustomEvent — see the integration note below. A direct
     window.SKF_FLOW.playAll() imperative call works too. */

  useEffect(() => {

      // Start animation automatically when Visual Flow opens
      engine.playAll();

      // Keep backend functions available
      window.SKF_FLOW = {
        playSegment: engine.playSegment,
        reset: engine.resetAll,
      };

      return () => {
        engine.resetAll();
        delete window.SKF_FLOW;
      };

    }, [engine]);

  return (

    <svg
      ref={svgRef}
      className="flow-svg"
      width={svgSize.width}
      height={svgSize.height}
      viewBox={`0 0 ${svgSize.width || 1} ${svgSize.height || 1}`}
      preserveAspectRatio="xMidYMid meet"
    >

     <defs>
        <marker
          id="arrow-green"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="3"
          orient="auto"
        >
          <path
            d="M0,0 L0,6 L9,3 z"
            fill="#16A34A"
          />
        </marker>

        <marker
          id="arrow-red"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
        >
          <path
            d="M0,0 L0,6 L9,3 z"
            fill="#DC2626"
          />
        </marker>

        <marker
          id="arrow-purple"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
        >
    <path
      d="M0,0 L0,6 L9,3 z"
      fill="#A855F7"
    />
  </marker>
</defs>

      {paths.map((path) => (
        <path
          key={path.id}
          id={`flow-path-${path.id}`}
          ref={(el) => {
            if (el) pathRefs.current[path.id] = el;
          }}
          className="flow-path"
          d={path.d}
          stroke={path.style.stroke}
          strokeWidth={path.style.strokeWidth}
          markerEnd={
            path.type === "material"
              ? "url(#arrow-green)"
              : path.type === "return"
              ? "url(#arrow-red)"
              : "url(#arrow-purple)"
          }
          markerStart={
            path.type === "return"
              ? "url(#arrow-red)"
              : undefined
          }
        />
      ))}

    <circle
      ref={particleRef}
      className="flow-particle"
      r="8"
      cx="0"
      cy="0"
    />

    </svg>

  );

};

export default Flow;
