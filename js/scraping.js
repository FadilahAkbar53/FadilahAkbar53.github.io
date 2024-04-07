// script.js

// Fungsi untuk melakukan HTTP request
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

// Panggil fungsi fetchJSONFile untuk membaca data dari file JSON
fetchJSONFile("./scraping/hasilScraping.json", function (data) {
  // Lakukan sesuatu dengan data yang didapat
  var newsTableBody = document.getElementById("news-table-body");
  data.forEach(function (item) {
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      item["no"] +
      "</td>" +
      "<td>" +
      item["judul berita"] +
      "</td>" +
      "<td>" +
      item["kategori"] +
      "</td>" +
      "<td>" +
      item["waktu publish"] +
      "</td>" +
      "<td>" +
      item["waktu scraping"] +
      "</td>";
    newsTableBody.appendChild(row);
  });
});

document.getElementById("rowsPerPage").addEventListener("change", function () {
  var selectedValue = this.value;
  var rowsPerPage =
    selectedValue === "all"
      ? document.querySelectorAll("#news-table tbody tr").length
      : parseInt(selectedValue);
  showRowsPerPage(rowsPerPage);
});

function showRowsPerPage(rowsPerPage) {
  var rows = document.querySelectorAll("#news-table tbody tr");
  rows.forEach(function (row, index) {
    if (index < rowsPerPage || rowsPerPage === "all") {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}
