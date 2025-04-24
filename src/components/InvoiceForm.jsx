// components/InvoiceForm.jsx
import React, { useState } from 'react';

const InvoiceForm = ({ onAddLineItem, onFormChange, invoice }) => {
  const [lineItem, setLineItem] = useState({ name: '', quantity: 1, price: 0, tax: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLineItem({ ...lineItem, [name]: value });
  };

  const handleAddLineItem = () => {
    onAddLineItem(lineItem);
    setLineItem({ name: '', quantity: 1, price: 0, tax: 0 });
  };

  return (
    <div>
      <h2>Invoice Details</h2>
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={invoice.customerName}
        onChange={onFormChange}
      />
      <input
        type="text"
        name="customerAddress"
        placeholder="Customer Address"
        value={invoice.customerAddress}
        onChange={onFormChange}
      />
      <input
        type="email"
        name="customerEmail"
        placeholder="Customer Email"
        value={invoice.customerEmail}
        onChange={onFormChange}
      />
      <input
        type="text"
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={invoice.invoiceNumber}
        onChange={onFormChange}
      />
      <input
        type="date"
        name="date"
        value={invoice.date}
        onChange={onFormChange}
      />
      <input
        type="date"
        name="dueDate"
        placeholder="Due Date"
        value={invoice.dueDate}
        onChange={onFormChange}
      />
      <textarea
        name="billFrom"
        placeholder="Bill From (Seller's Details)"
        value={invoice.billFrom}
        onChange={onFormChange}
      />
      <textarea
        name="note"
        placeholder="Note"
        value={invoice.note}
        onChange={onFormChange}
      />
      <select
        name="currency"
        value={invoice.currency}
        onChange={onFormChange}
      >
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="INR">INR (₹)</option>
      </select>

      <h3>Add Line Item</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={lineItem.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={lineItem.quantity}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={lineItem.price}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="tax"
        placeholder="Tax (%)"
        value={lineItem.tax}
        onChange={handleInputChange}
      />
      <button onClick={handleAddLineItem}>Add Item</button>
    </div>
  );
};

export default InvoiceForm;