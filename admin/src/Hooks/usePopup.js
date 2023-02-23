import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { close, open } from '../Slices/popupSlice';

export const usePopup = () => {
    const dispatch = useDispatch();

    return useCallback((payload) => {

        if(payload.open){
            return dispatch(open(payload))
        }else{
            return dispatch(close())
        }

    });
};