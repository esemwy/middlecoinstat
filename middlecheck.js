var username = "1P6zRoZJwc8EjxE513bSwxYp9xAX5Vvjzd";

var columnLabels = {
    "lastHourShares":           "Shares<br/>(Last Hour)",
    "lastHourRejectedShares":	"Rejected Shares<br/>(Last Hour)",
    "megahashesPerSecond":      "MH/s",
    "rejectedMegahashesPerSecond":  "Rejected MH/s",
    "bitcoinBalance":           "Balance",
    "immatureBalance":          "Immature<br/>balance",
    "paidOut":                  "Paid Out",
    "unexchangedBalance":       "Unexchanged<br/>Balance"
}

function doneLoading() {
    $("#userid_label").text("Transactions for " + username);
    setInterval(getJson, 100000);
	getJson();
	}
	
function getJson() {

    $.ajax({
      "url": "http://www.middlecoin.com/reports/" + username + ".json",
      "data": {
          "alt": "json-in-script"
      },
	  "cache": false,
      "success": function(data) {
          console.log(data);
          for (index = 0; index < data.report.length; ++index) {
              var item = data.report[index];
              var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
              d.setUTCSeconds(item.time);
              var month = d.getMonth() + 1
              var day = d.getDate()
              var year = d.getFullYear()
              thedate = year+'/'+month+'/'+day;
              h = '<tr id=' + item.txid + '><td>'+item.txid+'</td><td>'+thedate+'</td><td>'+item.amount+'</td></tr>';
			  if (document.getElementById(item.txid) == null)
			      $("#transactions").append(h);
          }
          h = '<tr id="total"><td><b>Total</b></td><td>&nbsp;</td><td><b>'+data.total+'</b></td></tr>';
          if (document.getElementById('total') == null)
			      $("#transactions").append(h);
      },
      "error": function(d,msg) {
          alert("Could not find data");
      }
    });

    $.ajax({
      "url": "http://www.middlecoin.com/json",
      "cache": true,
      "success": function(json) {
            var data = jQuery.parseJSON( json );
            for (i = 0; i < data.report.length; ++i) {
                item = data.report[i];
                if (item[0] == username) {
                    console.log(item);
                    h = '<tr id="keys">';
                    j = '<tr id="values">';
                    for (var key in columnLabels) {
                        h = h + '<th>'+columnLabels[key]+'</th>';
                        j = j +'<td>'+item[1][key]+'</td>';

                    }
                    h = h + '</tr>';
                    j = j + '</tr>';
                    if (document.getElementById("keys") == null)
                        $("#earnings").append(h);
                    if (document.getElementById("values") == null)
                        $("#earnings").append(j);
                    break;
                }
            }
//           h = '';
//           h = h + '<table>';
//           for (index = 0; index < data.report.length; ++index) {
//               h = h + '<tr><td>'+item.txid+'</td><td>'+thedate+'</td><td>'+item.amount+'</td></tr>';
//           }
//           h = h + '<tr><td>&nbsp;</td><td>&nbsp;</td><td>'+data.total+'</td></tr>';
//           h = h + '</table>';
//           $("#content").html(h);
      },
      "error": function(d,msg) {
          alert("Could not find data");
      }
    });
}
