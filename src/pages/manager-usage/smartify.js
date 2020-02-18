import { compose } from 'redux'
import { connect } from 'react-redux'
import withJob from 'utils/with-job'
import { createStructuredSelector } from 'reselect'
import api from 'api'

const selector = createStructuredSelector({
  stats: state => state.stats.results,
  year: (_, query) =>
    Number.parseInt(query.match.params.year) || new Date().getFullYear(),
  month: (_, query) =>
    Number.parseInt(query.match.params.month) || new Date().getMonth() + 1,
})

const mapDispatchToProps = (dispatch, props) => ({
  load: (year, month) => dispatch(api.actions.stats.get({ year, month })),
})

const work = ({ year, month, load }) => load(year, month)

export default compose(
  connect(
    selector,
    mapDispatchToProps,
  ),
  withJob({
    work,
    shouldWorkAgain: (prev, next) =>
      prev.month !== next.month || prev.year !== next.year,
  }),
)
