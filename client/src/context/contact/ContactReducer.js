import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, SET_CURRENT, CLEAR_FILTER, CLEAR_CURRENT } from '../types';

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
        case SET_CURRENT:
            return {
                ...state,
                current: payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === payload.id ? payload : contact)
            }
        default:
            return state;
    }
}