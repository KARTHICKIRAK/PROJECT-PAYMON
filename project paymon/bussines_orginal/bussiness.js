// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const profileBtn = document.getElementById('profileBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const paymentModal = document.getElementById('paymentModal');
const scannerModal = document.getElementById('scannerModal');
const settingsModal = document.getElementById('settingsModal');
const changePasswordModal = document.getElementById('changePasswordModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const addGoalModal = document.getElementById('addGoalModal');
const overlay = document.getElementById('overlay');
const notification = document.getElementById('notification');
const dashboardSection = document.getElementById('dashboardSection');
const transactionsSection = document.getElementById('transactionsSection');
const noResults = document.getElementById('no-results');
const transactionsList = document.getElementById('transactionsList');
const transactionsLoading = document.getElementById('transactionsLoading');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

// Sample transaction data
const transactions = [
  {
    id: 1,
    date: 'Jun 15, 2023 · 10:30 AM',
    description: 'Grocery Store Purchase',
    category: 'Shopping',
    amount: -1250.75,
    type: 'debit'
  },
  {
    id: 2,
    date: 'Jun 14, 2023 · 3:45 PM',
    description: 'Salary Credit',
    category: 'Salary',
    amount: 45000.00,
    type: 'credit'
  },
  {
    id: 3,
    date: 'Jun 12, 2023 · 9:15 AM',
    description: 'Electricity Bill Payment',
    category: 'Bills',
    amount: -1850.50,
    type: 'debit'
  },
  {
    id: 4,
    date: 'Jun 10, 2023 · 2:30 PM',
    description: 'Online Shopping',
    category: 'Shopping',
    amount: -899.99,
    type: 'debit'
  },
  {
    id: 5,
    date: 'Jun 8, 2023 · 11:20 AM',
    description: 'Freelance Payment',
    category: 'Income',
    amount: 7500.00,
    type: 'credit'
  },
  {
    id: 6,
    date: 'Jun 5, 2023 · 7:45 PM',
    description: 'Dinner with Friends',
    category: 'Food',
    amount: -1200.00,
    type: 'debit'
  },
  {
    id: 7,
    date: 'Jun 3, 2023 · 4:10 PM',
    description: 'Mobile Recharge',
    category: 'Recharge',
    amount: -399.00,
    type: 'debit'
  },
  {
    id: 8,
    date: 'Jun 1, 2023 · 9:00 AM',
    description: 'Investment Dividend',
    category: 'Income',
    amount: 1500.00,
    type: 'credit'
  }
];

// Current page for pagination
let currentPage = 1;
const transactionsPerPage = 5;

// Initialize the app
function init() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
  }

  // Load transactions
  loadTransactions();
}

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Toggle profile dropdown
profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  dropdownMenu.classList.remove('show');
});

// Toggle dark/light theme
themeToggleBtn.addEventListener('click', toggleTheme);
darkModeToggle.addEventListener('change', toggleTheme);

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    darkModeToggle.checked = false;
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkModeToggle.checked = true;
  }
}

