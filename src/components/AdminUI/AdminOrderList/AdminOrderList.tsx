import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AdminOrderList.module.css";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useGetRequestAdminQuery } from "../../../store/services/admin";
import NotFound from "../../UI/NotFound/NotFound";
import Spinner from "../../UI/Spinner/Spinner";
import { useInView } from "react-intersection-observer";

function AdminOrderList() {
  const navigate = useNavigate();


  const onSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const onClickHandler = (id: string) => {
    navigate("/admin-order-items/" + id);
  };

  const [limit, setLimit] = useState<number>(10);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [status, setStatus] = useState<string>("");

  const { data = [], isLoading, refetch } = useGetRequestAdminQuery(
    `/order_by_status?status=${status}&&limit=${limit}`
  );


  // const {
  //   data: products = [],
  //   isLoading,
  //   refetch,
  // } = useGetRequestQuery("/products?limit=" + limit);


  const {
    data: orderLength ,
  } = useGetRequestAdminQuery("/order-length");

  useEffect(() => {
    if (inView) {
      console.log("Inview");
      setLimit(limit + 10);
      setTimeout(() => {
        refetch();
      }, 100);
    }
  }, [inView]);




  return (
    <div className={classes.main_}>
      <div>
        <header className={classes.header}>
          <h1>Orders ({orderLength?.length!}) </h1>
          <select name="" id="" onChange={onSelectChangeHandler}>
            <option value="all">all</option>
            <option value="paid">Paid</option>
            <option value="rejected">rejected</option>
            <option value="appreoved">Approved</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
          </select>
        </header>
      </div>

      {data.length > 0 && (
        <Table>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Order ID</Th>
              <Th>Firstname</Th>
              <Th>Lastname</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Address</Th>
              {/* <Th>Country</Th> */}
              <Th>State</Th>
              <Th>City</Th>
              {/* <Th>PostalCode</Th> */}
              <Th>Quantity</Th>
              <Th>Total Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((item: any, index: any) => {
              return (

                <Tr key={index}  >
                  <Td>{index + 1}</Td>
                  <Td>{item.order_id}</Td>
                  <Td>{item.firstname}</Td>
                  <Td>{item.lastname}</Td>
                  <Td>
                    <div className="short_tr">{item.email}</div>
                  </Td>
                  <Td>{item.phoneNumber}</Td>
                  <Td>{item.address}</Td>
                  {/* <Td>{item.country}</Td> */}
                  <Td>{item.state}</Td>
                  <Td>{item.city}</Td>
                  {/* <Td>{item.postalCode}</Td> */}
                  <Td>{item.quantity}</Td>
                  <Td>{item.total}</Td>
                  <Td>{item.status}</Td>
                  <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td><button onClick={() => onClickHandler(item.order_id)} >View</button></Td>
                </Tr>

              );
            })}
          </Tbody>
        </Table>
      )}

      {isLoading && <Spinner />}

      {data.length < 1 && isLoading === false ? <NotFound /> : null}

      <div ref={ref} style={{ height: "20px" }} />

    </div>
  );
}

export default AdminOrderList;
