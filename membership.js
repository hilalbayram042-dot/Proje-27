// membership.js
// JavaScript for the membership page can be added here.
// For example, form validation, AJAX submission, etc.

document.addEventListener('DOMContentLoaded', () => {
    const membershipForm = document.getElementById('membershipForm');

    if (membershipForm) {
        membershipForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const password = document.getElementById('password').value;

            // Here you would typically send this data to a server
            console.log('Ad:', firstName);
            console.log('Soyad:', lastName);
            console.log('Şifre:', password);

            alert('Üyelik talebiniz alınmıştır! (Bu sadece bir demo gösterimidir.)');
            window.location.href = 'ticket-info.html'; // Redirect to ticket info page
        });
    }
});