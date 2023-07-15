import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const isDuplicate = ({ name, phone }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = phone.trim();

    const duplicate = contacts.find(
      ({ name, phone }) =>
        name.toLowerCase().trim() === normalizedName ||
        phone.trim() === normalizedNumber
    );
    return Boolean(duplicate);
  };

  const saveContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const phone = form.elements.number.value;
    if (isDuplicate({ name, phone })) {
      return alert(
        contacts.find(contact => contact.name === name)
          ? `${name} is already in contacts`
          : `${phone} is already in contacts`
      );
    }
    dispatch(addContact({ name, phone }));
    form.reset();
  };

  return (
    <section className={css.form}>
      <form onSubmit={saveContact}>
        <label className={css.item}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.item}>
          Number
          <input
            type="tel"
            name="number"
            placeholder="Enter number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
