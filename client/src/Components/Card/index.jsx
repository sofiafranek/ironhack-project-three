import React from 'react';
import './style.scss';

const Card = () => {
  const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
  const style = { backgroundColor: bgColor, color };

  return (
    <div className="card-header card hvr-grow mb-3" style={style}>
      <h4>{type}</h4>
      <h5 className="mb-2">Card Number: {cardNumber}</h5>
      <h5 className="mb-2">Expiry Date: 01/{expiryDate}</h5>
      <h5 className="mb-0">CVV: {CVV}</h5>
      <hr></hr>
      <h6>Card Account: {accountID.accountNumber}</h6>
    </div>
  );
};

export default Card;