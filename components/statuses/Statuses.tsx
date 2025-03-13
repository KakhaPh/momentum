"use client";
import React, { useEffect, useState } from 'react'
import { fetchStatuses } from '../api/statuses';

interface Status {
  id: number;
  name: string;
}

const statusColors = [
  { bg: 'bg-yellowbg', border: 'border-yellowbg' },
  { bg: 'bg-orangebg', border: 'border-orangebg' },
  { bg: 'bg-pinkbg', border: 'border-pinkbg' },
  { bg: 'bg-bluebg', border: 'border-bluebg' }
];

const Statuses = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getStatuses = async () => {
      try {
        setLoading(true);
        const data = await fetchStatuses();
        setStatuses(data)
      } catch (error) {
        setError('Failed to fetch data!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getStatuses();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (isLoading) return <div>Loading statuses...</div>;

  return (
    <div className='grid grid-cols-4 w-full h-fit gap-[80px] mt-10'>
      {statuses.map((status, index) => (
        <div key={status.id} className='grid grid-cols gap-[30px]'>
          <div className={`font-medium text-xl h-[54px] p-[15px] ${statusColors[index % statusColors.length].bg} text-whitetext text-center items-center rounded-[10px]`}>
            {status.name}
          </div>
          {[...Array(4)].map((_, cardIndex) => (
            <div
              key={cardIndex}
              className={`card min-h-[217px] border-[1px] ${statusColors[index % statusColors.length].border} p-5 gap-7 rounded-[15px]`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Statuses