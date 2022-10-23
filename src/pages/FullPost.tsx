import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { PostType } from "../store/slices/posts";
import { PostSkeleton } from "../components/Post/Skeleton";
import { useAppSelector } from "../store/store";
import { selectIsAuth } from "../store/slices/auth";

export const FullPost: FC = () => {
    const [ post, setPost ] = useState({} as PostType);
    const [ isLoading, setIsLoading ] = useState(true);
    const { id } = useParams();
    const authUserId = useAppSelector((state) => state.auth.data?._id);
    const isAuth = useAppSelector(selectIsAuth);


    useEffect(() => {
        const tempAsyncFunc = async() => {
            try {
                setIsLoading(true);
                const res = await axios.get<PostType>(`posts/${id}`);
                setPost(res.data);
                setIsLoading(false);
            } catch (error) { console.log(error) }
        }
        tempAsyncFunc();
    }, []);

    return (
        <>
            {isLoading
                ? <PostSkeleton />
                : <Post
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    imageUrl={post.imageUrl ? post.imageUrl : ''}
                    user={post.user}
                    createdAt={post.createdAt}
                    viewsCount={post.viewsCount}
                    commentsCount={post.comments.length}
                    tags={post.tags}
                    isEditable={authUserId ? (authUserId===post.user._id) : false}
                    isFullPost
                >
                    <ReactMarkdown children={post.text ? post.text : ''}/>
                </Post>
            }
            <CommentsBlock isLoadingPost={isLoading} postComments={post.comments}>
                {isAuth && <AddComment id={post._id} setPost={setPost}/>}
            </CommentsBlock>
        </>
    );
};