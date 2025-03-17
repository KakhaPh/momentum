'use client';

import { fetchStatuses } from '@/components/api/statuses';
import { fetchTask } from '@/components/api/tasks';
import TaskCommentSection from '@/components/createTask/TaskCommentSection';
import { SingleTask } from '@/components/interfaces/SingleTask';
import { Status } from '@/components/interfaces/Status';
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const resolveParams = async () => {
            try {
                const resolvedParams = await params;
                setId(resolvedParams.id);
            } catch (error) {
                setError('პარამეტრები მიუღებელია!');
                setLoading(false);
            }
        };

        resolveParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchTask(id);
                setTask(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('ეს დავალება მიუწვდომელია ან თქვენ არ გეკუთვნით!');
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const getStatuses = async () => {
            try {
                const data = await fetchStatuses();
                setStatuses(data);
            } catch (error) {
                console.error('Failed fetching statuses', error);
            }
        };

        getStatuses();
    }, []);

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const weekdays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
        const weekday = weekdays[date.getDay()];
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        return `${weekday} - ${formattedDate}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-center p-8">
                    <div className="w-12 h-12 border-4 border-purpletext/20 border-t-purpletext rounded-full animate-spin mb-4 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center">
            <div className="text-center p-8 bg-redtext/5 rounded-lg border border-redtext/20 max-w-md">
                <h2 className="text-xl font-medium text-redtext mb-2">შეცდომა!</h2>
                <p className="text-headlines">{error}</p>
            </div>
        </div>;
    }

    if (!task) {
        return <div className="flex justify-center">
            <div className="text-center p-8 bg-yellowtext/5 rounded-lg border border-yellowtext-/20 max-w-md">
                <h2 className="text-xl font-medium text-yellowtext mb-2">დავალება მიუწვდომელია</h2>
                <p className="text-headlines">ეს დავალება მიუწვდომელია ან თქვენ არ გეკუთვნით!</p>
            </div>
        </div>;
    }

    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-8 lg:gap-12 xl:gap-20 2xl:gap-52">
            <div className="w-full max-w-[715px]">
                <div className="flex flex-wrap gap-3 pt-7">
                    <div className={`flex gap-1 justify-center items-center w-auto min-w-[86px] h-[26px] rounded-md p-1 border-[0.5px] text-xs font-bold ${priorityColors[task.priority.id]}`}>
                        <Image
                            src={task.priority.icon}
                            alt={task.priority.name}
                            width={100}
                            height={100}
                            className="w-4 h-4"
                        />
                        <span className="text-sm whitespace-nowrap">{task.priority.name}</span>
                    </div>
                    <div className={`flex gap-1 justify-center items-center rounded-2xl p-1 bg-pinktext text-whitetext text-xs font-normal leading-[100%] ${departmentColors[task.department.id]}`}>
                        {task.department.name.split(' ')[0]}
                    </div>
                </div>

                <div className="pt-3 pb-6 md:pb-10 grid gap-3">
                    <p className="text-2xl md:text-3xl lg:text-[36.9679px] font-semibold text-headlines leading-tight tracking-normal">{task.name}</p>
                    <p className="text-base md:text-lg lg:text-[18px] text-subheadlines leading-relaxed md:leading-[150%] tracking-normal font-normal pt-4 md:pt-7">{task.description}</p>
                </div>

                <div>
                    <p className="font-medium text-xl md:text-2xl leading-tight md:leading-[100%] tracking-normal text-headlines pt-6 md:pt-9 pb-4 md:pb-6">დავალების დეტალები</p>

                    <div className="flex flex-col sm:flex-row sm:gap-6 md:gap-[68px]">
                        <div className="flex py-4 md:py-7 gap-2 w-full sm:w-[166px]">
                            <PieChart className="text-[#474747] flex-shrink-0" /> <span className="text-[#474747]">სტატუსი</span>
                        </div>
                        <div className="flex pt-0 sm:pt-5 pb-4 sm:pb-0">
                            {statuses.length > 0 && (
                                <TaskStatusSelect
                                    currentStatus={task.status}
                                    taskId={task.id}
                                    statuses={statuses}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-6 md:gap-[68px]">
                        <div className="flex py-4 md:py-7 gap-2 w-full sm:w-[166px]">
                            <User className="text-[#474747] flex-shrink-0" /> <span className="text-[#474747]">თანამშრომელი</span>
                        </div>
                        <div className="flex items-center gap-2 pb-4 sm:pb-0">
                            <Image
                                src={task.employee.avatar}
                                alt={`${task.employee.name}_${task.employee.surname}`}
                                width={100}
                                height={100}
                                className="w-8 h-8 rounded-full object-cover object-left-top flex-shrink-0"
                            />
                            <div className="flex flex-col">
                                <span className="font-light text-[#474747] text-[11px] leading-[100%] tracking-normal">
                                    {task.employee.department.name}
                                </span>
                                <div className="flex font-normal text-blackish text-[14px] leading-[150%] tracking-normal">
                                    {task.employee.name + " " + task.employee.surname}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-6 md:gap-[68px]">
                        <div className="flex py-4 md:py-7 gap-2 w-full sm:w-[166px]">
                            <Calendar className="text-[#474747] flex-shrink-0" /> <span className="text-[#474747]">დავალების ვადა</span>
                        </div>
                        <div className="flex items-center text-[#474747]">
                            {formatDate(task.due_date)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-[0.3px] border-purplebg rounded-[10px] bg-[#f9f7fd] w-full max-w-[741px] mx-auto min-h-[500px] md:min-h-[600px] lg:min-h-[700px] mt-6 lg:mt-16 pt-6 md:pt-10 px-4 md:px-10 mb-8">
                {<TaskCommentSection taskId={task.id} />}
            </div>
        </div>
    );
};

export default TaskPage;