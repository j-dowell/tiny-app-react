import React from 'react'
import { connect } from 'react-redux'
import { addUrl } from '../actions'

const AddUrl = ({ dispatch }) => {
  let name
  let url
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(addUrl(name.value, url.value))
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

export default connect()(AddUrl)