import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const AIInsights = ({ expenses }) => {
  if (expenses.length === 0) {
    return <Typography align="center">No expenses to analyze.</Typography>;
  }

  
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  const mostSpentCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  
  const highestExpense = expenses.reduce((max, expense) =>
    expense.amount > max.amount ? expense : max
  , expenses[0]);

  
  const insights = [
    `💰 Your total spending is ₹${totalExpense.toFixed(2)}.`,
    `📊 You spent the most on ${mostSpentCategory} (₹${categoryTotals[mostSpentCategory].toFixed(2)}).`,
    `🚀 Your highest single expense was ₹${highestExpense.amount.toFixed(2)} on "${highestExpense.title}".`,
  ];

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h6" align="center">💡 AI Expense Insights</Typography>
      <List>
        {insights.map((insight, index) => (
          <ListItem key={index}>
            <ListItemText primary={insight} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AIInsights;
