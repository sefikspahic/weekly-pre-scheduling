import React, { useState } from 'react';

const ClientRow = ({ client, daysOfWeek, addTask, taskInputs, setTaskInputs }) => {

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const initialTaskInputs = daysOfWeek.reduce((acc, day) => {
    acc[day] = { time: '' };
    return acc;
  }, {});

  const [newTaskName, setNewTaskName] = useState('');

  const handleTaskChange = (clientId, day, value) => {
    setTaskInputs(prevInputs => ({
      ...prevInputs,
      [clientId]: {
        ...prevInputs[clientId],
        [day]: { time: value }
      }
    }));
  };

  const calculateTotalTasks = (clientId) => {
    return daysOfWeek.reduce((acc, day) => {
      const timeValue = parseFloat(taskInputs[clientId]?.[day]?.time || 0);
      return acc + timeValue;
    }, 0);
  };

  const handleAddTask = (clientId) => {
    if (newTaskName.trim()) {
      addTask(clientId, newTaskName);
      setTaskInputs(prevInputs => ({
        ...prevInputs,
        [generateUniqueId()]: { ...initialTaskInputs }
      }));
      setNewTaskName('');
    }
  };

  const totalTasks = calculateTotalTasks(client.id) + (client.tasks ? client.tasks.reduce((acc, task) => {
    return acc + calculateTotalTasks(task.id);
  }, 0) : 0);

  const totalTasksByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = (parseFloat(taskInputs[client.id]?.[day]?.time) || 0) + (client.tasks ? client.tasks.reduce((subAcc, task) => {
      return subAcc + (parseFloat(taskInputs[task.id]?.[day]?.time) || 0);
    }, 0) : 0);
    return acc;
  }, {});

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask(client.id);
    }
  };
  return (
    <>
      <tr>
        <td className="border px-4 py-2 object-contain w-full">
          <div className='flex flex-col'>
            {client?.name}
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Task Name"
              className="border p-1 ml-2"
            />
            <button onClick={() => handleAddTask(client.id)} className="ml-2 p-1 bg-blue-500 text-white">Add Task</button>
          </div>
        </td>
        {daysOfWeek.map(day => (
          <td key={day} className="border px-4 py-2 ">
            <input
              type="number"
              value={taskInputs[client.id]?.[day]?.time || ''}
              onChange={(e) => handleTaskChange(client.id, day, e.target.value)}
              placeholder="Time (e.g. 1.5)"
              className="border p-1 mr-2 w-[90px] "
            />
          </td>
        ))}
        <td className="border px-4 py-2">{calculateTotalTasks(client.id)}h</td>
      </tr>
      {client.tasks && client.tasks.map(task => (
        <tr key={task.id} className={`${task ? "bg-blue-500" : "bg-slate-300 "}`}>
          <td className="border px-4 py-2 pl-8">{task.name}</td>
          {daysOfWeek.map(day => (
            <td key={day} className="border px-4 py-2">
              <input
                type="number"
                value={taskInputs[task.id]?.[day]?.time || ''}
                onChange={(e) => handleTaskChange(task.id, day, e.target.value)}
                placeholder="Time (e.g. 1.5)"
                className="border p-1 mr-2 w-[90px]"
              />
            </td>
          ))}
          <td className="border px-4 py-2">{calculateTotalTasks(task.id)}h</td>
        </tr>
      ))}
      <tr>
        <td className="border px-4 py-2 ">Total for <strong className='font-[600]'>{client.name}</strong></td>
        {daysOfWeek.map(day => (
          <td key={day} className="border px-4 py-2 font-bold">{totalTasksByDay[day]}h</td>
        ))}
        <td className="border px-4 py-2 font-bold">{totalTasks}h</td>
      </tr>
    </>
  );
};

export default ClientRow;
