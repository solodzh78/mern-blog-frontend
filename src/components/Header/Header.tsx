import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout, selectAuth } from '../../store/slices/auth';
import { BASE_URL } from '../../assets/constants';

export const Header: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectAuth);
    const navigate = useNavigate();
    const avatarUrl = user?.avatarUrl;
    const fullName = user?.fullName;
    const isAuth = !!user;

    const onClickLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>REACT MERN BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                    <Button
                                        onClick={() => navigate('/addpost')}
                                        variant="contained">
                                        Написать статью
                                    </Button>
                                <Avatar
                                    className={styles.avatar}
                                    src={`${BASE_URL}/${avatarUrl || ''}`}
                                    alt={fullName || ''}
                                />
                                    <Button
                                        onClick={onClickLogout}
                                        variant="contained"
                                        color="error">
                                        Выйти
                                    </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
