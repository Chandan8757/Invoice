// components/InvoicePreview.jsx
import React from 'react';
import jsPDF from 'jspdf';

const InvoicePreview = ({ invoice }) => {
  const calculateTotal = () => {
    return invoice.lineItems.reduce((total, item) => {
      const itemTotal = item.quantity * item.price;
      const itemTax = (itemTotal * item.tax) / 100;
      return total + itemTotal + itemTax;
    }, 0);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 10, 20);
    doc.setFontSize(12);

    // Bill From
    doc.text("Bill From:", 10, 30);
    doc.text(invoice.billFrom.split('\n').join(', '), 10, 40);

    // Bill To
    doc.text("Bill To:", 10, 60);
    doc.text(`${invoice.customerName}\n${invoice.customerAddress}\n${invoice.customerEmail}`, 10, 70);

    // Invoice Details
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 10, 100);
    doc.text(`Date: ${invoice.date}`, 10, 110);
    doc.text(`Due Date: ${invoice.dueDate}`, 10, 120);

    // Line Items Table
    doc.text("Line Items:", 10, 140);
    let yPos = 150;
    invoice.lineItems.forEach((item, index) => {
      doc.text(`${item.name} - ${item.quantity} x ${item.price} ${invoice.currency} (Tax: ${item.tax}%)`, 10, yPos);
      yPos += 10;
    });

    // Total
    doc.text(`Total Amount: ${calculateTotal().toFixed(2)} ${invoice.currency}`, 10, yPos + 10);

    // Note
    doc.text(`Note: ${invoice.note}`, 10, yPos + 20);

    doc.save("invoice.pdf");
  };

  return (
    <div className="invoice-preview">
      <h2>Invoice</h2>
      <div className="invoice-header">
        <div className="bill-from">
          <h3>Bill From</h3>
          <pre>{invoice.billFrom}</pre>
        </div>
        <div className="bill-to">
          <h3>Bill To</h3>
          <p>{invoice.customerName}</p>
          <p>{invoice.customerAddress}</p>
          <p>{invoice.customerEmail}</p>
        </div>
      </div>
      <div className="invoice-details">
        <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Date:</strong> {invoice.date}</p>
        <p><strong>Due Date:</strong> {invoice.dueDate}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price} {invoice.currency}</td>
              <td>{item.tax}%</td>
              <td>{(item.quantity * item.price * (1 + item.tax / 100)).toFixed(2)} {invoice.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-summary">
        <p><strong>Total Amount:</strong> {calculateTotal().toFixed(2)} {invoice.currency}</p>
      </div>
      <div className="invoice-note">
        <p><strong>Note:</strong> {invoice.note}</p>
      </div>
      <button onClick={handleGeneratePDF}>Download PDF</button>
    </div>
  );
};

export default InvoicePreview;