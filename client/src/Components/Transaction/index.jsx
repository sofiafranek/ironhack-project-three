import React, { Component } from 'react';
import { Badge, Button, Accordion, Card } from 'react-bootstrap';
import getSymbolFromCurrency from 'currency-symbol-map';
import './style.scss';

class Transaction extends Component {
  render() {
    console.log(this.props);
    const {
      totalAmount,
      dateTransaction,
      reference,
      category,
      accountIDFrom,
      accountIDTo,
      creditFrom,
      creditTo,
      type
    } = this.props;

    let accFrom = null,
      accTo = null,
      symbol = '',
      currency = '';
    creditFrom ? (accFrom = creditFrom) : (accFrom = accountIDFrom);
    creditTo ? (accTo = creditTo) : (accTo = accountIDTo);
    type === 'minus' ? (symbol = '-') : (symbol = '+');
    type === 'minus' ? (currency = accFrom.currency) : (currency = accTo.currency);

    const toggle = this.props.toggle;
    let toggleKey = '';
    toggle === true ? (toggleKey = '1') : (toggleKey = '0');

    return (
      <Accordion className="hvr-grow transaction pb-3" defaultActiveKey={'1'}>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              className="card-transaction"
              as={Button}
              variant="link"
              eventKey={toggleKey}
            >
              {reference && <h6>{reference}</h6>}
              <div>
                {totalAmount > 0 && (
                  <h6>{symbol + ' ' + totalAmount + ' ' + getSymbolFromCurrency(currency)}</h6>
                )}
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={toggleKey}>
            <Card.Body>
              <div className="transaction-toggle">
                <div className="transaction-info-left">
                  <div className="transaction-top-info">
                    Executed on: {dateTransaction && <h6>{dateTransaction.split('T')[0]}</h6>}
                  </div>
                  <div>Account From: {accFrom.accountNumber}</div>
                  <div>Account To: {accTo.accountNumber}</div>
                </div>
                <div className="transaction-right-info">
                  <Badge variant={category}>{category}</Badge>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Transaction;
