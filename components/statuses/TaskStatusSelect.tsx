'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { request } from '@/components/services/request';
import { Status } from '../interfaces/Status';

interface TaskStatusSelectProps {
    currentStatus: Status;
    taskId: number;
    statuses: Status[];
    onStatusChange?: (newStatus: Status) => void;
}

const TaskStatusSelect = ({ currentStatus, taskId, statuses, onStatusChange }: TaskStatusSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);
    const [isLoading, setIsLoading] = useState(false);

    const updateTaskStatus = async (statusId: number) => {
        setIsLoading(true);
        try {
            await request.put(`tasks/${taskId}`, {
                status_id: statusId
            });

            const updatedStatus = statuses.find(status => status.id === statusId);
            if (updatedStatus) {
                setSelectedStatus(updatedStatus);
                if (onStatusChange) {
                    onStatusChange(updatedStatus);
                }
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const selectElement = document.getElementById(`status-select-${taskId}`);
            if (selectElement && !selectElement.contains(target) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, taskId]);

    return (
        <div id={`status-select-${taskId}`} className="relative w-[260px]">
            <div
                className={`flex items-center justify-between px-3 py-2 border border-graysh rounded-md cursor-pointer ${isLoading ? 'opacity-70' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isLoading) setIsOpen(!isOpen);
                }}
            >
                <span className="text-[14px] text-headlines font-normal">
                    {selectedStatus.name}
                </span>
                <ChevronDown className={`h-4 w-4 text-[#474747] transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-graysh rounded-md shadow-lg max-h-60 overflow-auto">
                    {statuses.map((status) => (
                        <div
                            key={status.id}
                            className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-grayshthree ${selectedStatus.id === status.id ? 'bg-gray-100' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (selectedStatus.id !== status.id) {
                                    updateTaskStatus(status.id);
                                }
                                setIsOpen(false);
                            }}
                        >
                            <span className="text-[14px] text-headlines font-normal">
                                {status.name}
                            </span>
                            {selectedStatus.id === status.id && (
                                <Check className="h-4 w-4 text-[#474747]" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskStatusSelect;