import React from 'react';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import { formatDateGeorgian, truncateText } from '../utils/formatting';
import { departmentColors, priorityColors } from '../utils/colors';
import { Task } from '../interfaces/Task';

interface CardProps {
    task: Task;
    statusColorBorder: string;
}

const Card: React.FC<CardProps> = ({ task, statusColorBorder }) => {
    return (
        <div className={`card min-h-[230px] border-[1px] ${statusColorBorder} p-5 flex flex-col gap-3 rounded-[15px]`}>
            <div className="flex justify-between">
                <div className='flex gap-2'>
                    <div className={`flex gap-1 justify-center w-[86px] h-[26px] rounded-md p-1 border-[0.5px] text-xs font-bold ${priorityColors[task.priority.id]}`}>
                        <Image
                            src={task.priority.icon}
                            alt={task.priority.name}
                            width={100}
                            height={100}
                            className="w-4 h-4"
                        />
                        <span className="text-xs">{task.priority.name}</span>
                    </div>
                    <div className={`flex gap-1 justify-center items-center rounded-2xl p-1 bg-pinktext text-whitetext text-xs font-normal leading-[100%] ${departmentColors[task.department.id]}`}>
                        {task.department.name.split(" ")[0]}
                    </div>
                </div>
                <div className='flex leading-[100%] items-center'>
                    <span className="text-xs">{formatDateGeorgian(task.due_date)}</span>
                </div>
            </div>

            <div className="grid min-h-[140px] p-3">
                <h3 className="font-medium text-[15px] leading-[100%] text-headlines">{task.name}</h3>
                <p className="text-sm text-subheadlines">{truncateText(task.description)}</p>
            </div>

            <div className="flex justify-between items-center mt-auto pt-2">
                <div className="flex items-center gap-2">
                    <Image
                        src={task.employee.avatar}
                        alt={`${task.employee.name}_${task.employee.surname}`}
                        width={100}
                        height={100}
                        className="w-6 h-6 rounded-full object-cover object-left-top"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <MessageSquare className='text-subheadlines' />
                    <span className="text-xs">{task.total_comments}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;