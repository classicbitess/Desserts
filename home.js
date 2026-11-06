(function () {
  var desserts = window.DESSERTS || [];
  var slides = [];

  desserts.forEach(function (dessert) {
    dessert.images.forEach(function (src) {
      slides.push({ id: dessert.id, name: dessert.name, src: src });
    });
  });

  var cycle = document.getElementById("cycle");
  var dots = document.getElementById("cycle-dots");
  var caption = document.getElementById("cycle-caption");
  var gallery = document.getElementById("gallery");
  var index = 0;
  var timer = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slides.forEach(function (slide, slideIndex) {
    var link = document.createElement("a");
    link.className = "cycle-slide" + (slideIndex === 0 ? " is-active" : "");
    link.href = "#dessert-" + slide.id;
    var img = document.createElement("img");
    img.src = slide.src;
    img.alt = slide.name;
    link.appendChild(img);
    cycle.appendChild(link);

    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show " + slide.name);
    if (slideIndex === 0) dot.className = "is-active";
    dot.addEventListener("click", function () {
      show(slideIndex);
      start();
    });
    dots.appendChild(dot);
  });

  function show(next) {
    var frames = cycle.querySelectorAll(".cycle-slide");
    var buttons = dots.querySelectorAll("button");
    index = (next + slides.length) % slides.length;
    frames.forEach(function (frame, frameIndex) {
      frame.classList.toggle("is-active", frameIndex === index);
    });
    buttons.forEach(function (button, buttonIndex) {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    caption.textContent = slides[index].name;
  }

  function start() {
    stop();
    if (reduceMotion || slides.length < 2) return;
    timer = window.setInterval(function () {
      show(index + 1);
    }, 4500);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  document.getElementById("cycle-prev").addEventListener("click", function () {
    show(index - 1);
    start();
  });
  document.getElementById("cycle-next").addEventListener("click", function () {
    show(index + 1);
    start();
  });

  cycle.addEventListener("mouseenter", stop);
  cycle.addEventListener("mouseleave", start);
  cycle.addEventListener("focusin", stop);
  cycle.addEventListener("focusout", start);

  if (slides.length) show(0);
  start();

  desserts.forEach(function (dessert) {
    var card = document.createElement("article");
    card.className = "treat";
    card.id = "dessert-" + dessert.id;

    var img = document.createElement("img");
    img.src = dessert.images[0];
    img.alt = dessert.name;
    card.appendChild(img);

    var copy = document.createElement("div");
    copy.className = "treat-copy";

    var title = document.createElement("h3");
    title.textContent = dessert.name;
    copy.appendChild(title);

    var blurb = document.createElement("p");
    blurb.textContent = dessert.blurb;
    copy.appendChild(blurb);

    var list = document.createElement("ul");
    list.className = "ingredients";
    dessert.ingredients.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    copy.appendChild(list);

    var order = document.createElement("a");
    order.className = "button";
    order.href = "order.html?item=" + encodeURIComponent(dessert.id);
    order.textContent = "Order";
    copy.appendChild(order);

    card.appendChild(copy);
    gallery.appendChild(card);
  });
})();
