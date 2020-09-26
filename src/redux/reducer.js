import { CAMPSITES } from '../shared/campsites';
import { PARTNERS } from '../shared/partners';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
    campsites: CAMPSITES,
    partners: PARTNERS,
    comments: COMMENTS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};