document.addEventListener('DOMContentLoaded', () => {
  const billTotalInput = document.getElementById('bill-total');
  const tipOptionsButtons = document.querySelectorAll(
    '.select-tip__buttons button'
  );
  const customTipInput = document.getElementById('custom-input');
  const numberOfPeopleInput = document.getElementById('people');
  const tipAmountPerPersonDisplay = document.getElementById(
    'tip-amount-per-person'
  );
  const totalPerPersonDisplay = document.getElementById('total-per-person');
  const resetButton = document.getElementById('reset-button');

  const warningElement = document.getElementById('warning');

  let billAmount = 0;
  let tipPercentage = 0;
  let numberOfPeople = 1;

  const calculateTip = () => {
    if (numberOfPeople === 0) {
      warningElement.hidden = false;
      numberOfPeopleInput.classList.add('warning-input');
      return;
    }

    warningElement.hidden = true;
    numberOfPeopleInput.classList.remove('warning-input');
    const tipAmount = (billAmount * tipPercentage) / 100;
    const tipAmountPerPerson = tipAmount / numberOfPeople;
    const totalBill = billAmount + tipAmount;
    const totalPerPerson = totalBill / numberOfPeople;

    tipAmountPerPersonDisplay.innerHTML = `<span>$</span>${tipAmountPerPerson.toFixed(
      2
    )}`;
    totalPerPersonDisplay.innerHTML = `<span>$</span>${totalPerPerson.toFixed(
      2
    )}`;
  };

  billTotalInput.addEventListener('input', (e) => {
    billAmount = parseFloat(e.target.value);
    resetButton.disabled = false;
    calculateTip();
  });

  tipOptionsButtons.forEach((button) =>
    button.addEventListener('click', (e) => {
      tipPercentage = parseFloat(e.target.value);
      resetButton.disabled = false;
      customTipInput.value = ''; // Clear custom input when a button is clicked
      calculateTip();
    })
  );

  customTipInput.addEventListener('input', (e) => {
    tipPercentage = parseFloat(e.target.value);
    resetButton.disabled = false;
    calculateTip();
  });

  numberOfPeopleInput.addEventListener('input', (e) => {
    numberOfPeople = parseFloat(e.target.value);
    resetButton.disabled = false;
    calculateTip();
  });

  resetButton.addEventListener('click', (e) => {
    billAmount = 0;
    tipPercentage = 0;
    numberOfPeople = 1;
    warningElement.hidden = true;
    billTotalInput.value = '';
    customTipInput.value = '';
    numberOfPeopleInput.value = '';
    tipAmountPerPersonDisplay.innerHTML = '<span>$</span>0.00';
    totalPerPersonDisplay.innerHTML = '<span>$</span>0.00';
    resetButton.disabled = true;
  });
});

