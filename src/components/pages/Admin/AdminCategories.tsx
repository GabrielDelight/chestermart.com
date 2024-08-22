import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import AdminWrapper from "../../AdminUI/AdminWrapper/AdminWrapper";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "../../../Styles/AdminProduct.module.css";
import ProductAttributes from "../../AdminUI/ProductAttributes/ProductAttributes";
import { useGetRequestQuery, usePostRequestMutation } from "../../../store/services/users";
import Swal from "sweetalert2";
import Spinner from "../../UI/Spinner/Spinner";
import { useGetRequestAdminQuery, usePostRequestAdminMutation } from "../../../store/services/admin";

function AdminCategories() {
  const [showAttributesModal, setShowAttributeModal] = useState<boolean>(false);
  const toggleAttributeModal = () => {
    setShowAttributeModal(!showAttributesModal);
  };

  const [PostRequest, { isLoading }] = usePostRequestAdminMutation();
  const {data: categories = []} =  useGetRequestAdminQuery("/categories")

  const onSubmitHandler = (values: any) => {
    PostRequest({
      url: "/category",
      body: values,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: data.message,
        });

        toggleAttributeModal()
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message,
        });

        console.log(error);
      });
  };

  const onDeleteHandler = (id: string) => {
    let isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      PostRequest({
        url: "/delete-category/"+id,
        body: {},
      })
        .unwrap()
        .then((data) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: data.message,
          });
         
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.data.message,
          });
  
          console.log(error);
        });
    }
  };




  return (
    <AdminWrapper>
      <div className={classes.main_}>
        <div>
          <header className={classes.header}>
            <h1>Category</h1>

            <button onClick={toggleAttributeModal}>
              <BsPlus size={30} />
              Create
            </button>
          </header>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Created at</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>

          <Tbody>
            {categories.map((item: any, index: number) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item._id}</Td>
                  <Td>{item.name}</Td>
                  <Td>
                    {" "}
                    <div className={classes.custome_td_width}>
                      {item.description}
                    </div>
                  </Td>

                  <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <button onClick={() => onDeleteHandler(item._id)}>
                      Delete
                    </button>

                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>

      <>
        {showAttributesModal && (
          <ProductAttributes
            onClodeHandler={toggleAttributeModal}
            title={"Create Brand"}
            onSubmitHandler={onSubmitHandler}
            isLoading={isLoading}
          />
        )}
      </>
    </AdminWrapper>
  );
}

export default AdminCategories;
