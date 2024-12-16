import React, { useState, useEffect } from 'react';
import {
    ScatterChart, Scatter, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    PieChart, Pie
} from 'recharts';
import informesService from '../../services/informes/informes.service';
import { obtenerAniosPedidos } from '../../services/informes/informes.service';

const Informes = () => {
    const [productosPedidos, setProductosPedidos] = useState([]);
    const [chartDataPieProductosPedidos, setChartDataPieProductosPedidos] = useState([]);
    const [totalPedidos, setTotalPedidos] = useState([]);
    const [clientesActivos, setClientesActivos] = useState([]);
    const [ChartDataPedidosPorMes, setChartDataPedidosPorMes] = useState([]);
    //Gráfico de totales
    //Filtros
    const [aniosPedidos, setAniosPedidos] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    //Grafico de totales --

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //Const hardcodeadas
    const dataPedidoCategorias = [
        {
            categoria_id: 27,
            categoria_nombre: "Pilas",
            total_pedidos: 4,
            total_cantidad: 21,
        },
        {
            categoria_id: 3,
            categoria_nombre: "Bolsas",
            total_pedidos: 1,
            total_cantidad: 5,
        }
    ]

    // Datos de los clientes
    const dataClientesActivos = [
        { cliente_id: 1, cliente_apellido: "Prueba 1", TotalPedidos: 3, TotalGastado: 42065.56 },
        { cliente_id: 2, cliente_apellido: "Prueba 2", TotalPedidos: 5, TotalGastado: 15320.90 },
        { cliente_id: 3, cliente_apellido: "Prueba 3", TotalPedidos: 2, TotalGastado: 18050.00 },
    ];

    const dataForRadar = dataClientesActivos.map(cliente => ({
        ...cliente,
        TotalPedidos: cliente.TotalPedidos,
        TotalGastado: cliente.TotalGastado,
    }));
    //Armado de gráfico totales
    // Transformamos los datos para tener Mes-Año como una propiedad y estructurarlo correctamente
    const dataWithMonthYear = ChartDataPedidosPorMes.map(item => ({
        ...item,
        MesAnio: `${item.Mes < 10 ? '0' + item.Mes : item.Mes}`-`${item.Anio}`,
    // Ajustamos el nombre del mes para hacerlo más comprensible
    MesNombre: new Date(0, item.Mes - 1).toLocaleString('default', { month: 'short' })
}));

    // Agrupamos los datos por año
    const dataGroupedByYear = dataWithMonthYear.reduce((acc, item) => {
        if (!acc[item.Anio]) {
            acc[item.Anio] = [];
        }
        acc[item.Anio].push(item);
        return acc;
    }, {});

    // Formateamos los datos para que estén listos para el gráfico
    const chartData = Object.keys(dataGroupedByYear).map(year => {
        const yearData = dataGroupedByYear[year];
        const yearObj = {
            Anio: year,
            // Llenamos los datos por mes, para cada año
            "01": 0, "02": 0, "03": 0, "04": 0, "05": 0, "06": 0,
            "07": 0, "08": 0, "09": 0, "10": 0, "11": 0, "12": 0,
        };

        // Asignamos los valores correspondientes a cada mes dentro del año
        yearData.forEach(item => {
            const mes = item.Mes < 10 ? '0' + item.Mes : item.Mes;
            yearObj[mes] = item.TotalDinero;
        });

        return yearObj;
    });

    // Mapeamos todos los posibles meses para las barras
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];


    //piechart
    const chartDataPie = dataPedidoCategorias.map(item => ({
        name: item.categoria_nombre,
        value: item.total_pedidos
    }));




    // Clientes activos Convertimos los datos para que sean compatibles con el gráfico de barras
    const dataForBarChart = dataClientesActivos.map(cliente => ({
        nombre: cliente.cliente_apellido, // Usamos el apellido como nombre para el eje X
        TotalPedidos: cliente.TotalPedidos,
        TotalGastado: `${cliente.TotalGastado.toString()}`
}));


    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        console.info('Fetch data')
        try {
            //Cargo combo de años
            const anios = await obtenerAniosPedidos();
            if (Array.isArray(anios)) {
                setAniosPedidos(anios);
                console.info(anios)
            } else {
                console.error('no llega nada')
                setError('Error al obtener los años de pedidos.');
            }

            //Cargo fechas por defecto en caso de estar nulas de pantalla
            const currentDate = new Date();
            const defaultEndDate = currentDate.toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'

            if (defaultEndDate) {
                defaultEndDate.setDate(currentDate.getDate() + 1);  // Sumar 1 día a la fecha actual
            }

            // Restar 30 días para la fecha de inicio
            currentDate.setDate(currentDate.getDate() - 30);
            const defaultStartDate = currentDate.toISOString().split('T')[0]; // Fecha 30 días atrás en formato 'YYYY-MM-DD'

            const startDate = fechaInicio || defaultStartDate;  // Si fechaInicio está vacía, usar defaultStartDate
            const endDate = fechaFin || defaultEndDate;  // Si fechaFin está vacía, usar defaultEndDate

            console.log("Fecha de inicio:", startDate);
            console.log("Fecha de fin:", endDate);

            //Gráfico producto por pedidos
            const pedidosData = await informesService.getProductosPedidos(startDate, endDate);

            if (Array.isArray(pedidosData)) {
                setProductosPedidos(pedidosData);

                // Mapeamos los datos para el gráfico
                const chartData = pedidosData.map(item => ({
                    name: item.producto_Nombre,  // Nombre del producto
                    value: item.Cantidad         // Cantidad de productos pedidos
                }));

                setChartDataPieProductosPedidos(chartData); // Asignar los datos al estado
                console.log('Datos para el gráfico:', chartData);
            } else {
                setError('Error al obtener los productos por pedidos.');
            }

            const pedidosDataPedidosPorMes = await informesService.getTotalPedidosPorMes(selectedYear);

            if (Array.isArray(pedidosDataPedidosPorMes) && pedidosDataPedidosPorMes.length > 0) {
                setChartDataPedidosPorMes(pedidosDataPedidosPorMes);
            } else {
                setError('No se encontraron datos para el año seleccionado.');
            }

            {/*            const totalPedidosData = await informesService.getTotalPedidosPorFecha(fechaInicio, fechaFin);
            setTotalPedidos(totalPedidosData);

            const clientesData = await informesService.getClientesActivos(fechaInicio, fechaFin);
            setClientesActivos(clientesData);
            */}

        } catch (err) {
            setError('Hubo un error al obtener los informes.');
            console.error('Error al obtener los informes:', err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData(); // Cargar todos los datos cuando el componente se monta
    }, []); // Solo se ejecuta una vez al montar el componente

    // Este useEffect solo se ejecuta cuando cambia el año seleccionado
    useEffect(() => {
        if (selectedYear) {
            console.log(selectedYear.toString());
            // Solo obtener los pedidos por mes para el año seleccionado
            const fetchPedidosPorMes = async () => {
                try {

                    const pedidosDataPedidosPorMes = await informesService.getTotalPedidosPorMes(selectedYear);
                    setChartDataPedidosPorMes(pedidosDataPedidosPorMes);
                } catch (err) {
                    setError('Error al obtener los pedidos por mes.');
                }
            };
            fetchPedidosPorMes();
        }
    }, [selectedYear]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    //piechart

    const dataForRadarTotales = ChartDataPedidosPorMes.map(item => ({
        MesAnio: `${item.Mes < 10 ? '0' + item.Mes : item.Mes}`-`${item.Anio}`,
    TotalPedidos: item.TotalPedidos,
        TotalDinero: `${item.TotalDinero.toString()}`
}));


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const colors = chartDataPie.map(() => getRandomColor());

    {/* const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fechaInicio') {
            setFechaInicio(value);
        } else if (name === 'fechaFin') {
            setFechaFin(value);
        }
    };*/}

    function getRandomColorInRange(baseColor) {
        // Descomponer el color base en componentes RGB
        const baseR = parseInt(baseColor.slice(1, 3), 16); // Rojo
        const baseG = parseInt(baseColor.slice(3, 5), 16); // Verde
        const baseB = parseInt(baseColor.slice(5, 7), 16); // Azul

        // Generar valores aleatorios con un rango de variación (+-30)
        const randomR = Math.min(255, Math.max(0, baseR + Math.floor(Math.random() * 61) - 30)); // Rango +-30
        const randomG = Math.min(255, Math.max(0, baseG + Math.floor(Math.random() * 61) - 30)); // Rango +-30
        const randomB = Math.min(255, Math.max(0, baseB + Math.floor(Math.random() * 61) - 30)); // Rango +-30

        // Convertir los valores RGB de nuevo a hexadecimal
        const hexR = randomR.toString(16).padStart(2, '0');
        const hexG = randomG.toString(16).padStart(2, '0');
        const hexB = randomB.toString(16).padStart(2, '0');

        // Devolver el color en formato hexadecimal
        return `#${hexR}${hexG}${hexB}`;
    }

    // Usar el color base #FCBB3A
    const randomColor = getRandomColorInRange('#FCBB3A');
    // console.log(randomColor);  // Ejemplo: #F8B639

    return (
        <div>

            {/* Filtros
            <div>
                <label>
                    Fecha Inicio:
                    <input
                        type="date"
                        name="fechaInicio"
                        value={fechaInicio}
                    // onChange={handleDateChange}
                    />
                </label>
                <label>
                    Fecha Fin:
                    <input
                        type="date"
                        name="fechaFin"
                        value={fechaFin}
                    // onChange={handleDateChange}
                    />
                </label>
            </div>
            */}

            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}


            <div style={{
                border: '2px solid #ccc',  // Borde gris claro
                borderRadius: '8px',        // Esquinas redondeadas (opcional)
                padding: '20px',            // Espacio interior
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Sombra para darle un toque más elegante
                marginBottom: '20px'        // Espacio debajo del contenedor
            }}>
                <h3>Totales Anuales</h3>
                <div>
                    <label htmlFor="yearSelector">Filtrar por</label>
                    <select style={{ marginLeft: '5px' }}
                            id="yearSelector"
                            value={selectedYear || ''}
                            onChange={(e) => setSelectedYear(e.target.value || null)}
                    >
                        <option value=""> Año</option>
                        {aniosPedidos.map((anio) => (
                            <option key={anio} value={anio}>{anio}</option>
                        ))}
                    </select>
                </div>
                {/* Contenedor con Flexbox para organizar los gráficos */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '20px',  // Espacio entre los gráficos
                    width: '100%',
                    padding: '20px',
                }}>


                    {/* Gráfico 1 */}
                    <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Por Año</h5>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Anio" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => {
                                        return `${value.toLocaleString()}`; // Formato para el Tooltip
                                    }}
                                />
                                <Legend />
                                {months.map((month) => (
                                    chartData.some(item => item[month] > 0) && (
                                        <Bar key={month}
                                             dataKey={month}
                                             stackId="a"
                                             fill={`${Math.floor(Math.random() * 16777215).toString(16)}`}
                                             label={({ value }) => `${value.toLocaleString()}`}
                                        />
                                    )
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico 2 */}
                    <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Pedidos y dinero</h5>
                        <ResponsiveContainer width="100%" height={400}>
                            <RadarChart data={dataForRadarTotales}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="MesAnio" />
                                <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
                                <Radar name="TotalPedidos" dataKey="TotalPedidos" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Radar name="TotalDinero" dataKey="TotalDinero" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Tooltip />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico 3 */}

                </div>
            </div>
            <div style={{
                border: '2px solid #ccc',  // Borde gris claro
                borderRadius: '8px',        // Esquinas redondeadas (opcional)
                padding: '20px',            // Espacio interior
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Sombra para darle un toque más elegante
                marginBottom: '20px'        // Espacio debajo del contenedor
            }}>
                <h3>Productos</h3>
                {/* Contenedor con Flexbox para organizar los gráficos */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '20px',  // Espacio entre los gráficos
                    width: '100%',
                    padding: '20px',
                }}>

                    {/* Gráfico 1 */}
                    <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Productos vendidos</h5>

                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={chartDataPieProductosPedidos}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    fill={getRandomColorInRange('#FCBB3A')
                                    }
                                    label
                                />
                                {chartDataPieProductosPedidos.map((entry, index) => (
                                    <cell key={index} fill={getRandomColorInRange('#FCBB3A')} />/*#${Math.floor(Math.random() * 16777215).toString(16)}*/
                                ))}
                                <Tooltip />
                                {/*<Legend /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Pedidos por Categoría</h5>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={chartDataPie}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    //fill={getRandomColor()}//"#8884d8"
                                    fill={getRandomColorInRange('#FCBB3A')}/*#${Math.floor(Math.random() * 16777215).toString(16)}}*/
                                    label
                                />
                                {chartDataPie.map((entry, index) => (
                                    <cell key={index} fill={colors[index]} />
                                ))}
                                <Tooltip />
                                {/*{/<Legend />/}*/}
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>

            </div>
            {/*<div style={{*/}
            {/*    border: '2px solid #ccc',  // Borde gris claro*/}
            {/*    borderRadius: '8px',        // Esquinas redondeadas (opcional)*/}
            {/*    padding: '20px',            // Espacio interior*/}
            {/*    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Sombra para darle un toque más elegante*/}
            {/*    marginBottom: '20px'        // Espacio debajo del contenedor*/}
            {/*}}>*/}
            {/*    /!*<h3>Clientes</h3>*!/*/}
            {/*    /!* Contenedor con Flexbox para organizar los gráficos *!/*/}
            {/*    <div style={{*/}
            {/*        display: 'flex',*/}
            {/*        flexWrap: 'wrap',*/}
            {/*        justifyContent: 'space-between',*/}
            {/*        gap: '20px',  // Espacio entre los gráficos*/}
            {/*        width: '100%',*/}
            {/*        padding: '20px',*/}
            {/*    }}>*/}

                    {/* Gráfico 1 */}
            {/*        /!*<div style={{ width: '45%', textAlign: 'center' }}>*!/*/}
            {/*        /!*    <h5>Activos</h5>*!/*/}
            {/*        /!*    <ResponsiveContainer width="100%" height={400}>*!/*/}
            {/*        /!*        <BarChart data={dataForBarChart}>*!/*/}
            {/*        /!*            <CartesianGrid strokeDasharray="3 3" />*!/*/}
            {/*        /!*            <XAxis dataKey="nombre" />*!/*/}
            {/*        /!*            <YAxis />*!/*/}
            {/*        /!*            <Tooltip />*!/*/}
            {/*        /!*            <Legend />*!/*/}
            {/*        /!*            <Bar dataKey="TotalPedidos" fill="#8884d8" />*!/*/}
            {/*        /!*            <Bar dataKey="TotalGastado" fill="#82ca9d" />*!/*/}
            {/*        /!*        </BarChart>*!/*/}
            {/*        /!*    </ResponsiveContainer>*!/*/}
            {/*        /!*</div>*!/*/}

                    {/*/!* Gráfico de Radar *!/*/}
            {/*        /!*<div style={{ width: '45%', textAlign: 'center' }}>*!/*/}
            {/*        /!*    <h5>Activos Radar</h5>*!/*/}
            {/*        /!*    <ResponsiveContainer width="100%" height={400}>*!/*/}
            {/*        /!*        <RadarChart data={dataForRadar}>*!/*/}
            {/*        /!*            <PolarGrid />*!/*/}
            {/*        /!*            <PolarAngleAxis dataKey="cliente_apellido" />*!/*/}
            {/*        /!*            <PolarRadiusAxis angle={30} domain={[0, 50000]} />*!/*/}
            {/*        /!*            <Radar name="TotalPedidos" dataKey="TotalPedidos" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />*!/*/}
            {/*        /!*            <Radar name="TotalGastado" dataKey="TotalGastado" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />*!/*/}
            {/*        /!*            <Tooltip*!/*/}
            {/*        /!*                formatter={(value, name) => {*!/*/}
            {/*        /!*                    // Si el nombre es "TotalGastado", agregamos el signo $*!/*/}
            {/*        /!*                    if (name === "TotalGastado") {*!/*/}
            {/*        /!*                        return `${value.toLocaleString()}`;*!/*/}
            {/*        /!*                    }*!/*/}
            {/*        /!*                    // Si no es "TotalGastado" (como en TotalPedidos), solo devolvemos el valor sin el signo $*!/*/}
            {/*        /!*                    return value.toLocaleString();*!/*/}
            {/*        /!*                }}*!/*/}
            {/*        /!*            />*!/*/}
            {/*        /!*            <Legend />*!/*/}
            {/*        /!*        </RadarChart>*!/*/}
            {/*        /!*    </ResponsiveContainer>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>
    );
};



export default Informes;