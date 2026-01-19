import { useEffect, useState } from "react";

function App() {
  // purchases feeds the list items
  const [purchases, setPurchases] = useState([]);
  // isFormOpen controls if form is rendered
  const [isFormOpen, setIsFormOpen] = useState(false);
  // editingPurchase controls
  //     form title text: "Add purchase" / "Edit purchase" & submit behavior: add / update
  //     default field values: prefills if purchase is not null(updating) / is empty if purchase is null(creating)
  const [editingPurchase, setEditingPurchase] = useState(null);

  // when user clicks add purchase - editingPurchase must be set to null & isFormOpen must be true
  const openAdd = () => {
    setEditingPurchase(null);
    setIsFormOpen(true);
  };

  // when user clicks update purchase - editingPurchase must be set to object that was clicked & isFormOpen must be true
  const openEdit = (purchase) => {
    setEditingPurchase(purchase);
    setIsFormOpen(true);
  };

  // when user closes the form || when user submits - editingPurchase object must be set to null & isFormOpen must be false
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPurchase(null);
  };

  // Create : addPurchase called -> receives object w these fields:
  //       title: string, amount: number, category: string, mood: string, regretLevel: number(0-5), notes: string(optional)
  //       id & createdAt added inside fn
  const addPurchase = (values) => {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newPurchase = { ...values, id, createdAt };

    setPurchases((prev) => [newPurchase, ...prev]);
    closeForm();
  };

  const simulateAddPurchase = () => {
    const values = {
      title: "Coffee",
      amount: 10.75,
      category: "Food and Drink",
      mood: "Tired",
      regretLevel: 0,
      notes: "Needed that.",
    };

    addPurchase(values);
  };

  useEffect(() => {
    console.log("Purchases updated:", purchases);
  }, [purchases]);

  // Read
  const getPurchases = (purchases) => {
    return (
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id} className="grid place-content-evenly">
            <h2>{purchase.title}</h2>
            <p>{purchase.amount}</p>
            <p>{purchase.category}</p>
            <p>{purchase.mood}</p>
            <p>{purchase.regretLevel}</p>
            <p>{purchase?.notes}</p>
            <p>
              {new Date(purchase.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button className="my-2 mr-2 p-2 rounded bg-amber-100 text-slate-400">
              Edit
            </button>
            <button
              className="my-2 p-2 rounded bg-red-500 text-white"
              onClick={() => deletePurchase(purchase.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  };

  // Update
  const editPurchase = (id, values) => {};

  // Delete
  const deletePurchase = (id) => {
    setPurchases((prev) => prev.filter((purchase) => purchase.id !== id));
  };

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 content-center rounded bg-rose-300 text-white"
        onClick={simulateAddPurchase}
      >
        Simulate Add
      </button>

      {getPurchases(purchases)}
    </>
  );
}

export default App;
