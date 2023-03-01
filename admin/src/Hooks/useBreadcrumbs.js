import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../Slices/navTopSlice';

export const useBreadcrumbs = () => {
    const dispatch = useDispatch();
    return useCallback((payload) => dispatch(setBreadcrumb(payload)));
};