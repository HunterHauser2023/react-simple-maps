import React, {useState} from "react";
import { geoCentroid } from "d3-geo";
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import {
  ComposableMap,
  Geographies,
  Marker,
  Annotation,
  ZoomableGroup,
  Geography
} from "react-simple-maps"
import ReactDOM from 'react-dom/client'
import County from "./County"

//import ReactToolTip from "react-tooltip";

import allStates from "./data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const root = ReactDOM.createRoot(document.getElementById('root'))

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};


function App(){
  const [content, setcontent] = useState("");
  return(
    <div>
      <h1 align="center">USA map</h1>
      <ComposableMap projection={geoAlbersUsaTerritories()} width={1600}>
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
                        fill: "#F53"
                      },
                    }}
                    onClick={() => (  
                      root.render(
                        <React.StrictMode>
                          <County />
                        </React.StrictMode>
                      )
                    )}
                  />
                ))}
                
                {geographies.map(geo => {
                  const centroid = geoCentroid(geo);
                  const cur = allStates.find(s => s.val === geo.id);
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle">
                              {cur.id}
                            </text>
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            dx={offsets[cur.id][0]}
                            dy={offsets[cur.id][1]}
                          >
                            <text x={4} fontSize={14} alignmentBaseline="middle">
                              {cur.id}
                            </text>
                          </Annotation>
                        ))}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
   


    /*
    <div className="App" style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1> United States of America </h1>
      <div style={{width: "1400px", borderStyle: "double"}}>
        <ComposableMap data-tip="">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
                />
                ))
                }
          </Geographies>
        </ComposableMap>

      </div>
    </div>
    */
  )
}

export default App;