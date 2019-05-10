import React, { useState } from 'react';

export default function FormPastebin ({ addItem }) {
  const [text, setText] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    addItem(text)
    setText("")
  }

  const onChange = (event) => setText(event.target.value)

  return (
    <div className="todo-new">
      <form onSubmit={onSubmit}>
      <label>Text</label>
        <input
          type="text"
          id="tarea"
          name="tarea"
          value={text}
          placeholder="Escribe tu miercoles!"
          onChange={onChange}
        />
        <button>Send Pastebin</button>
      </form>
    </div>
  )
}