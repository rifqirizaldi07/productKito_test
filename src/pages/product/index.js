import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Modal, Spinner, Table } from "react-bootstrap";
import { productsActions } from "../../store/product.slice";
import Notification from "../../components/Notification"
import { isEmptyValue } from "../../utils/general";
import FormDetail from "./detail"
import FormAdd from "./add"

const Product = () => {
  const dispatch = useDispatch()
  const product = useSelector(x => x.product.all)
  const [loading, setLoading] = useState(true)

  const [notif, setNotif] = useState({
    type: null,
    message: "",
    show: false
  })

  const [modalAdd, setModalAdd] = useState(initModal)
  const [modalDetail, setModalDetail] = useState(initModal)

  const handleModalAdd = () => {
    setModalAdd({
      ...modalAdd,
      show: !modalAdd.show
    })
  }

  const handleModalDetail = (id) => {
    setModalDetail({
      ...modalDetail,
      show: !modalDetail.show,
      dataId: id
    })
  }

  const handleModalClose = () => {
    setModalAdd(initModal)
    setModalDetail(initModal)
  }

  useEffect(() => {
    if (loading) dispatch(productsActions.getAll({}))
    return () => setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <div className="container-fluid">
      <div className="col-md-12 container-fluid px-4">
        <div className="d-flex mb-2" style={{ justifyContent: "space-between" }}>
          <h2 className="mt-4">Data Product</h2>
          <div className="mt-5">
            <Button size="sm" variant="dark" onClick={() => handleModalAdd()}>Tambah Data</Button>
          </div>
        </div>
        {notif.show && <Notification
          type={notif.type}
          message={notif.message}
          show={notif.show}
          changeShow={() => setNotif({
            type: null,
            message: "",
            show: false
          })}
        />
        }
        <Card className="mb-4 mt-4">
          <Table striped hover responsive width="100%" cellSpacing="0" cellPadding="0">
            <thead className="thead bg-dark text-white">
              <tr>
                <th className="text-nowrap">PRODUCT ID</th>
                <th className="text-nowrap">PRODUCT NAME</th>
                <th className="text-nowrap">AMOUNT</th>
                <th className="text-nowrap">CUSTOMER NAME</th>
                <th className="text-nowrap">CREATED</th>
                <th className="text-nowrap">STATUS</th>
                <th className="text-nowrap text-center">ACTION</th>
              </tr>
            </thead>
            <tbody >
              {product.loading &&
                <tr>
                  <td colSpan="7" className="text-center">
                    <Spinner animation="border" size="sm" className="mr-1" />
                    Loading data...
                  </td>
                </tr>
              }
              {
                product.error && isEmptyValue(product.data) &&
                <tr>
                  <td colSpan="7" className="text-center">
                    <span className="text-danger">No data found</span>
                  </td>
                </tr>
              }
              {
                !product.error && !product.loading && !isEmptyValue(product.data) &&
                product.data.map((row, i) => (
                  <tr key={i}>
                    <td>{row.productID}</td>
                    <td>{row.productName}</td>
                    <td>{row.amount}</td>
                    <td>{row.customerName}</td>
                    <td>{row.createOn}</td>
                    <td>{String(row.status) === "1" ? "Active" : "Not Active"}</td>
                    <td className="text-nowrap text-center">
                      <Button size="sm" className="m-1" title="Detail Data" variant="dark" onClick={() => handleModalDetail(row.id)}>
                        Edit
                      </Button>

                    </td>

                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Card>
      </div>
      <Modal show={modalAdd.show} onHide={handleModalClose} backdrop="static" keyboard={false}>
        <FormAdd
          changeModal={handleModalClose}
          changeNotif={(obj) => setNotif({ ...notif, ...obj })}
          changeData={() => setLoading(true)}
        />
      </Modal>
      <Modal show={modalDetail.show} onHide={handleModalClose} backdrop="static" keyboard={false}>
        <FormDetail
          changeModal={handleModalClose}
          changeNotif={(obj) => setNotif({ ...notif, ...obj })}
          changeData={() => setLoading(true)}
          dataId={modalDetail.dataId}
        />
      </Modal>
    </div>
  )
}
const initModal = {
  show: false,
  dataId: null
}

export default Product
