import React , { Component } from 'react';
import {connect} from 'react-redux';

class Home extends Component {
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          {this.props.errorMessage}
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        Simple Starter React Comp
        {this.renderAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps)(Home);
