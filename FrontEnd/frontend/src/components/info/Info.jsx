import './info.css';

export function Info() {
    return (
        <div className="container-page">
            <div className="info-row">
                <div className='info-col'>
                    <h1>¿FORMAS DE PAGO?</h1>
                    <ul className="payment-list">
                        <li>EFECTIVO</li><p>Los pagos en efectivo deben realizarse al moneto de la entrega del pedido</p>
                        <li>TRANSFERENCIA</li><p>Las transferencia deben realizarse al mometo de realizar la compra via web y mandand el comprobante via WhastsApp</p>
                        <li>TARJETA</li><p>Los productos abonados con tarjeta tiene un recaro del 10%</p>
                    </ul>
                </div>
                <div className='info-col'>
                    <h1>ENTREGAS</h1>
                    <p>Las entregas se realizaran los dias:</p>
                    <ul className="payment-list">
                        <li>MARTES</li><p>Tods aquellos pedidos abonados hasta el dia Lunes a las 00hs</p>
                        <li>SABADO</li><p>Todos aquellos pedidos abonados hasta el via Viernes a las 00hs</p>
                    </ul>
                </div>
                <div className='info-col'>
                    <h1>DEVOLUCIONES</h1>
                    <p>No se realizara devoluciones de dinero, se entregarn en un futuro auqellos productos señados</p>
                </div>
            </div>
        </div>
    );
}
