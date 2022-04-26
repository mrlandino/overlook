import './css/styles.css';
import { getAllData, getSpecificData, postBooking } from './apiCalls';
import AllCustomers from './AllCustomers';
import AllRooms from './AllRooms';
import BookingsRepo from './BookingsRepo';
import Booking from './Booking';
import Customer from './Customer';
import domUpdateMethods from './updateDOM';

let allCustomers, allBookings, allRooms, currentCustomer


//QUERY SELECTORS:
const signInButton = document.querySelector(".sign-in-button");
const username = document.querySelector(".username-input");
const password = document.querySelector(".password-input");
const logOutButton = document.querySelector(".logout");
const logOutButton2 = document.querySelector(".logout-2");
const bookARoomButton = document.querySelector(".book-a-room");
const searchButton = document.querySelector(".search-button");
const searchDateInput = document.querySelector(".select-date-input");
const searchTypeInput = document.querySelector(".dropdown-filter-input");
const myBookingsButton = document.querySelector(".my-bookings");
const selectDateInput = document.querySelector(".select-date-input");
const searchByTypeInput = document.querySelector(".dropdown-filter-input");
const allBookingsDisplayContainer = document.querySelector(".all-bookings-display-container");


//EVENT LISTENERS:
window.onload = (event) => loadWindow();

signInButton.addEventListener('click', function() {
  event.preventDefault();
  if(username.value && password.value){
    loginValidation(username.value, password.value)
  } else {
    domUpdateMethods.loginErrorMessage();
  }
  username.value = '';
  password.value = '';
});

logOutButton.addEventListener('click', function() {
  location.reload();
});

logOutButton2.addEventListener('click', function() {
  location.reload();
});

myBookingsButton.addEventListener('click', function() {
  loadCustomerData(currentCustomer.id);
});

bookARoomButton.addEventListener('click', function() {
  event.preventDefault();
  domUpdateMethods.loadBookingsPage(currentCustomer);
})

searchButton.addEventListener('click', function() {
  event.preventDefault();
  console.log("YOU HIT THE SEARCH BUTTON");
  console.log(searchByTypeInput.value, selectDateInput.value);
  displayBookings();
})

allBookingsDisplayContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains("book-room")) {
    domUpdateMethods.changeBookRoomButton(e.target.id);
    postBooking(makePostBookingObj(e))
    .then((data) => {
      getSpecificData('bookings')
      .then((data) => {
        allCustomers = data.customers;
      })
    })
  }
})

//RENDER ALL DATA:
const loadCustomerData = (id) => {
  getAllData(id)
  .then((data) => {
      allCustomers = new AllCustomers(data[0]);
      allRooms = new AllRooms(data[1]);
      allBookings = new BookingsRepo(data[2], allRooms);
      currentCustomer = new Customer(data[3], allBookings);
      domUpdateMethods.loadCustomerDashboard();
      domUpdateMethods.displayUserName(currentCustomer);
      domUpdateMethods.displayUserTotals(currentCustomer);
      domUpdateMethods.dislayCustomerBookingCards(currentCustomer);
  });
}

const loadWindow = () => {
  getSpecificData('customers')
  .then((data) => {
    allCustomers = data.customers
  });
}

const getCustomerId = () => {
  let userID = username.value.replace('customer', '');
  return Number(userID);
}

const loginValidation = (username, password) => {
  let masterPassword = "overlook2021";
  let validation = allCustomers.reduce((acc, customer) => {
    if(`customer${customer.id}` === username && password === masterPassword) {
      acc.push(customer);
    };
    return acc;
  }, []);

  if(validation.length === 1) {
    loadCustomerData(getCustomerId());
    console.log("load new page");
  } else if (validation.length === 0){
    domUpdateMethods.loginErrorMessage();
  }
}

const displayBookings = () => {
  if(searchByTypeInput.value !== 'all'){
    console.log("SEARCH BY TYPE")
    allBookings.availableRoomsByType(searchByTypeInput.value, selectDateInput.value)
  } else if (searchByTypeInput.value === 'all' && selectDateInput.value !== '') {
    console.log("SEARCH BY DATE")
    allBookings.availableRoomsByDate(selectDateInput.value)
  } else if (searchByTypeInput.value === 'all' && selectDateInput.value === '') {
    domUpdateMethods.searchErrorMessage();
  }
}

const makePostBookingObj = (e) => {
  let updatedDate = selectDateInput.value;
  console.log("DATE AT INPUT", updatedDate)
  let thisDate = updatedDate.replace('-', '/');
  let thisDate1 = thisDate.replace('-', '/');
  console.log("ROOM NUMBER FOR POST", e.target.id);
  console.log("UPDATED DATE", thisDate1);
return {
  "userID": currentCustomer.id,
  "date": thisDate1,
  "roomNumber": Number(e.target.id)
  }
}
