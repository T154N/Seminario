import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
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
    const [aniosPedidos, setAniosPedidos] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [pedidoDiario, setPedidoDiario] = useState([]);
    const [pedidoSemanal, setPedidoSemanal] = useState([]);
    const [pedidoMensual, setPedidoMensual] = useState([]);
    const [pedidoAnual, setPedidoAnual] = useState([]);



    const dataPedidoCategorias = [
        { categoria_id: 27, categoria_nombre: "Pilas", total_pedidos: 4, total_cantidad: 21 },
        { categoria_id: 3, categoria_nombre: "Bolsas", total_pedidos: 1, total_cantidad: 5 }
    ];


    const dataWithMonthYear = ChartDataPedidosPorMes.map(item => ({
        ...item,
        MesAnio: `${item.Mes < 10 ? '0' + item.Mes : item.Mes}-${item.Anio}`,
        // Ajustamos el nombre del mes para hacerlo más comprensible
        MesNombre: new Date(0, item.Mes - 1).toLocaleString('default', { month: 'short' })
    }));

    const dataGroupedByYear = dataWithMonthYear.reduce((acc, item) => {
        if (!acc[item.Anio]) {
            acc[item.Anio] = [];
        }
        acc[item.Anio].push(item);
        return acc;
    }, {});

    const chartData = Object.keys(dataGroupedByYear).map(year => {
        const yearData = dataGroupedByYear[year];
        const yearObj = {
            Anio: year,
            "01": 0, "02": 0, "03": 0, "04": 0, "05": 0, "06": 0,
            "07": 0, "08": 0, "09": 0, "10": 0, "11": 0, "12": 0,
        };

        yearData.forEach(item => {
            const mes = item.Mes < 10 ? '0' + item.Mes : item.Mes;
            yearObj[mes] = item.TotalDinero;
        });

        return yearObj;
    });

    const months = [
        { num: "01", name: "Enero" }, { num: "02", name: "Febrero" }, { num: "03", name: "Marzo" },
        { num: "04", name: "Abril" }, { num: "05", name: "Mayo" }, { num: "06", name: "Junio" },
        { num: "07", name: "Julio" }, { num: "08", name: "Agosto" }, { num: "09", name: "Septiembre" },
        { num: "10", name: "Octubre" }, { num: "11", name: "Noviembre" }, { num: "12", name: "Diciembre" }
    ];
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const chartDataPie = dataPedidoCategorias.map(item => ({
        name: item.categoria_nombre,
        value: item.total_pedidos
    }));



    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const anios = await obtenerAniosPedidos();
            if (Array.isArray(anios)) {
                setAniosPedidos(anios);
            } else {
                setError('Error al obtener los años de pedidos.');
            }

            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1); // Sumar 1 día a la fecha actual
            const defaultEndDate = currentDate.toISOString().split('T')[0];

            currentDate.setDate(currentDate.getDate() - 30); // Restar 30 días para la fecha de inicio
            const defaultStartDate = currentDate.toISOString().split('T')[0];

            const startDate = fechaInicio || defaultStartDate;
            const endDate = fechaFin || defaultEndDate;

            console.log("Fecha de inicio:", startDate);
            console.log("Fecha de fin:", endDate);

            const pedidosData = await informesService.getProductosPedidos(startDate, endDate);
            if (Array.isArray(pedidosData)) {
                setProductosPedidos(pedidosData);
                const chartData = pedidosData.map(item => ({
                    name: item.producto_Nombre,
                    value: item.Cantidad
                }));
                setChartDataPieProductosPedidos(chartData);
            } else {
                setError('Error al obtener los productos por pedidos.');
            }

            const pedidosDataPedidosPorMes = await informesService.getTotalPedidosPorMes(selectedYear);
            if (Array.isArray(pedidosDataPedidosPorMes) && pedidosDataPedidosPorMes.length > 0) {
                setChartDataPedidosPorMes(pedidosDataPedidosPorMes);
            } else {
                setError('No se encontraron datos para el año seleccionado.');
            }
        } catch (err) {
            setError('Hubo un error al obtener los informes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDXData = async () => {
            try {
                const dxm = await informesService.getTotalDXM();
                const dxa = await informesService.getTotalDXA();
                const dxs = await informesService.getTotalDXS();
                const dxd = await informesService.getTotalDXD();
                console.log(dxm)
                setPedidoMensual(dxm);
                setPedidoAnual(dxa);
                setPedidoSemanal(dxs);
                setPedidoDiario(dxd);
            } catch (err) {
                setError('Error al obtener los datos DX.');
            }
        };

        if (!loading && !error) {
            fetchDXData();
        }
    }, [loading, error]);

    useEffect(() => {
        if (selectedYear) {
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
    const dataForRadarTotales = ChartDataPedidosPorMes.map(item => ({
        MesAnio: `${item.Mes < 10 ? '0' + item.Mes : item.Mes}-${item.Anio}`,
        TotalPedidos: Math.round(item.TotalPedidos / 1000), // Reducción a miles
        TotalDinero: Math.round(item.TotalDinero / 1000),   // Reducción a miles
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

    function getRandomColorInRange(baseColor) {
        const baseR = parseInt(baseColor.slice(1, 3), 16);
        const baseG = parseInt(baseColor.slice(3, 5), 16);
        const baseB = parseInt(baseColor.slice(5, 7), 16);

        const randomR = Math.min(255, Math.max(0, baseR + Math.floor(Math.random() * 61) - 30));
        const randomG = Math.min(255, Math.max(0, baseG + Math.floor(Math.random() * 61) - 30));
        const randomB = Math.min(255, Math.max(0, baseB + Math.floor(Math.random() * 61) - 30));

        const hexR = randomR.toString(16).padStart(2, '0');
        const hexG = randomG.toString(16).padStart(2, '0');
        const hexB = randomB.toString(16).padStart(2, '0');

        return `#${hexR}${hexG}${hexB}`;
    }

    const randomColor = getRandomColorInRange('#FCBB3A');



    return (
        <div>
            <div style={{
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
            }}>
                <h3>Resumen Monetario por Pedidos</h3>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '20px',
                    width: '100%',
                    padding: '20px',
                }}>
                    <div
                        style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <div style={{ width: '20%', textAlign: 'center' }}>
                            <h5>Diario</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <table border="1" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Estado</th>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Dinero</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidoDiario && pedidoDiario.length > 0 ? (
                                            pedidoDiario.map((pedido, index) => (
                                                <tr key={index}>
                                                    <td>{pedido.ESTADO}</td>
                                                    <td>{pedido.TotalDineroDia}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No hay datos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </ResponsiveContainer>
                            <div className="card mt-3">
                                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                    <h5>Total</h5>
                                    {pedidoDiario &&
                                        <p>${pedidoDiario.reduce((acc, pedido) => acc + pedido.TotalDineroDia, 0).toFixed(2)}</p>}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', textAlign: 'center' }}>
                            <h5>Semanal</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <table border="1" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Estado</th>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Dinero</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidoSemanal && pedidoSemanal.length > 0 ? (
                                            pedidoSemanal.map((pedido, index) => (
                                                <tr key={index}>
                                                    <td>{pedido.ESTADO}</td>
                                                    <td>{pedido.TotalDineroDia}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No hay datos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </ResponsiveContainer>
                            <div className="card mt-3">
                                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                    <h5>Total</h5>
                                    {pedidoSemanal &&
                                        <p>${pedidoSemanal.reduce((acc, pedido) => acc + pedido.TotalDineroDia, 0).toFixed(2)}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', textAlign: 'center' }}>
                            <h5>Mensual</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <table border="1" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Estado</th>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Dinero</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidoMensual && pedidoMensual.length > 0 ? (
                                            pedidoMensual.map((pedido, index) => (
                                                <tr key={index}>
                                                    <td>{pedido.ESTADO}</td>
                                                    <td>{pedido.TotalDineroDia}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No hay datos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </ResponsiveContainer>
                            <div className="card mt-3">
                                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                    <h5>Total</h5>
                                    {pedidoMensual &&
                                        <p>${pedidoMensual.reduce((acc, pedido) => acc + pedido.TotalDineroDia, 0).toFixed(2)}</p>}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', textAlign: 'center' }}>
                            <h5>Anual</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <table border="1" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Estado</th>
                                            <th style={{ backgroundColor: "#f5a70a", color: "white" }}>Dinero</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidoAnual && pedidoAnual.length > 0 ? (
                                            pedidoAnual.map((pedido, index) => (
                                                <tr key={index}>
                                                    <td>{pedido.ESTADO}</td>
                                                    <td>{pedido.TotalDineroDia}</td>


                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No hay datos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </ResponsiveContainer>
                            <div className="card mt-3">
                                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                    <h5>Total</h5>
                                    {pedidoAnual &&
                                        <p>${pedidoAnual.reduce((acc, pedido) => acc + pedido.TotalDineroDia, 0).toFixed(2)}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
            }}>
                <h3>Totales Anuales</h3>
                <div>
                    <label htmlFor="yearSelector">Filtrar por</label>
                    <select style={{ marginLeft: '5px' }}
                        id="yearSelector"
                        className="form-select-sm"
                        value={selectedYear || ''}
                        onChange={(e) => setSelectedYear(e.target.value || null)}
                    >
                        <option value=""> Año</option>
                        {aniosPedidos.map((anio) => (
                            <option key={anio} value={anio}>{anio}</option>
                        ))}
                    </select>
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '20px',
                    width: '100%',
                    padding: '20px',
                }}>
                    <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Por Año</h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Anio" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => {
                                        return `$${value.toLocaleString()}`; // Formato para el Tooltip
                                    }}
                                />
                                <Legend />
                                {months.map((month) => (
                                    chartData.some(item => item[month.num] > 0) && (
                                        <Bar key={month.num}
                                            dataKey={month.num}
                                            stackId="a"
                                            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                                            name={month.name}
                                            label={({ value }) => `$${value.toLocaleString()}`}
                                        />
                                    )
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Pedidos y dinero</h5>
                        <ResponsiveContainer width="100%" height={250}> {/* Reduce la altura */}
                            <RadarChart data={dataForRadarTotales}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="MesAnio" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} /> {/* Máximo ajustado */}
                                <Radar
                                    name="TotalPedidos (en miles)"
                                    dataKey="TotalPedidos"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.6}
                                />
                                <Radar
                                    name="TotalDinero (en miles)"
                                    dataKey="TotalDinero"
                                    stroke="#82ca9d"
                                    fill="#82ca9d"
                                    fillOpacity={0.6}
                                />
                                <Tooltip formatter={(value) => `${value}K`} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>

                    </div>
                </div>
            </div>
            <div style={{
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
            }}>
                <h3>Productos</h3>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '20px',
                    width: '100%',
                    padding: '20px',
                }}>
                    <div style={{ width: '45%', textAlign: 'center', margin: '0 auto' }}>
                        <h5>Productos vendidos</h5>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={chartDataPieProductosPedidos}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    fill={getRandomColorInRange('#FCBB3A')}
                                    label
                                />
                                {chartDataPieProductosPedidos.map((entry, index) => (
                                    <cell key={index} fill={getRandomColorInRange('#FCBB3A')} />
                                ))}
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/*  <div style={{ width: '45%', textAlign: 'center' }}>
                        <h5>Pedidos por Categoría</h5>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={chartDataPie}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    fill={getRandomColorInRange('#FCBB3A')}
                                    label
                                />
                                {chartDataPie.map((entry, index) => (
                                    <cell key={index} fill={colors[index]} />
                                ))}
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default Informes;