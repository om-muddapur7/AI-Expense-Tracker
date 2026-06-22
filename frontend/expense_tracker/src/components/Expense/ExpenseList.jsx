import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from "../Cards/TransactionInfoCard"

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
          <h5 className='text-lg'>All Expenses</h5>

          <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base'/> Download
          </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((expenses) => (
          <TransactionInfoCard 
            key={expenses._id}
            title={expenses.category}
            icon={expenses.icon}
            date={moment(expenses.date).format("Do MMM YYYY")}
            amount={expenses.amount}
            type="expenses"
            onDelete={() => onDelete(expenses._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList
