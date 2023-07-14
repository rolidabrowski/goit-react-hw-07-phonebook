import { useSelector } from 'react-redux';
import { ContactForm } from '../../components';
import { ContactList } from '../../components';
import { Filter } from '../../components';
import { getContacts } from 'redux/selectors';
import css from './App.module.css';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      {contacts.length > 0 && (
        <>
          <h2 className={css.title}>Contacts</h2>
          <Filter />
          <ContactList />
        </>
      )}
    </div>
  );
};

export default App;
