import "./RecentOrders.css";

const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="recent-orders">

      <div className="recent-header">
        <h2>Recent Orders</h2>
      </div>

      <table>

        <thead>

          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {orders.length === 0 ? (

            <tr>
              <td colSpan="3">
                No Orders Yet
              </td>
            </tr>

          ) : (

            orders.map((order) => (

              <tr key={order._id}>

                <td>{order.user?.name}</td>

                <td>₹{order.totalPrice}</td>

                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default RecentOrders;