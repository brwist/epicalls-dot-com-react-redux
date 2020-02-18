import queryString from 'query-string'
import { createSelector } from 'reselect'

export const currentUser = state => state.currentUser
export const contacts = state => state.contacts.results
export const allLocalNumbers = state => state.localNumbers.results
export const companies = state => state.currentUser.companies
export const token = state => state.token
export const twilioAccessToken = state => state.twilioAccessToken
export const id = (_, props) => Number.parseInt(props.match.params.id)
export const search = (_, props) =>
  queryString.parse(props.history.location.search)
export const searchQuery = formName => state =>
  state[formName].query.replace(/[()-\s]/g, '').replace(/^\+/, '^\\+')
export const calls = (searchQuery, userCalls) =>
  createSelector(searchQuery, userCalls, (searchQuery, userCalls) =>
    userCalls.filter(c => {
      const conditions = []
      if (searchQuery !== '') {
        const re = new RegExp(searchQuery, 'i')
        const addCondition = condition => conditions.push(re.test(condition))
        addCondition(c.number)
        if (c.incoming) addCondition(c.answerNumber)
        if (!c.incoming) addCondition(c.localNumber.number)
        if (c.contact) addCondition(c.contact.name)
        if (c.contact) addCondition(c.contact.number)
        if (c.userName) addCondition(c.userName)
        return conditions.reduce((memo, r) => memo || r, false)
      }
      return true
    }),
  )
const areaCode = state => +state.callTo.areaCode
const country = state => state.callTo.country
const numbers = state => state.callTo.localNumbers

export const localNumbers = createSelector(
  areaCode,
  country,
  numbers,
  (areaCode, country, numbers) =>
    numbers.map(l => ({
      local: l.country === country && l.areaCode === areaCode,
      ...l,
    })),
)

export const sharedLocalNumber = createSelector(
  areaCode,
  country,
  localNumbers,
  (areaCode, country, localNumbers = []) => {
    const sln = localNumbers.find(
      l => l.shared && l.areaCode === areaCode && l.country === country,
    )
    return sln ? sln.number : undefined
  },
)

export const localNumber = createSelector(
  areaCode,
  country,
  localNumbers,
  (areaCode, country, localNumbers = []) => {
    const ln = localNumbers.find(
      l =>
        l.local &&
        !l.shared &&
        l.areaCode === areaCode &&
        l.country === country,
    )
    return ln ? ln.number : undefined
  },
)

export const searchMessagesContacts = createSelector(
  searchQuery('messagesSearchContact'),
  contacts,
  (query, contacts) =>
    contacts.filter(c => {
      if (query !== '') {
        const re = new RegExp(query, 'i')
        return re.test(c.number) || re.test(c.name) || re.test(c.email)
      }
      return true
    }),
)

export const searchMessages = createSelector(
  searchQuery('messagesSearchMessage'),
  state => state.messages,
  (query, messages) =>
    messages.filter(m => {
      if (query !== '') {
        const re = new RegExp(query, 'i')
        return re.test(m.message)
      }
      return true
    }),
)

export const getUserContact = createSelector(
  search,
  contacts,
  ({ contactId }, contacts) => contacts.find(c => c.id === +contactId),
)
