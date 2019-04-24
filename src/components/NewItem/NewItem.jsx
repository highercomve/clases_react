import React, { useState } from 'react';

// class NewItem extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       text: ""
//     }
//   }

//   setText = (text) => {
//     this.setState({
//       text
//     })
//   }

//   onSubmit = (event) => {
//     event.preventDefault()
//     this.props.addItem(this.state.text)
//   }

//   render () {
//     return (
//       <div className="todo-new">
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             id="tarea"
//             name="tarea"
//             value={this.state.text}
//             placeholder="Escribe tu miercoles!"
//             onChange={(event) => this.setText(event.target.value)}
//           />
//           <button>Add new Task</button>
//         </form>
//       </div>
//     )
//   }
// }


// const data = new FormData(event.target)
// if (data.get("tarea") !== "") {
//   addItem(data.get("tarea"))
// }

export default function NewItem ({ addItem }) {
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
        <input
          type="text"
          id="tarea"
          name="tarea"
          value={text}
          placeholder="Escribe tu miercoles!"
          onChange={onChange}
        />
        <button>Add new Task</button>
      </form>
    </div>
  )
}