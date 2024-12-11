document.addEventListener("DOMContentLoaded", function () {
    // Donation progress data
    const raisedAmount = 3500;
    const goalAmount = 10000;
    const progressPercent = (raisedAmount / goalAmount) * 100;
  
    // Update the progress bar dynamically
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = `${progressPercent}%`;
  
    // Donation form submission
    const donationForm = document.getElementById('donationForm');
    donationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const amount = document.getElementById('amount').value;
      if (amount && !isNaN(amount)) {
        alert(`Thank you for donating $${amount}!`);
        // Add donation logic (e.g., send to payment processor) here
      } else {
        alert("Please enter a valid donation amount.");
      }
    });
  });
// Set up PayPal Button in JavaScript
paypal.Buttons({
    createOrder: function(data, actions) {
      var donationAmount = document.getElementById('amount').value || 10; // Default amount if nothing entered
  
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: donationAmount // The donation amount
          },
          description: "Donation to Feed Dogs"
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Thank you for your donation, ' + details.payer.name.given_name);
        // Optionally, you can redirect to a confirmation page here
      });
    },
    onError: function(err) {
      console.log(err);
      alert("An error occurred. Please try again.");
    }
  }).render('#paypal-button-container'); // Render the PayPal button inside the specified container
    