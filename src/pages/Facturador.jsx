import { useState } from "react";

import { Box, Container, Grid, Paper, TextField, MenuItem, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import dayjs, { Dayjs } from 'dayjs';

const Facturador = () => {
  const [invoiceDate, setInvoiceDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(dayjs().add(30, 'day'));
  const [invoiceType, setInvoiceType] = useState("standard");
  const [products, setProducts] = useState([
    { id: 1, description: 'Product 1', quantity: 2, unitPrice: 100, total: 200 },
    { id: 2, description: 'Product 2', quantity: 1, unitPrice: 50, total: 50 },
  ])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    { 
      field: 'quantity', 
      headerName: 'Quantity', 
      type: 'number', 
      width: 100, 
      editable: true,
      valueFormatter: (params) => {
        return params.value.toFixed(0) || 0;
      }
    },
    { 
      field: 'unitPrice', 
      headerName: 'Unit Price', 
      type: 'number', 
      width: 120, 
      editable: true,
      valueFormatter: (params) => {
        return `$${params.value.toFixed(2)}`;
      }
    },
    { 
      field: 'total', 
      headerName: 'Total', 
      type: 'number', 
      width: 120,
      valueFormatter: (params) => {
        return `$${params.value.toFixed(2)}`;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <IconButton 
          color="error" 
          onClick={() => handleDeleteRow(params.row.id)}
        >
          <Delete size={20} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
    <div style={{ backgroundColor: '#0f1214'}} className="h-screen">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" >
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }} color="primary">
              Invoice Details
            </Typography>
          <Grid container spacing={2}>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer"
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Customer name or company"
                  />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Invoice Type"
                    value={invoiceType}
                    onChange={(e) => setInvoiceType(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  >
                    <MenuItem value="standard">Standard Invoice</MenuItem>
                    <MenuItem value="proforma">Proforma Invoice</MenuItem>
                    <MenuItem value="credit">Credit Note</MenuItem>
                    <MenuItem value="debit">Debit Note</MenuItem>
                  </TextField>

                  <DatePicker
                      label="Invoice Date"
                      value={invoiceDate}
                      onChange={(newValue) => setInvoiceDate(newValue)}
                      format="DD/MM/YYYY"
                      slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Invoice Number"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    defaultValue={`INV-${new Date().getFullYear()}-001`}
                  />
                  <DatePicker
                      label="Due Date"
                      value={dueDate}
                      onChange={(newValue) => setDueDate(newValue)}
                      slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                    />
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }} color="primary">
            Items
          </Typography>

          <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={products}
                columns={columns}
                processRowUpdate={(newRow, oldRow) => {
                  const updatedRow = { ...newRow, total: newRow.quantity * newRow.unitPrice };
                  handleCellEdit({
                    id: updatedRow.id,
                    field: 'total',
                    value: updatedRow.total
                  });
                  return updatedRow;
                }}
                onProcessRowUpdateError={(error) => {
                  console.error('Error updating row:', error);
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                disableRowSelectionOnClick
              />
            </Box>

        </Paper>
      </Container>
      </LocalizationProvider>
      </div>
    </>
  )
}

export default Facturador