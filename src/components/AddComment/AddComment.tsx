import React, { FC } from "react";
import {TextField, Avatar, Button} from "@mui/material";
import { useForm } from "react-hook-form";

import styles from "./AddComment.module.scss";

import { useAppSelector } from "../../store/store";
import { PostType } from "../../store/slices/posts";
import { BASE_URL } from "../../assets/constants";
import {instance} from "../../instance";

export const AddComment: FC<{id: string; setPost: React.Dispatch<React.SetStateAction<PostType>>}> = ({ id, setPost }) => {
    const avatarUrl = useAppSelector(state => state.auth.data?.avatarUrl);
    const fullName = useAppSelector(state => state.auth.data?.fullName);
    const { 
        register, 
        handleSubmit, 
        reset,
        setError, 
        formState: {errors, isValid}
    } = useForm({defaultValues: {commentText: ''}, mode: 'onChange'});

    const sendComment = async (values: { commentText: string; }) => {
        try {
            const { data } = await instance.patch<PostType>(`/posts/${id}/comment`, {commentText: values.commentText});
            setPost(data);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src={avatarUrl ? `${BASE_URL}/${avatarUrl}` : ''}
                    alt={fullName}
                />
                <form onSubmit={handleSubmit(sendComment)} className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        error={Boolean(errors.commentText?.message)}
                        helperText={errors.commentText?.message}
                        {...register('commentText', {required: 'Комментарий не может быть пустым'})}
                    />
                    <Button type='submit' variant="contained">Отправить</Button>
                </form>
            </div>
        </>
    );
};
