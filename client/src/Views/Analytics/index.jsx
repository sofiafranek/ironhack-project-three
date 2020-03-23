import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import { transactions } from './../../Services/analytics';
import { userAccounts } from './../../Services/account';
import { creditAccounts } from './../../Services/credit';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      dates: [],
      categories: [],
      eachCategories: [],
      totalAmount: 0
    };
  }

  async getData() {
    const userID = this.props.userID;

    try {
      const accounts = await userAccounts(userID);
      const credits = await creditAccounts(userID);
      const creditsID = credits.map(value => value._id);
      const accountsID = accounts.map(value => value.accountID);

      const info = {
        accountsID,
        creditsID
      };

      const transactionsUser = await transactions(info);

      this.setState(
        {
          transactions: transactionsUser
        },
        () => {
          this.splitDates();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
  }

  calculatePercentageCategory() {
    const transactions = this.state.transactions.map(value => {
      const transaction = new Object();
      transaction.amount = value.totalAmount;
      transaction.category = value.category;
      transaction.color = value.colorCategory;
      return transaction;
    });

    const categories = [];
    let totalAmount = 0;
    for (const transaction of transactions) {
      //const color = transaction.color;
      const name = transaction.category;
      const value = transaction.amount;
      totalAmount += value;
      if (categories.some(value => value.name === transaction.category)) {
        const indexCategory = categories.findIndex(value => value.name === transaction.category);
        categories[indexCategory].value += value;
      } else {
        categories.push({
          //color,
          name,
          value
        });
      }
    }

    this.setState(
      {
        categories,
        totalAmount
      },
      () => {
        const eachCategories = this.state.categories;
        const total = this.state.totalAmount;
        for (const category of eachCategories) {
          const amount = category.value;
          const percentage = (amount / total) * 100;
          category.value = percentage.toFixed(0);
        }
        this.setState({
          eachCategories
        });
      }
    );
  }

  splitDates() {
    const transactions = this.state.transactions.map(value => {
      const transaction = new Object();
      transaction.date = value.dateTransaction.split('-')[1];
      transaction.amount = value.totalAmount;
      return transaction;
    });

    let month = '';
    const dates = [];
    for (const transaction of transactions) {
      const amount = transaction.amount;
      switch (transaction.date) {
        case '01':
          month = 'Jan';
          break;
        case '02':
          month = 'Feb';
          break;
        case '03':
          month = 'Mar';
          break;
        case '04':
          month = 'April';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'June';
          break;
        case '07':
          month = 'July';
          break;
        case '08':
          month = 'Aug';
          break;
        case '09':
          month = 'Sep';
          break;
        case '10':
          month = 'Oct';
          break;
        case '11':
          month = 'Nov';
          break;
        case '12':
          month = 'Dec';
          break;
      }
      if (dates.some(value => value.date === month)) {
        const indexDate = dates.findIndex(value => value.date === month);
        dates[indexDate].total += amount;
      } else {
        dates.push({
          date: month,
          total: amount
        });
      }
    }

    this.setState({
      dates
    });

    this.calculatePercentageCategory();
  }

  render() {
    return (
      <div>
        <Layout>
          <h1 className="pb-3">Analytics</h1>
          <hr></hr>
          {/* title below only shows if there are categories */}
          {this.state.eachCategories.length === 0 && (
            <h5 className="pt-3">
              Start spending! We can only show analytics when you start spending your money!
            </h5>
          )}
          {this.state.eachCategories.length >= 1 && (
            <h5 className="mb-4">Total amount spent this month : {this.state.totalAmount}</h5>
          )}
          <div>
            {this.state.eachCategories.map(category => (
              <ProgressBar
                variant={category.name}
                now={category.value}
                label={category.name + ' ' + category.value + '%'}
              />
            ))}
          </div>
        </Layout>
      </div>
    );
  }
}

export default Analytics;
