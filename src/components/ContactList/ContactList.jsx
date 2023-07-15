import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <section className={css.list}>
      <ul>
        {contacts.map(({ id, name, phone }) => (
          <li className={css.item} key={id}>
            <span className={css.text}>{name}</span>
            <span className={css.text}>{phone}</span>
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
