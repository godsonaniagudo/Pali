import logo from "../../Assets/img/logoPlain.svg"
import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import "./styles/style.css"

const LoginHome = () => {
    return (
        <div className="login fullScreenSize">
                    <nav>
                        <img alt="logo" src={logo} />
                        <p className="font14">Don't have an account? <a className="linkText">Get started for free</a></p>
                    </nav>

                    <div className="content">

                    <p className="oxfordText font24 headerText weight500 centerText">Welcome Back!</p>

                    <form>
                        <FormInput
                        label="Email address"
                        />

                        <FormInput
                        label="Password"
                        type="password"
                        />

                        <Button label="SIGN IN" />

                        <div className="mt15 ">
                            <a className="underlined">Forgot password?</a>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default LoginHome