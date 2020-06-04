import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, SET_CURRENT, CLEAR_FILTER } from '../types';

export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== payload)
            }
        default:
            return state;
    }
}