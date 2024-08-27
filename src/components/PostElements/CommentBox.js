import { es } from "date-fns/locale";
import { formatDistance, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

export const CommentBox = ({ comment, author }) => {
    const fecha = formatDistance(parseISO(comment?.created_at), new Date(), { locale: es, addSuffix: true });
    const navigate = useNavigate();
    
    return (
        <article className="my-3">
            <div className="">
                <div className="flex items-center mb-1 pt-1 px-1">
                    <button onClick={e => {
                        e.preventDefault();
                        navigate(`/profile/${comment.user.id}`, { replace: true });
                    }}>
                        <img
                            src={comment.user.profile.profile_picture}
                            alt={`${comment.user.username}'s profile`}
                            className="h-10 w-10 rounded-full mr-2"
                        />
                    </button>
                    <div>
                        <button onClick={e => {
                            e.preventDefault();
                            navigate(`/profile/${comment.user.id}`, { replace: true });
                        }}>
                            <span className="font-semibold">{comment.user.username} {comment.user.id === author ? <span className="text-purple-700 opacity-90"> - Autor </span> : null}</span>
                        </button>
                        <p className="text-sm text-gray-900  opacity-90">
                            {fecha}
                        </p>
                    </div>
                </div>
                <p className="text-gray-700 p-1 pb-2">{comment.content}</p>
            </div>
            {comment.image && <img
                    src={comment.image.image}
                    className="h-auto w-64 rounded-sm"
                />}
        </article>
    )
};