// Show payment modal
function showPaymentModal(type) {
  const modalTitle = document.getElementById('paymentModalTitleText');
  const recipientGroup = document.getElementById('recipientGroup');
  const recipientLabel = document.getElementById('recipientLabel');
  const accountGroup = document.getElementById('accountGroup');
  const ifscGroup = document.getElementById('ifscGroup');
  
  switch (type) {
    case 'contacts':
      modalTitle.textContent = 'Pay Contact';
      recipientLabel.textContent = 'Contact';
      accountGroup.style.display = 'none';
      ifscGroup.style.display = 'none';
      break;
    case 'phone':
      modalTitle.textContent = 'Pay to Phone';
      recipientLabel.textContent = 'Phone Number';
      accountGroup.style.display = 'none';
      ifscGroup.style.display = 'none';
      break;
    case 'bank':
      modalTitle.textContent = 'Bank Transfer';
      recipientLabel.textContent = 'Account Holder Name';
      accountGroup.style.display = 'block';
      ifscGroup.style.display = 'block';
      break;
    case 'upi':
      modalTitle.textContent = 'UPI Payment';
      recipientLabel.textContent = 'UPI ID';
      accountGroup.style.display = 'none';
      ifscGroup.style.display = 'none';
      break;
    case 'wallet':
      modalTitle.textContent = 'Add Money to Wallet';
      recipientGroup.style.display = 'none';
      accountGroup.style.display = 'none';
      ifscGroup.style.display = 'none';
      break;
    case 'self':
      modalTitle.textContent = 'Self Transfer';
      recipientGroup.style.display = 'none';
      accountGroup.style.display = 'block';
      ifscGroup.style.display = 'block';
      break;
    default:
      modalTitle.textContent = 'Make Payment';
      recipientLabel.textContent = 'Recipient';
      accountGroup.style.display = 'none';
      ifscGroup.style.display = 'none';
  }
  
  openModal(paymentModal);
}

// Process payment form
function processPayment() {
  const paymentBtn = document.getElementById('paymentBtn');
  const paymentSpinner = document.getElementById('paymentSpinner');
  const paymentBtnText = document.getElementById('paymentBtnText');
  const paymentError = document.getElementById('paymentError');
  
  // Show loading state
  paymentBtn.disabled = true;
  paymentBtnText.style.display = 'none';
  paymentSpinner.style.display = 'block';
  paymentError.style.display = 'none';
  
  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    paymentBtn.disabled = false;
    paymentSpinner.style.display = 'none';
    paymentBtnText.style.display = 'block';
    
    // Show success notification
    showNotification('Payment successful!', 'success');
    
    // Close modal
    closeModal(paymentModal);
    
    // Reset form
    document.getElementById('paymentForm').reset();
    
    // Reload transactions
    loadTransactions();
  }, 2000);
}

// Show scanner modal
function showScanner() {
  openModal(scannerModal);
}

// Close scanner modal
function closeScanner() {
  closeModal(scannerModal);
}

// Simulate QR code scanning
function scanQRCode() {
  const scannerBtn = document.querySelector('.scanner-btn');
  const scannerBtnText = scannerBtn.querySelector('span');
  const scannerBtnIcon = scannerBtn.querySelector('i');
  
  // Change button to show scanning state
  scannerBtn.disabled = true;
  scannerBtnText.textContent = 'Scanning...';
  scannerBtnIcon.className = 'fas fa-circle-notch fa-spin';
  
  // Simulate scanning
  setTimeout(() => {
    // Reset button
    scannerBtn.disabled = false;
    scannerBtnText.textContent = 'Scan Code';
    scannerBtnIcon.className = 'fas fa-qrcode';
    
    // Show payment modal with scanned data
    showPaymentModal('upi');
    document.getElementById('recipient').value = 'john.doe@upi';
    document.getElementById('amount').value = '100';
    
    // Close scanner
    closeScanner();
  }, 3000);
}

// Check balance
function checkBalance() {
  showNotification('Your current balance is ₹178.25', 'info');
}

// Show settings modal
function showSettings() {
  openModal(settingsModal);
}

// Save settings
function saveSettings() {
  const saveBtn = document.querySelector('#settingsModal .btn-primary');
  const saveBtnText = saveBtn.textContent;
  
  // Show loading state
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<div class="loading"></div> Saving...';
  
  // Simulate API call
  setTimeout(() => {
    // Reset button
    saveBtn.disabled = false;
    saveBtn.textContent = saveBtnText;
    
    // Show success notification
    showNotification('Settings saved successfully!', 'success');
    
    // Update username display if changed
    const newName = document.getElementById('fullName').value;
    document.getElementById('usernameDisplay').textContent = newName.split(' ')[0];
    document.getElementById('settingsUsername').textContent = newName;
  }, 1500);
}

// Show change password modal
function showChangePassword() {
  closeModal(settingsModal);
  openModal(changePasswordModal);
}

