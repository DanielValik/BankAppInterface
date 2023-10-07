"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

let currentAcc;

function createNicknames(accounts) {
  accounts.map((acc) => {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(" ")
      .map((elem) => elem[0])
      .join("");
  });
}
createNicknames(accounts);

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let isSorted = false;

// Displaying functions

let displayTransactions = function (account) {
  containerTransactions.innerHTML = "";
  let transactionsText = "";

  account.transactions.forEach((element, index) => {
    let transactionType = element > 0 ? "deposit" : "withdrawal";

    let transDate = new Date(account.transactionsDates[index]);
    let day = `${transDate.getDay()}`.padStart(2, "0");
    let month = `${transDate.getMonth() + 1}`.padStart(2, "0");
    let year = transDate.getFullYear();

    transactionsText = `<div class="transactions__row">
    <div class="transactions__type transactions__type--${transactionType}">
      ${index + 1} ${transactionType}
    </div>
    <div class="transactions__date">${day}/${month}/${year}</div>
    <div class="transactions__value">${element.toFixed(2)}$</div>
  </div>`;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionsText);
  });
};

let displayTotalIncomeOutcome = function (account) {
  let balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = balance + "$";

  let incomes = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans);
  labelSumIn.textContent = incomes.toFixed(2) + "$";

  let outcomes = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans);
  labelSumOut.textContent = outcomes.toFixed(2) + "$";

  let interest = account.transactions
    .filter((trans) => trans > 0)
    .map((trans) => (trans * account.interest) / 100)
    .reduce((acc, trans) => acc + trans);
  labelSumInterest.textContent = interest.toFixed(2) + "$";
};

// Sing In functionalities

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAcc = accounts.find((acc) => {
    return (
      acc.nickname === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
    );
  });

  if (currentAcc) {
    labelWelcome.textContent = `Welcome ${currentAcc.userName.split(" ")[0]}!`;

    displayTransactions(currentAcc);
    displayTotalIncomeOutcome(currentAcc);

    inputLoginUsername.value = "";
    inputLoginUsername.blur();
    inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});

// Transfer

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const recipientAcc = accounts.find(
    (acc) => acc.nickname === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);
  const transferDate = new Date();

  if (
    recipientAcc &&
    transferAmount > 0 &&
    currentAcc.balance >= transferAmount &&
    currentAcc.nickname !== recipientAcc
  ) {
    currentAcc.transactions.push(-transferAmount);
    currentAcc.transactionsDates.push(transferDate);
    recipientAcc.transactions.push(Number(transferAmount));
    recipientAcc.transactionsDates.push(transferDate);

    displayTransactions(currentAcc);
    displayTotalIncomeOutcome(currentAcc);

    inputTransferTo.value = "";
    inputTransferTo.blur();
    inputTransferAmount.value = "";
    inputTransferAmount.blur();
  }
});

// Close

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.nickname &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    let indexForRemove = accounts.findIndex(
      (acc) => acc.nickname === currentAcc.nickname
    );

    accounts.splice(indexForRemove, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Sing In to Your account`;

    inputClosePin.value = "";
    inputCloseUsername.value = "";
    inputClosePin.blur();
    inputCloseUsername.blur();
  }
});

// Get Loan

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  let loanAmount = Math.floor(inputLoanAmount.value);

  if (
    currentAcc.transactions.some((trans) => trans >= (loanAmount / 100) * 10)
  ) {
    console.log("loan");
  }
});

// Sort

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  isSorted = !isSorted;

  currentAcc.transactions = isSorted
    ? currentAcc.transactions.sort((x, y) => x - y)
    : currentAcc.transactions.sort((x, y) => y - x);

  displayTransactions(currentAcc);
});

// Log current account transactions into console

document
  .querySelector(".balance__label")
  .addEventListener("click", function (e) {
    const transNodeList = document.querySelectorAll(".transactions__value");
    const transArray = Array.from(transNodeList, (elem) =>
      Number(elem.textContent.slice(0, -1))
    );
    console.log(transArray);
  });

// Other functions

let bankTotalDeposit = accounts
  .flatMap((acc) => acc.transactions)
  .filter((trans) => trans > 0)
  .reduce((acc, trans) => acc + trans);

let { depositsTotal, withdrawalsTotal } = accounts
  .flatMap((acc) => acc.transactions)
  .reduce(
    (acc, trans) => {
      // trans > 0
      //   ? (acc.depositsTotal += trans)
      //   : (acc.withdrawalsTotal += trans);

      acc[trans > 0 ? "depositsTotal" : "withdrawalsTotal"] += trans;
      return acc;
    },
    { depositsTotal: 0, withdrawalsTotal: 0 }
  );

//always loged
currentAcc = account2;
displayTransactions(currentAcc);
displayTotalIncomeOutcome(currentAcc);

// Date functionalities

let now = new Date();
let day = `${now.getDay()}`.padStart(2, "0");
let month = `${now.getMonth() + 1}`.padStart(2, "0");
let year = now.getFullYear();
labelDate.textContent = `${day}/${month}/${year}`;
