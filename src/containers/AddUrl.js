import React from 'react'
import { connect } from 'react-redux'
import { addUrl } from '../actions/addUrl'

const urlValidatorRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

function validateForm(url) {
  if (!urlValidatorRegex.test(url)) {
      alert("not proper url");
      return false;
  }
}

const AddUrl = ({dispatch}) => {
  let name
  let url
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          validateForm(url.value)
          dispatch(addUrl(url.value, name.value))
          name.value = ''
          url.value = ''
        }}
      >
        <input required ref={node => name = node} />
        <input required ref={node => url = node} />
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