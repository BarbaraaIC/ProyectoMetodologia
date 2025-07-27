import { useNavigate } from "react-router-dom"
import LoginRegisterForm from "@components/LoginRegisterForm"
import { registerService } from '@services/auth.service.js'
import '@styles/loginRegister.css'
import luckyCat from "@assets/LuckyCat.png"

const Register = () => {
    const navigate = useNavigate();

    const registerSubmit = async (data) => {
        try {
            const response = await registerService(data);
            if (response.request.status === 201) {
                navigate("/login");
            } else {
                console.error("Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error al registrar usuario", error);
        }
    }
    return (
        <main className="page-root">
<<<<<<< HEAD
        <div className="lucky-cat-container">
            <img src={luckyCat} alt="Lucky Cat" className="lucky-cat" />
        </div>
        <div className="login-register-container">
            <LoginRegisterForm mode="register" onSubmit={registerSubmit} />
        </div>
    </main>
=======
            <div className="lucky-cat-container">
                <img src={luckyCat} alt="Lucky Cat" className="lucky-cat" />
            </div>
            <div className="login-register-container">
                <LoginRegisterForm mode="register" onSubmit={registerSubmit} />
            </div>
        </main>
>>>>>>> f7aad9e897300538d62466b55206dbc40824e4aa
    )
}

export default Register
