import React from "react";

import ChartCard from "components/Charts/ChartCard";
import ImageUpload from "components/CustomUpload/ImageUpload";
import Footer from "components/Footer/Footer";
import {
  Card,
  Col,
  CardTitle,
  CardHeader,
  CardBody,
  Button,
  Row,
} from "reactstrap";
import { chartExample6 } from "variables/charts";
import SortingTable from "components/SortingTable/SortingTable.js";

const ISROLayout = () => {
  return (
    <div style={{padding:25}}>
      <Card>
        <ChartCard
          type="line"
          label={"Something XRAY"}
          mainValue=""
          chartObject={chartExample6}
          isVisible
        />
        <Row>
          <Col className="md-6">
            <Button type="submit" color="secondary">
              Close
            </Button>
          </Col>
          <Col className="col-md-6">
            <Button type="submit" color="primary">
              Go home
            </Button>
          </Col>
        </Row>
      </Card>
      <Footer fluid />
    </div>
  );
};

export default ISROLayout;
