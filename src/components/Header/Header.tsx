import { FC, useState } from 'react';
import { Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const isAuth = !!user;

    const onClickMenuButton = (path: string) => {
        setDrawerState(false);
        if (path === 'logout') {
            dispatch(fetchLogOut());
            return;
        } 
        navigate(path);
    }

    const MobieleMenuButton: FC<{path: string, title: string}> = ({path, title}) => (
        <ListItem disablePadding>
            <ListItemButton onClick={() => onClickMenuButton(path)}>
                <ListItemText primary={title} />
            </ListItemButton>
        </ListItem>
    )

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
                    anchor="right"
                    open={drawerState}
                    onClose={() => setDrawerState(false)}
                >
                    <Box
                        sx={{
                            width: {xs: '80vw', sm: '50vw'},
                            p: 2,
                        }}
                    >
                        <IconButton sx={{ mb: 2 }} onClick={() => setDrawerState(false)}>
                            <CloseIcon />
                        </IconButton>

                        <Divider sx={{ mb: 2 }} />

                        <Paper sx={{mb:2}}>
                            <List sx={{width: '100%'}}>
                                {isAuth
                                    ? <>
                                        <MobieleMenuButton title='Написать статью' path='/addpost'/>
                                        <MobieleMenuButton title='Выйти' path='logout'/>
                                    </>
                                    : <>
                                        <MobieleMenuButton title='Войти' path='/login'/>
                                        <MobieleMenuButton title='Создать аккаунт' path='/register'/>
                                    </>
                                }                            
                            </List>
                        </Paper>

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
                            <Button onClick={() => onClickMenuButton('logout')} variant="contained" color="error" sx={{ ml: '10px' }}>
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
