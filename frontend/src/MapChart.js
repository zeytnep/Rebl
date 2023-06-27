/* eslint-disable react/jsx-key */
import React from 'react';
import {geoCentroid} from 'd3-geo';
// import {Tooltip} from 'react-tooltip';
import Popup from 'reactjs-popup';


import {ComposableMap, Geographies, Geography, Marker, Annotation,
} from 'react-simple-maps';

import stateData from './statedata.json';
import allStates from './allstates.json';
// import {Tooltip} from '@mui/material';

// URL for the JSON file that contains the geographic data for the United States
const geoUrl =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// Contains the positions for labels of certain states
// that are not clearly visible on the map
const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

export function MapChart() {
  return (
    <div>
      <ComposableMap className='map-area' projection="geoAlbersUsa">
        <Geographies geography={geoUrl} >
          {({geographies}) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#73E6AA"
                  geography={geo}
                  fill="#008064"
                />
              ))}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find((s) => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + '-name'}>

                    {cur && centroid[0] > -160 && centroid[0] < -67 && (
                      Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid} >
                          <text y="-8" fontSize={15} textAnchor="middle">
                            {cur.val}
                          </text>
                          <Popup trigger={<circle
                            r={5}
                            fill="#00573B"
                            stroke="#008064"
                            strokeWidth={1}>
                          </circle>} modal >
                            <div className='state-popup'>
                              { stateData.map((data) => {
                                if (data.id === cur.id) {
                                  return (
                                    <div>
                                      <p className='state-title'>State: </p>
                                      <p className='state-text'>
                                        {data.name}</p>
                                      <p className='state-title'>
                                        Geo Location ID: </p>
                                      <p className='state-text'>
                                        {data.geoCode} </p>
                                      <p className='state-title'>
                                        Hot Keywords: </p>
                                      <p className='state-text'>
                                        {data.keyword}</p>
                                      <p className='state-title'>
                                        # of Posts under keywords: </p>
                                      <p className='state-text'>
                                        {data.postNumber}</p>
                                      <p className='state-title'>
                                        Related Topics: </p>
                                      <p className='state-text'>
                                        {data.relatedTopics}</p>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </Popup>

                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                        >
                          <Popup trigger={<text x={4}
                            fontSize={14}
                            alignmentBaseline="middle">
                            {cur.val}
                          </text>} modal >
                            <div className='state-popup'>
                              Popup content here !!
                              TESTINGGG
                            </div>
                          </Popup>
                        </Annotation>
                      )
                    )}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      {/* <Tooltip id="my-tooltip" /> */}
    </div>
  );
}

export default MapChart;

