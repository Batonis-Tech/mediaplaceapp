import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootReducer} from '../redux/store';

export const useTypedSelector: TypedUseSelectorHook<RootReducer> = useSelector;
