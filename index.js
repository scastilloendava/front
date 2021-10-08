document.addEventListener("DOMContentLoaded", function() {
    var processout = new ProcessOut.ProcessOut("test-proj_gAO1Uu0ysZJvDuUpOGPkUBeE3pGalk3x");
    var formElement = document.getElementById("card-form");
    processout.setupForm(formElement, {
      requireCVC: true,
      style: {
        fontSize: "14px",
        "::placeholder": {
          color: "#ECEFF1",
        },
      }
    }, function(form) {
      form.getNumberField().on("focus", function(e) {
        document.getElementById("errors").innerHTML = "";
      });
      form.getExpiryField().on("focus", function(e) {
        document.getElementById("errors").innerHTML = "";
      });
  
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("paymentBtn").disabled = true;
  
        // Let's tokenize the card
        processout.tokenize(form, {
          name: document.getElementById("cardholdername").value,
          contact: {
            zip:  document.getElementById("cardholderzip").value
          },
  
          // Also, if you want to offer the customer a preferred scheme
          // to pay on (for example, if the customer's card supports 
          // co-schemes such as carte bancaire)
          preferred_scheme: "carte bancaire"
        }, function(token) {
          document.getElementById("success").innerHTML = "Success! Your created card token is "+token;
          document.getElementById("paymentBtn").disabled = false;
        }, function(err) {
          document.getElementById("errors").innerHTML = err.message;
          document.getElementById("paymentBtn").disabled = false;
        });
  
        return false;
      });
    }, function(err) {
      console.log(err);
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    var client = new ProcessOut.ProcessOut(
      "proj_gAO1Uu0ysZJvDuUpOGPkUBeE3pGalk3x");
    var formElement = document.getElementById("payment-form");
    client.setupForm(formElement, {
      requireCVC: true
    }, processoutReadyHandler, function(err) {
      console.log("Woops, couldn't setup the form: "+err);
    });
  });


  function processoutReadyHandler(form) {
    // The form is now fully loaded!
    formElement.addEventListener("submit", function(e) {
      // Cancel any default action
      e.preventDefault();
      // Blocking the form while performing the tokenization may also
      // prevent from race conditions from happening, such as when
      // the user double-clicks on the button
      document.getElementById("paymentBtn").disabled = true;
  
      // Let's tokenize the card
      client.tokenize(form, {
        // It's possible to send cardholder information (optional)
        name: document.getElementById("cardholdername").value,
        contact: {
          zip: document.getElementById("cardholderzip").value,
          // Available contact fields:
          // address1, address2, city, state, country_code, zip
        },
  
        // Also, if you want to offer the customer a preferred scheme
        // to pay on (for example, if the customer's card supports 
        // co-schemes such as carte bancaire)
        preferred_scheme: "carte bancaire"
      }, function(token) {
        var field   = document.createElement("input");
        field.type  = "hidden";
        field.name  = "token";
        field.value = token;
  
        // Enable back the button
        document.getElementById("paymentBtn").disabled = false;
  
        // We add the token input so that it's sent back to  the server.
        // The only thing left to do is to submit the form
        formElement.appendChild(field);
        formElement.submit();
      }, function(err) {
  
        // Card validation errors or network issues are returned
        // as well. Find the full list of errors below
        alert(err.message);
  
        // Enable back the button
        document.getElementById("paymentBtn").disabled = false;
      });
  
      return false;
    });
  }


  client.tokenize(form, {}, function(token) {}, function(err) {
    switch (err.code) {
    case "card.declined":
      break; // The card was declined, a new one should be submitted
    case "card.expired":
      break; // The card is expired, a new one should be submitted
    case "card.invalid":
      break; // The card is invalid
    case "card.invalid-number":
      break; // The card number is invalid
    case "card.invalid-date", "card.invalid-month", "card.invalid-year":
      break; // The card expiration date is invalid
    case "card.invalid-cvc":
      break; // The card CVC is invalid
    default:
      // Another less common error was thrown
    }
  
    // It is also possible to display a friendly message to the user:
    alert(err.message);
  });

  var style = {
    fontSize: "14px",
    "::placeholder": {
      color: "#ECEFF1"
    }
  };
  
  client.setupForm(formElement, {
    style: style
  }, processoutReadyHandler, function(err) {
    //
  });

  client.setupForm(formElement, {}, function(form) {
    form.getNumberField().on("click", function(e) {
      console.log(e);
    });
    form.getExpiryField().on("click", function(e) {
      console.log(e);
    });
    form.getCVCField().on("click", function(e) {
      console.log(e);
    });
  }, function(err) {
    //
  });