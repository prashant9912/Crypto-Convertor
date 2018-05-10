var cur;
var ourData;
var ourRequest = new XMLHttpRequest();
var dpdCrypto = document.getElementById('Crypto'); //dropdown
var dpdFiat = document.getElementById('Fiat'); //dropdown
var apiUrl = 'https://api.coinmarketcap.com/v1/ticker/?convert=';
var apiUrlLimit = '&limit=100';
// retrives data from the API. The dropdowns determines which data.
function changeCurrency() {
    var fiat = dpdFiat.options[dpdFiat.selectedIndex].value;
    var crypto = dpdCrypto.options[dpdCrypto.selectedIndex].value;
    if (fiat && crypto != null) {
        ourRequest.open('GET', apiUrl + fiat + apiUrlLimit);
        ourRequest.onload = function () {
            ourData = JSON.parse(ourRequest.responseText);
            for (var i = 0; i < ourData.length; i++) {
                if (ourData[i].name.toLowerCase() === crypto.toLowerCase()) {
                    cur = ourData[i]["price_" + fiat.toLowerCase()];
                    CryptoConvert(document.getElementById('bi'));
                } else {
                    // Reached the server, but it returned an error
                }
            }
        }
    } else {
        ourRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/bitcoin/');
        ourRequest.onload = function () {
            ourData = JSON.parse(ourRequest.responseText);
            cur = ourData[0]["price_dkk"];
            CryptoConvert(document.getElementById('bi'));
        }
    }
    ourRequest.send();
}
changeCurrency(); //runs on start to retrieve data for the currencies 
//multiplies the input with the chosen currency from the dropdown
function CryptoConvert(input) {
    var price = cur;
    var output = input.value * price;
    var co = document.getElementById('ci');
    ci.value = output.toFixed(2);
}
//divides the input with the chosen currency from the dropdown
function FiatConvert(input) {
    var price = cur;
    var output = input.value / price;
    var co = document.getElementById('bi');
    bi.value = output;
}

// populate crypto and fiat dropdown with API data.
var dropdown = document.getElementById('Crypto');
var dropdown2 = document.getElementById('Fiat');
dropdown.length = 0;
var defaultOption = document.createElement('option');
defaultOption.text = 'Bitcoin';
dropdown.selectedIndex = 0;
var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=100';
var request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function () {
    var data = JSON.parse(request.responseText);
    var option;
    for (var i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].name + " ("+data[i].symbol +")";
        option.value=data[i].name;
        dropdown.add(option);
        option2 = document.createElement('option');
        option2.text = data[i].name + " ("+data[i].symbol +")";
        option2.value= data[i].symbol;
        dropdown2.add(option2);
    }
}
request.send();

$(document).ready(function(){
 
    // Initialize select2
    $("#Fiat").select2();
    $("#Crypto").select2();
    // Read selected option
    $('#but_read').click(function(){
      var username = $('#selUser option:selected').text();
      var userid = $('#selUser').val();
  
      $('#result').html("id : " + userid + ", name : " + username);
  
    });
  });