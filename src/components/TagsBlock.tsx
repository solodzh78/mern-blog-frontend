import { FC } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, 
    ListItemText, Skeleton } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

import { SideBlock } from "./SideBlock";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addCheckedTags, StatusEnum } from "../store/slices/posts";

export const TagsBlock: FC = () => {
    const { items, status, checkedItems } = useAppSelector((state) => state.posts.tags);
    const dispatch = useAppDispatch();
    const isLoading = status === StatusEnum.LOADING;

    return (
        <SideBlock title="Тэги">
            <List>
                {(isLoading ? [...Array(5)] : items).map((tag, i) => {
                    return (
                        <ListItem key={i} disablePadding>
                            <ListItemButton onClick={() => dispatch(addCheckedTags(tag))}>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <ListItemText primary={tag} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </SideBlock>
    );
};
