import './info.css';

export function Info() {
    return (
        <div className="container-page">
            <div className="info-row">
                <div className='info-col'>
                    <h1>¿CUÁNDO SE PUEDEN REALIZAR LOS PEDIDOS?</h1>
                    <p>Los pedidos pueden realizarse todos los días de la semana</p>
                </div>
                <div className='info-col'>
                    <h1>¿CUÁNDO SE REALIZAN LAS ENTREGAS DE LOS PEDIDOS?</h1>
                    <p>Las entregas se realizan los dias:</p>
                    <ul className="payment-list">
                        <li>MIÉRCOLES:</li><p>Todos aquellos pedidos realizados y abonados los días Viernes, Sábado, Domingo y Lunes.</p>
                        <li>SÁBADO:</li><p>Todos aquellos pedidos realizados y abonados los días Martes, Miércoles y Jueves.</p>
                    </ul>
                </div>
                <div className='info-col'>
                    <h1>¿HASTA CUÁNDO PUEDO MODIFICAR MI PEDIDO?</h1>
                    <p>El pedido se puede modificar hasta las 11:59am del día del armado del pedido.</p>
                </div>
                <div className='info-col'>
                    <h1>¿CUÁLES SON LAS FORMAS DE PAGO?</h1>
                    <ul className="payment-list">
                        <li>EFECTIVO</li><p>Los pagos en efectivo deben realizarse al momento de la entrega del pedido</p>
                        <li>TRANSFERENCIA</li><p>Las transferencias deben realizarse al momento de realizar la compra vía web y mandar el comprobante vía WhastsApp</p>
                    </ul>
                </div>
            </div>
        </div>
    );
}







