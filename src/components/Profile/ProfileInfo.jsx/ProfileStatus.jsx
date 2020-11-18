import React from 'react';
//import classes from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        //console.log("this:", this)
        //console.log(this.state.editMode);     //to check status
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
            status: this.props.status
        })
        }
    }

    render() {
        console.log(" render")
        return (

            <div>
                { !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}> {this.props.status || "status: "+ this.props.status } </span>
                    </div>
                }

                { this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>
                }

            </div>
        )
    }
}

export default ProfileStatus;