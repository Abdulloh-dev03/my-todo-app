import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoTasks, addTask, editTask, deleteTask } from './Redux/Todoslice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const App = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);

  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    dispatch(todoTasks());
  }, [dispatch]);

  const handleAddTaskClick = () => {
    if (taskName.trim()) {
      const taskData = { name: taskName, status: taskStatus };

      if (isEditing) {
        dispatch(editTask({ id: tasks[editIndex].id, task: taskData }));
        setIsEditing(false);
        setEditIndex(null);
      } else {
        dispatch(addTask(taskData));
      }

      setTaskName('');
      setTaskStatus('To Do');
      setIsInputVisible(false);
    }
  };

  const handleEditClick = (index) => {
    setTaskName(tasks[index].name);
    setTaskStatus(tasks[index].status); 
    setIsInputVisible(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleRemoveClick = (id) => {
    dispatch(deleteTask(id));
  };

  if (loading) return <p className='font-mono'>Loading...</p>;
  if (error) return <p className='font-mono'>Error: {error}</p>;

  return (
    <>
      <div className='container mx-auto px-4 md:px-8 lg:px-16'>
        <div className='my-10 font-mono text-center'>
          <h1 className='text-[30px] md:text-[40px] font-bold font-mono'>Todo List Demo App</h1>
          <p className='rounded text-[14px] md:text-[16px] bg-[#FCF8E3] inline-block px-4 py-1 mt-2 shadow font-mono'>
            Do it now.
          </p>
        </div>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-center mb-6 font-mono'>
          {isInputVisible && (
            <>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className='outline-none border-2 rounded-md w-full md:w-[20vw] p-2 shadow-sm font-mono'
                placeholder='Enter task name'
              />
              <select
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                className='border-2 rounded-md w-full md:w-auto p-2 shadow-sm font-mono'
              >
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
            </>
          )}
          <button
            className='border border-blue-500 px-3 py-2 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 shadow-sm font-mono w-full md:w-auto'
            onClick={isInputVisible ? handleAddTaskClick : () => setIsInputVisible(true)}
          >
            {isInputVisible ? (isEditing ? 'Update' : 'Submit') : 'Add Task'}
          </button>
        </div>
        <table className='my-10 mx-auto border-collapse w-full md:w-[600px] lg:w-[800px] shadow-lg font-mono'>
          <thead>
            <tr className='bg-gray-200'>
              <th className="border px-2 md:px-4 py-2 text-center font-mono">#</th>
              <th className="border px-2 md:px-4 py-2 text-center font-mono max-w-[150px]">Task Name</th>
              <th className="border px-2 md:px-4 py-2 text-center font-mono">Status</th>
              <th className="border px-2 md:px-4 py-2 text-center font-mono">Edit</th>
              <th className="border px-2 md:px-4 py-2 text-center font-mono">Remove</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id} className='hover:bg-gray-100 transition duration-300'>
                <td className="border px-2 md:px-4 py-2 text-center font-mono">{index + 1}</td>
                <td className="border px-2 md:px-4 py-2 text-center font-mono max-w-[150px] break-words">{task.name}</td>
                <td
                  className={`border px-2 md:px-4 py-2 text-center font-mono ${
                    task.status === 'Completed' ? 'text-green-500' :
                    task.status === 'In Progress' ? 'text-yellow-500' : ''
                  }`}
                >
                  {task.status}
                </td>
                <td className="border px-2 md:px-4 py-2 text-center font-mono">
                  <button className='text-blue-500 hover:text-blue-700 transition duration-300' onClick={() => handleEditClick(index)}>
                    <MdEdit />
                  </button>
                </td>
                <td className="border px-2 md:px-4 py-2 text-center font-mono">
                  <button className='text-red-500 hover:text-red-700 transition duration-300' onClick={() => handleRemoveClick(task.id)}>
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
