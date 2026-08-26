import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GST_DATA = [
  {
    month: 'October 2023',
    totalSales: '₹12,45,000',
    taxable: '₹10,55,084',
    igst: '₹85,000',
    cgst: '₹52,458',
    sgst: '₹52,458',
  },
  {
    month: 'September 2023',
    totalSales: '₹11,20,500',
    taxable: '₹9,49,576',
    igst: '₹72,000',
    cgst: '₹49,462',
    sgst: '₹49,462',
  },
  {
    month: 'August 2023',
    totalSales: '₹14,50,000',
    taxable: '₹12,28,813',
    igst: '₹1,10,000',
    cgst: '₹55,593',
    sgst: '₹55,593',
  },
];

const GSTReports = () => {
  const [reportType, setReportType] = useState('Monthly Summary');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">TrueHand</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Admin</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/gst-reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">receipt</span>
              Finances
            </Link>
            <Link to="/admin/banners" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              Content
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="pb-2 border-b border-outline-variant/20">
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
            GST Reports
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
            Generate and manage tax compliance documentation.
          </p>
        </div>

        {/* 2-Column Section: Generate Form & Tax Breakdown Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Generate New Report Card */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <h3 className="font-display-md text-base font-bold text-charcoal pb-2 border-b border-outline-variant/20">
              Generate New Report
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  Report Type
                </label>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-semibold text-charcoal focus:outline-none"
                >
                  <option>Monthly Summary</option>
                  <option>GSTR-1 Export</option>
                  <option>GSTR-3B Summary</option>
                  <option>Annual Audit Log</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 text-xs font-mono text-charcoal focus:outline-none"
                  />
                  <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 text-xs font-mono text-charcoal focus:outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={() => alert(`Generating ${reportType} report...`)}
                className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow mt-2"
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Right: Tax Breakdown (YTD) Table & Recent Reports */}
          <div className="lg:col-span-8 space-y-6 text-xs">
            
            {/* Tax Breakdown Table Card */}
            <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden">
              <div className="p-6 pb-4 flex justify-between items-center">
                <h3 className="font-display-md text-base font-bold text-charcoal">Tax Breakdown (YTD)</h3>
                <button 
                  onClick={() => alert('Exporting YTD report...')}
                  className="px-4 py-2 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-surface-container transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export YTD
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                    <tr>
                      <th className="p-4 pl-6">Month</th>
                      <th className="p-4">Total Sales</th>
                      <th className="p-4">Taxable Amount</th>
                      <th className="p-4">IGST (18%)</th>
                      <th className="p-4">CGST (9%)</th>
                      <th className="p-4 text-right pr-6">SGST (9%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {GST_DATA.map(row => (
                      <tr key={row.month} className="hover:bg-surface-container-low/30 transition-colors">
                        <td className="p-4 pl-6 font-bold text-charcoal">{row.month}</td>
                        <td className="p-4 font-mono font-semibold">{row.totalSales}</td>
                        <td className="p-4 font-mono text-on-surface-variant">{row.taxable}</td>
                        <td className="p-4 font-mono text-on-surface-variant">{row.igst}</td>
                        <td className="p-4 font-mono text-on-surface-variant">{row.cgst}</td>
                        <td className="p-4 text-right pr-6 font-mono text-on-surface-variant">{row.sgst}</td>
                      </tr>
                    ))}
                    <tr className="bg-surface-container-low font-bold text-charcoal">
                      <td className="p-4 pl-6 uppercase text-[10px]">Total (Q3)</td>
                      <td className="p-4 font-mono">₹38,15,500</td>
                      <td className="p-4 font-mono">₹32,33,473</td>
                      <td className="p-4 font-mono">₹2,67,000</td>
                      <td className="p-4 font-mono">₹1,57,513</td>
                      <td className="p-4 text-right pr-6 font-mono">₹1,57,513</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Reports List */}
            <div className="space-y-3">
              <h4 className="font-display-md text-base font-bold text-charcoal">Recent Reports</h4>

              <div className="p-4 px-6 rounded-2xl bg-white border border-outline-variant/30 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-charcoal">
                    <span className="material-symbols-outlined text-lg">description</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">Q3 2023 Detailed Transaction Log</h5>
                    <p className="text-[10px] text-on-surface-variant">Generated on Oct 15, 2023 &bull; 2.4 MB</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => alert('Download CSV')} className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container font-mono text-[10px] font-bold">CSV</button>
                  <button onClick={() => alert('Download PDF')} className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container font-mono text-[10px] font-bold">PDF</button>
                </div>
              </div>

              <div className="p-4 px-6 rounded-2xl bg-white border border-outline-variant/30 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-charcoal">
                    <span className="material-symbols-outlined text-lg">description</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">September 2023 Monthly Summary</h5>
                    <p className="text-[10px] text-on-surface-variant">Generated on Oct 1, 2023 &bull; 0.8 MB</p>
                  </div>
                </div>

                <button onClick={() => alert('Download PDF')} className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container font-mono text-[10px] font-bold">PDF</button>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default GSTReports;
