import React from 'react'
import SearchForm from 'components/search-form'
import './styles.css'

const SearchContactForm = () => (
  <div className="messages-search-contact-wrapper">
    <SearchForm
      className="messages-search-contact"
      model="messagesSearchContact"
    />
  </div>
)

export default SearchContactForm
