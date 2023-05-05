// Both the get and getAll functions are declared in the sideBar.js
function navigate(url) {
  location.assign(url);
}

// dom
const employerModal = get("#employer-modal");
const employerForm = get("#employer-form");
const allEmployerNavLink = getAll(`[data-name="employer-btn"]`);
const allEmployerSidebarLink = getAll(`[data-name="sidebar-employer-btn"]`);

const SuccessModalWrapper = get("#success-modal-wrapper");
const SuccessModal = get("#success-modal");
const SuccessModalBtn = get("button", SuccessModal);

// variables
const showModal = "employer_modal_open";
const closeModal = "employer_modal_close";

// functions
function handleModal(modalEl) {
  const status = modalEl.dataset.status;
  if (status === "close") {
    modalEl.classList.remove(closeModal);
    modalEl.classList.add(showModal);
    modalEl.dataset.status = "open";
  } else {
    modalEl.classList.remove(showModal);
    modalEl.classList.add(closeModal);
    modalEl.dataset.status = "close";
  }
}

function handleModalFromSidebar() {
  handleSideBar(); //func declared in sidebar.js
  handleModal(employerModal);
}

function handleShowSuccessModal() {
  handleModal(SuccessModalWrapper);
  SuccessModal.style.transform = "translateY(0px)";
}

function handleCloseSuccessModal() {
  SuccessModal.style.transform = "translateY(200%)";
  setTimeout(() => {
    handleModal(SuccessModalWrapper);
  }, 500);
}

// events
allEmployerNavLink.forEach((link) => {
  link.addEventListener("click", () => handleModal(employerModal));
});

allEmployerSidebarLink.forEach((link) => {
  link.addEventListener("click", handleModalFromSidebar);
});

employerModal.addEventListener("click", (e) => {
  if (e.target === employerModal) handleModal(employerModal);
});

function sendData(employerForm) {
  const xhr = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const form_data = new FormData(employerForm);

  // Define what happens on successful data submission
  xhr.addEventListener("load", (event) => {
    if (event.target.status == 200) {
      handleShowSuccessModal();
      employerForm.reset();

    } else {
      
      data = JSON.parse(event.target.responseText)
      alert(data.detail)
      // alert('Oops! Something went wrong. Please try again later');
    }

  });

  // Set up our request
  xhr.open("POST", employerForm.action);

  // The data sent is what the user provided in the form
  xhr.send(form_data);
}

employerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(employerForm)
});

SuccessModalWrapper.addEventListener("click", (e) => {
  if (e.target === SuccessModalWrapper) {
    handleCloseSuccessModal();
  }
});

SuccessModalBtn.addEventListener("click", () => {
  navigate("/");
});
