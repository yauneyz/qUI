import React from 'react'

export default class Column extends React.Component{

	constructor(props) {
		super(props)
		this.state = {
			value: this.props.column.data
		}
		this.handleDataChange = this.handleDataChange.bind(this)
	}

	handleDataChange(event){
		this.setState({value: event.target.value})
	}


	render(){
		let name = "Column"
		let data = ""
		let elements = []
		if(this.props.column != null){
			name = this.props.column.name
			data = this.props.column.data
		}

		// Get the list of elements
		return (
		<div>
			<div>
				{name}
			</div>
			<div>
				<textarea rows="15" cols="30" className="form-control" onChange={this.handleDataChange}
					value={this.state.value}/>
			</div>
		</div>
		)}
}
