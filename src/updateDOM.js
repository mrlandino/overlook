// let username = document.querySelector(".username-input");
// let password = document.querySelector(".password-input");
let landingPage = document.querySelector(".landing-page");
let customerPage = document.querySelector(".customer-page");
let bookARoomPage = document.querySelector(".book-a-room-page");
let userName = document.querySelector(".user-name");
let userName2 = document.querySelector(".user-name-2");
let totalSpent = document.querySelector(".total-spent");
let totalBookings = document.querySelector(".total-bookings");
let customerBookingsContainer = document.querySelector(".customer-bookings-display-container");
let allBookingsDisplayContainer = document.querySelector(".all-bookings-display-container");


const domUpdateMethods = {

  loginErrorMessage() {
      //NEED innerHTML message to send to customer
      console.log("please input a username and password")
  },

  searchErrorMessage() {
    //NEED innerHTML to send customer loginErrorMessage
    allBookingsDisplayContainer.innerHTML = '';
    console.log("please slect a date")
  },

  loadCustomerDashboard() {
    domUpdateMethods.showElement([customerPage]);
    domUpdateMethods.hideElement([landingPage, bookARoomPage]);
  },

  loadBookingsPage(customer) {
    domUpdateMethods.showElement([bookARoomPage]);
    domUpdateMethods.hideElement([customerPage]);
    domUpdateMethods.displayUserName(customer);
  },

  loadCurrentOpenings(openings) {
    let allBookings = '';
    allBookingsDisplayContainer.innerHTML = '';
    openings.forEach(room => {
    allBookings += `<div class="booking-card" id=1>
                      <div class="room-cost">
                        <div class="room">
                          <p>Room Info</p>
                        </div>
                        <div class="cost">
                          <p>Cost per Night</p>
                        </div>
                      </div>
                      <div class="booking-details-container">
                        <div class="booking-details">
                          <p>Room Number: ${room.roomNumber}</p>
                          <p>Room Type: ${room.roomType}</p>
                          <p>Bidet: ${domUpdateMethods.bidetStatus(room.bidet)}</p>
                          <p>Bed Size: ${room.bedSize}</p>
                          <p>Number of Beds: ${room.numBeds}</p>
                        </div>
                        <div class="cost-per-night-container">
                          <div class="cost-container">
                            <p>$${room.roomCost.toFixed(2)}</p>
                          </div>
                          <div class="book-room-container">
                            <button class="book-room">Book Room</button>
                          </div>
                        </div>
                      </div>
                    </div>`
    });

    allBookingsDisplayContainer.innerHTML = allBookings;
  },

  showElement(elements) {
  elements.forEach(element => element.classList.remove("hidden"));
  },

  hideElement(elements) {
    elements.forEach(element => element.classList.add("hidden"));
  },

  displayUserName(customer) {
    userName.innerText = customer.name;
    userName2.innerText = customer.name;
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
        status = `class="status upcoming">Status: Upcoming`;
        } else if(booking.bookingStatus === "completed") {
        status = `class="status completed">Status: Completed`;
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
                            <p>Bidet: ${domUpdateMethods.bidetStatus(booking.bidet)}</p>
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

  bidetStatus(bidet) {
    if(bidet) {
      return "Yes";
    } else if (!bidet) {
      return "No";
    };
  },


}

export default domUpdateMethods;
