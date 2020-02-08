import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

export default function createDoc(data) {
  const { client, products, company } = data;
  var doc = new jsPDF();
  const date = new Date();
  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date
      .getDate()
      .toString()
      .padStart(2, "0");

    return month + "/" + day + "/" + year;
  }

  // *** Headings
  doc.setFontStyle("bold");
  doc.setFontSize(20);
  doc.text(`${company.companyName}`, 10, 20);
  doc.text(`Bill To`, 15, 70);
  doc.text(`Date`, 120, 85);
  doc.text(`Qty`, 15, 170);
  doc.text(`Description`, 45, 170);
  doc.text(`Unit Price`, 120, 170);
  doc.text(`Description`, 45, 170);
  doc.text(`Amount`, 170, 170);
  doc.setFontSize(24);
  doc.text("Invoice Total", 15, 135);
  doc.text("$1,350", 170, 135);

  // *** Layout
  doc.line(15, 120, 200, 120);
  doc.line(15, 150, 200, 150);

  // *** Data
  doc.setFontSize(14);
  doc.setFontStyle("");
  // *** Company Info
  doc.text(`${company.address}`, 15, 30);
  doc.text(`${company.city}, ${company.state}`, 15, 35);
  // *** Client Info
  doc.text(`${client.firstName} ${client.lastName}`, 15, 85);
  doc.text(`${client.address}`, 15, 90);
  doc.text(`${client.city}, ${client.state}`, 15, 95);
  doc.text(getFormattedDate(date), 170, 85);

  return doc.output("bloburl");
}

function createRawHtml(data) {
  const { client, products, company } = data;
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>
  @import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,900,700,500,300,100);
  body{
    max-width: 600px;
    font-family: 'Roboto', sans-serif;
  }
  [id*='invoice-']{
        display: flex;
        margin: 0 auto;
        width: 600px;
        justify-content: space-between;
    align-items: center;
        div{
      display: flex;
      flex-direction: column;
    }
   
  }
   h2{
      margin: 0;
    }
  h3{
    font-size: 0.9em;
  }
    span{
      color: #666;
      font-size: 0.7em;
      line-heigth: 1.2em;
    }
  
  
  [id*='invoice-']{ /* Targets all id with 'col-' */
    border-bottom: 1px solid #EEE;
    padding: 30px;
  }
  
  #invoice-top{min-height: 120px;}
  #invoice-mid{min-height: 120px;}
  #invoice-bot{ min-height: 250px;}
  table{
    width: 100%;
  }
  
  td{
    padding: 5px 0 5px 15px;
    border: 1px solid #EEE
  }
  .tabletitle{
    padding: 5px;
    background: #EEE;
  }
  
  .service{border: 1px solid #EEE;}
  .item{width: 50%;}
  .itemtext{font-size: .9em;}
  </style>
</head>
<body>
  <div class="invoice-container">
    <div id="invoice-top">
    <div>
    <h2>Alexander Santos</h2>
      <span>alexsantosantana@live.com</span>
      <span>+1-770-369-5370</span>
      </div>
    <div>
      <h2>Quote</h2>
      <span>Issued: May 27, 2015</span>
      <span>Payment Due: May 27, 2015</span>
    </div>
      </div>
    <div id="invoice-mid">
      <div class="client-info"><h2>Client Name</h2>
        <span>Client@gmail.com</span>
        <span>555-555-5555</span>
      </div>
    </div>
    <div id="invoice-bottom">
      <table>
  
      <tbody>
        <tr class="tabletitle">
          <td class="item"><h3>Item Description</h3></td>
          <td class="quantity"><h3>Qty.</h3></td>
          <td class="price"><h3>Price</h3></td>
          <td class="sub-total"><h3>Sub-Total</h3></td>
        </tr>
        <tr class="service">
          <td class="tableitem"><p class="itemtext">Communication</p></td>
           
        </tr>
                  <tr class="tabletitle">
            <td></td>
            <td></td>
            <td><h2>Total</h2></td>
            <td class="payment"><h2>0</h2></td>
          </tr>
           </tbody>
        </table>
    </div>
  </div>
</body>
</html>
  `;
}

html2canvas();
