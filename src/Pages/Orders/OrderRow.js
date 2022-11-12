import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, service, serviceName, customer, phone, price, email, status } = order;
    const [orderService, setOrderService] = useState({});

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/services/${service}`)
                .then(res => res.json())
                .then(data => setOrderService(data))
        }, 1000);
    }, [service])

    return (
        <tr className='text-center'>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className="btn btn-ghost">x</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>{email}</td>
            <th>
                <button onClick={() => handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
            </th>
        </tr>
    );
};

export default OrderRow;