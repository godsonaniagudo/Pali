import { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router"
import Button from "../../Components/Button/button";
import getPlain from "../../helpers/requests/getPlain";
import successIcon from "../../Assets/img/icons/pass.svg"
import alertIcon from "../../Assets/img/icons/alertIcon.svg"
import logo from "../../Assets/img/paliOrange.svg"
import "./styles/styles.css"

const Verify = () => {
  const history = useHistory()
  const otherLocation = useRouteMatch()
  const [verified, setVerified] = useState("")
  const [error, setError] = useState("")


  useEffect(() => {
    verifyEmail()
  }, [])

  const toHome = () => {
    history.push("/")
  }

  const toLogin = () => {
    history.push("/")
  }

  const verifyEmail = async () => {
    
    
    if (!otherLocation.params.id) {
      setError("You do not have a valid verification codee")
      setVerified(false)
    } else {
      try {
        const verifyRequest = await getPlain("/verify/email/" + otherLocation.params.id)
        if (verifyRequest.status) {
          setVerified(true)
        } else {
          console.log(verifyRequest.message);
          setError(verifyRequest.message)
          setVerified(false)
        }
      } catch (error) {
        setError(error.message)
        setVerified(false)
      }
    }
  }

  return (
    <div className="verifyEmail">
      <a href="/"><img alt="logo" src={logo}/></a>

      <div className="content">
        {
          verified && <div className="successDiv">
          <img alt="success icon" src={successIcon} />
          <h2 className="mb10 oxfordText">Email Verified!</h2>
          <p className="mb15 oxfordText font14">Your email address was verified succesfully and you can now login.</p>
          <div>
            <Button label="Login" onClick={() => toLogin()} />
          </div>
        </div>
        }

        {
          !verified && <div className="errorDiv">
          <img alt="errorIcon" src={alertIcon} />
          <h2 className="mb10 oxfordText">An error occurred</h2>
          <p className="mb15 oxfordText font14">{error.slice(0,1).toLocaleUpperCase() + error.slice(1)}</p>
          <div>
            <Button label="Home" onClick={() => toHome()} />
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default Verify