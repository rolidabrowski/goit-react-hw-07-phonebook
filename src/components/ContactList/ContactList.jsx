import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getFilteredContacts } from 'redux/selectors';
import css from './ContactList.module.css';

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <section className={css.list}>
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            <span className={css.text}>{name}</span>
            <span className={css.text}>{number}</span>
            <button
              type="button"
              className={css.button}
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContactList;
