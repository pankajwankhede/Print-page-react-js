import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const printRef = useRef(null);

  // Simulate loading data from an API
  useEffect(() => {
    setTimeout(() => {
      setInvoiceData({
        customerName: "Jane Smith",
        invoiceNumber: "INV-2025-001",
        items: [
          { description: "Product A", price: 49.99 },
          { description: "Product B", price: 89.5 },
          { description: "Product A", price: 49.99 },
          { description: "Product B", price: 89.5 },
          { description: "Product A", price: 49.99 },
          { description: "Product B", price: 89.5 },
        ],
        total: 139.49,
      });
    }, 1000);
  }, []);

  const handlePrint = () => {
    const content = printRef.current;

    if (!content) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { font-family: sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              }
            </style>
          </head>
          <body>
            ${content.innerHTML}
            <script>
              window.onload = function () {
                window.print();
                window.onafterprint = function () { window.close(); };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  if (!invoiceData) {
    return <p>Loading invoice data...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Invoice Page</h1>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>

      <div
        ref={printRef}
        style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}
      >
        <h2>Invoice #{invoiceData.invoiceNumber}</h2>
        <p>
          <strong>Customer:</strong> {invoiceData.customerName}
        </p>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>${invoiceData.total.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>

      <button onClick={handlePrint} style={{ marginTop: "20px" }}>
        🖨️ Print Invoice
      </button>
    </div>
  );
};

export default App;
