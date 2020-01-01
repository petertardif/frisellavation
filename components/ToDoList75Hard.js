import React, { useState } from 'react'

export default function ListToDo75Hard() {
  const [items, setItems] = useState([
    { name: 'I exercised twice  for 45 minutes — one session was outdoors.', checked: false },
    { name: 'I followed a diet with no cheat meals or alcohol.', checked: false },
    { name: 'I drank a gallon of water.', checked: false },
    { name: 'I read 10 pages of a non-fiction entrepreneur book.', checked: false },
    { name: 'I took a progress pic.', checked: false },
  ]);

  const handleCompletedItem = item => {
    const newItems = items.map(itm => {
      if (itm === item) {
        itm.checked = !itm.checked;
      }
      return itm;
    });
    setItems(newItems);
  };

  return (
    <>
      <header>
        <h1>Daily 75 Hard List</h1>
      </header>
      <main>
        <section>
          <ul>
            {items.map(item => (
              <li>
                <h2
                  style={{
                    textDecoration: item.checked ? "line-through" : null
                  }}
                >
                  {item.name}
                </h2>
                <button onClick={() => handleCompletedItem(item)} type="button">
                  Completed
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}