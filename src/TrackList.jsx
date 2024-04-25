import React from 'react';
import { CSVLink } from 'react-csv';
import styles from "./TrackList.css"
import cross from "./cross.png"
function TrackList({ tracks, onRemoveTrack, onClearAllTracks, onExportToCSV }) {
  return (
    <div>
      <h2>Selected Tracks</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
             <img src={track.image} alt="Song Icon" />
            {track.name} - {track.artist}
            <button className={styles.removeButton} onClick={() => onRemoveTrack(track.id)}> <img src={cross} alt="Remove"/></button>
          </li>
        ))}
      </ul>
      <button onClick={onClearAllTracks}>Clear All</button>
      <button onClick={onExportToCSV}>Submit List</button>
    
    </div>
  );
}

export default TrackList;
