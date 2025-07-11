// DOM Elements
const loginPage = document.getElementById('loginPage');
const header = document.querySelector('.header');
const mainContainer = document.querySelector('.main-container');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const profileBtn = document.getElementById('profileBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const scannerModal = document.getElementById('scannerModal');
const paymentModal = document.getElementById('paymentModal');
const settingsModal = document.getElementById('settingsModal');
const changePasswordModal = document.getElementById('changePasswordModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const addGoalModal = document.getElementById('addGoalModal');
const notification = document.getElementById('notification');
const dashboardSection = document.getElementById('dashboardSection');
const transactionsSection = document.getElementById('transactionsSection');
const noResults = document.getElementById('no-results');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Profile Dropdown Toggle
profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  dropdownMenu.classList.remove('show');
});

// Theme Toggle
themeToggleBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Scanner Functions
function showScanner() {
  scannerModal.style.display = 'flex';
  setTimeout(() => {
    scannerModal.style.opacity = '1';
    document.querySelector('.scanner-box').style.transform = 'translateY(0)';
  }, 10);
}

function closeScanner() {
  scannerModal.style.opacity = '0';
  document.querySelector('.scanner-box').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    scannerModal.style.display = 'none';
  }, 300);
}

function scanQRCode() {
  showNotification('Scanning QR code...', 'info');
  // Simulate scanning
  setTimeout(() => {
    showNotification('QR code scanned successfully!', 'success');
    closeScanner();
  }, 2000);
}

// Modal Functions
function showPaymentModal(type) {
  const title = document.getElementById('paymentModalTitleText');
  const recipientLabel = document.getElementById('recipientLabel');
  
  switch(type) {
    case 'contacts':
      title.textContent = 'Pay Contact';
      recipientLabel.textContent = 'Contact';
      break;
    case 'phone':
      title.textContent = 'Pay to Phone';
      recipientLabel.textContent = 'Phone Number';
      break;
    case 'bank':
      title.textContent = 'Bank Transfer';
      recipientLabel.textContent = 'Account Holder Name';
      document.getElementById('accountGroup').style.display = 'block';
      document.getElementById('ifscGroup').style.display = 'block';
      break;
    case 'upi':
      title.textContent = 'UPI Payment';
      recipientLabel.textContent = 'UPI ID';
      break;
    case 'wallet':
      title.textContent = 'Add Money to Wallet';
      recipientLabel.textContent = 'Amount';
      break;
    default:
      title.textContent = 'Make Payment';
  }
  
  paymentModal.style.display = 'block';
  setTimeout(() => {
    paymentModal.style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
  }, 10);
}

function closePaymentModal() {
  paymentModal.style.opacity = '0';
  document.querySelector('.modal-content').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    paymentModal.style.display = 'none';
    document.getElementById('accountGroup').style.display = 'none';
    document.getElementById('ifscGroup').style.display = 'none';
  }, 300);
}

function showSettingsModal() {
  settingsModal.style.display = 'block';
  setTimeout(() => {
    settingsModal.style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
  }, 10);
}

function closeSettingsModal() {
  settingsModal.style.opacity = '0';
  document.querySelector('.modal-content').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    settingsModal.style.display = 'none';
  }, 300);
}

function showChangePasswordModal() {
  changePasswordModal.style.display = 'block';
  setTimeout(() => {
    changePasswordModal.style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
  }, 10);
  closeSettingsModal();
}

function closeChangePasswordModal() {
  changePasswordModal.style.opacity = '0';
  document.querySelector('.modal-content').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    changePasswordModal.style.display = 'none';
  }, 300);
}

function showForgotPasswordModal() {
  forgotPasswordModal.style.display = 'block';
  setTimeout(() => {
    forgotPasswordModal.style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
  }, 10);
}

function closeForgotPasswordModal() {
  forgotPasswordModal.style.opacity = '0';
  document.querySelector('.modal-content').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    forgotPasswordModal.style.display = 'none';
  }, 300);
}

function showAddGoalModal() {
  addGoalModal.style.display = 'block';
  setTimeout(() => {
    addGoalModal.style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
  }, 10);
}

function closeAddGoalModal() {
  addGoalModal.style.opacity = '0';
  document.querySelector('.modal-content').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    addGoalModal.style.display = 'none';
  }, 300);
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === paymentModal) closePaymentModal();
  if (e.target === settingsModal) closeSettingsModal();
  if (e.target === changePasswordModal) closeChangePasswordModal();
  if (e.target === forgotPasswordModal) closeForgotPasswordModal();
  if (e.target === addGoalModal) closeAddGoalModal();
  if (e.target === scannerModal) closeScanner();
});

// Notification System
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = 'notification ' + type;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Navigation Functions
function showDashboard() {
  dashboardSection.style.display = 'block';
  transactionsSection.style.display = 'none';
  noResults.style.display = 'none';
  // Close mobile menu if open
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
}

function showTransactions() {
  dashboardSection.style.display = 'none';
  transactionsSection.style.display = 'block';
  noResults.style.display = 'none';
  loadTransactions();
  // Close mobile menu if open
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
}

function showSettings() {
  showSettingsModal();
  // Close mobile menu if open
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
}

