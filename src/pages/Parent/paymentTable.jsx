import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CSVExport, DebouncedInput, EmptyTable } from 'components/third-party/react-table';
import {  Grid } from "@mui/material";
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from "sections/widget/chart/EcommerceDataChart";
import { ArrowDown, ArrowUp, Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';

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
    <div>
       <Grid container spacing={3} >
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="All Earnings"
      count="$3000"
      iconPrimary={<Wallet3 />}
      percentage={
        <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.primary.main} />
    </EcommerceDataCard>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Page Views"
      count="290+"
      color="warning"
      iconPrimary={<Book color={theme.palette.warning.dark} />}
      percentage={
        <Typography color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.warning.dark} />
    </EcommerceDataCard>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Total task"
      count="1,568"
      color="success"
      iconPrimary={<Calendar color={theme.palette.success.darker} />}
      percentage={
        <Typography color="success.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.success.darker} />
    </EcommerceDataCard>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Download"
      count="$200"
      color="error"
      iconPrimary={<CloudChange color={theme.palette.error.dark} />}
      percentage={
        <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.error.dark} />
    </EcommerceDataCard>
  </Grid>
</Grid>
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
    </div>
  );
};

export default PaymentTable;
