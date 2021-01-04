import React from "react";
import { millisecondsToHuman } from "../../utils/TimerUtils";
import Button from "../Button";
import "./styles.css";
import { setState } from "react";
const Timer = ({ timer, onEdit, onDelete, onStart, onStop }) => {
  const { id, isRunning, title, project, eslapsed = 0 } = timer;

  const handleRemoveButton = () => {
    onDelete({
      id,
    });
  };

  const handleStartButton = () => {
    onStart({
      id,
    });
  };

  const handleStopButton = () => {
    onStop({
      id,
    });
  };

  return (
    <div className="timer">
      <p className="timer__title">{title}</p>
      <p className="timer__project">{project}</p>

      <p className="timer__time">{millisecondsToHuman(eslapsed)}</p>

      <div className="timer__button-group">
        <Button variant="warning" title="Edit" onClick={onEdit} />
        <Button variant="danger" title="Remove" onClick={handleRemoveButton} />
      </div>
      <div className="toggle_button">
        <Button
          isFull
          variant={isRunning ? "danger" : "primary"}
          title={isRunning ? "Stop" : "Start"}
          onClick={isRunning ? handleStopButton : handleStartButton}
        />
      </div>
    </div>
  );
};

export default Timer;
