//Fetch Navbar

fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });
  
//Fetch Footer

fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("chmrFooter").innerHTML = data;
  });