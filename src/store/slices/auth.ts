import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../instance';
import { RootState } from '../store';
import { StatusEnum } from './posts';

export type AuthValuesType = {
    email: string;
    password: string;
};

export type RegisterValuesType = AuthValuesType & {fullName: string; image: FileList | []};

export type AuthUserDataType = {
    _id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
    token: string;
};

export const fetchAuth = createAsyncThunk(
    "auth/fetchAuth",
    async (params: AuthValuesType) => {
		const { data } = await instance.post<AuthUserDataType>('/auth/login', params);
		return data;
	}
);

export const fetchLogOut = createAsyncThunk(
    "auth/fetchLogOut",
    async () => {
		await instance.get('/auth/logout');
	}
);

export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",
    async () => {
		const { data } = await instance.get<AuthUserDataType>('/auth/me');
		return data;
	}
);

export const fetchRegister = createAsyncThunk(
    "auth/fetchRegister",
    async (params: RegisterValuesType) => {
        const { fullName, email, password, image } = params;
        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        console.log('formData: ', formData);

		const { data } = await instance.post<AuthUserDataType>('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
		return data;
	}
);

const initialState = {
    data: null as AuthUserDataType | null,
    status: StatusEnum.LOADING
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
	extraReducers: (builder) => {
        builder
        // Логин
            .addCase(fetchAuth.pending, (state) => {
				state.data = null;
                state.status = StatusEnum.LOADING;
            })
            .addCase(fetchAuth.fulfilled, (state, { payload }) => {
				state.data = payload;
                state.status = StatusEnum.SUCCESS;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = null;
                state.status = StatusEnum.ERROR;
            })
        // Аутентификация через куки
            .addCase(fetchAuthMe.pending, (state) => {
				state.data = null;
                state.status = StatusEnum.LOADING;
            })
            .addCase(fetchAuthMe.fulfilled, (state, { payload }) => {
				state.data = payload;
                state.status = StatusEnum.SUCCESS;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null;
                state.status = StatusEnum.ERROR;
            })
        // Регистрация
            .addCase(fetchRegister.pending, (state) => {
				state.data = null;
                state.status = StatusEnum.LOADING;
            })
            .addCase(fetchRegister.fulfilled, (state, { payload }) => {
				state.data = payload;
                state.status = StatusEnum.SUCCESS;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.data = null;
                state.status = StatusEnum.ERROR;
            })
        // Выход из аккаунта
            .addCase(fetchLogOut.fulfilled, (state) => {
                state.data = null;
                state.status = StatusEnum.SUCCESS;
            })
    },
});

export const selectAuth = (state: RootState) => state.auth.data;
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export default authSlice.reducer;