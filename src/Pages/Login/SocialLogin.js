import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../api/auth';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const user = res.user;
                console.log(user);
                // get JWT Token 
                setAuthToken(user);
                alert('Logged In Successfully!');
                navigate(from, { replace: true });
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <p className="text-center py-4">Or,</p>
            <p className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-block btn-outline btn-accent">Sign In with Google</button>
            </p>
        </div>
    );
};

export default SocialLogin;