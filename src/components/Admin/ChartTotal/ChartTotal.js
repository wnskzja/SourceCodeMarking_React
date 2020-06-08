import React, { useEffect, useState } from "react";
import Chart from "chart.js";

let chartRef = React.createRef();

const createDateStart = () => {
  const today = new Date();
  const last30Day = new Date(today.setDate(today.getDate() - 30));
  return last30Day;
};

const ChartTotal = (props) => {
  const { type, dataTeacher, dataStudent, dataClass, dataExercise } = props;
  const [dateStart, setDateStart] = useState(createDateStart);
  const [dateRangeArray, setDateRangeArray] = useState("");

  useEffect(() => {
    getDurationDate();
  }, [type, dataTeacher, dataStudent, dataClass, dataExercise]);

  const compareDateInDataWithDate = (datas, date) => {
    let result = 0;
    if (datas) {
      datas.forEach((data) => {
        if (new Date(data.date).getTime() === new Date(date).getTime()) {
          result = data.total;
        }
      });
    }
    return result;
  };

  const getDurationDate = async () => {
    const endDate = new Date();
    const startDate = dateStart;
    const datesArray = [],
      teacherDatesArray = [],
      studentDatesArray = [],
      classDatesArray = [],
      exerciseDatesArray = [];
    // Strip hours minutes seconds etc.
    let currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    while (currentDate <= endDate) {
      const tmpDate = parseDateToStringWithFormat(currentDate);
      datesArray.push(tmpDate);

      const teacherAmountData = compareDateInDataWithDate(dataTeacher, tmpDate);
      teacherDatesArray.push(teacherAmountData);

      const studentAmountDate = compareDateInDataWithDate(dataStudent, tmpDate);
      studentDatesArray.push(studentAmountDate);

      const classAmountData = compareDateInDataWithDate(dataClass, tmpDate);
      classDatesArray.push(classAmountData);

      const exerciseAmountData = compareDateInDataWithDate(dataClass, tmpDate);
      exerciseDatesArray.push(exerciseAmountData);

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1 // Will increase month if over range
      );
    }
    setDateRangeArray(datesArray);

    await drawChart({
      teacherDatesArray,
      studentDatesArray,
      classDatesArray,
      exerciseDatesArray,
    });
  };

  const parseDateToStringWithFormat = (dateTime) => {
    if (dateTime) {
      let current_datetime = new Date(dateTime);
      let formatted_date =
        current_datetime.getDate() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getFullYear();
      return formatted_date;
    }
    return "";
  };

  const drawChart = ({
    teacherDatesArray,
    studentDatesArray,
    classDatesArray,
    exerciseDatesArray,
  }) => {
    if (chartRef !== null && chartRef.current !== null) {
      const myChartRef = chartRef.current.getContext("2d");

      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: dateRangeArray,
          datasets: [
            {
              label: "Giáo viên",
              data: teacherDatesArray,
              fill: false,
              borderColor: "black",
            },
            {
              label: "Học sinh",
              data: studentDatesArray,
              fill: false,
              borderColor: "Red",
            },
            {
              label: "Lớp học",
              data: classDatesArray,
              fill: false,
              borderColor: "Yellow",
            },
            {
              label: "Bài tập",
              data: exerciseDatesArray,
              fill: false,
              borderColor: "Blue",
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
                  "Giáo viên: " +
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
      <canvas id="myChartTotal" ref={chartRef} />
    </div>
  );
};

export default ChartTotal;
