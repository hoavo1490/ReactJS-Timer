import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import ToggleableTimerForm from "./component/ToggleableTimerForm";
import EditableTimer from "./component/EditableTimer";
import { newTimer } from "./utils/TimerUtils";
import "./App.css";

const ONE_SEC = 1000;

const App = () => {
  const [timers, setTimers] = useState([
    {
      id: uuidv4(),
      title: "Learn React",
      project: "Internship",
      eslapsed: 24321152,
      isRunning: true,
    },
    {
      id: uuidv4(),
      title: "React session 2",
      project: "Internship",
      eslapsed: 0,
      isRunning: false,
    },
  ]);

  // useEffect combine with timeOut will make a infinity loop to increase time
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimers(
        timers.map((timer) => ({
          ...timer,
          eslapsed: timer.isRunning ? timer.eslapsed + ONE_SEC : timer.eslapsed,
        }))
      );
    }, ONE_SEC);

    return () => clearTimeout(timeout);
  }, [timers]);

  // There are many way to add new element to array, here we use SPREAD in ES6
  const handleCreateForm = (timer) => {
    setTimers([newTimer(timer), ...timers]);
  };

  const handleRemoveForm = (timer) => {
    setTimers(timers.filter((item) => item.id !== timer.id));
  };

  // And there are many to clone an object, here we also use SPREAD, but it can cause bug.
  // Research about shallow copy & deep copy to know more
  const handleUpdateForm = (timer) => {
    setTimers(
      timers.map((item) => {
        if (item.id === timer.id)
          return {
            ...item,
            title: timer.title,
            project: timer.project,
          };

        return item;
      })
    );
  };

  const handleStartButton = (timer) => {
    setTimers(
      timers.map((item) => {
        if (item.id === timer.id)
          return {
            ...item,
            isRunning: true,
          };
        return item;
      })
    );
  };

  const handleStopButton = (timer) => {
    setTimers(
      timers.map((item) => {
        if (item.id === timer.id)
          return {
            ...item,
            isRunning: false,
          };

        return item;
      })
    );
  };

  return (
    <div className="app">
      <p className="app__title">Timers</p>

      <div className="app__body">
        <ToggleableTimerForm isOpen={false} onSubmit={handleCreateForm} />

        {timers.map((timer) => (
          <EditableTimer
            onDelete={handleRemoveForm}
            onSubmit={handleUpdateForm}
            timer={timer}
            onStart={handleStartButton}
            onStop={handleStopButton}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
