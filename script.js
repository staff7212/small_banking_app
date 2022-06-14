'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2022-02-18T07:43:59.331Z',
    '2022-02-21T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// работа с датами и их интернационалтзация
const formatTransDate = function(date, locale) {
  const getDaysBeetweenTwoDate = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = getDaysBeetweenTwoDate(new Date(), date);
  
  if (daysPassed === 0) return 'Сегодня';
  if (daysPassed === 1) return 'Вчера';
  if (daysPassed <= 4) return `${daysPassed} дня назад`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
  
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale,).format(date);
  }
};

//интернационализация валют
const formattedCash = function(cash, account) {
  return new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency
  }).format(cash);
};

//отображения транзакций
const displayTransactions = function(account, sort = false) {
  containerTransactions.innerHTML = '';
  account.transactions.reverse();
  account.transactionsDates.reverse();

  const transactions = sort ? account.transactions.slice().sort((a, b) => b - a) : account.transactions;

  let transactionsRows = '';

  transactions.forEach((trans, index) => {
    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransDate(date, account.locale);

    const formatedTrans = formattedCash(trans, account);

    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const transactionsRow = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${transType}">${account.transactions.length - index} ${transType}</div>
        <div class="transactions__date">${transDate}</div>
        <div class="transactions__value">${formatedTrans}</div></div>
      </div>
    `;

    transactionsRows += transactionsRow;
  });
  account.transactions.reverse();
  account.transactionsDates.reverse();
  containerTransactions.insertAdjacentHTML("afterbegin", transactionsRows);
};

//создание ника по первым буквам
const createNicknames = function(accs) {
  accs.forEach(item => {
    item.nickname = item.userName.toLowerCase()
    .split(' ')
    .map(item => item[0])
    .join('');
  });
};
//тест
// const userName = 'Oliver Avila';
// const nickname = userName.toLowerCase()
// .split(' ')
// .map(item => item[0])
// .join('');
// console.log(nickname);

createNicknames(accounts);

//баланс
const displayBalance = function(account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = formattedCash(balance, account);
};

//подсчет пополнени и выводов и процентов
const displayTotal = function(account) {
  const depositeTotal = account.transactions
  .filter(trans => trans > 0)
  .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formattedCash(depositeTotal, account)

  const withdrawalTotal = Math.abs(account.transactions
  .filter(trans => trans < 0)
  .reduce((acc, trans) => acc + trans, 0));
  labelSumOut.textContent = formattedCash(withdrawalTotal, account);

  const interestTotal = account.transactions
  .filter(trans => trans > 0)
  .map(depos => (depos * account.interest) / 100)
  .filter(depos => depos >= 5)
  .reduce((acc, deps) => acc + deps, 0);
  labelSumInterest.textContent = formattedCash(interestTotal, account);
};

//обновление инфы аккаунта
const updateUI = function(account) {
  displayTransactions(account);
  displayBalance(account);
  displayTotal(account);
  account.load = true;
};

//таймер для выхода
const startLogOutTimer = function() {
  const logOutTimerCallback = function() {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');

    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  };

  let time = 30;
  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);
  return logOutTimer;
};


//вход
let currentAccount, currentTimer;

///////////////////////////////////////////////////////////
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// const now = new Date();

// labelDate.textContent = new Intl.DateTimeFormat('ar-SY').format(now);
///////////////////////////////////////////////////////

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  currentAccount = accounts.find(account => 
    account.nickname === inputLoginUsername.value);

  if(currentAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 1;

    labelWelcome.textContent = `Рады, что вы снова с нами, ${currentAccount.userName.split(' ')[0]}`;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // обычный метот установки даты
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
  
    // labelDate.textContent = `${day}/${month}/${year}`;

    // интернационализация дат
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const locale = navigator.language;
    //console.log(locale); //ru-RU
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    if (currentTimer) {
      clearInterval(currentTimer);
    }
    currentTimer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

//перевод
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(account => account.nickname === recipientNickname);
  inputTransferTo.value = '';
  inputTransferAmount.value = '';


  clearInterval(currentTimer);
  currentTimer = startLogOutTimer();


  if (transferAmount > 0 && currentAccount.balance > transferAmount && recipientAccount &&
  currentAccount.nickname != recipientAccount.nickname) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
});

//удаление счета
btnClose.addEventListener("click", e => {
  e.preventDefault();

  if (currentAccount.nickname === inputCloseNickname.value && 
    currentAccount.pin === +inputClosePin.value) {
      const index = accounts.findIndex(account => account.nickname === inputCloseNickname.value);
      accounts.splice(index, 1);
      containerApp.style.opacity = '0';
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
  inputCloseNickname.value = '';
  inputClosePin.value = '';
});

//получения займа
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);

  inputLoanAmount.value = '';

  if (currentAccount.load && loanAmount > 0 && currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100) ) {

    setTimeout( () => {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 6000);
  }
  clearInterval(currentTimer);
  currentTimer = startLogOutTimer();
  //currentAccount.load = false;
});

//сортировка
let transSorted = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault();

  displayTransactions(currentAccount, !transSorted);
  transSorted = !transSorted;
});

const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', () => {
  document.querySelectorAll('.transactions__row').forEach((row, i) => {
    if (i % 2 !== 0) {
      row.style.backgroundColor = 'gainsboro';
    }
  });
});