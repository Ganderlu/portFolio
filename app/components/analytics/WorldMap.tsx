"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  data: { code: string; visitors: number }[];
}

const colorScale = scaleLinear<string>()
  .domain([0, 100]) // Will be adjusted based on data
  .range(["#1a0b2e", "#a855f7"]);

export default function WorldMap({ data }: WorldMapProps) {
  const maxVisitors = Math.max(...data.map((d) => d.visitors), 1);
  
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <Sphere stroke="#ffffff10" strokeWidth={0.5} id="sphere" fill="transparent" />
        <Graticule stroke="#ffffff05" strokeWidth={0.5} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = data.find((d) => d.code === geo.id || d.code === geo.properties.ISO_A2);
              const visitors = countryData ? countryData.visitors : 0;
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={visitors > 0 ? colorScale((visitors / maxVisitors) * 100) : "#ffffff05"}
                  stroke="#ffffff10"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#a855f7", outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
