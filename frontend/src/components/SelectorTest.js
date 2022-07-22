/* import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Data } from './Data.js'
import { default as ReactSelect } from 'react-select'
import { components } from 'react-select'

const Option = (props) => {
	return (
		<div>
			<components.Option {...props}>
				<input
					type='checkbox'
					checked={props.isSelected}
					onChange={() => null}
				/>{' '}
				<label>{props.label}</label>
			</components.Option>
		</div>
	)
}

export default class Example extends Component {
	constructor(props) {
		super(props)
		this.state = {
			optionSelected: null,
		}
	}

	handleChange = (selected) => {
		this.setState({
			optionSelected: selected,
		})
	}

	render() {
		return (
			<span
				className='d-inline-block'
				data-toggle='popover'
				data-trigger='focus'
				data-content='Please selecet account(s)'>
				<ReactSelect
					options={Data}
					isMulti
					closeMenuOnSelect={false}
					hideSelectedOptions={false}
					components={{
						Option,
					}}
					onChange={this.handleChange}
					allowSelectAll={true}
					value={this.state.optionSelected}
				/>
			</span>
		)
	}
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Example />, rootElement)

{checkList.map((item, index) => (
  <option key={index}>
    <input
      value={checkList[index].project_name}
      name='projects'
      id={checkList[index].id}
      type='checkbox'
      onChange={handleChange}
    />
    <span>{checkList[index].project_name}</span>
  </option>
 */