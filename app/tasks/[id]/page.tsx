'use client';

import { fetchStatuses } from '@/components/api/statuses';
import { fetchTask } from '@/components/api/tasks';
import TaskStatusSelect from '@/components/statuses/TaskStatusSelect';
import { departmentColors, priorityColors } from '@/components/utils/colors';
import { Calendar, PieChart, User } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TaskPageProps {
    params: Promise<{ id: number }>;
}

const TaskPage = ({ params }: TaskPageProps) => {
    const [task, setTask] = useState<SingleTask | null>(null);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        resolveParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const data = await fetchTask(id);
                setTask(data);
            } catch (error) {
                console.error('Task not found');
                return notFound();
            }
        };

        fetchData();
    }, [id]);

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const weekdays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
        const weekday = weekdays[date.getDay()];
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        return `${weekday} - ${formattedDate}`;
    };

    useEffect(() => {
        const getStatuses = async () => {
            try {
                const data = await fetchStatuses();
                setStatuses(data);
            } catch (error) {
                console.error('Failed fetching statuses');
            }
        };

        getStatuses();
    }, []);

    if (!task) return <p>Loading...</p>;

    return (
        <div className='w-[715px]'>
            <div className='flex gap-4 pt-7'>
                <div className={`flex gap-1 justify-center w-[86px] h-[26px] rounded-md p-1 border-[0.5px] text-xs font-bold ${priorityColors[task.priority.id]}`}>
                    <Image
                        src={task.priority.icon}
                        alt={task.priority.name}
                        width={100}
                        height={100}
                        className='w-4 h-4'
                    />
                    <span className='text-sm'>{task.priority.name}</span>
                </div>
                <div className={`flex gap-1 justify-center items-center rounded-2xl p-1 bg-pinktext text-whitetext text-xs font-normal leading-[100%] ${departmentColors[task.department.id]}`}>
                    {task.department.name.split(' ')[0]}
                </div>
            </div>

            <div className='pt-3 pb-10 grid gap-3'>
                <p className='text-[36.9679px] font-semibold text-headlines leading-[100%] tracking-normal'>{task.name}</p>
                <p className='text-[18px] text-subheadlines leading-[150%] tracking-normal font-normal pt-7'>{task.description}</p>
            </div>

            <div>
                <p className='font-medium text-[24px] leading-[100%] tracking-normal text-headlines pt-9 pb-6'>დავალების დეტალები</p>
                <div className='flex gap-[68px]'>
                    <div className='flex py-7 gap-2 w-[166px]'>
                        <PieChart className='text-[#474747]' /> <span className='text-[#474747]'>სტატუსი</span>
                    </div>
                    {statuses.length > 0 && (
                        <TaskStatusSelect
                            currentStatus={task.status}
                            taskId={task.id}
                            statuses={statuses}
                        />
                    )}
                </div>

                <div className='flex gap-[68px]'>
                    <div className='flex py-7 gap-2 w-[166px]'>
                        <User className='text-[#474747]' /> <span className='text-[#474747]'>თანამშრომელი </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={task.employee.avatar}
                            alt={`${task.employee.name}_${task.employee.surname}`}
                            width={100}
                            height={100}
                            className='w-8 h-8 rounded-full object-cover object-left-top'
                        />
                        <div className="flex flex-col">
                            <span className='font-light text-[#474747] text-[11px] leading-[100%] tracking-normal'>
                                {task.employee.department.name}
                            </span>
                            <div className="flex font-normal text-blackish text-[14px] leading-[150%] tracking-normal">
                                {task.employee.name + " " + task.employee.surname}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-[68px]'>
                    <div className='flex py-7 gap-2 w-[166px]'>
                        <Calendar className='text-[#474747]' /> <span className='text-[#474747]'>დავალების ვადა</span>
                    </div>
                    <div className="flex items-center text-[#474747]">
                        {formatDate(task.due_date)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;