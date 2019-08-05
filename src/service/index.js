const baseUrl = `http://192.168.40.90:5004/api/v1`;

export function getListadoMensajes() {
    return fetch(`${baseUrl}/getAllMessageN3`,
        {
            method: 'POST'
        }).then(function (response) {
            //debugger
            // console.log("response")
            // console.log(response.body)
            return response.json();
        }).then(function (jsonResponse) {
            // debugger
            if (jsonResponse.code === 200) {
                return jsonResponse.listaN3.map((obj, i) => {
                    const row = {
                        id: null,
                        estado: null,
                        sub_estado: null,
                        mascara: null,
                        tipologiasN3: null,
                        mensajeAmanda: null
                    }
                    row.id = obj.id_amanda
                    row.estado = obj.estado
                    row.sub_estado = obj.sub_estado
                    row.mascara = obj.enmascarado
                    row.tipologiasN3 = obj.tipologia_n3
                    row.mensajeAmanda = obj.mensaje_amanda
                    return row;
                })
            }

        });
}

export function getSelectsService() {
    return fetch(`${baseUrl}/getAllTipologiesSibelState`,
        {
            method: 'POST'
        }).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            // debugger
            // console.log("jsonResponse")
            // console.log(jsonResponse)
            return jsonResponse.data
        })
}
export async function deleteRow(req) {
    console.log("service-idRow")
    return fetch(`${baseUrl}/deleteMessageN3`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id_mensaje_amanda": `${req.idRow}`,
            "correo_nt": `${req.email}`,
            "mensaje_anterior": ""
        })
    }).then(function (response) {
        return response.json();
    }).then(function (jsonResponse) {
        //debugger
        console.log("jsonResponse")
        console.log(jsonResponse)
        return jsonResponse
    })
}

export async function addRow(req) {
    console.log(req)
    
    let getSelectsService = await new Promise((resolve, reject) => {
        resolve(this.getSelectsService());
    })
    let estadoId = getSelectsService.estado.filter((i) => i.value === req.new.estado)
    let sub_estado = getSelectsService.sub_estado.filter((i) => i.value === req.new.sub_estado)
    let tipologiasN3 = getSelectsService.siebel_tipologias.filter((i) => i.value === req.new.tipologiasN3)
    let mascara = getSelectsService.siebel_enmascarar.filter((i) => i.value === req.new.mascara)
    return fetch(`${baseUrl}/insertMessageN3`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "estado_id": estadoId[0].id,
            "sub_estado_id": sub_estado[0].id,
            "enmascarar_id": tipologiasN3[0].id,
            "tipologia_id": mascara[0].id,
            "mensaje_amanda": `${req.new.mensajeAmanda}`,
            "correo_nt":`${req.email}`
    })
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
        // debugger
        console.log("jsonResponse")
        console.log(jsonResponse)
        return jsonResponse
    })
}

export async function updateRow(req) {
    console.log(req)
    // debugger
    return fetch(`${baseUrl}/updateMessageN3`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id_mensaje_amanda": req.new.id,
            "mensaje_anterior": `${req.new.mensajeAmanda}`,
            "mensaje_amanda": `${req.new.mensajeAmanda}`,
            "correo_nt":`${req.email}`
        })
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
        // debugger
        console.log("jsonResponse")
        console.log(jsonResponse)
        return jsonResponse
    })
}