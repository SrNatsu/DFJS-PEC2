class ExpenseService {
  constructor() {
    this.expenses = (
      JSON.parse(localStorage.getItem("transactions")) || []
    ).map((expense) => new Expense(expense));
  }

  bindExpenseListChanged(callback) {
    this.onExpenseListChanged = callback;
  }

  _commit(expenses) {
    this.onExpenseListChanged(expenses);
    localStorage.setItem("transactions", JSON.stringify(expenses));
  }

  addExpense(text, amount) {
    this.expenses.push(new Expense({ text, amount }));
    this._commit(this.expenses);
  }

  editExpense(id, updatedText, updatedAmount) {
    this.expenses = this.expenses.map((expense) =>
      expense.id === Number(id)
        ? new Expense({
            ...expense,
            text: updatedText,
            amount: updatedAmount,
          })
        : expense,
    );
    this._commit(this.expenses);
  }

  deleteExpense(_id) {
    this.expenses = this.expenses.filter(({ id }) => {
      return Number(id) !== Number(_id);
    });
    this._commit(this.expenses);
  }

  getBalance() {
    const amounts = this.expenses.map((expense) => expense.amount);
    return amounts
      .map((amount) => +amount)
      .reduce((acc, item) => acc + item, 0)
      .toFixed(2);
  }

  getIncome() {
    const amounts = this.expenses
      .filter((expense) => expense.amount > 0)
      .map((expense) => expense.amount);
    return amounts
      .map((amount) => +amount)
      .reduce((acc, item) => acc + item, 0)
      .toFixed(2);
  }

  getExpense() {
    const amounts = this.expenses
      .filter((expense) => expense.amount < 0)
      .map((expense) => expense.amount);
    return (
      amounts.map((amount) => +amount).reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);
  }
}
