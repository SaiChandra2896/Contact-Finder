import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, SET_CURRENT, CLEAR_FILTER } from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'jaya',
                email: 'jaya@gmail.com',
                phone: '123456789',
                type: 'personal'
            },
            {
                id: 2,
                name: 'jaya1',
                email: 'jaya1@gmail.com',
                phone: '1234567891',
                type: 'personal'
            },
            {
                id: 3,
                name: 'jaya2',
                email: 'jaya2@gmail.com',
                phone: '1234567892',
                type: 'professional'
            }
        ]
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add contact 
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    }

    //Delete contact
    const deleteContact = (contactId) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: contactId
        })
    }
    //Set Current Contact

    //Clear curret contact

    //Update contact

    //filter contacts

    //clear filter

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            addContact, deleteContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;