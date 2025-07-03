import React, { useRef } from "react";

const PrintablePage = () => {
  const printRef = useRef < HTMLDivElement > null;

  const handlePrint = () => {
    const content = printRef.current;
    console.log("content:" + content);
    if (!content) return;

    const printWindow = window.open("", "", "width=800,height=600");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
            <style>
              @media print {
                @page {
                  size: A4 portrait; /* Change to landscape if needed */
                  margin: 20mm;
                }

                body {
                  font-family: sans-serif;
                  padding: 20px;
                  color: #000;
                }
              }

              body {
                font-family: sans-serif;
                padding: 20px;
              }

              h2 {
                margin-top: 0;
              }
            </style>
          </head>
          <body>
            ${content.innerHTML}
            <script>
              window.onload = function () {
                window.focus();
                window.print();
                window.onafterprint = function () {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);

      printWindow.document.close(); // Required for Safari compatibility
    }
  };

  return (
    <div>
      <h1>Full App Page</h1>
      <p>This content is not part of the printed section.</p>

      {/* Section to Print */}
      <div
        ref={printRef}
        style={{
          border: "2px dashed #888",
          padding: "20px",
          margin: "30px 0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Invoice / Printable Section</h2>
        <p>Customer: John Doe</p>
        <p>Item: Widget Pro</p>
        <p>Amount: $299.99</p>
      </div>

      {/* Button to trigger print */}
      <button onClick={handlePrint}>🖨️ Print This Section</button>
    </div>
  );
};

export default PrintablePage;
