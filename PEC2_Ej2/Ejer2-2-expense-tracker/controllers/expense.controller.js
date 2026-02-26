class ExpenseController {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    this.service.bindExpenseListChanged(this.onExpenseListChanged);
    this.view.bindAddExpense(this.handleAddExpense);
    this.view.bindEditExpense(this.handleEditExpense);
    this.view.bindDeleteExpense(this.handleDeleteExpense);

    this.onExpenseListChanged(this.service.expenses);
  }

  onExpenseListChanged = (expenses) => {
    this.view.displayExpenses(expenses);

    this.view.updateBalance(this.service.getBalance());
    this.view.updateIncome(this.service.getIncome());
    this.view.updateExpense(this.service.getExpense());
  };

  handleAddExpense = (expenseText, expenseAmount) => {
    this.service.addExpense(expenseText, expenseAmount);
  };

  handleEditExpense = (id, expenseText, expenseAmount) => {
    this.service.editExpense(id, expenseText, expenseAmount);
  };

  handleDeleteExpense = (id) => {
    this.service.deleteExpense(id);
  };
}
