import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { isEmptyValue } from "../utils/general"
// eslint-disable-next-line no-unused-vars
import _ from "lodash";

export default function Notification({ type = "", title = "", message = "", show, changeShow }) {
    const [showAlert, setShowAlert] = useState(true)
    const typeAlert = type.toString().toLowerCase()
    let variantAlert = "info"

    // eslint-disable-next-line default-case
    switch (typeAlert) {
        case "error":
            variantAlert = "danger"
            break;
        case "success":
            variantAlert = "info"
            break;
        case "warning":
            variantAlert = "warning"
            break;
    }

    useEffect(() => {
        if (show === false) return

        setShowAlert(true)
    }, [show])

    const handleClose = () => {
        setShowAlert(false)
        if (typeof changeShow === 'function') changeShow()
    }

    return (
        <Alert variant={variantAlert} show={showAlert} onClose={handleClose} dismissible>
            {!isEmptyValue(title) && <Alert.Heading  className="mb-0">{title}</Alert.Heading>}
            <p className="mb-0">{!isEmptyValue(message) ? message : "Error"}</p>
        </Alert>
    )
}