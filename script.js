let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

//Set Budget Part
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    //empty or negative input
    if(tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else{
        errorMessage.classList.add("hide");
        //Set Budget
        amount.innerText = tempAmount ;
        //Set Balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        //clear Input Box
        totalAmount.value = "";
    }
});

//Function To Disable Edit and Delete Button
const disableButton = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

//Function To modify List Elements
const modifyElement = (element, edit = false) =>{
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.Value = parentText;
        userAmount.value = parentAmount;
        disableButton(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

//Function To create list

const listCreator = (expenseName, expenseValue) =>{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () =>{
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};Function 

//function to add expenses

checkAmountButton.addEventListener("click", () => {
    //empty checks
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    //Enable Buttons
    disableButton(false);
    //Expense
    let expenditure = parseInt(userAmount.value);
    //total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    //total balance(budget - total expense)
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    //Create list
    listCreator(productTitle.value, userAmount.value);
    //empty inputs
    productTitle.value = "";
    userAmount.value= "";

})

//Function ti add Exepnses
