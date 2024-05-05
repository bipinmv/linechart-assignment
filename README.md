## Line chart - Assignment

### Demo

Default View

![image](https://github.com/bipinmv/linechart-assignment/assets/95746336/befbaf58-1250-437c-b83b-58b6b2c2c5a2)

Endpoint filter

![image](https://github.com/bipinmv/linechart-assignment/assets/95746336/bce26066-e0bd-40bf-b3b1-d521463d7f4c)


Date-time filter

![image](https://github.com/bipinmv/linechart-assignment/assets/95746336/f61e30e9-13c4-4287-9da4-660106f6eca6)


- The end-point filter is a multi-select checkbox dropdown from which a user can select any of the desired endpoints. Based on the selected endpoint, the connections data gets filtered using the Javascript Array Filter method.
- The date time filter is made using `react-datepicker` library. Which returns start and end date and based on that we have to filter the entire dataset with the selected dates.
- To show date and time on tooltip, need to pass the time with each data point. For that we need to parse the chart data based on that data format supported by the charting library `highcharts`.


