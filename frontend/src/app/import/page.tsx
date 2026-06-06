"use client";

import { CloudUploadIcon, File02Icon, CheckmarkCircle01Icon } from "hugeicons-react";

export default function ImportPage() {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Data Import</h1>
          <p className="text-sm text-neutral-500">Import customer data and metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
            <CloudUploadIcon size={32} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Upload CSV</h3>
          <p className="text-sm text-neutral-500 max-w-sm mb-6">
            Drag and drop your customer data CSV file here, or click to browse. Maximum file size 50MB.
          </p>
          <div className="w-full rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 p-12 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer flex flex-col items-center justify-center">
             <button className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm">
               Select File
             </button>
             <span className="text-xs text-neutral-400 mt-4">Supported format: .csv</span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col">
          <div className="border-b border-neutral-200 p-5">
            <h3 className="text-lg font-semibold text-neutral-800">Recent Imports</h3>
            <p className="text-sm text-neutral-500">Status of your latest data synchronization</p>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-neutral-100">
            {[
              { id: 1, file: "customers_q3.csv", rows: "12,450", status: "Completed", date: "Today, 10:42 AM" },
              { id: 2, file: "revenue_oct.csv", rows: "8,200", status: "Completed", date: "Yesterday, 2:15 PM" },
              { id: 3, file: "usage_logs.csv", rows: "450,120", status: "Completed", date: "Oct 24, 9:00 AM" },
            ].map((job) => (
              <div key={job.id} className="flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                    <File02Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{job.file}</p>
                    <p className="text-xs text-neutral-500">{job.date} • {job.rows} rows</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  <CheckmarkCircle01Icon size={14} />
                  {job.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
