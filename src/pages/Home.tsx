import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Tab, Tabs } from '@mui/material';
import TagIcon from "@mui/icons-material/Tag";

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchComments, fetchPosts, fetchTags, StatusEnum, addCheckedTags } from '../store/slices/posts';
import { PostSkeleton } from '../components/Post/Skeleton';

export const Home = () => {
    const dispatch = useAppDispatch();
    const { posts, tags:{checkedItems: checkedTags} } = useAppSelector((state) => state.posts);
    const authUserId = useAppSelector((state) => state.auth.data?._id);
    const isPostLoading = posts.status === StatusEnum.LOADING;
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {

        const tagsString = checkedTags.reduce(
            (akk, tag) => `${akk}${akk==='' ? '' : '&'}tags=${tag}`, '');
        const sortString = activeTab===1 ? `sort=-viewsCount` : '';
        const fetchString = (!tagsString && !sortString) 
            ? '' 
            : `?${tagsString}${tagsString==='' ? '' : '&'}${sortString}`;

        dispatch(fetchPosts(fetchString));
        dispatch(fetchTags(fetchString));
        dispatch(fetchComments(fetchString));
    }, [activeTab, checkedTags]);
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <>
            {checkedTags.length > 0 && 
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    '& > *': { m: 1 },
                }}
            >
                <ButtonGroup variant="text" size="small" aria-label="small text button group">
                    {checkedTags.map(tag => 
                        <Button key={tag} onClick={() => dispatch(addCheckedTags(tag))}>
                            <TagIcon/>{tag}
                        </Button>)}
                </ButtonGroup>
            </Box>}
            <Tabs style={{ marginBottom: 15 }} value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={8}>
                    {isPostLoading 
                        ? [...Array(5)].map((_, index) => <PostSkeleton key={index} />) 
                        : posts.items.map(post =>  
                            <Post
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
                            />)
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={4} sx={{display: {xs: 'none', md: 'block'}}}>
                    <TagsBlock />
                    <CommentsBlock />
                </Grid>
            </Grid>
        </>
    );
};
