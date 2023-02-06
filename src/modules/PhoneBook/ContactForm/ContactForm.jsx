import PropTypes from 'prop-types';
import css from './contact-form.module.css';

const ContactForm = ({ handleSubmit, name, number, inputValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>NAME</label>
        <input
          onChange={inputValue}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <label>NUMBER</label>
        <input
          onChange={inputValue}
          type="tel"
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={css.btn_addContact} type="submit">
        add NEW contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.func.isRequired,
};
