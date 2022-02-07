
// Variables

const ctx = document.getElementById('myChart').getContext('2d');
let tipo = "doughnut";
let diaAct = 1;
let dia = [];
let datos = [];
let backgroundColor = [];
let borderColor = [];

//Eventos botones

    //Boton para añadir datos

    document.getElementById("aniadir").addEventListener("click", ()=>{
        addData();
    });

    //Boton para eliminar datos

    document.getElementById("eliminar").addEventListener("click", ()=>{
        eliminarData();
    });

    //Boton para añadir gráficos

    document.getElementById("aniadir2").addEventListener("click", ()=>{
        addDataSet();
    });

    //Boton para eliminar gráficos

    document.getElementById("eliminar2").addEventListener("click", ()=>{
        eliminarDataSet();
    });

    //Boton para cambiar datos

    document.getElementById("random").addEventListener("click", ()=>{
        random();
    });

// Funciones

    // Crear valores aleatorios en un rango

    let valores = (max, min) => {
        return Math.floor(Math.random()*(max - min)+min)
    }

    // Crear colores aleatorios

    let color = () => {
        r = Math.floor(Math.random()*255);
        g = Math.floor(Math.random()*255);
        b = Math.floor(Math.random()*255);
        backgroundColor.push("rgba("+r+","+g+","+b+","+0.35+")");
        borderColor.push("rgba("+r+","+g+","+b+","+1+")");
    }

    // Crear gráfico

    const myChart = new Chart(ctx, {
        data: {
            labels: dia,
            datasets: datos
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                }
            },
            responsive: true
        }
    });

    // Añadir datos a los gráficos

    let generarDato = () => {
        color();
        let dato = {
            type: tipo,
            label: 'Datos '+ diaAct,
            data: [valores(40, 0)],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
            fill:true,
            borderWidth: 5
        }
        diaAct++;
        return dato;
    }

    // Añadir un valor a los gráficos

    let addData = () => {
        if (datos[0] == null) {
            datos.push(generarDato());
        }else{
            for (let i = 0; i < datos.length; i++) {
                datos[i].data.push(valores(40, 0))
            }
        }
        color();
        myChart.update();
    }

    //Eliminar un valor de los gráficos

    let eliminarData = () => {
        for (let i = 0; i < datos.length; i++) {
            datos[i].data.pop();
        } 
        myChart.update();
    }

    //Añadir un nuevo gráfico

    let addDataSet = () =>{
        datos.push(generarDato());

        for (let i = 0; i < datos[0].data.length-1; i++) {
            datos[datos.length-1].data.push(valores(40, 0));
        }

        myChart.update();
    }

    // Eliminar un gráfico (Siempre será el último creado)

    let eliminarDataSet = () => {
        datos.pop();
        myChart.update();
    }

    //Moficar todos los datos de los gráficos

    let random = () =>{
        for (let i = 0; i < datos.length; i++) {
            for (let j = 0; j < datos[i].data.length; j++) {
                datos[i].data[j] = valores(40, 0);
            }
        }
        myChart.update();
    }

    //Crear los primeros datos del gráfico inicial

    let ini = (numDatos) =>{
        for (let i = 0; i < numDatos; i++) {
            addData();
        }
        myChart.update();

    }

    //Indicar cuantos datos introducira al inicio del programa

    ini(2);