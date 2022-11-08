import React, {useState} from "react";
//import { geoCentroid } from "d3-geo";
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
  Geography
} from "react-simple-maps"
import ReactTooltip from "react-tooltip";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WA-53-washington-counties.json";

function County(){
  return(
    <div align="center">
      <h1 align="center">Washington State</h1>
      <ComposableMap projection={geoAlbersUsaTerritories()} width={300}>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#DDD"
                    style={{
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#F44"
                      },
                    }}
                    onClick={{
                      fill: "#F44"
                    }}
                  />
                ))}
            </>
          )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default County;