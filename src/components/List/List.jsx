import React from 'react';

function Item ({ item, updateItem }) {
  const onClickHanlder = (event) => {
    updateItem({
      ...item,
      status: !item.status
    })
  }
  return (
    <div className="todo-item">
      a{item.text} b - {item.status}c
     
      <input
        type="checkbox"
        name={item.text + item.status}
        checked={item.status}
        onChange={onClickHanlder}
      />     
    </div>
  )
}

export default function List ({ items = [], updateItem }) {
  return (
    <section className="todo-list">
      {items.map((item) => (
        <Item key={item.id} item={item} updateItem={updateItem} />
      ))}
    </section>
  )
}
