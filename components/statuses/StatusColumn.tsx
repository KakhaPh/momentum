import React from 'react';
import Card from '../common/Card';
import { statusColors } from '../utils/colors';
import Link from 'next/link';
import { Status } from '../interfaces/Status';
import { Task } from '../interfaces/Task';

interface StatusColumnProps {
    status: Status;
    statusIndex: number;
    tasks: Task[];
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status, statusIndex, tasks }) => {
    return (
        <div className='flex flex-col gap-[30px]'>
            <div className={`font-medium text-xl h-[54px] p-[15px] ${statusColors[statusIndex % statusColors.length].bg} text-whitetext text-center items-center rounded-[10px] tracking-normal leading-normal`}>
                {status.name}
            </div>

            {tasks.length > 0 ? (
                tasks.map(task => (
                    <Link key={task.id} href={`/tasks/${task.id}`}>
                        <Card
                            key={task.id}
                            task={task}
                            statusColorBorder={statusColors[statusIndex % statusColors.length].border}
                        />
                    </Link>
                ))
            ) : (
                <div className={`card min-h-[217px] border-[1px] ${statusColors[statusIndex % statusColors.length].border} p-5 flex items-center justify-center text-gray-400 italic rounded-[15px]`}>
                    ამ გრაფაში დავალება ვერ მოიძებნა!
                </div>
            )}
        </div>
    );
};

export default StatusColumn;