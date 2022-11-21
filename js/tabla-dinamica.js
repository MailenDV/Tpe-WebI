"use strict";

const url = "https://62b259dec7e53744afcb4742.mockapi.io/api/usuarios"
let fila = document.querySelector("#dynamictable");

async function viewusers(){
    
    fila.innerHTML = "";
    try {
        let res = await fetch (url);
        let json = await res.json();

        for (const i of json) {
           
            mostrarfila(i);
    }
    } catch (error) {
        console.log(error);
    }
}

async function enviar(e){
    e.preventDefault();
                        
    let equipo = document.querySelector("#equipo").value
    let posicion = document.querySelector("#posicion").value
    let origen = document.querySelector("#origen").value
        
    let inscriptos = {
        "equipo": equipo,
        "posicion": Number(posicion),
        "origen": origen,
    };

    try {
        let res = await fetch (url, {
        "method": "POST",
        "headers": {"Content-type":"application/json"},
        "body": JSON.stringify(inscriptos)
        });
        if(res.status === 201){
        document.querySelector("#respuesta").innerHTML = "Inscripcion completada."
        }
        } catch (error) {
        console.log(error);
        }
            
   viewusers();
    
    document.getElementById("forminscripcion").reset();
}

async function borrar(e){
    e.preventDefault();

    let id = this.dataset.id;
    
    try {
       let res = await fetch (`${url}/${id}`, {
        "method" : "DELETE"
    });
    if(res.status === 200){
        document.querySelector("#respuesta").innerHTML = "Fila borrada."
    }
      
    } catch (error) {
        document.querySelector("#respuesta").innerHTML = "Error de conexion!"
    }
    viewusers();
   
}

async function modificar(e){
    e.preventDefault();

    let id = this.dataset.id;

    let equipo = document.querySelector("#equipo").value
    let posicion = document.querySelector("#posicion").value
    let origen = document.querySelector("#origen").value
        
    let inscriptos = {
        "equipo": equipo,
        "posicion": Number(posicion),
        "origen": origen,
    };
   
    try  {
        let res = await fetch (`${url}/${id}`, {
        "method": "PUT",
        "headers": {"Content-type":"application/json"},
        "body": JSON.stringify(inscriptos)
        });
        if(res.status === 200){
        document.querySelector("#respuesta").innerHTML = "Modificacion completada."
        }
        } catch (error) {
        console.log(error);
        }

    viewusers();
    
    document.getElementById("forminscripcion").reset();
}


async function filtro(e) {
    e.preventDefault();

    let input, filter;
    input = document.getElementById("filtro");
    filter = input.value.toUpperCase();

    try {        
        let res = await fetch (url);
        if (res.status === 200){
            let json = await res.json();
            for (const i of json) {
                if(filter == i.equipo.toUpperCase()){
                    fila.innerHTML =   `<tr> 
                                        <td> ${i.equipo} </td>
                                        <td> ${i.posicion} </td>
                                        <td> ${i.origen} </td>
                                        <td> <button class="modificar" data-id=${i.id}><i class="fa-solid fa-pencil"></i></button></td>
                                        <td> <button class="borrar" data-id=${i.id}><i class="fa-solid fa-trash"></i></button></td>  
                                        </tr>`   
                                    
                                    document.querySelectorAll(".modificar").forEach((button) => {
                                        button.addEventListener("click", modificar);
                                    });
                                    document.querySelectorAll(".borrar").forEach((button) => {
                                        button.addEventListener("click", borrar);
                                    });

                    document.querySelector("#respuesta").innerHTML = "Filtrado exitoso."    
                } 
                if (filter == "")   {
                    mostrarfila(i);
                }   
            }            
        }
    }catch (error) {
        console.log(error);
    } 
}

async function crearTresUsuarios(e){
    e.preventDefault();

    let equipo = document.querySelector("#equipo").value
    let posicion = document.querySelector("#posicion").value
    let origen = document.querySelector("#origen").value
        
    let inscriptos = {
        "equipo": equipo,
        "posicion": Number(posicion),
        "origen": origen,
    };

    try {
        for (let i = 0; i < 3; i++) {
            let res = await fetch (url, {
                "method": "POST",
                "headers": {"Content-type":"application/json"},
                "body": JSON.stringify(inscriptos)
            });
        
            if(res.status === 201){
                document.querySelector("#respuesta").innerHTML = "Se han creado 3 usuarios."
            }; 
        }
            } catch (error) {
            console.log(error);
            };    
    viewusers();   
};


function mostrarfila(i){
    fila.innerHTML +=   `<tr> 
                        <td> ${i.equipo} </td>
                        <td> ${i.posicion} </td>
                        <td> ${i.origen} </td>
                        <td> <button class="modificar" data-id=${i.id}><i class="fa-solid fa-pencil"></i></button></td>
                        <td> <button class="borrar" data-id=${i.id}><i class="fa-solid fa-trash"></i></button></td>  
                        </tr>`   
                                    
                        document.querySelectorAll(".modificar").forEach((button) => {
                            button.addEventListener("click", modificar);
                        });
                        document.querySelectorAll(".borrar").forEach((button) => {
                            button.addEventListener("click", borrar);
                        });
}

viewusers();   
document.querySelector("#btn-enviar").addEventListener("click",enviar);
document.querySelector("#btn-filtrar").addEventListener("click", filtro);
document.querySelector("#btn-triplicar").addEventListener("click", crearTresUsuarios);