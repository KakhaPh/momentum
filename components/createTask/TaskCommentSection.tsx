'use client';

import { useState, useEffect } from 'react';
import { Reply } from 'lucide-react';
import { fetchComments, postComment } from '../api/comments';
import Image from 'next/image';

interface Comment {
    id: number;
    text: string;
    task_id: number;
    parent_id: number | null;
    author_avatar: string;
    author_nickname: string;
    sub_comments?: Comment[];
    created_at?: string;
}

interface TaskCommentSectionProps {
    taskId: number;
}

const TaskCommentSection = ({ taskId }: TaskCommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [invalidComment, setInvalidComment] = useState(false);
    const [invalidReply, setInvalidReply] = useState(false);
    const [repliedComments, setRepliedComments] = useState<Set<number>>(new Set());

    const totalCommentsCount = comments.reduce((total, comment) => {
        return total + 1 + (comment.sub_comments?.length || 0);
    }, 0);

    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);
                const data = await fetchComments(taskId);
                setComments(data);

                const replied = new Set<number>();
                data.forEach((comment: { sub_comments: string[]; id: number; }) => {
                    if (comment.sub_comments && comment.sub_comments.length > 0) {
                        replied.add(comment.id);
                    }
                });
                setRepliedComments(replied);

                setError(null);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(error instanceof Error ? error.message : 'კომენტარების ჩატვირთვა ვერ მოხერხდა სცადეთ თავიდან!');
            } finally {
                setLoading(false);
            }
        };

        if (taskId) {
            loadComments();
        }
    }, [taskId]);

    const handlePostComment = async () => {
        if (!newComment.trim()) {
            setInvalidComment(true);
            return;
        }

        setInvalidComment(false);
        setLoading(true);
        setError(null);
        try {
            await postComment(taskId, newComment);

            const updatedComments = await fetchComments(taskId);
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
            setError(error instanceof Error ? error.message : 'დაკომენტარება ვერ მოხერხდა! სცადე თავიდან!');
        } finally {
            setLoading(false);
        }
    };

    const handlePostReply = async (parentId: number) => {
        if (!replyText.trim()) {
            setInvalidReply(true);
            return;
        }

        setInvalidReply(false);
        setLoading(true);
        setError(null);
        try {
            await postComment(taskId, replyText, parentId);
            const updatedComments = await fetchComments(taskId);
            setComments(updatedComments);

            setRepliedComments(prev => new Set([...prev, parentId]));

            setReplyText('');
            setReplyTo(null);
        } catch (error) {
            console.error('Error posting reply:', error);
            setError(error instanceof Error ? error.message : 'პასუხის გაცემა ვერ მოხერხდა! სცადეთ თავიდან!');
        } finally {
            setLoading(false);
        }
    };

    const canReplyToComment = (commentId: number) => {
        return !repliedComments.has(commentId);
    };

    return (
        <>
            <div className="mb-8">
                <div className="flex flex-col relative">
                    <textarea
                        value={newComment}
                        onChange={(e) => {
                            setNewComment(e.target.value);
                            if (e.target.value.trim()) setInvalidComment(false);
                        }}
                        placeholder="დატოვე კომენტარი"
                        className={`border-2 bg-white rounded-lg w-full p-5 ${invalidComment ? 'border-redtext' : 'border-graysh'
                            }`}
                        rows={4}
                    />
                    <div className="flex justify-end absolute bottom-4 right-4 items-center">
                        <button
                            onClick={handlePostComment}
                            disabled={loading}
                            className="bg-purpletext text-white rounded-4xl text-[16px] font-normal leading-100% tracking-normal w-[155px] px-2 py-1">
                            დააკომენტარე
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
            )}

            <div className="flex items-center py-8 gap-2">
                <h2 className="text-blackish font-medium text-xl leading-[100%] tracking-normal">კომენტარები</h2>
                <div className="bg-purpletext w-[30px] h-[22px] rounded-4xl p-2.5 text-white text-sm leading-[100%] tracking-normal items-center flex justify-center z-10">
                    {totalCommentsCount}
                </div>
            </div>

            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-headlines text-center py-4">კომენტარი ვერ მოიძებნა!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="mb-6">
                            <div className="flex items-start gap-3">
                            <Image
                                    src={comment.author_avatar}
                                    alt={comment.author_nickname}
                                    width={38}
                                    height={38}
                                    className="rounded-full object-left-top object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/Hourglass.png';
                                    }}
                                />
                                <div className="flex-1 w-[500px]">
                                    <p className="font-medium text-lg leading-[100%] tracking-normal text-headlines pb-2">{comment.author_nickname}</p>
                                    <p className="text-subheadlines text-[16px] font-normal leading-[100%] tracking-normal break-words">{comment.text}</p>

                                    {canReplyToComment(comment.id) && (
                                        <button
                                            onClick={() => setReplyTo(comment.id)}
                                            className="text-xs cursor-pointer items-center gap-2 text-purpletext hover:text-purpletext/80 transition duration-200 flex leading-2 tracking-normal py-4"
                                        >
                                            <Reply className='w-4 h-4' />
                                            პასუხი
                                        </button>
                                    )}
                                </div>
                            </div>

                            {replyTo === comment.id && (
                                <div className="mt-3 ml-12">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => {
                                            setReplyText(e.target.value);
                                            if (e.target.value.trim()) setInvalidReply(false);
                                        }}
                                        placeholder="დაწერეთ პასუხი..."
                                        className={`border-2 bg-white rounded-lg w-full p-5 ${invalidReply ? 'border-redtext' : 'border-graysh'
                                            }`}
                                        rows={2}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => {
                                                setReplyTo(null);
                                                setInvalidReply(false);
                                            }}
                                            className="text-gray-600 text-sm"
                                        >
                                            გაუქმება
                                        </button>
                                        <button
                                            onClick={() => handlePostReply(comment.id)}
                                            disabled={loading}
                                            className="bg-purpletext text-white rounded-4xl text-[16px] font-normal leading-100% tracking-normal w-[155px] px-2 py-1"
                                        >
                                            პასუხი
                                        </button>
                                    </div>
                                </div>
                            )}

                            {comment.sub_comments && comment.sub_comments.length > 0 && (
                                <div className="ml-12 mt-4 space-y-4">
                                    {comment.sub_comments.map((reply) => (
                                        <div key={reply.id} className="flex items-start gap-3">
                                            <Image
                                                src={reply.author_avatar}
                                                alt={reply.author_nickname}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium text-sm">{reply.author_nickname}</p>
                                                <p className="text-headlines text-sm">{reply.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default TaskCommentSection;