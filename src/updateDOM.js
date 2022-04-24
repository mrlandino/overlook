// let username = document.querySelector(".username-input");
// let password = document.querySelector(".password-input");
let landingPage = document.querySelector(".landing-page");
let customerPage = document.querySelector(".customer-page");
let bookARoomPage = document.querySelector(".book-a-room-page");

const domUpdateMethods = {

  loginErrorMessage() {
      //NEED innerHTML message to send to customer
      console.log("please input a username and password")
  },

  loadCustomerDashboard() {
    domUpdateMethods.showElement([customerPage]);
    domUpdateMethods.hideElement([landingPage]);
  },

  showElement(elements) {
  elements.forEach(element => element.classList.remove("hidden"));
  },

  hideElement(elements) {
    elements.forEach(element => element.classList.add("hidden"));
  },
}

export default domUpdateMethods;
