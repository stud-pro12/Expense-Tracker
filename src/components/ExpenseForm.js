import React, { useState } from "react";
import { TextField, Button, MenuItem, Grid, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Others"];

const ExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    id: "",
    title: "",
    amount: "",
    category: "",
    date: "",
    dueDate: "", 
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.title || !expense.amount || !expense.category || !expense.date) return;
    onAddExpense({
      ...expense,
      id: uuidv4(),
      amount: parseFloat(expense.amount),
      dueDate: expense.dueDate,
    });
    setExpense({ id: "", title: "", amount: "", category: "", date: "", dueDate: "" });
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Title"
              name="title"
              value={expense.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={expense.amount}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Category"
              name="category"
              value={expense.category}
              onChange={handleChange}
              fullWidth
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={expense.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
  <TextField
    label="Due Date"
    name="dueDate"
    type="date"
    value={expense.dueDate}
    onChange={handleChange}
    fullWidth
    InputLabelProps={{ shrink: true }}
    sx={{ marginTop: 2 }} 
  />
</Grid>

<Grid item xs={11} sx={{ marginTop: 3 }}>
  <Button type="submit" variant="contained" color="primary" fullWidth>
    Add Expense
  </Button>
</Grid>


        </Grid>
      </form>
    </Paper>
  );
};

export default ExpenseForm;
