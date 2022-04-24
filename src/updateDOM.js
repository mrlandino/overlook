// let username = document.querySelector(".username-input");
// let password = document.querySelector(".password-input");
let landingPage = document.querySelector(".landing-page");
let customerPage = document.querySelector(".customer-page");
let bookARoomPage = document.querySelector(".book-a-room-page");
let userName = document.querySelector(".user-name");
let totalSpent = document.querySelector(".total-spent");
let totalBookings = document.querySelector(".total-bookings");
let customerBookingsContainer = document.querySelector(".customer-bookings-display-container");


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

  displayUserName(currentCustomer) {
    userName.innerText = currentCustomer.name;
  },

  displayUserTotals(currentCustomer) {
    currentCustomer.updateMyBookings();

    console.log("AFTER UPDATE", currentCustomer);
    let moneySpent = currentCustomer.totalSpent;
    let allBookings = currentCustomer.numBookings;

    totalSpent.innerText = `Total Spent: $${moneySpent}`;
    totalBookings.innerText = `Total Bookings: ${allBookings}`;

  },

  dislayCustomerBookingCards(currentCustomer) {
    let allBookings = '';
    let status;

    currentCustomer.myBookings.forEach(booking => {
        if(booking.bookingStatus === "upcoming") {
        status = `class="status upcoming">Status: upcoming`;
        } else if(booking.bookingStatus === "completed") {
        status = `class="status completed">Status: completed`;
        }

      allBookings += `<div class="booking-card" id=1>
                        <div class="date-room">
                          <div class="date">
                            <p>Date: ${booking.displayDate}</p>
                          </div>
                          <div class="room">
                            <p>Room #: ${booking.roomNumber}</p>
                          </div>
                        </div>
                        <div class="booking-details-container">
                          <div class="booking-details">
                            <p>Room Type: ${booking.roomType}</p>
                            <p>Bidet: ${booking.bidet}</p>
                            <p>Bed Size: ${booking.bedSize}</p>
                            <p>Number of Beds: ${booking.numBeds}</p>
                          </div>
                          <div class="cost-and-status">
                            <div class="status-container">
                              <p ${status}</p>
                            </div>
                            <div class="cost-container">
                              <p>$${booking.roomCost}</p>
                            </div>
                          </div>
                        </div>
                      </div>`;
      })
    customerBookingsContainer.innerHTML = allBookings;
  },
  
}

export default domUpdateMethods;
