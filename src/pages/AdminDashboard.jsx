import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Package,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState("");

  const fetchOrders = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong while loading orders."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (
    orderNumber,
    orderStatus
  ) => {
    try {
      setUpdatingOrder(orderNumber);
      setErrorMessage("");

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderNumber}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update order status."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.orderNumber === orderNumber
            ? {
                ...order,
                orderStatus:
                  data.order.orderStatus,
                updatedAt: data.order.updatedAt,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong while updating the order."
      );
    } finally {
      setUpdatingOrder("");
    }
  };

  const summary = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter(
        (order) => order.orderStatus === "pending"
      ).length,

      confirmed: orders.filter(
        (order) => order.orderStatus === "confirmed"
      ).length,

      preparing: orders.filter(
        (order) => order.orderStatus === "preparing"
      ).length,

      completed: orders.filter(
        (order) => order.orderStatus === "completed"
      ).length,
    };
  }, [orders]);

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pending",
      confirmed: "Confirmed",
      preparing: "Preparing",
      ready: "Ready",
      out_for_delivery: "Out for Delivery",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return labels[status] || status;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-container">

        {/* Header */}

        <header className="admin-header">
          <div>
            <span className="eyebrow">
              Baba Bakery
            </span>

            <h1>Order Dashboard</h1>

            <p>
              Manage incoming customer orders
              from one place.
            </p>
          </div>

          <button
            type="button"
            className="admin-refresh-button"
            onClick={fetchOrders}
            disabled={isLoading}
          >
            <RefreshCw
              size={17}
              className={
                isLoading
                  ? "admin-refresh-spinning"
                  : ""
              }
            />

            Refresh
          </button>
        </header>

        {/* Summary cards */}

        <section className="admin-summary">

          <div className="admin-summary-card">
            <div className="admin-summary-icon">
              <ShoppingBag size={20} />
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{summary.total}</strong>
            </div>
          </div>

          <div className="admin-summary-card">
            <div className="admin-summary-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{summary.pending}</strong>
            </div>
          </div>

          <div className="admin-summary-card">
            <div className="admin-summary-icon">
              <Package size={20} />
            </div>

            <div>
              <span>Preparing</span>
              <strong>{summary.preparing}</strong>
            </div>
          </div>

          <div className="admin-summary-card">
            <div className="admin-summary-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{summary.completed}</strong>
            </div>
          </div>

        </section>

        {/* Error */}

        {errorMessage && (
          <div className="admin-error">
            {errorMessage}
          </div>
        )}

        {/* Orders */}

        <section className="admin-orders-section">

          <div className="admin-section-header">
            <div>
              <span className="eyebrow">
                Orders
              </span>

              <h2>Recent Orders</h2>
            </div>

            <span className="admin-order-count">
              {orders.length}{" "}
              {orders.length === 1
                ? "order"
                : "orders"}
            </span>
          </div>

          {isLoading ? (
            <div className="admin-empty-state">
              <RefreshCw
                size={24}
                className="admin-refresh-spinning"
              />

              <p>Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="admin-empty-state">
              <ShoppingBag size={32} />

              <h3>No orders yet</h3>

              <p>
                New customer orders will appear
                here.
              </p>
            </div>
          ) : (
            <div className="admin-orders-list">

              {orders.map((order) => (
                <article
                  className="admin-order-card"
                  key={order.orderNumber}
                >

                  {/* Order header */}

                  <div className="admin-order-top">

                    <div>
                      <span className="admin-order-number">
                        {order.orderNumber}
                      </span>

                      <span className="admin-order-date">
                        {formatDate(
                          order.createdAt
                        )}
                      </span>
                    </div>

                    <span
                      className={`admin-status admin-status-${order.orderStatus}`}
                    >
                      {getStatusLabel(
                        order.orderStatus
                      )}
                    </span>

                  </div>

                  {/* Customer */}

                  <div className="admin-order-customer">

                    <strong>
                      {order.customer?.name}
                    </strong>

                    <span>
                      {order.customer?.phone}
                    </span>

                  </div>

                  {/* Order information */}

                  <div className="admin-order-info">

                    <div>
                      <span>Type</span>

                      <strong>
                        {order.orderType ===
                        "delivery"
                          ? "Delivery"
                          : "Pickup"}
                      </strong>
                    </div>

                    <div>
                      <span>Payment</span>

                      <strong>
                        {order.paymentMethod ===
                        "online"
                          ? "Online"
                          : "Cash on Delivery"}
                      </strong>
                    </div>

                    <div>
                      <span>Total</span>

                      <strong>
                        ₹{order.totalAmount}
                      </strong>
                    </div>

                  </div>

                  {/* Items */}

                  <div className="admin-order-items">

                    <span>Items</span>

                    {order.items?.map((item) => (
                      <div
                        className="admin-order-item"
                        key={`${order.orderNumber}-${item.productId}`}
                      >
                        <span>
                          {item.quantity} ×{" "}
                          {item.name}
                        </span>

                        <strong>
                          ₹
                          {item.price *
                            item.quantity}
                        </strong>
                      </div>
                    ))}

                  </div>

                  {/* Delivery address */}

                  {order.orderType ===
                    "delivery" &&
                    order.deliveryAddress
                      ?.addressLine && (
                      <div className="admin-order-address">

                        <span>
                          Delivery Address
                        </span>

                        <p>
                          {
                            order.deliveryAddress
                              .addressLine
                          }

                          {order.deliveryAddress
                            .landmark && (
                            <>
                              <br />
                              {
                                order
                                  .deliveryAddress
                                  .landmark
                              }
                            </>
                          )}

                          <br />

                          {
                            order.deliveryAddress
                              .city
                          }

                          {order.deliveryAddress
                            .pincode && (
                            <>
                              {" "}
                              -{" "}
                              {
                                order
                                  .deliveryAddress
                                  .pincode
                              }
                            </>
                          )}
                        </p>

                      </div>
                    )}

                  {/* Preferred time */}

                  {order.preferredTime && (
                    <div className="admin-order-time">
                      <span>
                        Preferred Time
                      </span>

                      <strong>
                        {order.preferredTime}
                      </strong>
                    </div>
                  )}

                  {/* Notes */}

                  {order.notes && (
                    <div className="admin-order-notes">
                      <span>
                        Customer Note
                      </span>

                      <p>{order.notes}</p>
                    </div>
                  )}

                  {/* Status control */}

                  <div className="admin-order-actions">

                    <label
                      htmlFor={`status-${order.orderNumber}`}
                    >
                      Update Status
                    </label>

                    <select
                      id={`status-${order.orderNumber}`}
                      value={order.orderStatus}
                      disabled={
                        updatingOrder ===
                        order.orderNumber
                      }
                      onChange={(event) =>
                        updateOrderStatus(
                          order.orderNumber,
                          event.target.value
                        )
                      }
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="preparing">
                        Preparing
                      </option>

                      <option value="ready">
                        Ready
                      </option>

                      <option value="out_for_delivery">
                        Out for Delivery
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>

                    {updatingOrder ===
                      order.orderNumber && (
                      <span>
                        Updating...
                      </span>
                    )}

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default AdminDashboard;