// Update password
function updatePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorElement = document.getElementById('changePasswordError');
  const successElement = document.getElementById('changePasswordSuccess');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const changePasswordBtnText = document.getElementById('changePasswordBtnText');
  const changePasswordSpinner = document.getElementById('changePasswordSpinner');
  
  // Reset messages
  errorElement.style.display = 'none';
  successElement.style.display = 'none';
  
  // Validate passwords
  if (newPassword !== confirmPassword) {
    errorElement.textContent = 'New passwords do not match';
    errorElement.style.display = 'block';
    return;
  }
  
  if (newPassword.length < 6) {
    errorElement.textContent = 'Password must be at least 6 characters';
    errorElement.style.display = 'block';
    return;
  }
  
  // Show loading state
  changePasswordBtn.disabled = true;
  changePasswordBtnText.style.display = 'none';
  changePasswordSpinner.style.display = 'block';
  
  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    changePasswordBtn.disabled = false;
    changePasswordSpinner.style.display = 'none';
    changePasswordBtnText.style.display = 'block';
    
    // Show success message
    successElement.textContent = 'Password updated successfully!';
    successElement.style.display = 'block';
    
    // Reset form
    document.getElementById('changePasswordForm').reset();
    
    // Close modal after delay
    setTimeout(() => {
      closeModal(changePasswordModal);
    }, 2000);
  }, 2000);
}

// Show forgot password modal
function showForgotPassword() {
  openModal(forgotPasswordModal);
}

// Reset password
function resetPassword() {
  const email = document.getElementById('email').value;
  const resetPasswordBtn = document.getElementById('resetPasswordBtn');
  const resetPasswordBtnText = document.getElementById('resetPasswordBtnText');
  const resetPasswordSpinner = document.getElementById('resetPasswordSpinner');
  const errorElement = document.getElementById('resetPasswordError');
  const successElement = document.getElementById('resetPasswordSuccess');
  
  // Validate email
  if (!email.includes('@') || !email.includes('.')) {
    errorElement.textContent = 'Please enter a valid email address';
    errorElement.style.display = 'block';
    return;
  }
  
  // Show loading state
  resetPasswordBtn.disabled = true;
  resetPasswordBtnText.style.display = 'none';
  resetPasswordSpinner.style.display = 'block';
  errorElement.style.display = 'none';
  
  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    resetPasswordBtn.disabled = false;
    resetPasswordSpinner.style.display = 'none';
    resetPasswordBtnText.style.display = 'block';
    
    // Show success message
    successElement.textContent = 'Password reset link sent to your email!';
    successElement.style.display = 'block';
    
    // Reset form
    document.getElementById('forgotPasswordForm').reset();
    
    // Close modal after delay
    setTimeout(() => {
      closeModal(forgotPasswordModal);
    }, 3000);
  }, 2000);
}

// Show add goal modal
function showAddGoalModal() {
  openModal(addGoalModal);
}

// Add savings goal
function addGoal() {
  const goalName = document.getElementById('goalName').value;
  const targetAmount = document.getElementById('targetAmount').value;
  const addGoalBtn = document.getElementById('addGoalBtn');
  const addGoalBtnText = document.getElementById('addGoalBtnText');
  const addGoalSpinner = document.getElementById('addGoalSpinner');
  const errorElement = document.getElementById('addGoalError');
  
  // Validate inputs
  if (!goalName || !targetAmount) {
    errorElement.textContent = 'Please fill all required fields';
    errorElement.style.display = 'block';
    return;
  }
  
  // Show loading state
  addGoalBtn.disabled = true;
  addGoalBtnText.style.display = 'none';
  addGoalSpinner.style.display = 'block';
  errorElement.style.display = 'none';
  
  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    addGoalBtn.disabled = false;
    addGoalSpinner.style.display = 'none';
    addGoalBtnText.style.display = 'block';
    
    // Show success notification
    showNotification('Savings goal created successfully!', 'success');
    
    // Close modal
    closeModal(addGoalModal);
    
    // Reset form
    document.getElementById('addGoalForm').reset();
  }, 2000);
}

