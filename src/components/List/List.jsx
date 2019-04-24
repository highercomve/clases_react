import React from 'react';

export default function List ({ items = [] }) {
  return (
    <section className="todo-list">
      {items.map((item) => (
        <div key={item.id} className="todo-item">
          {item.text} - {item.state}
        </div>
      ))}
    </section>
  )
}
