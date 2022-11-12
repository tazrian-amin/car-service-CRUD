import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    console.log(service);
    const { _id, img, price, title } = service;
    return (
        <div className="card card-compact mx-auto w-80 bg-base-100 shadow-xl">
            <figure><img src={img} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-xl text-orange-600 font-semibold'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-warning">Order Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;