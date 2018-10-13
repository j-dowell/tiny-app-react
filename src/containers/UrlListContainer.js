import { connect } from 'react-redux'
// import { deleteUrl } from '../actions'
import UrlList from '../components/UrlList'

const mapStateToProps = state => ({
  urls: state.urls
})

const mapDispatchToProps = dispatch => ({
  // deleteUrl: id => dispatch(deleteUrl(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UrlList)

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(t => t.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

// const mapStateToProps = state => ({
//   todos: getVisibleTodos(state.todos, state.visibilityFilter)
// })

// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id))
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TodoList)