// Show two-factor auth settings
function showTwoFactorAuth() {
  showNotification('Two-factor authentication settings will be available soon', 'info');
}

// Show dashboard section
function showDashboard() {
  dashboardSection.style.display = 'block';
  transactionsSection.style.display = 'none';
  noResults.style.display = 'none';
}

// Show transactions section
function showTransactions() {
  dashboardSection.style.display = 'none';
  transactionsSection.style.display = 'block';
  noResults.style.display = 'none';
  loadTransactions();
}

// Filter transactions
function filterTransactions(type) {
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Reload transactions with filter
  loadTransactions(type);
}

// Load transactions
function loadTransactions(filter = 'all') {
  transactionsLoading.style.display = 'flex';
  transactionsList.innerHTML = '';
  
  // Simulate API delay
  setTimeout(() => {
    transactionsLoading.style.display = 'none';
    
    let filteredTransactions = [...transactions];
    
    // Apply filter
    switch (filter) {
      case 'credit':
        filteredTransactions = transactions.filter(t => t.type === 'credit');
        break;
      case 'debit':
        filteredTransactions = transactions.filter(t => t.type === 'debit');
        break;
      case 'recent':
        filteredTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'large':
        filteredTransactions = transactions.filter(t => Math.abs(t.amount) >= 1000);
        break;
    }
    
    // Pagination
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + transactionsPerPage);
    
    // Display transactions
    if (paginatedTransactions.length === 0) {
      noResults.style.display = 'block';
    } else {
      paginatedTransactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.className = 'transaction-item';
        
        transactionItem.innerHTML = `
          <div class="transaction-details">
            <div class="transaction-date">${transaction.date}</div>
            <div class="transaction-description">${transaction.description}</div>
            <div class="transaction-category">${transaction.category}</div>
          </div>
          <div class="transaction-amount ${transaction.type}">
            ${transaction.amount > 0 ? '+' : ''}₹${Math.abs(transaction.amount).toFixed(2)}
          </div>
        `;
        
        transactionsList.appendChild(transactionItem);
      });
    }
    
    // Update pagination buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = startIndex + transactionsPerPage >= filteredTransactions.length;
  }, 1000);
}

// Pagination handlers
prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadTransactions();
  }
});

nextPageBtn.addEventListener('click', () => {
  currentPage++;
  loadTransactions();
});

// Logout function
function logout() {
  showNotification('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = 'login.html'; // Redirect to login page
  }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
  notification.textContent = message;
  notification.className = 'notification';
  
  switch (type) {
    case 'success':
      notification.style.backgroundColor = 'var(--success-color)';
      break;
    case 'error':
      notification.style.backgroundColor = 'var(--danger-color)';
      break;
    case 'warning':
      notification.style.backgroundColor = 'var(--warning-color)';
      notification.style.color = 'var(--dark-color)';
      break;
    default:
      notification.style.backgroundColor = 'var(--primary-color)';
  }
  
  notification.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Open modal
function openModal(modal) {
  overlay.style.display = 'block';
  modal.style.display = 'block';
  setTimeout(() => {
    overlay.classList.add('show');
    modal.classList.add('show');
  }, 10);
}

// Close modal
function closeModal(modal) {
  overlay.classList.remove('show');
  modal.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
  }, 300);
}

// Close modals when clicking overlay
overlay.addEventListener('click', () => {
  closeModal(paymentModal);
  closeModal(scannerModal);
  closeModal(settingsModal);
  closeModal(changePasswordModal);
  closeModal(forgotPasswordModal);
  closeModal(addGoalModal);
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(paymentModal);
    closeModal(scannerModal);
    closeModal(settingsModal);
    closeModal(changePasswordModal);
    closeModal(forgotPasswordModal);
    closeModal(addGoalModal);
  }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);