import React, { useState } from 'react';

// Main App component
const App = () => {
  // State to hold all the input data for the salary slip
  const [formData, setFormData] = useState({
    companyName: 'Dharaiya Enterprise',
    companyAddress: '310 Khirasara GIDC, Rajkot, Gujarat, India',
    employeeName: '',
    employeeId: '',
    designation: '',
    pan: '',
    bankAccountNo: '',
    uan: '',
    payPeriodMonth: new Date().toLocaleString('default', { month: 'long' }),
    payPeriodYear: new Date().getFullYear().toString(),
    basicSalary: 0,
    hra: 0,
    specialAllowance: 0,
    otherAllowances: 0,
    providentFund: 0,
    esi: 0,
    professionalTax: 0,
    incomeTax: 0,
    loansAdvances: 0,
    otherDeductions: 0,
  });

  // State to control the visibility of the payslip display
  const [showPayslip, setShowPayslip] = useState(false);

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // Convert number inputs to actual numbers
      [name]: type === 'number' ? parseFloat(value || 0) : value,
    }));
  };

  // Function to calculate gross earnings
  const calculateGrossEarnings = () => {
    return (
      formData.basicSalary +
      formData.hra +
      formData.specialAllowance +
      formData.otherAllowances
    );
  };

  // Function to calculate total deductions
  const calculateTotalDeductions = () => {
    return (
      formData.providentFund +
      formData.esi +
      formData.professionalTax +
      formData.incomeTax +
      formData.loansAdvances +
      formData.otherDeductions
    );
  };

  // Function to calculate net pay
  const calculateNetPay = () => {
    return calculateGrossEarnings() - calculateTotalDeductions();
  };

  // Function to handle payslip generation
  const handleGeneratePayslip = () => {
    setShowPayslip(true);
  };

  // Function to handle printing the payslip
  const handlePrint = () => {
    window.print();
  };

  // Function to reset the form and hide the payslip
  const handleReset = () => {
    setFormData({
      companyName: 'Dharaiya Enterprise',
      companyAddress: '123 Business Lane, Rajkot, Gujarat, India',
      employeeName: '',
      employeeId: '',
      designation: '',
      pan: '',
      bankAccountNo: '',
      uan: '',
      payPeriodMonth: new Date().toLocaleString('default', { month: 'long' }),
      payPeriodYear: new Date().getFullYear().toString(),
      basicSalary: 0,
      hra: 0,
      specialAllowance: 0,
      otherAllowances: 0,
      providentFund: 0,
      esi: 0,
      professionalTax: 0,
      incomeTax: 0,
      loansAdvances: 0,
      otherDeductions: 0,
    });
    setShowPayslip(false);
  };

  // Utility function to render an input field
  const renderInputField = (label, name, type = 'text') => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}:
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
        required={type === 'text'} // Make text fields required
      />
    </div>
  );

  // Utility function to render a number input field with default 0
  const renderNumberInputField = (label, name) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}:
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
        min="0" // Ensure non-negative values
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-6 sm:mb-8">
          Dharaiya Enterprise - Salary Slip Maker
        </h1>

        {/* Input Form Section */}
        {!showPayslip && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 pb-2">
              Enter Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Company Details */}
              <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Company Information</h3>
                {renderInputField('Company Name', 'companyName')}
                {renderInputField('Company Address', 'companyAddress')}
              </div>

              {/* Employee Details */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-2">Employee Information</h3>
                {renderInputField('Employee Name', 'employeeName')}
                {renderInputField('Employee ID', 'employeeId')}
                {renderInputField('Designation', 'designation')}
                {renderInputField('PAN', 'pan')}
                {renderInputField('Bank Account No.', 'bankAccountNo')}
                {renderInputField('UAN', 'uan')}
              </div>

              {/* Pay Period */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">Pay Period</h3>
                {renderInputField('Month', 'payPeriodMonth')}
                {renderInputField('Year', 'payPeriodYear', 'number')}
              </div>

              {/* Earnings */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">Earnings (₹)</h3>
                {renderNumberInputField('Basic Salary', 'basicSalary')}
                {renderNumberInputField('HRA', 'hra')}
                {renderNumberInputField('Special Allowance', 'specialAllowance')}
                {renderNumberInputField('Other Allowances', 'otherAllowances')}
              </div>

              {/* Deductions */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Deductions (₹)</h3>
                {renderNumberInputField('Provident Fund (PF)', 'providentFund')}
                {renderNumberInputField('Employee State Insurance (ESI)', 'esi')}
                {renderNumberInputField('Professional Tax (PT)', 'professionalTax')}
                {renderNumberInputField('Income Tax (TDS)', 'incomeTax')}
                {renderNumberInputField('Loans/Advances', 'loansAdvances')}
                {renderNumberInputField('Other Deductions', 'otherDeductions')}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleGeneratePayslip}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Generate Payslip
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Reset Form
              </button>
            </div>
          </div>
        )}

        {/* Payslip Display Section */}
        {showPayslip && (
          <div className="payslip-container p-6 sm:p-8 border-2 border-gray-300 rounded-xl shadow-inner bg-white print:shadow-none print:border-none">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
              SALARY SLIP
            </h2>
            <p className="text-center text-lg text-gray-600 mb-6">
              For the Month of {formData.payPeriodMonth}, {formData.payPeriodYear}
            </p>

            {/* Company Info */}
            <div className="mb-6 border-b pb-4">
              <p className="text-xl font-bold text-blue-800">{formData.companyName}</p>
              <p className="text-gray-600">{formData.companyAddress}</p>
            </div>

            {/* Employee Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-6">
              <p>
                <strong className="text-gray-700">Employee Name:</strong> {formData.employeeName}
              </p>
              <p>
                <strong className="text-gray-700">Employee ID:</strong> {formData.employeeId}
              </p>
              <p>
                <strong className="text-gray-700">Designation:</strong> {formData.designation}
              </p>
              <p>
                <strong className="text-gray-700">PAN:</strong> {formData.pan}
              </p>
              <p>
                <strong className="text-gray-700">Bank A/C No.:</strong> {formData.bankAccountNo}
              </p>
              <p>
                <strong className="text-gray-700">UAN:</strong> {formData.uan}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Earnings Table */}
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-3 border-b pb-2">
                  Earnings
                </h3>
                <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Basic Salary</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.basicSalary.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">House Rent Allowance (HRA)</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.hra.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Special Allowance</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.specialAllowance.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-gray-700 font-medium">Other Allowances</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.otherAllowances.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-green-100 font-bold">
                      <td className="py-2 px-4 text-green-800">Gross Earnings</td>
                      <td className="py-2 px-4 text-right text-green-800">₹ {calculateGrossEarnings().toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Deductions Table */}
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3 border-b pb-2">
                  Deductions
                </h3>
                <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Provident Fund (PF)</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.providentFund.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Employee State Insurance (ESI)</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.esi.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Professional Tax (PT)</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.professionalTax.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Income Tax (TDS)</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.incomeTax.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-gray-700 font-medium">Loans/Advances</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.loansAdvances.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-gray-700 font-medium">Other Deductions</td>
                      <td className="py-2 px-4 text-right text-gray-800">₹ {formData.otherDeductions.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-red-100 font-bold">
                      <td className="py-2 px-4 text-red-800">Total Deductions</td>
                      <td className="py-2 px-4 text-right text-red-800">₹ {calculateTotalDeductions().toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Net Pay */}
            <div className="mt-6 p-4 bg-blue-600 text-white font-bold text-center rounded-lg shadow-md">
              <p className="text-xl sm:text-2xl">
                Net Pay: ₹ {calculateNetPay().toFixed(2)}
              </p>
              <p className="text-sm italic mt-1">
                (Rupees {numToWords(calculateNetPay())} Only)
              </p>
            </div>

            {/* Payslip Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 print:hidden">
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Print Payslip
              </button>
              <button
                onClick={() => setShowPayslip(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to convert number to words (Indian numbering system for Lakh, Crore)
// This is a simplified version and might not cover all edge cases or very large numbers.
const numToWords = (num) => {
  if (num === 0) return "Zero";

  const a = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' ' + inWords(n % 100) : '');
    return ''; // Should not reach here for numbers < 1000 in this logic flow
  }

  let s = num.toFixed(2).split('.');
  let integerPart = parseInt(s[0]);
  let decimalPart = parseInt(s[1]);
  let words = '';

  if (integerPart >= 10000000) { // Crore
    words += inWords(Math.floor(integerPart / 10000000)) + ' crore ';
    integerPart %= 10000000;
  }
  if (integerPart >= 100000) { // Lakh
    words += inWords(Math.floor(integerPart / 100000)) + ' lakh ';
    integerPart %= 100000;
  }
  if (integerPart >= 1000) { // Thousand
    words += inWords(Math.floor(integerPart / 1000)) + ' thousand ';
    integerPart %= 1000;
  }
  if (integerPart > 0) {
    words += inWords(integerPart);
  }

  if (decimalPart > 0) {
    words += ' and ' + inWords(decimalPart) + ' paise';
  }

  return words.trim().replace(/\s+/g, ' '); // Clean up extra spaces
};


export default App;
