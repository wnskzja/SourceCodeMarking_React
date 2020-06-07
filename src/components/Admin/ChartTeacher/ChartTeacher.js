import React, { useEffect, useState } from "react";
import Chart from "chart.js";

let chartRef = React.createRef();

const createDateStart = () => {
  const today = new Date();
  const last30Day = new Date(today.setDate(today.getDate() - 30));
  return last30Day;
};

const ChartTeacher = (props) => {
  const { type, data } = props;
  const [dateStart, setDateStart] = useState(createDateStart);
  const [dateRangeObj, setDateRangeObj] = useState("");
  const [dateRangeArray, setDateRangeArray] = useState("");

  useEffect(() => {
    drawChart(data);
    getDurationDate();
  }, [type, data]);

  const getDurationDate = () => {
    const endDate = new Date();
    const startDate = dateStart;
    const datesObj = {};
    const datesArray = [];

    // Strip hours minutes seconds etc.
    let currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    while (currentDate <= endDate) {
      const tmpDate = parseDateToStringWithFormat(currentDate);

      datesObj[tmpDate] = 0;
      datesArray.push(tmpDate);

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1 // Will increase month if over range
      );
    }

    setDateRangeObj(datesObj);
    setDateRangeArray(datesArray);
    return;
  };

  const parseDateToStringWithFormat = (dateTime) => {
    if (dateTime) {
      let current_datetime = new Date(dateTime);
      let formatted_date =
        current_datetime.getDate() +
        "/" +
        (current_datetime.getMonth() + 1) +
        "/" +
        current_datetime.getFullYear();
      return formatted_date;
    }
    return "";
  };

  const drawChart = (dataProps) => {
    if (dataProps && chartRef !== null && chartRef.current !== null) {
      const myChartRef = chartRef.current.getContext("2d");
      const today = new Date();

      let dateChart = [];

      dataProps.forEach((data, index) => {
        const createdDate = new Date(data?.created_at);
        if (dateStart <= createdDate && createdDate <= today) {
          const createdDateString = parseDateToStringWithFormat(createdDate);
          dateChart.push(data?.created_at);
          dateRangeObj[createdDateString] += 1;
        }
      });

      const endDate = new Date();
      const startDate = dateStart;
      const amountArray = [];

      // Strip hours minutes seconds etc.
      let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );

      while (currentDate <= endDate) {
        const tmpDate = parseDateToStringWithFormat(currentDate);
        amountArray.push(dateRangeObj[tmpDate]);

        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1 // Will increase month if over range
        );
      }

      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: dateRangeArray,
          datasets: [
            {
              label: "Sĩ số",
              data: amountArray,
              fill: false,
              borderColor: "black",
            },
          ],
        },
        options: {
          tooltips: {
            callbacks: {
              title: function (tooltipItem, data) {
                return data["labels"][tooltipItem[0]["index"]];
              },
              beforeLabel: function (tooltipItem, data) {
                const result =
                  "Số lượng: " +
                  data["datasets"][0]["data"][tooltipItem["index"]];
                return result;
              },
            },
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 18,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Ngày",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Số lượng",
                },
              },
            ],
          },
        },
      });
    }
  };

  return (
    <div className="chart-container">
      <canvas id="myChartClasses" ref={chartRef} />
    </div>
  );
};

export default ChartTeacher;
