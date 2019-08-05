import React, { Component } from 'react';
import * as service from '../../service';// los servicios no van en mayusculas
import ModalForms from '../ModalForms/ModalForms';
// import uuid from "uuid";

const MESSAGECRUD = {
    DELETE: {
        success: 'Se eliminó registro exitosamente.',
        error: 'Error al intentar eliminar.'
    },
    UPDATE: {
        success: 'Se actualizó registro exitosamente.',
        error: 'Error al intentar actualizar registro.'
    },
    INSERT: {
        success: 'Se inserto registro exitosamente.',
        error: 'Error al intentar registrar texto.'
    },

}
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            isShowing: false,
            news: [],
            updateRow: {
                id: '',
                estado: '',
                sub_estado: '',
                tipologiasN3: '',
                mascara: '',
                mensajeAmanda: ''
            },
            isShowingMsgCrud: {
                sw: false,
                message: ''
            },
            userNT: 'admin@falabella.cl'
        }
        this.initFetch()
        this.handleClick = this.handleClick.bind(this)
        this.openModalHandler = this.openModalHandler.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }
    async initFetch() {
        let { news } = this.state
        news = await service.getListadoMensajes()
        //debugger
        this.setState({
            news
        })
    }
    async deleteRow(e) {
        console.log(">>> deleteRow >>>")
        console.log(e.target.attributes.idtexto)
        let idRow = e.target.attributes.idtexto.value
        let { news } = this.state
        const itemIndex = news.findIndex(i => i.id === Number(idRow))
        this.setState({
            news: [
                ...this.state.news.slice(0, itemIndex),
                ...this.state.news.slice(itemIndex + 1),
            ]
        })
        let req = {
            idRow,
            email: this.state.userNT
        }
        let delResponse = await service.deleteRow(req);
        this.messagehelper(delResponse, 'DELETE');
    }
    messagehelper(response, accion) {
        if (response.code === 200) {
            this.setState({
                isShowingMsgCrud: {
                    sw: true,
                    message: MESSAGECRUD[accion].success
                }
            })

        } else {
            //Error Borrando
            this.setState({
                isShowingMsgCrud: {
                    sw: true,
                    message: MESSAGECRUD[accion].error
                }
            })
        }
        setTimeout(() => {
            this.setState({
                isShowingMsgCrud: {
                    sw: false,
                    message: ''
                }
            })
        }, 3000);
    }
    async handleClick(newObject) {
        // debugger
        let { news } = this.state
        let req = {
            new: newObject,
            email: this.state.userNT
        };
        if (newObject.id !== '') {
            const itemIndex = this.state.news.findIndex(i => i.id === newObject.id)
            this.setState({
                news: [
                    ...this.state.news.slice(0, itemIndex),
                    newObject,
                    ...this.state.news.slice(itemIndex + 1),
                ]
            })
            news.push(newObject)
            this.setState({ news })           
            let servResp = await service.updateRow(req);
            this.messagehelper(servResp, 'UPDATE');
        } else {
            let servResp = await service.addRow(req);
            newObject.id = servResp.data;//id
            news.push(newObject)
            this.setState({
                news,
                updateRow: this.resetState()
            })
            this.messagehelper(servResp, 'INSERT');
        }
    }

    openModalHandler(e) {
        if (e.target.attributes.idtexto) {
            //update
            let id = Number(e.target.attributes.idtexto.value)
            let edit = this.state.news.filter((i) => i.id === id)
            this.setState({
                updateRow: edit[0],
                isShowing: true
            })
        } else {
            //create new
            this.setState({
                isShowing: true
            })
        }
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false,
            updateRow: this.resetState()
        });
    }
    resetState() {
        return {
            id: '',
            estado: '',
            sub_estado: '',
            tipologiasN3: '',
            mascara: '',
            mensajeAmanda: ''
        };
    }
    render() {
        return (
            <section className="todo-list">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Inicio</li>
                        <li className="breadcrumb-item">Mantenedor</li>
                        <li className="breadcrumb-item active" aria-current="page">Listado</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col">
                        {(this.state.isShowingMsgCrud.sw) ?
                            <p className="alert alert-danger" role="alert">
                                {this.state.isShowingMsgCrud.message}
                            </p> : ''}
                        <span className="float-right">
                            <button className="open-modal-btn btn btn-success " onClick={this.openModalHandler}>Nuevo</button>
                        </span>
                    </div>
                </div>
                <ModalForms
                    updateRow={this.state.updateRow}
                    save={this.handleClick}
                    isShowing={this.state.isShowing}
                    closeModalHandler={this.closeModalHandler}
                />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Estado</th>
                            <th scope="col">Subestado</th>
                            <th scope="col">Mascara</th>
                            <th scope="col">Tipologia N3</th>
                            <th scope="col">Mensaje Amanda</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.news.map((n) => (
                            <tr key={n.id}>
                                <td>{n.estado}</td>
                                <td>{n.sub_estado}</td>
                                <td>{n.mascara}</td>
                                <td>{n.tipologiasN3}</td>
                                <td>{n.mensajeAmanda}</td>
                                <td>
                                    <span className="float-right">
                                        <button className="open-modal-btn btn" idtexto={n.id} handler="edit" onClick={this.openModalHandler}>Editar</button>
                                    </span>
                                </td>
                                <td>
                                    <span className="float-right">
                                        <i className="fas fa-trash"></i>
                                        <button className="open-modal-btn btn" idtexto={n.id} onClick={this.deleteRow}>Delete</button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </section>
        )

    }
}
