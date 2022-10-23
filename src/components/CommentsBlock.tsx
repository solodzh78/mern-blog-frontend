import React, { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Avatar, Divider, List, ListItem, ListItemText, 
    ListItemAvatar, Skeleton, Box } from "@mui/material";

import { SideBlock } from "./SideBlock";
import { CommentType, StatusEnum } from "../store/slices/posts";
import { BASE_URL } from "../assets/constants";
import { useAppSelector } from "../store/store";

interface CommentsBlockType extends PropsWithChildren {
    postComments?: CommentType[];
    isLoadingPost?: boolean;
}

export const CommentsBlock: FC<CommentsBlockType> = ({ children, postComments, isLoadingPost }) => {
    const { items, status } = useAppSelector((state) => state.posts.comments);
    const comments = postComments ? postComments : items;
    const isLoading = (isLoadingPost === undefined) ? isLoadingPost : status === StatusEnum.LOADING;

    return (
        <SideBlock title="Комментарии">
            <List>
                {isLoading 
                    ? [...Array(5)].map((obj, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </ListItemAvatar>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Skeleton variant="text" height={25} width={120} />
                                    <Skeleton variant="text" height={18} width={230} />
                                </Box>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))
                    : comments.map(({ commentText, post, user: { fullName, avatarUrl }}, index) => {

                        return (
                        <React.Fragment key={index}>
                            <Link to={`/posts/${post}`} style={{textDecoration: 'none'}}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={fullName} src={`${BASE_URL}/${avatarUrl}`} />
                                    </ListItemAvatar>
                                        <ListItemText
                                            primary={fullName}
                                            secondary={commentText}
                                        />
                                </ListItem>
                            </Link>
                        </React.Fragment>
                    )})
                }
            </List>
            {children}
        </SideBlock>
    );
};
