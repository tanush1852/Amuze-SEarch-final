import React, { useState } from 'react';
import SearchBar from './SearchBar';
import TrackList from './TrackList';
import axios from 'axios';
import FrameComponent from './components/frame-component';
import BottomGroup1 from './components/bottom-group1';
import styles from './home-screen-dark1.module.css';
import TopGroup from './components/top-group';
import "./App.css";

function App() {
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleAddTrack = (track) => {
    if (selectedTracks.some(item => item.id === track.id)) {
      console.log(`Track "${track.title}" is already added to the list.`);
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handleRemoveTrack = (trackId) => {
    const updatedTracks = selectedTracks.filter(track => track.id !== trackId);
    setSelectedTracks(updatedTracks);
  };

  const handleClearAllTracks = () => {
    setSelectedTracks([]);
  };

  const handleExportToCSV = () => {
    const csvData = selectedTracks.map(track => `${track.image}${track.id},${track.name},${track.artist}`).join('\n');

    axios.post('http://localhost:8080/track-info', { csvData }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000' // Adjust the origin to match your frontend URL
      }
    })
    .then(response => {
      console.log('CSV file saved on the server');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeScreenDark}>
      <top-group/>
      <FrameComponent />
      <main className={styles.mainContent}>
        <section className={styles.optionsExpandParent}>
        <div className={styles.rectangleParent}>
          <div className={styles.trackContainerParent}>
          <div className={styles.searchBarContainer}>
            
            <h1 className={styles.header}>Amuze Search</h1>
            <SearchBar onAddTrack={handleAddTrack} />
          </div>
          <div className={styles.trackListContainer}>
            <TrackList
              tracks={selectedTracks}
              onRemoveTrack={handleRemoveTrack}
              onClearAllTracks={handleClearAllTracks}
              onExportToCSV={handleExportToCSV}
            />
           
          </div>
          </div>
        </div>
        </section>
      </main>
      <BottomGroup1 />
      </div>
    </div>
  );
}

export default App;