// Transaction Functions
function loadTransactions() {
  const transactionsList = document.getElementById('transactionsList');
  const loading = document.getElementById('transactionsLoading');
  
  transactionsList.innerHTML = '';
  loading.style.display = 'flex';
  
  // Simulate API call
  setTimeout(() => {
    loading.style.display = 'none';
    
    const transactions = [
      {
        date: 'Jun 15, 2023 · 10:30 AM',
        description: 'Grocery Store Purchase',
        category: 'Shopping',
        amount: -1250.75,
        type: 'debit'
      },
      {
        date: 'Jun 14, 2023 · 3:45 PM',
        description: 'Salary Credit',
        category: 'Salary',
        amount: 45000.00,
        type: 'credit'
      },
      {
        date: 'Jun 12, 2023 · 9:15 AM',
        description: 'Electricity Bill Payment',
        category: 'Bills',
        amount: -1850.50,
        type: 'debit'
      },
      {
        date: 'Jun 10, 2023 · 2:15 PM',
        description: 'Amazon Purchase',
        category: 'Shopping',
        amount: -3250.25,
        type: 'debit'
      },
      {
        date: 'Jun 5, 2023 · 11:30 AM',
        description: 'Freelance Payment',
        category: 'Income',
        amount: 15000.00,
        type: 'credit'
      }
    ];
    
    transactions.forEach(transaction => {
      const li = document.createElement('li');
      li.className = 'transaction-item';
      
      li.innerHTML = `
        <div class="transaction-details">
          <div class="transaction-date">${transaction.date}</div>
          <div class="transaction-description">${transaction.description}</div>
          <div class="transaction-category">${transaction.category}</div>
        </div>
        <div class="transaction-amount ${transaction.type}">
          ${transaction.amount > 0 ? '+' : ''}₹${Math.abs(transaction.amount).toFixed(2)}
        </div>
      `;
      
      transactionsList.appendChild(li);
    });
  }, 1000);
}

function filterTransactions(filter) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // In a real app, this would filter the transaction list
  showNotification(`Filtering by: ${filter}`, 'info');
}

// Form Handlers
document.getElementById('gpayLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Simulate login
  document.getElementById('gpayLoginBtn').disabled = true;
  showNotification('Logging in...', 'info');
  
  setTimeout(() => {
    loginPage.style.display = 'none';
    header.style.display = 'flex';
    mainContainer.style.display = 'block';
    showDashboard();
    showNotification('Login successful!', 'success');
    document.getElementById('usernameDisplay').textContent = email.split('@')[0];
  }, 1500);
});

document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const recipient = document.getElementById('recipient').value;
  
  document.getElementById('paymentBtn').disabled = true;
  document.getElementById('paymentSpinner').style.display = 'inline-block';
  document.getElementById('paymentBtnText').textContent = 'Processing...';
  
  // Simulate payment processing
  setTimeout(() => {
    closePaymentModal();
    showNotification(`Payment of ₹${amount} to ${recipient} successful!`, 'success');
    document.getElementById('paymentBtn').disabled = false;
    document.getElementById('paymentSpinner').style.display = 'none';
    document.getElementById('paymentBtnText').textContent = 'Send Payment';
    document.getElementById('paymentForm').reset();
  }, 2000);
});

document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (newPassword !== confirmPassword) {
    showNotification('Passwords do not match!', 'error');
    return;
  }
  
  document.getElementById('changePasswordBtn').disabled = true;
  document.getElementById('changePasswordSpinner').style.display = 'inline-block';
  document.getElementById('changePasswordBtnText').textContent = 'Updating...';
  
  // Simulate password change
  setTimeout(() => {
    closeChangePasswordModal();
    showNotification('Password updated successfully!', 'success');
    document.getElementById('changePasswordBtn').disabled = false;
    document.getElementById('changePasswordSpinner').style.display = 'none';
    document.getElementById('changePasswordBtnText').textContent = 'Update Password';
    document.getElementById('changePasswordForm').reset();
  }, 1500);
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  
  document.getElementById('resetPasswordBtn').disabled = true;
  document.getElementById('resetPasswordSpinner').style.display = 'inline-block';
  document.getElementById('resetPasswordBtnText').textContent = 'Sending...';
  
  // Simulate password reset
  setTimeout(() => {
    document.getElementById('resetPasswordSuccess').textContent = `Reset link sent to ${email}`;
    document.getElementById('resetPasswordSuccess').style.display = 'block';
    document.getElementById('resetPasswordBtn').disabled = false;
    document.getElementById('resetPasswordSpinner').style.display = 'none';
    document.getElementById('resetPasswordBtnText').textContent = 'Send Reset Link';
  }, 1500);
});

// Other Functions
function logout() {
  header.style.display = 'none';
  mainContainer.style.display = 'none';
  loginPage.style.display = 'flex';
  showNotification('Logged out successfully', 'info');
}

function checkBalance() {
  showNotification('Your current balance is ₹178.25', 'info');
}

function signInWithGoogle() {
  showNotification('Redirecting to Google sign-in...', 'info');
  // In a real app, this would redirect to Google auth
}

function tryBiometricLogin() {
  showNotification('Attempting biometric authentication...', 'info');
  // In a real app, this would use the Web Authentication API
}

// Initialize
showDashboard();