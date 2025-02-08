const API_URL = import.meta.env.VITE_API_BASE_URL;

export const creatingExpense = async (date, category, description, amount, note, userId) => {
  // console.log('Creating expense with data:', { date, category, description, amount, note, userId })
  const response = await fetch(`${API_URL}/api/expense`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, category, description, amount, note, userId })
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  console.log('Response data:', data);
  return data;
}

// Get Expenses (only for specific user)
export const gettingAllExpense = async (userId) => {
  const response = await fetch(`${API_URL}/api/expense?userId=${userId}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },

  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  console.log('Response data:', data);
  return data;
};

//get Expense by Id
export const gettingExpenseById = async (id, userId) => {
  const response = await fetch(`${API_URL}/api/expense/${id}?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  console.log('Response data:', data);
  return data;
}


//delete Expense
export const deletingExpense = async (id, userId) => {
  const response = await fetch(`${API_URL}/api/expense/${id}?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Delete task failed");
  }

  const data = await response.json();
  return data;
}


//update Expense
export const modifyingExpense = async (id, date, category, description, amount, note, userId) => {
  try {
    const response = await fetch(`${API_URL}/api/expense/${id}?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        category,
        amount,
        description,
        note
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update expense');
    }

    const updatedExpense = await response.json();
    return updatedExpense;
  } catch (error) {
    throw new Error(error.message);
  }
};