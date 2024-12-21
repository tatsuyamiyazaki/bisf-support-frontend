import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {MessageType} from '../types/types';
import { Message } from 'postcss';

type InitialStateType = {
    onyouredata: MessageType[];
}

const initialState: InitialStateType = {
    onyouredata: []
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        inputMessageToReduxStore: (state, action) => {
            if(action.payload.pathname === '/'){
            state.onyouredata.push(action.payload)
            }
        }
    }
})

export const {inputMessageToReduxStore} = messageSlice.actions;
export const selectMessage = (state: RootState) => state.message;
export default messageSlice.reducer;