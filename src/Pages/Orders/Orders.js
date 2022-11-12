import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this order?');
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Order deleted successfully!');
                        const remainingOrders = orders.filter(odr => odr._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    }

    const handleStatusUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('Order updated successfully!');
                    const remainingOrders = orders.filter(odr => odr._id !== id);
                    const approvingOrder = orders.find(odr => odr._id === id);
                    approvingOrder.status = 'Approved';

                    const newOrdersList = [approvingOrder, ...remainingOrders];
                    setOrders(newOrdersList);
                }
            })
    }

    return (
        <div>
            <h2 className="text-4xl pt-5">You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full my-10">
                <table className="table w-full">

                    <thead>
                        <tr className='text-center'>
                            <th>Remove</th>
                            <th>Customer Info</th>
                            <th>Order Info</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;