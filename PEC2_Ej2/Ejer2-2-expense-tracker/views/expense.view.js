class ExpenseView {
  constructor() {
    this.app = this.getElement("#root");

    this.title = this.createElement("h2");
    this.title.textContent = "Expense Tracker";

    this.container = this.createElement("div", "container");
    this.containerTitle = this.createElement("h4");
    this.containerTitle.textContent = "Your Balance";
    this.containerBalance = this.createElement("h1", "balance");
    this.containerBalance.textContent = "$0.00";

    ((this.containerIncExp = this.createElement("div")), "inc-exp-container");

    this.divInc = this.createElement("div");
    this.divIncTitle = this.createElement("h4");
    this.divIncTitle.textContent = "Income";
    this.divIncP = this.createElement("p", "money plus", "money-plus");
    this.divIncP.textContent = "+$0.00";
    this.divInc.appendChild(this.divIncTitle);
    this.divInc.appendChild(this.divIncP);

    this.divExp = this.createElement("div");
    this.divExpTitle = this.createElement("h4");
    this.divExpTitle.textContent = "Expense";
    this.divExpP = this.createElement("p", "money minus", "money-minus");
    this.divExpP.textContent = "-$0.00";
    this.divExp.appendChild(this.divExpTitle);
    this.divExp.appendChild(this.divExpP);

    this.containerIncExp.append(this.divInc);
    this.containerIncExp.append(this.divExp);

    this.containerTitle1 = this.createElement("h3");
    this.containerTitle1.textContent = "History";
    this.ul = this.createElement("ul", "list", "list");

    this.containerTitle2 = this.createElement("h3");
    this.containerTitle2.textContent = "Add new transaction";
    this.form = this.createElement("form");
    this.form.id = "form";
    this.formControl1 = this.createElement("div", "form-control");
    this.label1 = this.createElement("label");
    this.label1.textContent = "Text";
    this.label1.setAttribute("for", "text");
    this.input1 = this.createElement("input");
    this.input1.type = "text";
    this.input1.id = "text";
    this.input1.placeholder = "Enter text...";

    this.formControl1.appendChild(this.label1);
    this.formControl1.appendChild(this.input1);

    this.formControl2 = this.createElement("div", "form-control");
    this.label2 = this.createElement("label");
    this.label2.innerHTML =
      "Amount <br /> (negative - expense, positive - income)";
    this.label2.setAttribute("for", "amount");
    this.input2 = this.createElement("input");
    this.input2.type = "number";
    this.input2.id = "amount";
    this.input2.placeholder = "Enter amount...";

    this.formControl2.appendChild(this.label2);
    this.formControl2.appendChild(this.input2);

    this.button = this.createElement("button");
    this.button.textContent = "Add transaction";
    this.button.classList.add("btn");

    this.form.appendChild(this.formControl1);
    this.form.appendChild(this.formControl2);
    this.form.appendChild(this.button);

    this.container.appendChild(this.containerTitle);
    this.container.appendChild(this.containerBalance);
    this.container.appendChild(this.divIncTitle);
    this.container.appendChild(this.containerTitle1);
    this.container.appendChild(this.ul);
    this.container.appendChild(this.containerTitle2);
    this.container.appendChild(this.form);

    this.app.appendChild(this.title);
    this.app.appendChild(this.container);

    this._temporaryExpenseText = "";
    this._temporaryExpenseAmount = 0;
  }

  get _expenseText() {
    return this.input1.value;
  }

  get _expenseAmount() {
    return this.input2.value;
  }

  _resetInput() {
    this.input1.value = "";
    this.input2.value = 0;
  }

  createElement(tag, className, id) {
    const element = document.createElement(tag);

    if (className) {
      className
        .split(" ")
        .forEach((classItem) => element.classList.add(classItem));
    }

    if (id) element.id = id;

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  displayExpenses(expenses) {
    this.ul.innerHTML = "";

    if (expenses.length !== 0) {
      expenses.forEach((expense) => {
        const li = this.createElement("li");
        li.id = expense.id;

        const sign = expense.amount < 0 ? "-" : "+";
        li.classList.add(expense.amount < 0 ? "minus" : "plus");

        const spanText = this.createElement("span");
        spanText.contentEditable = true;
        spanText.classList.add("editable");
        spanText.textContent = expense.text;

        const spanAmount = this.createElement("span");
        spanAmount.contentEditable = true;
        spanAmount.classList.add("editable");
        spanAmount.textContent = `${sign}${Math.abs(expense.amount)}`;

        const deleteButton = this.createElement("button", "delete-btn");
        deleteButton.textContent = "x";

        li.append(spanText, spanAmount, deleteButton);
        this.ul.append(li);
      });
    }
  }

  updateBalance(balance) {
    this.containerBalance.textContent = `$${balance}`;
  }

  updateIncome(income) {
    this.divIncP.textContent = `$${income}`;
  }

  updateExpense(expense) {
    this.divExpP.textContent = `$${expense}`;
  }

  bindAddExpense(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._expenseText && this._expenseAmount) {
        handler(this._expenseText, this._expenseAmount);
        this._resetInput();
      }
    });
  }

  bindDeleteExpense(handler) {
    this.ul.addEventListener("click", (e) => {
      if (e.target.className === "delete-btn") {
        const id = e.target.parentElement.id;
        handler(id);
      }
    });
  }

  bindEditExpense(handler) {
    this.ul.addEventListener("focusout", (e) => {
      const target = e.target.parentElement;
      this._temporaryText = target.querySelector(
        "span:nth-of-type(1)",
      ).textContent;
      this._temporaryAmount = target.querySelector(
        "span:nth-of-type(2)",
      ).textContent;

      if (this._temporaryExpenseText && this._temporaryExpenseAmount) {
        const id = target.id;
        handler(id, this._temporaryExpenseText, this._temporaryExpenseAmount);
        this._resetInput();
      }
    });
  }
}
