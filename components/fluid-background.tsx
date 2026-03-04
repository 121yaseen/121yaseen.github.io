"use client";

import WebGLFluidEnhanced from "webgl-fluid-enhanced";
import { useEffect, useMemo, useRef, useState } from "react";

type FluidQuality = "desktop" | "mobile" | "reducedMotion";

type FluidConfigPreset = {
  simResolution: number;
  dyeResolution: number;
  densityDissipation: number;
  velocityDissipation: number;
  pressure: number;
  pressureIterations: number;
  curl: number;
  splatRadius: number;
  splatForce: number;
  shading: boolean;
  colorful: boolean;
  colorUpdateSpeed: number;
  colorPalette: string[];
  hover: boolean;
  transparent: boolean;
  brightness: number;
  bloom: boolean;
  sunrays: boolean;
};

const FLUID_BASE_CONFIG: Omit<FluidConfigPreset, "simResolution" | "dyeResolution"> = {
  densityDissipation: 0.5,
  velocityDissipation: 3,
  pressure: 0.1,
  pressureIterations: 20,
  curl: 3,
  splatRadius: 0.2,
  splatForce: 6000,
  shading: true,
  colorful: true,
  colorUpdateSpeed: 10,
  colorPalette: [],
  hover: false,
  transparent: true,
  brightness: 1,
  bloom: false,
  sunrays: false,
};

const FLUID_QUALITY_OVERRIDES: Record<FluidQuality, Pick<FluidConfigPreset, "simResolution" | "dyeResolution">> = {
  desktop: {
    simResolution: 128,
    dyeResolution: 1440,
  },
  mobile: {
    simResolution: 128,
    dyeResolution: 1024,
  },
  reducedMotion: {
    simResolution: 96,
    dyeResolution: 384,
  },
};

function supportsWebGL() {
  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl"),
  );
}

function getFluidQuality(): FluidQuality {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "reducedMotion";
  }

  if (window.innerWidth < 768) {
    return "mobile";
  }

  return "desktop";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fluidRef = useRef<WebGLFluidEnhanced | null>(null);
  const pointerRafRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const hasStartedRef = useRef(false);
  const webglEnabledRef = useRef(true);

  const [hasWebGL, setHasWebGL] = useState(true);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const quality = getFluidQuality();
    const config: FluidConfigPreset = {
      ...FLUID_BASE_CONFIG,
      ...FLUID_QUALITY_OVERRIDES[quality],
    };

    const scheduleFallbackState = () => {
      window.requestAnimationFrame(() => {
        setHasWebGL(false);
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      if (!webglEnabledRef.current) {
        setMouse({
          x: (x / window.innerWidth) * 100,
          y: (y / window.innerHeight) * 100,
        });
        return;
      }

      const fluid = fluidRef.current;
      if (!fluid) {
        return;
      }

      if (!hasStartedRef.current) {
        fluid.start();
        hasStartedRef.current = true;
      }

      if (pointerRafRef.current) {
        cancelAnimationFrame(pointerRafRef.current);
      }

      pointerRafRef.current = requestAnimationFrame(() => {
        const prevPointer = lastPointerRef.current;
        if (!prevPointer) {
          lastPointerRef.current = { x, y };
          return;
        }

        const aspect = window.innerWidth / window.innerHeight;
        let deltaX = (x - prevPointer.x) / window.innerWidth;
        let deltaY = (prevPointer.y - y) / window.innerHeight;

        lastPointerRef.current = { x, y };

        if (aspect < 1) {
          deltaX *= aspect;
        }
        if (aspect > 1) {
          deltaY /= aspect;
        }

        const forceX = clamp(deltaX * config.splatForce, -1000, 1000);
        const forceY = clamp(deltaY * config.splatForce, -1000, 1000);
        const dpr = window.devicePixelRatio || 1;
        fluid.splatAtLocation(x * dpr, y, forceX, forceY);
      });
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (!supportsWebGL()) {
      webglEnabledRef.current = false;
      scheduleFallbackState();

      return () => {
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }

    try {
      const fluid = new WebGLFluidEnhanced(container);
      fluid.setConfig(config);
      fluidRef.current = fluid;
      webglEnabledRef.current = true;
      window.requestAnimationFrame(() => {
        setHasWebGL(true);
      });
    } catch {
      webglEnabledRef.current = false;
      scheduleFallbackState();
    }

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);

      if (pointerRafRef.current) {
        cancelAnimationFrame(pointerRafRef.current);
      }

      fluidRef.current?.stop();
      fluidRef.current = null;
      lastPointerRef.current = null;
      hasStartedRef.current = false;
    };
  }, []);

  const fallbackStyle = useMemo(
    () => ({
      background: `
        radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(246, 183, 225, 0.42), transparent 26%),
        radial-gradient(circle at ${100 - mouse.x}% ${100 - mouse.y}%, rgba(181, 236, 255, 0.38), transparent 24%),
        radial-gradient(circle at 50% 55%, rgba(198, 183, 255, 0.28), transparent 32%),
        #f8fbff
      `,
    }),
    [mouse.x, mouse.y],
  );

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-0">
      {!hasWebGL && (
        <div className="h-screen w-screen">
          <div className="h-full w-full transition-[background] duration-200 ease-out" style={fallbackStyle} />
        </div>
      )}

      <div
        ref={containerRef}
        className={`${hasWebGL ? "block" : "hidden"} h-screen w-screen`}
        style={{ touchAction: "none" }}
        aria-hidden="true"
      />
    </div>
  );
}
