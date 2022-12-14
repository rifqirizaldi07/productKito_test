import {  useEffect } from "react";
import { Modal, Form, Row, Button, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "../../store";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import _ from "lodash"
import Api from "../../config/api"

const Detail = ({ changeModal, changeNotif, changeData, dataId }) => {
    const { handleSubmit, formState: { errors, isSubmitting }, register, reset, } = useForm({
        defaultValues: initData,
        resolver: validationSchema
    })

    const dispatch = useDispatch()
    const detail = useSelector(x => x.product.detail)
    
    useEffect(() => {
        if (!_.isNull(dataId)) dispatch(productsActions.getDetail({ id: dataId }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataId])

    const onSubmit = async (data, e) => {
        Object.keys(data).forEach((key) => {
            if (['status'].includes(key) && data[key] === false) {
                data[key] = 0
            }
            if (['status'].includes(key) && data[key] === true) {
                data[key] = 1
            }
        })

        await Api.put(`data/${dataId}`, data).then((res) => {
            if( res.status === 200){
                changeNotif({
                    type: "success",
                    message: "Data has been update.",
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

    useEffect(() => {
        reset({
            ...initData,
            id: detail?.data?.id || "",
            productID: detail?.data?.productID || "",
            productName: detail?.data?.productName || "",
            customerName: detail?.data?.customerName || "",
            amount: detail?.data?.amount || "",
            status: detail?.data?.status || "",
            createBy: detail?.data?.createBy || "",
            createOn: detail?.data?.createOn || "",
            transactionDate: detail?.data?.transactionDate || "",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[detail])

    return (
        <div>
            <Modal.Header closeButton={isSubmitting ? false : true}>
                <Modal.Title>Detail Data</Modal.Title>
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
                        {isSubmitting && <Spinner animation="border" size="sm" className="mr-1" />} Updated
                    </Button>
                    <Button size="sm" className="text-white" disabled={isSubmitting} onClick={changeModal} variant="warning">Cancel</Button>
                </Modal.Footer>
            </Form>
        </div>
    )
}

const initData = {
    id: "",
    amount: "",
    productID: "",
    customerName: "",
    productName: "",
    transactionDate: "",
    createBy: "",
    createOn: "",
    status: 0,
}

const validationSchema = yupResolver(yup.object().shape({
    amount: yup.string()
        .required("This field is required."),
    productName: yup.string()
        .required("This field is required."),
    customerName: yup.string()
        .required("This field is required."),
}))

export default Detail