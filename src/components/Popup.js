import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };

    this.toggle = this.toggle.bind(this);
    this.state.backdrop = "static";
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <Modal
          style={{ maxWidth: "800px", width: "100%" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            <h2 className="h2">Welcome to JuX: The Solar Burst Identifier!</h2>
          </ModalHeader>
          <ModalBody className="ModalBody">
            <p className="modal1">
              This tool was designed by a team of sophomores from <b>Team 10</b>
              . It is based on the observations of the Solar X-Ray Monitor (XSM)
              on-board the orbiter of Chandrayaan-2 mission.
            </p>
            <p>
              The tool can be used for accurate and automatic identification of
              Solar Bursts in X-Ray Light Curves.
            </p>
            <p>
              It is quite flexible and can take single or bulk input of Light
              Curve Files in either FITS, ASCII, XLS or CDF format.
            </p>
            <p>
              The output will include the detected solar flares and several
              parameters determined from the Light Curve Data, like Start Time,
              End Time, Peak Time (Max Time), Peak Count Rate, Background Counts
              etc.
            </p>
            <p>
              The tool will also attempt to classify the detected solar flares.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Start
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
