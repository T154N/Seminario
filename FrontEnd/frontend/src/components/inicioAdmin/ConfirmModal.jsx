import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './inicioAdmin.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";
const ConfirmModal = ({ show, onHide, onConfirm, message }) => {
    return (
        <Modal
            show={show} onHide={onHide}>
            <div className="tab-content-area notification-font">
            <Modal.Header closeButton className="contenido-notificaicon">
                <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer >
                <Button type="button" className="btn btn-cancelar" variant="secondary" onClick={onHide}>
                    <FontAwesomeIcon icon={faTimes}/> Cancelar
                </Button>
                <Button className="btn-aceptar" variant="primary" onClick={onConfirm}>
                    <FontAwesomeIcon icon={faSave}/> Aceptar
                </Button>
            </Modal.Footer>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
