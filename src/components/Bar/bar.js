import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { RiQuestionnaireLine } from "react-icons/ri";
import { BsFillLightbulbFill } from "react-icons/bs";
import {
  Card,
  Col,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Container,
} from "reactstrap";
class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="11">
              <h1 className="h1 text-white"> </h1>{" "}
            </Col>

            <Col xs="1">
              <h2 className="h2 text-white">
                <RiQuestionnaireLine onClick={this.toggle} />
              </h2>
            </Col>
          </Row>
        </Container>

        <Modal
          style={{ maxWidth: "800px", width: "100%" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <b>How to Use</b>{" "}
          </ModalHeader>
          <ModalBody>
            <p>
              Click on the <b>Upload File</b> button to upload light curves in
              FITS, ASCII, XLS or CDF format.
              <br />
              Click on the History <b>button</b> to see last 10 uploads and
              their details.
              <br />
              Click on the download csv button to download the chart in csv
              format.
              <br />
              Click on the <b>Print Report</b> button to print the plots and
              report.
              <br />
              Checkout our user manual if you face any trouble or wish to know
              more about our webtool
            </p>
            <Button
              color="secondary"
              href="https://drive.google.com/drive/folders/18uM09zyECiFVNvx1WhB1xgUje3n9MIqC?usp=sharing"
            >
              User Manual
            </Button>
            <br />
            <b>Key Features</b>
            <p>
              The input file format are flexible and can be in FITS, ASCII, XLS
              or CDF format.
              <br />
              It can detect flares, flare parameters. Can classify flares.
              <br />
              You can download pdf report and print it. Can download csv format
              of chart.
              <br /> You can see the history of your uploads.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
