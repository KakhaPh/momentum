"use client";
import React, { useContext, useEffect, useState } from 'react';
import { fetchStatuses } from '../api/statuses';
import { fetchTasks } from '../api/tasks';
import StatusColumn from './StatusColumn';
import { FilterContext } from '../context/FilterContext';

const Statuses = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { selectedDepartments, selectedPriorities, selectedEmployees } = useContext(FilterContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statusesData, tasksData] = await Promise.all([
          fetchStatuses(),
          fetchTasks()
        ]);

        setStatuses(statusesData);
        setTasks(tasksData);
      } catch (error) {
        setError('Failed to fetch data!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTasksByStatusId = (statusId: number) => {
    return tasks.filter(task => {
      const statusMatch = task.status.id === statusId;

      const departmentMatch = selectedDepartments.length === 0 ||
        selectedDepartments.includes(task.department?.name || '');

      const priorityMatch = selectedPriorities.length === 0 ||
        selectedPriorities.includes(task.priority?.name || '');

      const employeeMatch = selectedEmployees.length === 0 ||
        selectedEmployees.includes(task.employee?.name || '');

      return statusMatch && departmentMatch && priorityMatch && employeeMatch;
    });
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (isLoading) return <div>Loading data...</div>;

  return (
    <div className='grid grid-cols-4 w-full h-fit gap-[50px] mt-12'>
      {statuses.map((status, index) => {
        const statusTasks = getTasksByStatusId(status.id);
        return (
          <StatusColumn
            key={status.id}
            status={status}
            statusIndex={index}
            tasks={statusTasks}
          />
        );
      })}
    </div>
  );
};

export default Statuses;