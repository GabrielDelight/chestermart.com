import React, { useEffect, useState } from "react";
import AdminWrapper from "../../AdminUI/AdminWrapper/AdminWrapper";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "../../../Styles/AdminProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import {
  useGetRequestAdminQuery,
  useUploadFileAdminMutation,
} from "../../../store/services/admin";
import { ProductUrl } from "../../../ImageUrl/ImageUrl";
import Swal from "sweetalert2";
import NotFound from "../../UI/NotFound/NotFound";
import Spinner from "../../UI/Spinner/Spinner";
import { useGetRequestQuery } from "../../../store/services/users";
import { useInView } from "react-intersection-observer";
import LazyImage from "../../LazzyLoad/LazyImage";

function AdminProductPage() {
  const naviage = useNavigate();

  const [PostRequest] = useUploadFileAdminMutation();

  const onClickHandler = (id: string) => {
    naviage("/product/" + id);
  };
  const updateProeuct = (id: string) => {
    naviage("/update-product/" + id);
  };

  const onDeleteHandler = (id: string) => {
    const istrue = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!istrue) return;

    PostRequest({
      url: "/delete-product/" + id,
      body: {},
    })
      .unwrap()
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: data.message,
        });
        console.log(data);
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


  const [limit, setLimit] = useState<number>(10);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useGetRequestQuery("/products?limit=" + limit);


  const {
    data: productLength ,
  } = useGetRequestQuery("/products-length");

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
    <AdminWrapper>
      <div className={classes.main_}>
        <div>
          <header className={classes.header}>
            <h1>Products ({productLength?.length!})</h1>

            <Link to={"/admin/products/create"}>
              <button>
                <BsPlus size={30} />
                Create
              </button>
            </Link>
          </header>
        </div>

        {products.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Product Id</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Brand</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Image 1</Th>
                <Th>Created at</Th>
                <Th>View</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>

            <Tbody>
              {products.map((item: any, index: any) => {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item?._id?.substr(0, 20) + "..."}</Td>
                    <Td>{item?.name!}</Td>
                    <Td>{item?.description?.substr(0, 20)!}</Td>
                    <Td>{item?.price!}</Td>
                    <Td>{item?.brand!}</Td>
                    <Td>{item?.category!}</Td>
                    <Td>{item?.status!}</Td>
                    <Td>
                    <LazyImage       width={50}
                        height={50} src={ProductUrl() + item?.image1} alt="" />

                    </Td>
                    <Td>{new Date(item?.createdAt).toLocaleDateString()}</Td>
                    <Td onClick={() => onClickHandler(item?._id!)}>
                      <button>View</button>
                    </Td>
                    <Td onClick={() => updateProeuct(item?._id!)}>
                      <button>Update</button>
                    </Td>
                    <Td onClick={() => onDeleteHandler(item?._id!)}>
                      <button>Delete</button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}

        {isLoading && <Spinner />}

        {products.length < 1 && isLoading === false ? (
          <NotFound />
        ) : null}
      </div>

      <div ref={ref} style={{ height: "20px" }} />

    </AdminWrapper>
  );
}

export default AdminProductPage;
