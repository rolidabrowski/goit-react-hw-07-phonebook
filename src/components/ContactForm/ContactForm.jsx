import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import css from './ContactForm.module.css';

const InitialValues = {
  name: '',
  phone: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[\s\p{L}]+$/u,
      'Name may contain only letters and spaces. For example Adrian, Jacob Mercer and so on.'
    )
    .required(),
  phone: yup
    .string()
    .phone(
      'PL',
      true,
      'Phone number must be entered in the format 123-456-789 or 123 456 789 or 123456789'
    )
    .required(),
});

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

  const saveContact = ({ name, phone }) => {
    const form = document.querySelector('form');
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
      <Formik
        initialValues={InitialValues}
        onSubmit={values => {
          saveContact({ ...values });
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <label className={css.item}>
            Name
            <Field type="text" name="name" placeholder="Enter name" />
            <ErrorMessage name="name" component="span" />
          </label>
          <label className={css.item}>
            Number
            <Field type="tel" name="phone" placeholder="Enter number" />
            <ErrorMessage name="phone" component="span" />
          </label>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default ContactForm;
