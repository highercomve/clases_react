import React from 'react';
import List from '../List/List';
import NewItem from '../NewItem/NewItem';
import uuid from "uuid";

const TodoStates = {
  UNDONE: "UNDONE",
  DONE: "DONE",
}

export default class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      // newItem: "",
    }
  }

  // updateNewItem = (text) => {
  //   this.setState({
  //     newItem: text
  //   })
  // }

  addItem = (text) => {
    this.setState({
      items: [
        ...this.state.items,
        { id: uuid.v4(), text, state: TodoStates.UNDONE },
      ]
    })
  }

  updateItem = (item) => {
    const itemIndex = this.state.items.findIndex(i => i.id === item.id)
    this.setState({
      items: [
        ...this.state.items.slice(0, itemIndex),
        item,
        ...this.state.items.slice(itemIndex + 1),
      ]
    })
  }

  deleteItem = (itemId) => {
    const itemIndex = this.state.items.findIndex(i => i.id === itemId)
    this.setState({
      items: [
        ...this.state.items.slice(0, itemIndex),
        ...this.state.items.slice(itemIndex + 1),
      ]
    })
  }

  render () {
    return (
      <section className="todo">
        <NewItem
          addItem={this.addItem}
        />
        <List items={this.state.items} />
      </section>
    )
  }
}
