const allExpense = []

let myChart = document.getElementById('chart')

function listenToTrash(trashButton) {
  trashButton.addEventListener('click', () => {
    const expenseRow = trashButton.parentElement;
    while (expenseRow && !expenseRow.className.includes('expenseRow')) {
      expenseRow = expenseRow.parentElement;
    }
    const expenseId = expenseRow.getAttribute('data-expense-id');

    fetch(`/expense/${expenseId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json)
      .then(() => {
        expenseRow.remove()
      })
  })
}
document.querySelectorAll('.deleteExpense').forEach((e) => listenToTrash(e));

function getChartData() {
  const expenses = document.querySelectorAll('.expenseRow');
  const expenseData = {};

  expenses.forEach((row) => {
    const type = row.querySelector('.expenseType').innerHTML;
    const amount = Number(row.querySelector('.expenseAmount').innerHTML);

    if (type in expenseData) {
      expenseData[type] += amount;
    } else {
      chartColorCount ++;
      expenseData[type] = amount;
    }
  });

  return expenseData;
}

let chartColorCount = 0;
const initialExpenseData = getChartData();

// 1. Create an array of random colors based on the number of types
let colors = [];
for(let i=0;i < chartColorCount; i++){
  colors[i] =  randomColor({
    luminosity: 'bright',
    format: 'rgb'
  });
}

// 2. Pass that array into new Chart()
let expenseChart = new Chart(myChart, {
  type: 'doughnut',
  data: {
    labels: Object.keys(initialExpenseData),
    datasets: [{
      label: 'Expenses',
      data: Object.values(initialExpenseData),
      backgroundColor: colors,
      hoverOffset: 4
    }]
  }
});
// create new elements whenever users input something new, also have the ability to delete from 
//browser and databse => add new delete route and new fetch to deal with deleting


document.querySelector("#expenseForm").addEventListener('submit', (e) => {
  e.preventDefault()

  const formInputs = {
    amount: document.querySelector(".amount").value,
    type: document.querySelector(".type").value,
    expense_activity: document.querySelector(".expense_activity").value
  }

  const action = document.querySelector("#expenseForm").action

  fetch(action, {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {

      const expenseRow = document.createElement('div');
      expenseRow.classList.add('expenseRow');
      expenseRow.setAttribute('data-expense-id', responseJson.expense_id)

      const activityInput = document.createElement('p');
      activityInput.classList.add('expenseActivity');
      const typeInput = document.createElement('p')
      typeInput.classList.add('expenseType')
      const amountInput = document.createElement('p')
      amountInput.classList.add('expenseAmount')


      const trash = document.createElement('button')
      trash.classList.add('deleteExpense')
      trash.innerHTML = "🗑️"

      listenToTrash(trash);

      activityInput.innerText = responseJson.expense_activity;
      typeInput.innerText = responseJson.type;
      amountInput.innerText = responseJson.amount;

      expenseRow.appendChild(activityInput);
      expenseRow.appendChild(typeInput);
      expenseRow.appendChild(amountInput);
      expenseRow.appendChild(trash);

      document.querySelector(".expenses").appendChild(expenseRow)
      expenseChart.data.datasets = [{
        label: 'Expenses',
        data: Object.values(getChartData()),
        backgroundColor: [

          randomColor({
            luminosity: 'bright',
            format: 'rgb'
          }),
          randomColor({
            luminosity: 'bright',
            format: 'rgb'
          }),
          randomColor({
            luminosity: 'bright',
            format: 'rgb'
          }),
          randomColor({
            luminosity: 'bright',
            format: 'rgb'
          }),
          // color = randomColor
        ],
        hoverOffset: 4
      }];
      expenseChart.update('none');

    })

})




















