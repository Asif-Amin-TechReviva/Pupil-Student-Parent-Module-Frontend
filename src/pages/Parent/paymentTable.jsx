import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import { CSVExport, DebouncedInput, EmptyTable } from 'components/third-party/react-table';

import { useTheme } from '@mui/material/styles';
// third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
  sortingFns
} from '@tanstack/react-table';
import { FetchPaymentDetails } from 'api/allPayments';
import { useState, useEffect, useMemo } from 'react';
import QuichLinks from 'components/QuichLinks';

// Utility functions
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

const PaymentTable = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true);
const theme = useTheme()
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await FetchPaymentDetails();
        setPaymentDetails(response.data?.Payment || []);
      } catch (error) {
        console.error('Error fetching payment details:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  const columns = useMemo(() => [
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: info => new Date(info.getValue()).toLocaleDateString()
    },
    {
      header: 'Amount Paid',
      accessorKey: 'amountPaid',
      cell: info => `₹${info.getValue()}`
    },
    {
      header: 'Amount Due',
      accessorKey: 'amountDue',
      cell: info => `₹${info.getValue()}`
    },
    {
      header: 'Balance',
      accessorKey: 'balance',
      cell: info => `₹${info.getValue()}`
    },
    {
      header: 'Mode',
      accessorKey: 'mode'
    },
    {
      header: 'Remarks',
      accessorKey: 'remarks'
    }
  ], []);

  const table = useReactTable({
    data: paymentDetails,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter
  });

  const headers = columns.map(col => ({
    label: col.header,
    key: col.accessorKey
  }));

  return (
    <>
    <QuichLinks/>
    <Paper>
      <Stack mt={3} direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${paymentDetails.length} records...`}
        />
        <CSVExport
          data={table.getRowModel().rows.map(row => row.original)}
          headers={headers}
          filename="payments.csv"
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading payment details...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyTable msg="No Payment Details Available" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </>

  );
};

export default PaymentTable;
