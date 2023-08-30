var dropdowns = document.querySelectorAll('.dropdown-toggle');

dropdowns.forEach(function(dropdownToggle) {
  dropdownToggle.addEventListener('click', function() {
    var dropdownMenu = this.nextElementSibling;
    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
    } else {
      dropdownMenu.classList.add('show');
    }
  });
});

document.addEventListener('click', function(event) {
  var targetElement = event.target;
  dropdowns.forEach(function(dropdownToggle) {
    if (!dropdownToggle.contains(targetElement)) {
      var dropdownMenu = dropdownToggle.nextElementSibling;
      if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      }
    }
  });
});
