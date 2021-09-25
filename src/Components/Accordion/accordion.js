import "./styles/styles.css"
import accordionIcon from "../../Assets/img/icons/accordionIcon.svg"
import openIcon from "../../Assets/img/dropIcon.svg"
import closeIcon from "../../Assets/img/dropIconUp.svg"
import { useEffect, useState } from "react"

const Accordion = ({status, children}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(status)
    }, [])

    const toggleAccordion = () => {
        if (open){
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <div className="accordion">
            <header className="displayFlex flexAlignCenter flexJustifyBetween" onClick={() => toggleAccordion()}>
                <div className="displayFlex flexAlignCenter">
                    <img alt="accordion" src={accordionIcon} />
                    <label>Accordion</label>
                </div>
                <img className="openCloseIcon" alt="open or close icon" src={open ? closeIcon : openIcon} />
            </header>
            {
                open && <hr />
            }
            <div>
                {
                    open && children
                }
            </div>
        </div>
    )
}

export default Accordion