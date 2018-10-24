import React from 'react'
import { connect } from 'react-redux'
import { addUrl } from '../actions/addUrl'
import { reset } from 'redux-form';

const AddUrl = ({dispatch}) => {
  let name
  let url
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(addUrl(url.value, name.value))
          dispatch(reset('addUrl'))
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

export default connect()(AddUrl)