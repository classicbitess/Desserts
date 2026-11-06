// Orders are saved in the Google Sheet for classicbitess@gmail.com.
// Create a Google Form while signed in as that account, with questions in
// this order: Name, Phone, Dessert, Quantity, Requests.
// Link the responses to a spreadsheet, then add a Totals tab with:
// =QUERY(FormResponses1!A:F, "select D, sum(E) where D is not null group by D label D 'Dessert', sum(E) 'Total ordered'", 1)
//
// formAction is the form's response URL:
// https://docs.google.com/forms/d/e/FORM_ID/formResponse
// entries are the entry.123456789 names from the form's page source.
window.ORDER_CONFIG = {
  formAction: "",
  entries: {
    name: "",
    phone: "",
    dessert: "",
    quantity: "",
    requests: ""
  }
};
