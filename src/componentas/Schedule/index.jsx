import React, { useState, useEffect } from 'react';
import ClientRow from '../Calendar/ClientColumn';
import Calendar from '../Calendar/Calendar';

const Schedule = () => {

  const initialTasksByDay = {
    "Sunday": [],
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": []
  };

  const [tasksByDay, setTasksByDay] = useState(() => {
    const storedTasks = localStorage.getItem('tasksByDay');
    return storedTasks ? JSON.parse(storedTasks) : initialTasksByDay;
  });

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const initialTaskInputs = daysOfWeek.reduce((acc, day) => {
    acc[day] = {};
    return acc;
  }, {});

  const [taskInputs, setTaskInputs] = useState(() => {
    const storedTaskInputs = localStorage.getItem('taskInputs');
    return storedTaskInputs ? JSON.parse(storedTaskInputs) : {};
  });

  useEffect(() => {
    localStorage.setItem('tasksByDay', JSON.stringify(tasksByDay));
  }, [tasksByDay]);

  useEffect(() => {
    localStorage.setItem('taskInputs', JSON.stringify(taskInputs));
  }, [taskInputs]);

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const addTask = (clientId, taskName) => {
    setTasksByDay(prevTasksByDay => {
      const updatedTasksByDay = { ...prevTasksByDay };
      daysOfWeek.forEach(day => {
        updatedTasksByDay[day] = updatedTasksByDay[day].map(client =>
          client.id === clientId
            ? {
              ...client,
              tasks: [...client.tasks, { id: generateUniqueId(), name: taskName }]
            }
            : client
        );
      });
      setTaskInputs(prevInputs => ({
        ...prevInputs,
        [generateUniqueId()]: { ...initialTaskInputs }
      }));
      return updatedTasksByDay;
    });
  };

  const addClient = (clientName) => {
    const clientExists = daysOfWeek.some(day =>
      tasksByDay[day].findIndex(client => client.name === clientName) !== -1
    );

    if (clientExists) {
      alert(`Client '${clientName}' already exists! Please use a different name.`);
      return;
    }

    const clientId = generateUniqueId();

    setTasksByDay(prevTasksByDay => {
      const updatedTasksByDay = { ...prevTasksByDay };
      daysOfWeek.forEach(day => {
        if (!updatedTasksByDay[day]) {
          updatedTasksByDay[day] = [];
        }
        updatedTasksByDay[day].push({ id: clientId, name: clientName, tasks: [] });
        setTaskInputs(prevInputs => ({
          ...prevInputs,
          [clientId]: { ...initialTaskInputs }
        }));
      });
      return updatedTasksByDay;
    });
  };

  return (
    <div className="mb-[40px]">
      <Calendar daysOfWeek={daysOfWeek} addClient={addClient} />
      <table className="overflow-scroll block max-w-[1400px] w-full">
        <thead className='w-full'>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Client</th>
            {daysOfWeek.map(day => (
              <th key={day} className="border px-4 py-2">{day}</th>
            ))}
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody  className="w-full">
          {tasksByDay[daysOfWeek[0]].map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              daysOfWeek={daysOfWeek}
              addTask={addTask}
              taskInputs={taskInputs}
              setTaskInputs={setTaskInputs}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
