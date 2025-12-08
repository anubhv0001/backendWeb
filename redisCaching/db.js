let items = [
  { id: 1, name: "Pen" },
  { id: 2, name: "Notebook" }
];

module.exports = {
  getItems: () => items,
  addItem: (item) => {
    items.push(item);
  },
  updateItem: (id, updatedData) => {
    items = items.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
  },
  deleteItem: (id) => {
    items = items.filter(item => item.id !== id);
  }
};
