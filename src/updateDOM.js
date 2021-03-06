let landingPage = document.querySelector(".landing-page");
let customerPage = document.querySelector(".customer-page");
let bookARoomPage = document.querySelector(".book-a-room-page");
let userName = document.querySelector(".user-name");
let userName2 = document.querySelector(".user-name-2");
let totalSpent = document.querySelector(".total-spent");
let totalBookings = document.querySelector(".total-bookings");
let customerBookingsContainer = document.querySelector(".customer-bookings-display-container");
let allBookingsDisplayContainer = document.querySelector(".all-bookings-display-container");
let passwordContainer = document.querySelector(".password-usename-error-container");


const domUpdateMethods = {

  loginErrorMessage() {
    passwordContainer.innerHTML = '<p class="username-password-error">Please input a username and password</p>';
  },

  searchErrorMessage() {
    allBookingsDisplayContainer.innerHTML = '<p class="date-entry-error">Please select a date to search bookings available</p>';
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
    if(openings.length === 0) {
      allBookingsDisplayContainer.innerHTML = '<p class= "none-available">Apololiges for the inconvience. <br> All rooms are booked for this day. <br> Please choose another date or room type. </p>';
    } else {
      allBookingsDisplayContainer.innerHTML = '';
      openings.forEach(room => {
        allBookings += `<div class="booking-card ${room.roomNumber}" id=R${room.roomNumber}>
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
                                <button class="book-room" id=${room.roomNumber}>Book Room</button>
                              </div>
                            </div>
                          </div>
                        </div>`
      });
      allBookingsDisplayContainer.innerHTML = allBookings;
    };
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
        };

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
      });
    customerBookingsContainer.innerHTML = allBookings;
  },

  bidetStatus(bidet) {
    if(bidet) {
      return "Yes";
    } else if (!bidet) {
      return "No";
    };
  },

  changeBookRoomButton(id) {
    let bookingCard = document.getElementById(`R${id}`);
    domUpdateMethods.hideElement([bookingCard]);
  },

  changeCalendarMin() {
    let today = new Date()
    let dd = today.getDate()
    let mm = `0${today.getMonth() +1}`
    let yyyy = today.getFullYear()
    let calendarDate = `${yyyy}-${mm}-${dd}`
    let bookingDateSelection = document.querySelector(".select-date-input");
    bookingDateSelection.setAttribute("min", calendarDate);
  }
}

export default domUpdateMethods;
