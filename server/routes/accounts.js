'use strict';

const { Router } = require('express');

const Account = require('./../database/models/account');
const UserAccount = require('./../database/models/userAccount');
const Card = require('./../database/models/card');
const User = require('./../database/models/user');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

// Displays all the accounts
router.get('/', RouteGuard, async (req, res, next) => {
  try {
    const accounts = await Account.getAccounts();
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

// Displays a account using the ID
router.get('/:id', RouteGuard, async (req, res, next) => {
  const id = req.params.id;
  try {
    const account = Account.getAccountById(id);
    res.json({ account });
  } catch (error) {
    next(error);
  }
});

// When user is signing up this creates their first account
router.post('/create-account', async (req, res, next) => {
  console.log(req.body);
  const { balance, type, accountNumber, userID, sharedAccount, sharedUser, primary } = req.body;
  const balanceNumber = Number(balance);

  try {
    const account = await Account.createAccount(accountNumber, type, balanceNumber, sharedAccount);
    const accountID = account._id;
    await UserAccount.createUserAccount(userID, accountID, primary);

    if (sharedAccount) {
      const sharedUserID = await User.getUserByPhoneNumber(sharedUser);
      await UserAccount.createUserAccount(sharedUserID, accountID);
    }

    res.json({ account });
  } catch (error) {
    next(error);
  }
});

/*
router.post('/:accountID/create-account', async (req, res, next) => {
  const { accountID } = req.params;
  const { phoneNumberUser } = req.body;

  try {
      const sharedUserID = await User.getUserByPhoneNumber(phoneNumberUser);
      await UserAccount.createUserAccount(sharedUserID, accountID);
  } catch (error) {
    console.log(error);
    next(error);
  }
});*/

// Returning all ID's of the accounts of the user, including non active
router.get('/:userID/user-accounts', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const accounts = await UserAccount.getUserAllAccounts(userID);
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

// Get all the accounts from the user logged in
router.get('/:userID/accounts', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accounts = await UserAccount.getUserActiveAccounts(userID);
    const accountsUser = accounts.map(account => account.accountID);
    res.json({ accountsUser });
  } catch (error) {
    next(error);
  }
});

// Deletes specific account using the ID
router.post('/:id/delete-account', RouteGuard, async (req, res, next) => {
  const idAccount = req.params.id;
  try {
    await Account.removeAccount(idAccount);
    await UserAccount.removeAccount(idAccount);
    await Card.removeCard(idAccount);
    res.json({ result: 'sucess' });
  } catch (error) {
    next(error);
    res.json({ result: 'error' });
  }
});

module.exports = router;
