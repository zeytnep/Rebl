/* eslint-disable max-len */
import './allstates.json';
import './App.css';
import React from 'react';

import {faPieChart} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
// import * as d3 from 'd3';
import PieHooks from './PieHooks';
import MapChart from './MapChart';
import Popup from 'reactjs-popup';

import googleData from './googleTrends.json';
import redditData from './redditData.json';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


function App() {
  const {collapseSidebar} = useProSidebar();

  return (
    <div className="App">
      <div className='my-navbar'>
        <p className='no-padding'>REBL</p>
        <div className='icons-nav'>
          <Popup trigger={<FontAwesomeIcon className='stats' size='lg'icon={faPieChart} />} modal >
            <div className='stats-widget'>
              <div className='row-graphs'>
                <span className="label"><p>Top States on Reddit </p></span>
                <br></br>
                <PieHooks
                  // className='piegraph'
                  data={redditData}
                  width={'50vh'}
                  height={'50vh'}
                  innerRadius={50}
                  outerRadius={175}
                />
              </div>
              <div className='row-graphs'>
                <span className="label"><p>Top States in Google Trends </p></span>
                <br></br>
                <PieHooks
                  // className='piegraph'
                  data={googleData}
                  width={'50vh'}
                  height={'50vh'}
                  innerRadius={50}
                  outerRadius={175}
                />
              </div>
            </div>
          </Popup>
          <Popup trigger={<FontAwesomeIcon className='info' size='lg' icon={faQuestionCircle} />} modal >
            <div className='info-widget'>
              <h1 className='info-header'>Project REBL</h1>
              <p className='info-text'>
              Political corruption is a widespread and persistent problem in societies around the world.
              It occurs when elected or appointed officials abuse their power for personal gain or the
              benefit of their associates or supporters. Corruption can take many forms, including bribery,
              embezzlement, nepotism, cronyism, and favoritism, among others. The effects of political corruption
              can be devastating, leading to the misallocation of resources, the erosion of public trust, the
              undermining of democratic institutions, and the perpetuation of inequality and poverty. As such,
              combating political corruption remains an ongoing challenge for governments, civil society organizations,
              and individuals alike.
              </p>
              <h2 className='info-header'>OVERVIEW</h2>
              <p className='info-text'>
              Project REBL is a web-based application designed to facilitate the analysis and visualization of social media
              data related to political corruption. The application utilizes two APIs, namely Reddit and Google Trends,
              to collect and process data from various social media platforms. By leveraging these APIs, users can gain
              insights into trending topics, sentiment analysis, and network analysis related to political corruption.
              </p>
              <p className='info-text'>
              The team behind this project is composed of four University of Guelph students who plan to continue developing
              and enhancing the application to better assist users in identifying and combating political corruption.
              </p>
              <h2 className='info-header'>AUTHORS</h2>
              <p className='info-text'>
                Saqif Abrar | Shaiza Hashmi | Zeynep Erdogru
              </p>
            </div>
          </Popup>
        </div>
      </div>
      <div className='site-view'>
        <div className='map-panel'>
          <MapChart/>
        </div>
        <div className='menu-panel' id="app">
          <Sidebar className='menu-panel'>
            <Menu className='menu-panel'>
              <MenuItem
                className='menu-panel'
                icon={<MenuOutlinedIcon />}
                onClick={() => {
                  collapseSidebar();
                }}
              >
                <p className='menu-header'>Options</p>
              </MenuItem>
              <div className='menu'>
                <p className='menu-text'>Platform</p>
                <p className='menu-text'>Time</p>
                <p className='menu-text'>Search Tags</p>
                <p className='menu-text'>Options</p>
              </div>
            </Menu>
          </Sidebar>
        </div>
        {/* <div className='side-panel'>
          <h1>Side Panel</h1>
        </div> */}
      </div>
    </div>
  );
}

export default App;

