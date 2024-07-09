import React, { useState } from 'react';

const Calendar = ({ daysOfWeek, addClient }) => {
  const [newClientName, setNewClientName] = useState('');

  const handleAddClient = () => {
    if (newClientName.trim() !== '') {
      addClient(newClientName);
      setNewClientName('');
    }
  };

  const handleInputChange = (event) => {
    setNewClientName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddClient();
    }
  };

  return (
    <div className="header p-4 bg-blue-500 text-white flex justify-between">
      <div className="days flex">
        {daysOfWeek.map(day => (
          <div key={day} className="flex flex-col items-center mx-2">
          </div>
        ))}
      </div>
      <div className="clients flex flex-col items-center">
        <h3 className='text-left w-full'>Clients</h3>
        <div className="flex items-center">
          <input
            type="text"
            value={newClientName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} 
            placeholder="Enter client name"
            className="p-2 border rounded mr-2 text-black"
          />
          <button  onClick={handleAddClient} className="bg-yellow-500 p-2 rounded">Add Client</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
