// * GLOBAL VARIABLES
const itemCards = document.querySelector("section.item-cards");
const cardInfo = document.querySelectorAll("div.card-info");
const subTotalObj = document.getElementById("subtotal");
const taxObj = document.getElementById("tax");
const shippingObj = document.getElementById("shipping");
const totalObj = document.getElementById("total");

// * Event Listeners on cards' infos of all item cards
cardInfo.forEach((info) =>
  info.addEventListener("click", (e) => {
    // * Local Variables for calculation
    const itemPricesColl = document.querySelectorAll(".card-item-total-price");
    const totalCountOfItems = document.querySelectorAll("span.quantity");
    const itemPrice = +e.target
      .closest("section.item-card")
      .querySelector("p span.card-item-price")
      .textContent.slice(1);

    let itemsCount = +e.target
      .closest("section.item-card")
      .querySelector(".card-buttons span.quantity").textContent;

    const itemsCountObj = e.target
      .closest("section.item-card")
      .querySelector(".card-buttons span.quantity");

    let itemsPriceTotal = +e.target
      .closest("section.item-card")
      .querySelector(".card-price > p > span.card-item-total-price")
      .textContent.slice(1);

    const itemsPriceTotalObj = e.target
      .closest("section.item-card")
      .querySelector(".card-price > p > span.card-item-total-price");

    let subTotal = 0;
    let tax = +taxObj.textContent.slice(1);
    let total = +totalObj.textContent.slice(1);
    let shippingItems = 0;
    let isChanged = false;

    // function to calculate basket total
    const basketTotalCalc = () => {
      tax = Number((subTotal * 0.18).toFixed(2));
      shipping = 15 * Math.ceil(shippingItems / 5);
      total = subTotal + tax + shipping;
      subTotalObj.textContent = "$" + subTotal.toFixed(2);
      taxObj.textContent = "$" + tax.toFixed(2);
      shippingObj.textContent = "$" + shipping.toFixed(2);
      totalObj.textContent = "$" + total.toFixed(2);
    };

    // function to calculate count of items in basket
    const basketItemsCounter = () => {
      totalCountOfItems.forEach((quantity) => {
        shippingItems += +quantity.textContent;
      });
      return shippingItems;
    };

    // removing item card if clicked one is remove button
    if (e.target.parentNode.classList.contains("remove-button")) {
      const clickedItemCard = e.target.closest("section.item-card");
      // decreasing its cost from total fee if it is already modified
      if (itemsPriceTotal != 0) {
        shippingItems = basketItemsCounter();
        subTotal = +subTotalObj.textContent.slice(1);
        subTotal -= itemsPriceTotal;
        shippingItems -= itemsCount;
        basketTotalCalc();
      }
      itemCards.removeChild(clickedItemCard);
    }

    // checking if minus button clicked or not(count of items can not be less than 0)
    if (
      itemsCount > 0 &&
      (e.target.classList.contains("fa-minus") ||
        e.target.firstElementChild?.classList.contains("fa-minus"))
    ) {
      --itemsCount;
      itemsCountObj.textContent = itemsCount;
      // preventing updating basket total cost if clicked one is not quantitiy modifier buttons
      isChanged = true;
    }

    // checking if plus button clicked or not
    if (
      e.target.classList.contains("fa-plus") ||
      e.target.firstElementChild?.classList.contains("fa-plus")
    ) {
      // stock limitation
      if (itemsCount < 25) {
        ++itemsCount;
        itemsCountObj.textContent = itemsCount;
        // preventing updating basket total cost if clicked one is not quantitiy modifier buttons
        isChanged = true;
      } else {
        alert("You can buy a maximum of 25 of the same item at once.");
      }
    }

    // checking if clicked one is a quantitiy modifier button, if it is, updating basket total cost
    if (isChanged) {
      // updating product total
      itemsPriceTotal = Number((itemPrice * itemsCount).toFixed(2));
      itemsPriceTotalObj.textContent = "$" + itemsPriceTotal;

      // updating basket sub-total
      itemPricesColl.forEach((price) => {
        subTotal += +price.textContent.slice(1);
      });

      // calculating shipping cost according to total quantity of items
      basketItemsCounter();

      // calculating basket total cost
      basketTotalCalc();
    }
  })
);
