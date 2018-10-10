import React from 'react'
import { connect } from 'react-redux'
import { addUrl } from '../actions'

const AddUrl = ({ dispatch }) => {
  let input
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(addUrl(input.value))
          input.value = ''
        }}
      >
        <input ref={node => input = node} />
        <button type="submit">
          Add URL
        </button>
      </form>
    </div>
  )
}

export default connect()(AddUrl)