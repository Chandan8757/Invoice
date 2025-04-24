// App.js
import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import './App.css';

const App = () => {
  const [invoice, setInvoice] = useState({
    customerName: '',
    customerAddress: '',
    customerEmail: '',
    invoiceNumber: '',
    date: '',
    dueDate: '',
    billFrom: 'Your Company Name\n123 Business St\nCity, State, ZIP\nEmail: info@yourcompany.com\nPhone: (123) 456-7890',
    note: 'Thank you for your business!',
    currency: 'USD',
    lineItems: [],
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleAddLineItem = (lineItem) => {
    setInvoice({ ...invoice, lineItems: [...invoice.lineItems, lineItem] });
  };

  return (
    <div className="invoice-container">
      <h1>Automatic Invoice Generator</h1>
      <div className="invoice-form">
        <InvoiceForm
          onAddLineItem={handleAddLineItem}
          onFormChange={handleFormChange}
          invoice={invoice}
        />
      </div>
      <div className="invoice-preview">
        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
};

export default App;