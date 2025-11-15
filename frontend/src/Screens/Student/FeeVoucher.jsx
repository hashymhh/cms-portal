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
        .orange-header { background:#FF6B35; color:#fff; padding:18px 24px; border-radius:16px; font-weight:700; font-size:28px; }
        .panel { background:#FFA752; padding:18px; border-radius:18px; }
        .table { width:100%; border-collapse:collapse; background:#fff; border-radius:12px; overflow:hidden; }
        .table th { background:#FF6B35; color:#fff; text-align:left; padding:12px; font-weight:700; border-bottom:2px solid #E65100; }
        .table td { padding:12px; border-bottom:1px solid #FFE0C8; color:#374151; }
        .table tbody tr:hover { background:#FFF4E8; }
        .status { display:inline-block; padding:4px 10px; border-radius:999px; font-weight:700; font-size:12px; background:#FFE9C7; color:#6b7280; }
        .note { color:#6b7280; font-size:14px; text-align:center; }
        @media (max-width:900px){ .table th, .table td { padding:8px; font-size:13px; } }
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
