/* 
 * Fee Voucher (MVP) — Concordia College CMS
 * Static page displaying sample vouchers in orange/white theme.
 * Future: Fetch vouchers from backend API and add payment/download handlers.
 */

import React from "react";
import { useSelector } from "react-redux";

const FeeVoucher = () => {
  const userData = useSelector((state) => state.userData);
  const name = userData?.name || userData?.studentName || "";
  const rollNo = userData?.rollNo || userData?.rollno || userData?.roll || "";

  // Sample data matching PDF page 12
  const feeVouchers = [
    { srNo: 1, voucherNo: "248503958", issuedDate: "307656", dueDate: "Oct 2025", amount: "5,000", status: "Paid/Unpaid" },
    { srNo: 2, voucherNo: "248503958", issuedDate: "307656", dueDate: "Nov 2025", amount: "5,000", status: "Paid/Unpaid" },
  ];

  console.log("FeeVoucher component rendered", { name, rollNo, vouchersCount: feeVouchers.length });

  if (!feeVouchers || feeVouchers.length === 0) {
    return <div className="p-6 text-center">No vouchers available</div>;
  }

  return (
    <div className="space-y-4">
      <style>{`
        .orange-header { 
          position:relative; 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          padding:28px 40px; 
          border-radius:20px; 
          font-weight:700; 
          font-size:30px; 
          box-shadow:0 6px 28px -6px rgba(242,131,0,0.45),0 2px 6px rgba(0,0,0,0.08); 
          overflow:hidden; 
        }
        .orange-header:after { 
          content:''; 
          position:absolute; 
          inset:0; 
          background:radial-gradient(circle at 85% 25%, rgba(255,255,255,0.35), transparent 60%); 
          pointer-events:none; 
        }
        .panel { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:32px; 
          border-radius:22px; 
          border:1px solid #ffe0c2; 
          box-shadow:0 4px 20px -6px rgba(242,131,0,0.2); 
        }
        .table { 
          width:100%; 
          border-collapse:collapse; 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:16px; 
          overflow:hidden; 
          box-shadow:0 6px 22px -8px rgba(0,0,0,.12); 
          border:1px solid #f3e2cc; 
        }
        .table th { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          text-align:left; 
          padding:16px; 
          font-weight:700; 
          letter-spacing:.3px; 
        }
        .table td { 
          padding:14px 16px; 
          border-bottom:1px solid #f0e6d8; 
          color:#374151; 
          font-weight:500; 
        }
        .table tbody tr { 
          transition:all .3s; 
        }
        .table tbody tr:hover { 
          background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
          transform:scale(1.01); 
        }
        .status { 
          display:inline-block; 
          padding:6px 14px; 
          border-radius:999px; 
          font-weight:700; 
          font-size:12px; 
          background:linear-gradient(135deg,#fff2d9,#ffe4cc); 
          color:#d97200; 
          border:1px solid #ffe0c2; 
          box-shadow:0 2px 6px rgba(242,131,0,0.15); 
        }
        .note { 
          color:#8a5a15; 
          font-size:14px; 
          text-align:center; 
          font-weight:600; 
        }
        @media (max-width:900px){ 
          .table th, .table td { padding:10px 12px; font-size:13px; } 
        }
      `}</style>

      <div className="orange-header">
        Fee Voucher {name || rollNo ? `— ${name ? name : ''}${name && rollNo ? ' · ' : ''}${rollNo ? 'Roll No. ' + rollNo : ''}` : ''}
      </div>

      <div className="panel space-y-4">
        <table className="table" aria-label="Fee vouchers table">
          <thead>
            <tr>
              <th>Sr #</th>
              <th>Voucher #</th>
              <th>Issued Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {feeVouchers.map((v) => (
              <tr key={v.srNo}>
                <td>{v.srNo}</td>
                <td className="font-semibold">{v.voucherNo}</td>
                <td>{v.issuedDate}</td>
                <td>{v.dueDate}</td>
                <td>{v.amount}</td>
                <td>
                  <span className="status">{v.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="note">Contact admin for payment issues.</div>
      </div>
    </div>
  );
};

export default FeeVoucher;
