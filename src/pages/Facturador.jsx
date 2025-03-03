import { useState } from "react";

import { Container, Grid, Paper, TextField, MenuItem, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const Facturador = () => {
  const [invoiceDate, setInvoiceDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(dayjs().add(30, 'day'));
  const [invoiceType, setInvoiceType] = useState("standard");
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
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
        </Paper>
      </Container>
      </LocalizationProvider>
    </>
  )
}

export default Facturador