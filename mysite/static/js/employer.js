// Both the get and getAll functions are declared in the sideBar.js
function navigate(url) {
  location.assign(url);
}

// dom
const employerModal = get("#employer-modal");
const employerForm = get("#employer-form");
const allEmployerNavLink = getAll(`[data-name="employer-btn"]`);
const allEmployerSidebarLink = getAll(`[data-name="sidebar-employer-btn"]`);

const applicantModal = get("#applicant-modal");
const applicantForm = get("#applicant-form");
const allApplicantNavLink = getAll(`[data-name="applicant-btn"]`);
const allApplicantSidebarLink = getAll(`[data-name="sidebar-applicant-btn"]`);


const EmployerSuccessModalWrapper = get("#employer-success-modal-wrapper");
const EmployerSuccessModal = get("#employer-success-modal");
const EmployerSuccessModalBtn = get("button", EmployerSuccessModal);

const ApplicantSuccessModalWrapper = get("#applicant-success-modal-wrapper");
const ApplicantSuccessModal = get("#applicant-success-modal");
const ApplicantSuccessModalBtn = get("button", ApplicantSuccessModal);

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

function handleModalFromSidebar(modal) {
  handleSideBar(); //func declared in sidebar.js
  handleModal(modal);
}

function handleShowSuccessModal(SuccessModalWrapper, SuccessModal) {
  handleModal(SuccessModalWrapper);
  SuccessModal.style.transform = "translateY(0px)";
}

function handleCloseSuccessModal(SuccessModalWrapper, SuccessModal) {
  SuccessModal.style.transform = "translateY(200%)";
  setTimeout(() => {
    handleModal(SuccessModalWrapper);
  }, 500);
}

// events - employer form
allEmployerNavLink.forEach((link) => {
  link.addEventListener("click", () => handleModal(employerModal));
});

allEmployerSidebarLink.forEach((link) => {
  link.addEventListener("click", () => handleModalFromSidebar(employerModal));
});

employerModal.addEventListener("click", (e) => {
  if (e.target === employerModal) handleModal(employerModal);
});

// events - applicant form

allApplicantNavLink.forEach((link) => {
  link.addEventListener("click", () => handleModal(applicantModal));
});

allApplicantSidebarLink.forEach((link) => {
  link.addEventListener("click", () => handleModalFromSidebar(applicantModal));
});

applicantModal.addEventListener("click", (e) => {
  if (e.target === applicantModal) handleModal(applicantModal);
});

function sendData(form, SuccessModalWrapper, SuccessModal) {
  const xhr = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const form_data = new FormData(form);

  // Define what happens on successful data submission
  xhr.addEventListener("load", (event) => {
    if (event.target.status == 200) {
      handleShowSuccessModal(SuccessModalWrapper, SuccessModal);
      form.reset();

    } else {
      
      data = JSON.parse(event.target.responseText)
      alert(data.detail)
      // alert('Oops! Something went wrong. Please try again later');
    }

  });

  // Set up our request
  xhr.open("POST", form.action);

  // The data sent is what the user provided in the form
  xhr.send(form_data);
}

// Submit event for employer & applicant form 
employerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(employerForm, EmployerSuccessModalWrapper, EmployerSuccessModal)
});

applicantForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(applicantForm, ApplicantSuccessModalWrapper, ApplicantSuccessModal)
});

EmployerSuccessModalWrapper.addEventListener("click", (e) => {
  if (e.target === EmployerSuccessModalWrapper) {
    handleCloseSuccessModal(EmployerSuccessModalWrapper, EmployerSuccessModal);
  }
});

ApplicantSuccessModalWrapper.addEventListener("click", (e) => {
  if (e.target === ApplicantSuccessModalWrapper) {
    handleCloseSuccessModal(ApplicantSuccessModalWrapper, ApplicantSuccessModal);
  }
});

EmployerSuccessModalBtn.addEventListener("click", () => {
  navigate("/");
});

ApplicantSuccessModalBtn.addEventListener("click", () => {
  navigate("/");
});
