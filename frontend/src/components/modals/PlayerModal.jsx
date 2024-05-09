import React from 'react';

function PlayerModal({ isOpen, onClose, player }) {
  if (!isOpen || !player) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-content">
          <h2>Player Information</h2>
          <ul>
            <li>Time: {player.data.startTime} - {player.data.endTime}</li>
            <li>Name: {player.data.user_id}</li>
            <li>Age: {player.data.age}</li>
            <li>Position: {player.data.position}</li>
            <li>Team: {player.data.team}</li>
          </ul>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
}


export default PlayerModal;