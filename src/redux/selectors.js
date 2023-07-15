import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      ({ name, phone }) =>
        name.toLowerCase().trim().includes(normalizedFilter) ||
        phone.trim().includes(normalizedFilter)
    );
    if (normalizedFilter && !filteredContacts.length) {
      alert(`No contacts matching your request`);
    }
    return filteredContacts;
  }
);
