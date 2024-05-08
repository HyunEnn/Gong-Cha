import React from 'react';

function PlayerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-content">
          <h2>Player Information</h2>
          <ul>
            <li>Time: 00:00 - 24:00</li>
            <li>Name, Age, Position, Team</li>
          </ul>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;