import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Checkout = () => {

    useTitle('Checkout');
    const { _id, title, price, img } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.number.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('https://car-server-tau.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('user-access-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Order Placed Successfully!');
                }
                form.reset();
            })
    }

    return (
        <div className='py-10'>
            <div className='flex items-center justify-center mb-4'>
                <img src={img} alt="" />
            </div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-3xl'>You are about to order: {title}</h2>
                <h4 className="text-2xl">Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 py-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" required />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" required />
                    <input name='number' type="number" placeholder="Phone Number" className="input input-bordered w-full" required />
                    <input name='email' type="email" placeholder="Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered w-full" placeholder="Message"></textarea>
                <input className='btn btn-warning mt-4' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;