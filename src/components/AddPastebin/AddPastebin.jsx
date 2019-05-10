import React from 'react';
import FormPastebin from '../FormPastebin/FormPastebin';
// import List from '../List/List';
// import NewItem from '../NewItem/NewItem';
// import uuid from "uuid";

// export const TodoStates = {
//   UNDONE: false,
//   DONE: true,
// }
export default class AddPastebin extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       items: [],
//       // newItem: "",
//     }
//   }

//   // updateNewItem = (text) => {
//   //   this.setState({
//   //     newItem: text
//   //   })
//   // }

//   addItem = (text) => {
//     this.setState({
//       items: [
//         ...this.state.items,
//         { id: uuid.v4(), text, status: TodoStates.UNDONE },
//       ]
//     })
//   }

//   updateItem = (item) => {
//     const itemIndex = this.state.items.findIndex(i => i.id === item.id)
//     this.setState({
//       items: [
//         ...this.state.items.slice(0, itemIndex),
//         item,
//         ...this.state.items.slice(itemIndex + 1),
//       ]
//     })
//   }

//   deleteItem = (itemId) => {
//     const itemIndex = this.state.items.findIndex(i => i.id === itemId)
//     this.setState({
//       items: [
//         ...this.state.items.slice(0, itemIndex),
//         ...this.state.items.slice(itemIndex + 1),
//       ]
//     })
//   }

  render () {
    return (
      <section className="formulario">
       Formulario:
       <FormPastebin/>
      </section>
    )
  }
}
