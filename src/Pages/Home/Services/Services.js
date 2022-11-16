import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://car-server-tau.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className="my-20">
            <div className='text-center'>
                <p className="my-5 text-2xl font-bold text-orange-600">Service</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p className='my-5 text-gray-600'>The majority have suffered alteration in some form, by injected humour, or randomized <br />words which don't look even slightly believable.</p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;