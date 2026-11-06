(function () {
  var desserts = window.DESSERTS || [];
  var config = window.ORDER_CONFIG || { formAction: "", entries: {} };
  var form = document.getElementById("order-form");
  var select = document.getElementById("dessert");
  var status = document.getElementById("order-status");
  var thanks = document.getElementById("thanks");
  var frame = document.getElementById("order-frame");
  var waiting = false;
  var params = new URLSearchParams(window.location.search);
  var requested = params.get("item");

  desserts.forEach(function (dessert) {
    var option = document.createElement("option");
    option.value = dessert.name;
    option.textContent = dessert.name;
    option.dataset.id = dessert.id;
    if (dessert.id === requested) option.selected = true;
    select.appendChild(option);
  });

  function ready() {
    var entries = config.entries || {};
    return Boolean(
      config.formAction &&
      entries.name &&
      entries.phone &&
      entries.dessert &&
      entries.quantity &&
      entries.requests
    );
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.className = "order-status";

    if (!form.reportValidity()) return;

    if (!ready()) {
      status.className = "order-status is-error";
      status.textContent = "This order was not sent. The order sheet is not connected yet, so nothing was saved.";
      return;
    }

    var payload = document.createElement("form");
    payload.method = "POST";
    payload.action = config.formAction;
    payload.target = "order-frame";
    payload.acceptCharset = "UTF-8";

    var values = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      dessert: form.dessert.value,
      quantity: form.quantity.value,
      requests: form.requests.value.trim()
    };

    Object.keys(values).forEach(function (key) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = config.entries[key];
      input.value = values[key];
      payload.appendChild(input);
    });

    document.body.appendChild(payload);
    waiting = true;
    payload.submit();
    payload.remove();
    status.textContent = "Sending your order…";
  });

  frame.addEventListener("load", function () {
    if (!waiting) return;
    waiting = false;
    form.hidden = true;
    thanks.classList.add("is-visible");
    status.textContent = "";
  });
})();
