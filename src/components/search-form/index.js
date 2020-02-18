import React from 'react'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import VectorIcon from 'vector-icon'

const SearchForm = props => (
  <Form className="search-form" model="search" {...props}>
    <InputText
      fullWidth
      hintStyle={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12,
        // color: '#555759',
      }}
      hintText={[
        <span key="search">Search</span>,
        <VectorIcon key="search-icon" name="search" />,
      ]}
      model=".query"
      underlineFocusStyle={{ width: '100%' }}
      underlineStyle={{ bottom: 0, width: 0 }}
    />
  </Form>
)

export default SearchForm
