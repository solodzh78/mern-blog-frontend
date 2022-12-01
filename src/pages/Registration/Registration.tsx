import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchRegister, RegisterValuesType, selectIsAuth } from '../../store/slices/auth';
import { FileInput } from '../../components/ui/FileInput';

export const Registration: FC = () => {

    const isAuth = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid, isSubmitSuccessful }
    } = useForm({
        defaultValues: {
            image: [] as FileList | [],
            fullName: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    if (isAuth) return <Navigate to='/'/>;

    const onSubmit = async (values: RegisterValuesType) => {
        await dispatch(fetchRegister(values));
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                
                <Controller
                    control={control}
                    name="image"
                    render={({field}) => <FileInput field={field} className={styles.avatar} />}
                />
                
                <TextField 
                    className={styles.field} 
                    label="Полное имя" 
                    fullWidth
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', {required: 'Укажите полное имя'})}
                />
                <TextField 
                    className={styles.field} 
                    label="E-Mail"
                    fullWidth
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите почту'})} 
                />
                <TextField 
                    className={styles.field} 
                    label='Пароль'
                    type='password'
                    fullWidth
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Укажите пароль'})}
                />
                <Button 
                    type="submit" 
                    size="large" 
                    variant="contained"
                    disabled={!isValid} 
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
