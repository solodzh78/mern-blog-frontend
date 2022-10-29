import { FC, useState } from 'react';
import { Box, Button, Container, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchLogOut, selectAuth } from '../../store/slices/auth';
import { TagsBlock } from '../TagsBlock';
import { CommentsBlock } from '../CommentsBlock';

export const Header: FC = () => {

    const [drawerState, setDrawerState] = useState(false);

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectAuth);
    // const navigate = useNavigate();
    // const avatarUrl = user?.avatarUrl;
    // const fullName = user?.fullName;
    const isAuth = !!user;

    const onClickLogout = () => {
        dispatch(fetchLogOut());
    };

    return (
        <Box 
            sx={{
                backgroundColor: '#fff',
                padding: '10px 0',
                borderBottom: '1px solid #e0e0e0',
                mb: '30px',
                'a': { textDecoration: 'none' }
        }}>
            <Container 
                maxWidth="lg" 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                }}
            >
                <Link to="/">
                    <Typography 
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            fontWeight: 700,
                            lineHeight: '35px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15px',
                            borderRadius: '5px',
                            padding: '0 10px',
                            '&:hover': { backgroundColor: '#4361ee' }
                        }}
                    >
                        REACT MERN BLOG
                    </Typography>
                </Link>

                <IconButton 
                    sx={{
                        display: {xs: 'flex', sm: 'flex', md: 'none'}, 
                        minWidth: 0, 
                        alignItems: 'center',
                        cursor: 'pointer',
                        width: '35px',
                        height: '35px',
                    }}
                    onClick={() => setDrawerState(true)}
                >
                    <MenuIcon fontSize='large' />
                </IconButton>

                <Drawer
                    //from which side the drawer slides in
                    anchor="right"
                    //if open is true --> drawer is shown
                    open={drawerState}
                    //function that is called when the drawer should close
                    onClose={() => setDrawerState(false)}
                    //function that is called when the drawer should open
                    // onOpen={() => setDrawerState(true)}
                >
                    <Box
                        sx={{
                            width: {xs: '80vw', sm: '50vw'},
                            p: 2,
                            height: 1,
                            backgroundColor: "white"
                        }}
                    >
                        <IconButton sx={{ mb: 2 }} onClick={() => setDrawerState(false)}>
                            <CloseIcon />
                        </IconButton>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button variant="contained" sx={{ m: 1, width: 0.5 }}>
                                Register
                            </Button>
                            <Button variant="outlined" sx={{ m: 1, width: 0.5 }}>
                                Login
                            </Button>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TagsBlock />
                            <CommentsBlock />
                        </Box>

                    </Box>
                </Drawer>
                
                <Box sx={{display: {md: 'flex', sm: 'none', xs: 'none'},}}>
                    {isAuth
                        ? <>
                            <Link to={"/addpost"}>
                                <Button variant="contained">Написать статью</Button>
                            </Link>
                            <Button onClick={onClickLogout} variant="contained" color="error" sx={{ ml: '10px' }}>
                                Выйти
                            </Button>
                        </>
                        : <>
                            <Link to="/login">
                                <Button variant="outlined">Войти</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="contained" sx={{ ml: '10px' }}>Создать аккаунт</Button>
                            </Link>
                        </>
                    }
                </Box>
            </Container>
        </Box>
    );
};
