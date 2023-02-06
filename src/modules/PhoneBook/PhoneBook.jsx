import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList/';

import css from './phone-book.module.css';

class PhoneBook extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    if (this.isDublicate()) {
      return alert(`${name} ${number} already on your contact list`);
    }

    this.setState(prevState => {
      const { name, number, contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return {
        contacts: [newContact, ...contacts],
        name: '',
        number: '',
      };
    });
  };

  inputValue = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  removeContact = id => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newListContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newListContacts, name: '', number: '' };
    });
  };

  isDublicate = () => {
    const { number, name, contacts } = this.state;
    const normalizeName = name.toLocaleLowerCase();
    const normalizeNumber = number.toLocaleLowerCase();

    const dublicateItem = contacts.find(
      ({ number, name }) =>
        normalizeName === name.toLocaleLowerCase() &&
        normalizeNumber === number.toLocaleLowerCase()
    );
    return Boolean(dublicateItem);
  };

  filterContact = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizeFilter = filter.toLowerCase();
    const findElement = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizeFilter)
    );

    return findElement;
  };

  render() {
    const contacts = this.filterContact();
    const { number, name } = this.state;

    return (
      <div className={css.wrapper}>
        <h2 className={css.page_tittle}> Phone book</h2>
        <div className={css.info}>
          <div className={css.new_contact}>
            <ContactForm
              handleSubmit={this.handleSubmit}
              name={name}
              number={number}
              inputValue={this.inputValue}
            />
          </div>
          <div className={css.list_contacts}>
            <Filter inputValue={this.inputValue} />
            <h3 className={css.tittle_list}>List contacts</h3>
            <ContactList
              items={contacts}
              onDeleteContact={this.removeContact}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
