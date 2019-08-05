import React, { Component } from 'react';
import * as service from '../../service/index';// los servicios no van en mayusculas
const INPUTS = {
	ESTADO: "estado",
	SUB_ESTADO: "sub_estado",
	TIPOLOGIASN3: "tipologiasN3",
	INPUTMASCARA: "inputMascara"
}
class ModalForms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: this.props.isShowing,
			inputsRequired: false,
			formRow: {
				id: '',
				mensajeAmanda: '',
				estadoSelect: '',
				subEstadoSelect: '',
				tipologiasN3Select: '',
				mascaraSelect: ''
			},
			estadosOptionArray: [],
			subEstadosOptionArray: [],
			tipologiaOptionArray: [],
			mascaraOptionArray: [],
			disabledSelect: false
		}
		this.initSelects();
		this.save = this.save.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleText = this.handleText.bind(this)

	}
	async initSelects() {
		const seleccione = { "id": "", "value": "SELECCIONE" };
		let { estadosOptionArray } = this.state;
		estadosOptionArray.estado = [];
		estadosOptionArray.sub_estado = [];
		estadosOptionArray.siebel_tipologias = [];
		estadosOptionArray.siebel_enmascarar = [];
		for (const key in estadosOptionArray) {
			estadosOptionArray[key].push(seleccione);
		}
		let selectService = await service.getSelectsService();
		for (const key in estadosOptionArray) {
			selectService[key].map((o) => estadosOptionArray[key].push(o))
		}

		this.setState({
			estadosOptionArray: estadosOptionArray.estado,
			subEstadosOptionArray: estadosOptionArray.sub_estado,
			tipologiaOptionArray: estadosOptionArray.siebel_tipologias,
			mascaraOptionArray: estadosOptionArray.siebel_enmascarar
		})
	}
	componentWillReceiveProps(componenProps) {
		console.log("componenProps")
		console.log(componenProps)

		let formRow = {}
		formRow.id = componenProps.updateRow.id || '';
		formRow.estadoSelect = componenProps.updateRow.estado || '';
		formRow.subEstadoSelect = componenProps.updateRow.sub_estado || '';
		formRow.tipologiasN3Select = componenProps.updateRow.tipologiasN3 || '';
		formRow.mascaraSelect = componenProps.updateRow.mascara || '';
		formRow.mensajeAmanda = componenProps.updateRow.mensajeAmanda || '';
		this.setState({
			formRow,
			disabledSelect: (componenProps.updateRow.id !== '') ? true : false
		});
	}
	handleChange(selectElement) {
		const { formRow } = this.state;
		//debugger
		if (selectElement.target.id === INPUTS.ESTADO) {
			formRow.estadoSelect = selectElement.target.value
			this.setState({
				formRow
			})
		}
		if (selectElement.target.id === INPUTS.SUB_ESTADO) {
			formRow.subEstadoSelect = selectElement.target.value
			this.setState({
				formRow
			})
		}
		if (selectElement.target.id === INPUTS.TIPOLOGIASN3) {
			formRow.tipologiasN3Select = selectElement.target.value
			this.setState({
				formRow
			})
		}
		if (selectElement.target.id === INPUTS.INPUTMASCARA) {
			formRow.mascaraSelect = selectElement.target.value
			this.setState({
				formRow
			})
		}
	}
	handleText(e) {
		const { formRow } = this.state;
		if (e.target.id === "mensajeAmanda") {
			formRow.mensajeAmanda = e.target.value
			this.setState({
				formRow
			})
		}
	}
	async save(e) {
		// console.log("###### save() ######")	
		const res = {
			id: this.state.formRow.id,
			estado: this.state.formRow.estadoSelect,
			sub_estado: this.state.formRow.subEstadoSelect,
			tipologiasN3: this.state.formRow.tipologiasN3Select,
			mascara: this.state.formRow.mascaraSelect,
			mensajeAmanda: this.state.formRow.mensajeAmanda
		}
		let val = await this.validate(res)
		if (val) {
			this.setState({
				inputsRequired: false
			})
			this.props.save(res)
			this.closeModalHandler()
		} else {
			this.setState({
				inputsRequired: true
			})
			//alert("Rellene los campos");
		}
	}
	async validate(objectValidate) {
		var flag = true;
		for (var propertyForm in objectValidate) {
			if (objectValidate[propertyForm] === "" && propertyForm !== "id") {
				console.log(objectValidate[propertyForm])
				flag = false;
				break;
			}
		}
		return flag
	}
	closeModalHandler = () => {
		this.setState({
			inputsRequired: false
		})
		this.props.closeModalHandler();
	}
	render() {
		return (
			<div>
				<section className="ccc">
					<div className="modal"
						style={{
							transform: this.props.isShowing ? 'translateY(0vh)' : 'translateY(-100vh)',
							opacity: this.props.isShowing ? '1' : '0',
							display: this.props.isShowing ? 'block' : '',
						}}>

						<div className="modal-dialog modal-lg" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Nuevo Texto</h5>
									<button type="button" className="close " data-dismiss="modal" aria-label="Close" onClick={this.closeModalHandler}>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="alert alert-danger" role="alert"
										style={{
											opacity: this.state.inputsRequired ? '1' : '0',
										}}>
										Por favor complete los campos, todos son requeridos.
									</div>
									<br />
									<form>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="inputEstado">Estado</label>
												<select
													className="form-control form-control"
													id="estado"
													value={this.state.formRow.estadoSelect}
													//value={this.props.updateRow.estado}
													onChange={this.handleChange}
													disabled={(this.state.disabledSelect) ? "disabled" : ""}
												>
													{this.state.estadosOptionArray.map((item, i) => {
														return (
															<option key={i} value={item.value}>{item.value}</option>
														)
													})}
												</select>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="inputSubEstado">Sub Estado</label>
												<select className="form-control form-control"
													id="sub_estado"
													value={this.state.formRow.subEstadoSelect}
													// value={this.props.updateRow.sub_estado}
													onChange={this.handleChange}
													disabled={(this.state.disabledSelect) ? "disabled" : ""}
												>
													{this.state.subEstadosOptionArray.map((item, i) => {
														return (
															<option key={i} value={item.value}>{item.value}</option>
														)
													})}
												</select>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="inputMascara">Mascara</label>
												<select
													className="form-control form-control"
													id="inputMascara"
													value={this.state.formRow.mascaraSelect}
													//value={this.props.updateRow.mascara}
													onChange={this.handleChange}
													disabled={(this.state.disabledSelect) ? "disabled" : ""}
												>
													{this.state.mascaraOptionArray.map((item, i) => {
														return (
															<option key={i} value={item.value}>{item.value}</option>
														)
													})}
												</select>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="sel1">Tipologia N3</label>
												<select
													className="form-control form-control"
													id="tipologiasN3"
													//value={this.props.updateRow.tipologiasN3}
													value={this.state.formRow.tipologiasN3Select}
													onChange={this.handleChange}
													disabled={(this.state.disabledSelect) ? "disabled" : ""}
												>
													{this.state.tipologiaOptionArray.map((item, i) => {
														return (
															<option key={i} value={item.value}>{item.value}</option>
														)
													})}
												</select>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="inputMensajeAmanda">Mensaje Amanda</label>
											<input
												type="text"
												className="form-control"
												id="mensajeAmanda"
												placeholder="Mensaje Amanda"
												onChange={this.handleText}
												//value={this.props.updateRow.mensajeAmanda}
												value={this.state.formRow.mensajeAmanda}
											/>
										</div>
									</form>
								</div>
								<div className="modal-footer">
									<button className="btn-danger" onClick={this.closeModalHandler}>Salir</button>
									<button className="btn-success" onClick={this.save}>Guardar</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
export default ModalForms;