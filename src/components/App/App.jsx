import { ContactForm } from '../../components';
import { ContactList } from '../../components';
import { Filter } from '../../components';
import css from './App.module.css';

export const App = () => {
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
