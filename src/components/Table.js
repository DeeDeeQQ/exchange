import React, { Component } from "react";
import axios from "axios";
import styled from "react-emotion";

export default class Exchange extends Component {
  state = {
    currencies: ["EUR", "GBP", "ILS", "JPY", "USD"],
    rates: []
  };

  getData = source => {
    const API_URL = "https://ratesapi.io/api/latest";
    return axios
      .get(`${API_URL}?base=${source}&symbols=${this.state.currencies}`)
      .then(apiData => {
        apiData.data.rates[source] = 1;
        this.setState({
          rates: [...this.state.rates, { [source]: apiData.data.rates }]
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  preparedata = () => {
    for (let i = 0; i < this.state.currencies.length; i++) {
      let source = this.state.currencies[i];
      this.getData(source);
    }
  };

  componentDidMount() {
    this.preparedata();
  }

  render() {
    return (
      <MainDiv>
        <TableDiv>
          <Table>
            <thead>
              <tr>
                <td>Rates</td>
                {this.state.currencies.map((data, id) => (
                  <td key={id}>{data}</td>
                ))}
              </tr>
            </thead>

            {this.state.rates.length === this.state.currencies.length &&
              this.state.rates.map((rates, id) => (
                <tbody key={id}>
                  {Object.keys(rates).map((item, id) => (
                    <tr key={id}>
                      <td>{item}</td>
                      {Object.keys(rates[item])
                        .sort()
                        .map((data, id) => (
                          <td key={id}>{rates[item][data]}</td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              ))}
          </Table>
        </TableDiv>
        <button onClick={this.preparedata}>Get fresh data</button>
      </MainDiv>
    );
  }
}

const TableDiv = styled("div")`
  min-width: 60%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Table = styled("table")`
  width: 60%;
`;

const MainDiv = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    max-width: 20%;
    margin-top: 40px;
  }
`;
