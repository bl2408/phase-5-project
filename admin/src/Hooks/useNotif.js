import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { add } from "../Slices/notificationsSlice";
import { v4 as uuid } from 'uuid'

export const useNotif = () => {
    const dispatch = useDispatch();
    return useCallback((payload) => dispatch(add({id: uuid(), ...payload})));
};