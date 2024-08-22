import React, { useState } from 'react'
import AdminWrapper from '../../AdminUI/AdminWrapper/AdminWrapper'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetRequestAdminQuery } from '../../../store/services/admin';
import classes from "../../../Styles/Dashboard.module.css"
function Dashboard() {

  const [status, setStatus] = useState<string>("");
  const { data = [], isLoading } = useGetRequestAdminQuery(
    "/order_by_status?status=" + status
  );
  const { data: summary = [], isLoading: isLoadingSummary } = useGetRequestAdminQuery(
    "/admin/summary"
  );

  return (
    <AdminWrapper>
      <>

      <div className={classes.wrapper_}>

        {summary.map((item: any) => {
          return  <div>
          <h3>{item.name} ({item.length})</h3>
          {item.total &&
          <p>₦{item.total?.toLocaleString("en")!}</p>
          }
        </div>
        })}
       
      </div>

      <br />
      <br />

      <ResponsiveContainer width="100%" height="50%">
                <LineChart
                  // width={500}
                  height={200}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#ca4bd3" />
                </LineChart>
              </ResponsiveContainer>
      
      </>
    </AdminWrapper>
  )
}

export default Dashboard