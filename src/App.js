import React, { useState, useMemo, useEffect } from "react";
import { Container, Typography, CssBaseline, Switch, FormControlLabel, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Papa from "papaparse"; 
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseChart from "./components/ExpenseChart";
import AIInsights from "./components/AIInsights";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  
  const exportToCSV = () => {
    const csv = Papa.unparse(expenses);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "expenses.csv";
    link.click();
  };

  
  useEffect(() => {
    const upcomingReminders = expenses.filter((expense) => {
      const dueDate = new Date(expense.dueDate);
      const currentDate = new Date();
      return dueDate > currentDate && (dueDate - currentDate) < 5 * 24 * 60 * 60 * 1000; // Within next 5 days
    });
    setReminders(upcomingReminders);
  }, [expenses]);

  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#1976d2" },
          secondary: { main: "#f50057" },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Expense Tracker
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label={darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          style={{ display: "flex", justifyContent: "center" }}
        />
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseTable expenses={expenses} onDeleteExpense={deleteExpense} />
        <ExpenseChart expenses={expenses} />
        <AIInsights expenses={expenses} />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={exportToCSV}
          style={{ marginTop: 20 }}
        >
          Export Expenses as CSV
        </Button>
        <Box style={{ marginTop: 20 }}>
          <Typography variant="h6" align="center">
            📝 Upcoming Reminders
          </Typography>
          {reminders.length === 0 ? (
            <Typography align="center">No upcoming expense reminders.</Typography>
          ) : (
            reminders.map((expense) => (
              <Typography key={expense.id} align="center">
                💡 {expense.title} is due on {expense.dueDate}.
              </Typography>
            ))
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
