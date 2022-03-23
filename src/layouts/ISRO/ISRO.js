import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChartCard from "components/Charts/ChartCard";
import ImageUpload from "components/CustomUpload/ImageUpload";
import Footer from "components/Footer/Footer";
import DataTable from "react-data-table-component";
import { RiQuestionnaireLine, RiRoundedCorner } from "react-icons/ri";
import { BsFillLightbulbFill } from "react-icons/bs";
import Bar from "components/Bar/bar";
import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import logo from "./JuX-logos.jpeg";
import logoISRO from "./ISRO.png";
import config from "./config";
import "components/Pdf.css";
import {
  Card,
  Col,
  CardTitle,
  CardHeader,
  CardBody,
  Button,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Popup from "components/Popup";
import { chartExample6 } from "variables/charts";
import SortingTable from "components/SortingTable/SortingTable.js";
import { Chart } from "chart.js";
import { chartExample1 } from "variables/charts";
import { chartExample2 } from "variables/charts";
import { chartExample3 } from "variables/charts";
import { CSVLink } from "react-csv";
import { Table } from "@material-ui/core";

const ISROLayout = () => {
  // const arr= Array(y.length).fill("#2380f7");
  var file;
  const ref = React.createRef();
  const [columns, setColumns] = useState([]);
  const [data1, setData] = useState([]);
  const [randLC, setRandLC] = useState([]);
  const [x, setx] = useState([]);
  const [y, sety] = useState([]);
  const [xOri, setxOri] = useState([]);
  const [yOri, setyOri] = useState([]);
  const [name, setName] = useState([]);
  const [buttonName, setButtonName] = useState(["Upload File"]);
  const [peakTime, setPeakTime] = useState([]);
  let componentRef = useRef();
  const [showHistory, setShowHistory] = useState(false);
  const [filename1, setFileName1] = useState("");
  const [filename2, setFileName2] = useState("");
  const [filename3, setFileName3] = useState("");
  const [filename4, setFileName4] = useState("");
  const [filename5, setFileName5] = useState("");
  const [filename6, setFileName6] = useState("");
  const [filename7, setFileName7] = useState("");
  const [filename8, setFileName8] = useState("");
  const [filename9, setFileName9] = useState("");
  const [filename10, setFileName10] = useState("");
  var [count, setCount] = useState(0);
  var [xHist, setxHist] = useState([]);
  var [dataHist, setdataHist] = useState([]);
  var [yHist, setyHist] = useState([]);
  var [yOriHist, setyOriHist] = useState([]);
  var [xOriHist, setxOriHist] = useState([]);

  const chartObj = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, "rgba(0,135,191,0.2)");
      gradientStroke.addColorStop(0.8, "rgba(0,135,191,0.1)");
      gradientStroke.addColorStop(0, "rgba(0,84,119,0)"); //blue colors
      return {
        labels: x,
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#2380f7",
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#2380f7",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#2380f7",
            pointBorderWidth: 1,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 0,
            data: y,
          },
        ],
      };
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          threshold: 10,
        },
        zoom: {
          mode: "x",
          drag: {
            enabled: true,
            threshold: 100,
            backgroundColor: "rgba(0,135,191,0.2)",
            borderWidth: 1,
            borderColor: "rgba(0,135,191,0.2)",
          },
          pinch: {
            enabled: true,
          },
        },
      },
    },
    options: {
      spanGaps: true,
      animation: false,
      showLine: false,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },

      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Count Rate (count per sec)",
            },
            gridLines: {
              drawOnChartArea: true,
            },
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              callback: (val) => val.toExponential(),
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e",
              maxTicksLimit: 7,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Time Stamp",
            },
            gridLines: {
              drawOnChartArea: true,
            },
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            gridLines: {
              drawOnChartArea: true,
            },

            ticks: {
              callback: function (label, index, labels) {
                var sec = x[index];
                var time = changeTime(sec);
                // console.log("time", time);
                return time;
              },
              autoskip: true,
              padding: 20,
              fontColor: "#9e9e9e",
              maxTicksLimit: 15,
            },
          },
        ],
      },
    },
  };

  const csvLink = {
    filename: "peak_data.csv",
    headers: columns,
    data: data1,
  };

  function checkPoints() {
    chartObj.data.datasets[0].pointBackgroundColor = [];
    // chartObj.data.datasets[0].pointRadius = [];
    // for (var i = 1; i <= data.datasets[0].data.length - 1; i++) {
    // if (data.datasets[0].data[i - 1] === data.datasets[0].data[i]) {
    //   if (remove) {
    //     chartObj.data.datasets[0].pointRadius[i] = 0;
    //   }
    //   chartObj.data.datasets[0].pointBackgroundColor[i] = 'red';
    // } else  {
    //   chartObj.data.datasets[0].pointBackgroundColor[i] = 'blue';
    // }
    // }
    chartObj.update();
  }

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );
    const peak_time = [];
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      for (var j = 0; j < 5; j++) {
        row[j] = changeTimeTable(row[j]);
      }
      for (var j = 5; j < 8; j++) {
        row[j] = round(parseInt(row[j]), 2);
      }
      peak_time.push(row[1]);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    function round(num, decimalPlaces = 0) {
      if (num < 0) return -round(-num, decimalPlaces);
      var p = Math.pow(10, decimalPlaces);
      var n = num * p;
      var f = n - Math.floor(n);
      var e = Number.EPSILON * n;

      // Determine whether this fraction is a midpoint value.
      return f >= 0.5 - e ? Math.ceil(n) / p : Math.floor(n) / p;
    }
    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));
    // console.log("hhh", list);
    setData(list);
    var dataH = dataHist;
    dataH.push(list);
    setdataHist(dataH);
    console.log("DATAHIST", dataHist);
    setColumns(columns);
    // console.log("type", typeof columns);
    // setColumns(["Start Time","Peak Time","End Time","Decay Time","Peak Intensity","Error"]);
    // console.log(list);
    // console.log("DATA");
    // const xx = data1;
    // setData(xx);
    // console.log("data1", data1);
    peakTime.pop();
    // console.log("peakTime", peak_time);
    setPeakTime(peakTime);
    // console.log("type",typeof(data1))
    // console.log(columns);
  };

  useEffect(() => {
    console.log("data1", data1);
  }, [data1]);

  function changeTime(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var time;
    if (hours < 10) {
      time = "0" + hours;
    } else {
      time = hours;
    }
    if (minutes < 10) {
      time = time + ":0" + minutes;
    } else {
      time = time + ":" + minutes;
    }
    return time;
  }

  function changeTime(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var time;
    if (hours < 10) {
      time = "0" + hours;
    } else {
      time = hours;
    }
    if (minutes < 10) {
      time = time + ":0" + minutes;
    } else {
      time = time + ":" + minutes;
    }
    return time;
  }

  function changeTimeTable(secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }

  function graphLabels(arr) {
    var labels = [];
    for (var i = 0; i < arr.length; i++) {
      labels.push(changeTime(arr[i]));
    }
    return labels;
  }

  // set history
  const setHistory = (filename, i) => {
    const tfilename1 = filename1;
    const tfilename2 = filename2;
    const tfilename3 = filename3;
    const tfilename4 = filename4;
    const tfilename5 = filename5;
    const tfilename6 = filename6;
    const tfilename7 = filename7;
    const tfilename8 = filename8;
    const tfilename9 = filename9;
    const tfilename10 = filename10;
    if (count == 1) {
      setFileName1(filename);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 2) {
      setFileName1(tfilename1);
      setFileName2(filename);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 3) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(filename);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 4) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(filename);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 5) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(filename);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 6) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(filename);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 7) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(filename);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 8) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(filename);
      setFileName9(tfilename9);
      setFileName10(tfilename10);
    } else if (count == 9) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(filename);
      setFileName10(tfilename10);
    } else if (count == 10) {
      setFileName1(tfilename1);
      setFileName2(tfilename2);
      setFileName3(tfilename3);
      setFileName4(tfilename4);
      setFileName5(tfilename5);
      setFileName6(tfilename6);
      setFileName7(tfilename7);
      setFileName8(tfilename8);
      setFileName9(tfilename9);
      setFileName10(filename);
    }
  };

  // handle file upload
  const handleFileUpload = (e) => {
    count++;
    setCount(count);
    let file = e.target.files[0];

    let name = file.name;
    // console.log(name);
    if (file) {
      setButtonName("Change File");
    } else {
      setButtonName("Upload File");
    }
    setName(file.name);
    console.log(file.name);
    const formData = new FormData();

    formData.append("file", file);

    setHistory(file.name, count);

    console.log("sending data");
    axios
      .post("http://127.0.0.1:5000/api/upload", formData)
      .then((res) => {
        // console.log(res.data);

        processData(res.data);
      })
      .catch((err) => console.log(err));
    // axios
    //   .post("http://127.0.0.1:5000/api/graph", formData)
    //   .then((res) => {
    //     // console.log(res.data);
    //     setRandLC(res.data);
    //   })
    //   .catch((err) => console.log(err));
    axios
      .post("http://127.0.0.1:5000/api/x", formData)
      .then((res) => {
        var xH = xHist;
        xH.push(res.data);
        setxHist(xH);
        setx(res.data);
        console.log("XHIST", xHist);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://127.0.0.1:5000/api/y", formData)
      .then((res) => {
        // console.log(res.data);
        var yH = yHist;
        yH.push(res.data);
        setyHist(yH);
        sety(res.data);
        console.log("YHIST", yHist);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://127.0.0.1:5000/api/xOri", formData)
      .then((res) => {
        var xH = xOriHist;
        xH.push(res.data);
        setxOriHist(xH);
        setxOri(res.data);
        console.log("XORIHIST", xHist);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://127.0.0.1:5000/api/yOri", formData)
      .then((res) => {
        var xH = yOriHist;
        xH.push(res.data);
        setyOriHist(xH);
        setyOri(res.data);
        console.log("XORIHIST", xHist);
      })
      .catch((err) => console.log(err));
    // console.log("FIRST ENTRY");
  };

  const inputFile = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  // console.log("Printing data");
  console.log(
    "trying",
    data1.map((row) => {
      return row["peak_time"][0][0][0];
    })
  );

  const pp = data1;
  console.log("data1 ", pp);

  const searchTab = (
    <div
      className="wrapper wrapper-full-page"
      style={{
        paddingTop: 25,
      }}
    >
      <Bar />

      <Card className="col md-12 text-center center">
        <Col md="12" sm="12">
          <CardTitle tag="h3"> </CardTitle>{" "}
          {/* <ImageUpload addBtnColor="default" changeBtnColor="default" /> */}{" "}
          <div>
            <input
              style={{
                display: "none",
                align: "center",
              }}
              ref={inputFile}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="contained-button-file">
              <Button onClick={onButtonClick}> {buttonName} </Button>{" "}
            </label>{" "}
          </div>{" "}
          <h0> {name} </h0>{" "}
          <div ref={(el) => (componentRef = el)}>
            <ChartCard
              type="line"
              label={"Output Curve"}
              mainValue=""
              chartObject={chartObj}
              isVisible
              id="myChart"
            />
            <Row>
              <Col className="md-6">
                {/* <Button type="submit" color="primary">
                    Download Chart{" "}
                  </Button>{" "} */}
                <CSVLink
                  data={data1}
                  filename={"my-file.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Download CSV
                </CSVLink>
              </Col>{" "}
              <Col className="col-md-6">
                {/* <Pdf targetRef={ref} filename="table_data.pdf">
                    {({ toPdf }) => (
                      <Button color="primary" onClick={toPdf}>
                        Generate Table Data as PDF
                      </Button>
                    )}
                  </Pdf> */}
                <ReactToPrint
                  trigger={() => <Button color="primary">Print Report</Button>}
                  content={() => componentRef}
                />
              </Col>{" "}
            </Row>
            <div ref={ref}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4"> Data Table </CardTitle>{" "}
                </CardHeader>{" "}
                <CardBody>
                  <DataTable
                    pagination
                    highlightOnHover
                    columns={[
                      {
                        name: "Start\nTime",
                        selector: "start_time",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",
                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Peak Time",
                        selector: "peak_time",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",
                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Observed End Time",
                        selector: "end_time",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",
                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Calculated End Time",
                        selector: "est_end_time",
                        sortable: true,
                        width: "130px",
                        textAlign: "center",
                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Start Time Intensity",
                        selector: "start_intensity",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",

                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Peak Intensity",
                        selector: "peak_intensity",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",

                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Background Counts",
                        selector: "background_counts",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",
                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                      {
                        name: "Burst Class",
                        selector: "class",
                        sortable: true,
                        width: "115px",
                        textAlign: "center",
                        align: "center", // added line here
                        headerStyle: (selector, id) => {
                          return { textAlign: "center" }; // removed partial line here
                        },
                      },
                    ]}
                    data={data1}
                  />
                </CardBody>
              </Card>
              <div className="hiddenTextR">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h2"> About Solar Flares </CardTitle>{" "}
                  </CardHeader>{" "}
                  <CardBody>
                    <p>
                      A lot of activity keeps happening on the surface of the
                      Sun. The strong magnetic fields near the sunspots (active
                      regions) often undergo tangle and twisting. A Solar Burst
                      or Flare is a consequence of the rapid and sudden release
                      of magnetic energy of these fields. In a matter of just a
                      few minutes, they heat the material to many millions of
                      degrees and produce a burst of radiation across the
                      electromagnetic spectrum, including from radio waves to
                      x-rays and gamma rays. Solar Flares have the capability to
                      directly affect the ionosphere and radio communications at
                      the Earth and also release energetic particles into space.
                      Thus, to understand and predict 'space weather' and the
                      effect of solar activity on the Earth, the study of Solar
                      Flares is highly essential. Solar bursts usually show a
                      fast rise and slow decay pattern. The Classification
                      system is based on the count rate range
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div className="hiddenText">
                <h1>Parameters</h1>
                <p align="left !important">
                  <h2>
                    The various parameters in the analysis result have been
                    explained below:
                  </h2>

                  <ul>
                    Start Time: We defined it as the local minima before the
                    peak time where the slope from the peak will be the highest.
                    <li>
                      Peak Time: The time at which peak counts is achieved is
                      called peak time.
                    </li>
                    <li>
                      Observed Time: The time taken for flux to drop to a value
                      halfway between the initial and final flux values{" "}
                    </li>
                    <li>
                      Calculated Time: The time required for the flux value to
                      fall back to the initial level. This is obtained by
                      fitting an exponential function to the decay profile of
                      the flare and further extrapolating it.
                    </li>
                    <li>
                      Start Time Intensity: The count rate at the beginning of
                      the solar flare.
                    </li>
                    <li>
                      Peak Counts: It is the maximum count rate or flux observed
                      during a particular solar flare.
                    </li>
                    <li>
                      Background Counts: These are the counts which are
                      associated with the non-flaring emission and need to be
                      subtracted from the count rate data to get accurate
                      readings.
                    </li>
                    <li>
                      Burst Class: Every solar flare can be classified into
                      several classes based on the count rate as A, B, C, M or X
                      with a numerical value present with the letter. The
                      classification is based on a log scale, that is, for every
                      index has 10 times more intensity than the preceding
                      index. The letter indices have been further divided into
                      sub-classes.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Card>
    </div>
  );

  const historyTab = (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h2"> History </CardTitle>
        </CardHeader>
        <CardBody className="text-center">
          <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Reopen Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {filename1} </td>
                <td>
                  <Button
                    disabled={filename1 === ""}
                    color="primary"
                    onClick={() => {
                      // set data1
                      setData(dataHist[0]);
                      setx(xHist[0]);
                      sety(yHist[0]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename2} </td>
                <td>
                  <Button
                    disabled={filename2 === ""}
                    color="primary"
                    onClick={() => {
                      // set data2
                      setData(dataHist[1]);
                      setx(xHist[1]);
                      sety(yHist[1]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename3} </td>
                <td>
                  <Button
                    disabled={filename3 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[2]);
                      setx(xHist[2]);
                      sety(yHist[2]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename4} </td>
                <td>
                  <Button
                    disabled={filename4 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[3]);
                      setx(xHist[3]);
                      sety(yHist[3]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename5} </td>
                <td>
                  <Button
                    disabled={filename5 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[4]);
                      setx(xHist[4]);
                      sety(yHist[4]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename6} </td>
                <td>
                  <Button
                    disabled={filename6 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[5]);
                      setx(xHist[5]);
                      sety(yHist[5]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename7} </td>
                <td>
                  <Button
                    disabled={filename7 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[6]);
                      setx(xHist[6]);
                      sety(yHist[6]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename8} </td>
                <td>
                  <Button
                    disabled={filename8 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[7]);
                      setx(xHist[7]);
                      sety(yHist[7]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename9} </td>
                <td>
                  <Button
                    disabled={filename9 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[8]);
                      setx(xHist[8]);
                      sety(yHist[8]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
              <tr>
                <td> {filename10} </td>
                <td>
                  <Button
                    disabled={filename10 === ""}
                    color="primary"
                    onClick={() => {
                      // set data3
                      setData(dataHist[9]);
                      setx(xHist[9]);
                      sety(yHist[9]);
                      setShowHistory(false);
                    }}
                  >
                    View data
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <>
    
      <div
        className="container"
        style={{
          paddingTop: 25,
        }}
      >
        <blockquote className="blockquote text-center">
          <Row>
            <Col className="md-1">
              {/* <h1 className="mb-2"> Inter - IIT Tech Meet 10.0 </h1>{" "} */}
              <img
                src={logo}
                style={{
                  height: "12vh",
                  marginLeft: "-31vh",
                  marginTop: "-1vh",
                }}
              />
            </Col>
            <Col className="md-10">
              <h1 className="mb-2 fontHead" style={{ fontSize: "6vh" }}>
                {" "}
                JuX{" "}
              </h1>{" "}
              <h3 className="mb-0" style={{ fontSize: "2vh" }}>
                {" "}
                Solar Flare Analysis Tool{" "}
              </h3>{" "}
            </Col>
            <Col className="md-1">
              {/* <h1 className="mb-2"> Inter - IIT Tech Meet 10.0 </h1>{" "} */}
              <img
                src={logoISRO}
                style={{
                  height: "12vh",
                  marginRight: "-30vh",
                  marginTop: "-1vh",
                }}
              />
            </Col>
          </Row>
        </blockquote>
        <Nav
          className="nav-pills-info nav-pills-icons justify-content-center"
          pills
        >
          <NavItem>
            <NavLink
              data-toggle="tab"
              className={showHistory ? "" : "active"}
              onClick={() => setShowHistory(false)}
            >
              <i className="tim-icons icon-zoom-split" />
              Analysis
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-toggle="tab"
              className={showHistory ? "active" : ""}
              onClick={() => setShowHistory(true)}
            >
              <i className="tim-icons icon-paper" />
              History
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          className="tab-space tab-subcategories"
          activeTab={showHistory ? "history" : "search"}
        >
          <TabPane tabId="search">{searchTab}</TabPane>
          <TabPane tabId="history">{historyTab}</TabPane>
        </TabContent>
        <Popup />
      </div>
      {/* <Footer fluid /> */}
    </>
  );
};

export default ISROLayout;
