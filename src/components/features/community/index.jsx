
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, PenSquare, Filter, ThumbsUp, MessageSquare, BadgeCheck } from 'lucide-react';
import { useBodyScrollLock, useFocusTrap } from '../../../hooks';
import { timeAgo } from '../../../utils';
import { BANNED_WORDS } from '../../../constants';
import { MockApiService } from '../../../api/mockApi';

export const CommunityTab = ({
    posts,
    filter,
    setFilter,
    setSelectedPost,
    setIsWriteModalOpen,
    isLoadingPosts,
}) => (
    <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-accent-teal" /> 커뮤니티
            </h2>
            <button
                onClick={() => setIsWriteModalOpen(true)}
                className="bg-accent-purple hover:bg-[#b09bf9] text-bg-main px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
            >
                <PenSquare className="w-4 h-4" /> 글쓰기
            </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {["전체", "자유", "정보", "질문", "후기"].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${filter === f
                            ? "bg-white text-black border-transparent"
                            : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                        }`}
                >
                    {f}
                </button>
            ))}
        </div>
        {isLoadingPosts ? (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-bg-secondary w-full h-32 rounded-2xl animate-pulse"
                    ></div>
                ))}
            </div>
        ) : (
            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="bg-bg-secondary border border-border-main p-5 rounded-2xl hover:border-accent-purple/30 transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-300">
                                    {post.category}
                                </span>
                                {post.isHot && (
                                    <span className="px-2 py-1 bg-accent-pink/20 text-accent-pink rounded text-[10px] font-bold">
                                        HOT
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-500">
                                {timeAgo(post.time || new Date().toISOString())}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-accent-purple transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                            {post.content}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white flex items-center gap-1">
                                    {post.badge === "vip" && (
                                        <BadgeCheck className="w-3 h-3 text-accent-purple" />
                                    )}
                                    {post.author}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3" /> {post.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" />{" "}
                                    {post.comments?.length || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export const CommunityPostModal = ({ post, onClose, onToast }) => {
    useBodyScrollLock();
    const modalRef = useRef(null);
    useFocusTrap(modalRef, true);
    const [comment, setComment] = useState("");
    const [localComments, setLocalComments] = useState(post.comments || []);
    const handleSubmit = async () => {
        if (!comment.trim()) return;
        if (BANNED_WORDS.some((word) => comment.includes(word))) {
            onToast("🚫 비속어는 사용할 수 없습니다.");
            return;
        }
        const res = await MockApiService.submitComment(post.id, comment);
        if (res.success) {
            setLocalComments([...localComments, res.newComment]);
            setComment("");
            onToast("✅ 댓글이 등록되었습니다.");
        }
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-2xl bg-bg-secondary border border-border-main rounded-2xl p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} ref={modalRef}>
                <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                <p className="text-gray-300 mb-6 whitespace-pre-wrap">{post.content}</p>
                <div className="border-t border-border-main pt-4">
                    <h4 className="font-bold mb-4">댓글 {localComments.length}</h4>
                    <div className="space-y-4 mb-6">
                        {localComments.map((c, i) => (
                            <div key={i} className="bg-bg-main p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sm">{c.user}</span>
                                    <span className="text-xs text-gray-500">{c.badge}</span>
                                </div>
                                <p className="text-sm text-gray-300">{c.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="댓글을 입력하세요..."
                            className="flex-1 bg-bg-main border border-border-main rounded-lg px-4 py-2 text-sm focus:border-accent-purple outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        <button onClick={handleSubmit} className="bg-accent-purple text-bg-main px-4 py-2 rounded-lg font-bold text-sm">등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const WritePostModal = ({ onClose, onToast }) => {
    useBodyScrollLock();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("자유");
    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) return;
        onToast("📝 게시글이 등록되었습니다 (심사 대기중)");
        onClose();
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-bg-secondary w-full max-w-lg rounded-2xl p-6 border border-border-main shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold mb-4">새 글 작성</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                            카테고리
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm outline-none focus:border-accent-purple"
                        >
                            <option>자유</option>
                            <option>질문</option>
                            <option>정보</option>
                            <option>후기</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm outline-none focus:border-accent-purple"
                            placeholder="제목을 입력하세요"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm h-32 resize-none outline-none focus:border-accent-purple"
                            placeholder="내용을 입력하세요"
                        ></textarea>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-accent-purple text-bg-main font-bold py-3 rounded-xl hover:bg-[#b09bf9] transition-colors"
                    >
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
};
