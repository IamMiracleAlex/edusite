// Both the get and getAll functions are declared in the sideBar.js

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

employerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleShowSuccessModal();
});

SuccessModalWrapper.addEventListener("click", (e) => {
  if (e.target === SuccessModalWrapper) {
    handleCloseSuccessModal();
  }
});

SuccessModalBtn.addEventListener("click", () => {
  navigate("/");
});
