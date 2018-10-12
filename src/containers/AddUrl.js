import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUrl } from '../actions/addUrl'


const AddUrl = ({dispatch}) => {
  let name
  let url
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          // this.props.dispatch(addUrl(name.value, url.value))
          dispatch(addUrl(url.value, name.value))
          name.value = ''
          url.value = ''
        }}
      >
        <input ref={node => name = node} />
        <input ref={node => url = node} />
        <button type="submit">
          Add URL
        </button>
      </form>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     store: state.store
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     submitUrl: (url, name) => {
//       dispatch(addUrl(url, name))
//     }
//   }
// }
export default connect()(AddUrl)