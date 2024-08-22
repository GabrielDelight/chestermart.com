import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./OrderList.module.css";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useGetRequestQuery } from "../../../store/services/users";
import NotFound from "../NotFound/NotFound";

function OrderList() {
  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("");
  const { data = [] } = useGetRequestQuery(
    "/billing-addresses?status=" + status
  );

  const onSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const onClickHandler = (id: string) => {
    navigate("/order-lists/" + id);
  };
  return (
    <>
      <header className={classes.header}>
        <h1>Order(s)</h1>
        <select name="" id="" onChange={onSelectChangeHandler}>
          <option value="all">all</option>
          <option value="paid">Paid</option>
          <option value="rejected">rejected</option>
          <option value="appreoved">Approved</option>
          <option value="delivered">Delivered</option>
          <option value="processing">Processing</option>
        </select>
      </header>
      <div className={classes.main_}>
        {data.length > 0 ? (
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
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.order_id}</Td>
                    <Td>{item.firstname}</Td>
                    <Td>{item.lastname}</Td>
                    <Td>
                      <div className="short_tr">{item.email}</div>
                    </Td>
                    <Td>
                    <div className="short_tr">{item.phoneNumber}</div>
                    </Td>
                    <Td>
                    <div className="short_tr">{item.address}</div>

                      </Td>
                    {/* <Td>{item.country}</Td> */}
                    <Td>{item.state}</Td>
                    <Td>{item.city}</Td>
                    {/* <Td>{item.postalCode}</Td> */}
                    <Td>{item.quantity}</Td>
                    <Td>{item.total}</Td>
                    <Td>{item.status}</Td>
                    <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                    <Td><button onClick={() => onClickHandler(item.order_id)}>View</button></Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}

export default OrderList;
