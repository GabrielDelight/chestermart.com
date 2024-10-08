import AdminWrapper from "../../AdminUI/AdminWrapper/AdminWrapper";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "../../../Styles/AdminProduct.module.css";
import { useGetRequestAdminQuery } from "../../../store/services/admin";

function AdminUsers() {

  const {data: users = []} = useGetRequestAdminQuery("/users")
  
  return (
    <AdminWrapper>
      <div className={classes.main_}>
        <div>
          <header className={classes.header}>
            <h1>Users</h1>
          </header>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>First name</Th>
              <Th>Lastname name</Th>
              <Th>Email</Th>
              <Th>Phone number</Th>
              <Th>Created at</Th>
              {/* <Th>Delete</Th> */}
            </Tr>
          </Thead>

          <Tbody>
            {users.map((item: any, index: number) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item?.firstname}</Td>
                  <Td>{item?.lastname}</Td>
                  <Td>{item?.email}</Td>
                  <Td>{item?.phoneNumber}</Td>
                  <Td>{new Date(item?.createdAt).toLocaleDateString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>

      
    </AdminWrapper>
  );
}

export default AdminUsers;

