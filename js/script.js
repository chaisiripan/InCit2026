// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    const menu = document.getElementById('mainMenu');
    menu.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Dropdown Menu for Mobile
document.querySelectorAll('.dropdown > a').forEach(function(dropdownLink) {
    dropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// Sub-dropdown Menu for Mobile
document.querySelectorAll('.dropdown-sub > a').forEach(function(subDropdownLink) {
    subDropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const subDropdown = this.parentElement;
            subDropdown.classList.toggle('active');
            
            // Close other sub-dropdowns
            document.querySelectorAll('.dropdown-sub').forEach(function(otherSubDropdown) {
                if (otherSubDropdown !== subDropdown) {
                    otherSubDropdown.classList.remove('active');
                }
            });
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        const menu = document.getElementById('mainMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown, .dropdown-sub').forEach(function(dropdown) {
                dropdown.classList.remove('active');
            });
        }
    }
});

// ==========================================================================
// Download Button Functionality
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all download buttons
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    // Add click event listener to each download button
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if