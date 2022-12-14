import { Modal, Form, Row, Button, Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Api from "../../config/api"
import { formatDateTime } from "../../utils/general";

const Add = ({ changeModal, changeNotif, changeData, dataId }) => {
    const { handleSubmit, formState: { errors, isSubmitting }, register, } = useForm({
        defaultValues: initData,
        resolver: validationSchema
    })

    const onSubmit = async (data, e) => {
        Object.keys(data).forEach((key) => {
            if (['status'].includes(key) && data[key] === false) {
                data[key] = 0
            }
            if (['status'].includes(key) && data[key] === true) {
                data[key] = 1
            }
        })
       
        await Api.post(`data`, data).then((res) => {
            if( res.status === 201){
                changeNotif({
                    type: "success",
                    message: "Data has been save.",
                    show: true
                })
                changeData()
            } else {
                changeNotif({
                    type: "error",
                    message: "Failed to save data.",
                    show: true
                })
            }
        }).catch((err) => {
            if (err) {
                console.log(err.response)
            } else {
                console.log(err)
            }

            changeNotif({
                type: "error",
                message: "Failed to save data.",
                show: true
            })
        })
        return changeModal()
    }

    return (
        <div>
            <Modal.Header closeButton={isSubmitting ? false : true}>
                <Modal.Title>Add Data</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Row>
                    <Form.Group className="col-md-12 mb-2">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please Insert"
                                size="sm"
                                isInvalid={!!errors.productID}
                                {...register("productID")}
                            />
                            <Form.Control.Feedback type="invalid">{errors.productID?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-2">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please Insert"
                                size="sm"
                                isInvalid={!!errors.productName}
                                {...register("productName")}
                            />
                            <Form.Control.Feedback type="invalid">{errors.productName?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-2">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please Insert"
                                size="sm"
                                isInvalid={!!errors.customerName}
                                {...register("customerName")}
                            />
                            <Form.Control.Feedback type="invalid">{errors.customerName?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-2">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please Insert"
                                size="sm"
                                isInvalid={!!errors.amount}
                                {...register("amount")}
                            />
                            <Form.Control.Feedback type="invalid">{errors.amount?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="IsActive">
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            custom
                            {...register("status")}
                        />
                    </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" disabled={isSubmitting} variant="dark">
                        {isSubmitting && <Spinner animation="border" size="sm" className="mr-1" />} Save
                    </Button>
                    <Button size="sm" className="text-white" disabled={isSubmitting} onClick={changeModal} variant="warning">Cancel</Button>
                </Modal.Footer>
            </Form>
        </div>
    )
}

const initData = {
    amount: "",
    productID: "",
    customerName: "",
    productName: "",
    transactionDate: formatDateTime(),
    createBy: "Admin",
    createOn: formatDateTime(),
    status: 1,
}

const validationSchema = yupResolver(yup.object().shape({
    amount: yup.string()
        .required("This field is required."),
    productName: yup.string()
        .required("This field is required."),
    customerName: yup.string()
        .required("This field is required."),
}))

export default Add