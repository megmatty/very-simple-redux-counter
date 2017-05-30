import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick, onDecreaseClick, onResetClick } = this.props
    return (
      <div >
        <span>{value}</span>
        <button onClick={onIncreaseClick}>▲</button>
        <button onClick={onDecreaseClick}>▼</button>
        <button onClick={onResetClick}>Reset</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
  onDecreaseClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'INCREASE' }
const decreaseAction = { type: 'DECREASE' }
const resetAction = { type: 'RESET' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'INCREASE':
      return { count: count + 1 }
    case 'DECREASE':
      return { count: count - 1}
    case 'RESET': 
      return { count: 0 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction),
    onResetClick: () => dispatch(resetAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
