import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { markSeen } from "../actions";
import Modal from '../components/modal';

class Bird extends Component {
  state = {
    showModal: false
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  
  render() {
    const { scientific_name, english_name, swedish_name, seen, seenConfirmation, markSeen } = this.props;

    let seenClasses = "far fa-";
    seenClasses += seen ? "check-square" : "square hover-pointer hover-opacity";

    let iconProps = {
      className: seenClasses,
      // add click event only for birds not seen yet
      ...(!seen && seenConfirmation && { onClick: this.toggleModal }), // confirmation modal
      ...(!seen && !seenConfirmation && { onClick: () => markSeen(scientific_name) }), // no confirmation modal
    };

    return (
      <li className="list-group-item">
        <i {...iconProps} />
        <div>
          <p>{english_name}</p>
          <p>{swedish_name}</p>
        </div>
        {
          this.state.showModal && (
            <Modal title="Confirm sighting" confirmButtonText={"Confirm"} close={this.toggleModal} action={() => markSeen(scientific_name)}>
              <p>Are you sure you want to mark this bird as seen?</p>
            </Modal>
          )
        }
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    seenConfirmation: state.settingsData.seenConfirmation
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ markSeen }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bird);
