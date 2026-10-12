import { useRef, useState } from "react";

export default function FormValidation() {
    /* Hooks  */
    const formRef = useRef(null);
    const [isFormSent, setFormSend] = useState(false) // if format send displayed alerte Succes
    const [errors, setErrors] = useState({}) // collect Errors
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false)

    /* Validate Form  */
    const ValidateForm = () => {
        const FormDatas = new FormData(formRef.current)
        const name = FormDatas.get("name");
        const email = FormDatas.get("email");
        const Message = FormDatas.get("Message");
        const checkbox = formRef.current.elements.accept;
        let isFormValids = true
        setErrors([])

        function Empty(fieldName, Value) {
            if (Value.trim() === "") {
                setErrors(prevState => { return { ...prevState, ...{ [fieldName]: "field required" } } });
                isFormValids = false;
            }
        }
        Empty("name", name);
        Empty("email", email)
        Empty("Message", Message)

        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setErrors(prevState => { return { ...prevState, ...{ email: "email Incorrect" } } });
            isFormValids = false;
        }

        if (!checkbox.checked) {
            setErrors(prevState => { return { ...prevState, ...{ accept: "the checkBox must be checked" } } });
            isFormValids = false;
        }
        setIsFormValid(isFormValids)
        return isFormValid
    }

    const handleChange = () => {
        ValidateForm()
    }

    // Display Errors Alert
    const DisplayErrors = () => {
        return Object.entries(errors).map((error, key) => {
            const [field, message] = error
            return <li key={key}>{field}: {message}</li>
        })
    }

    // Display Errors  below the input field
    const DisplayError = (fieldName) => {
        const error = errors[fieldName];

        if (error !== undefined) {
            return <div className="text-danger">{error}</div>;
        }
    };

    // Verify Data Before Send
    function HandleSubmit(e) {
        e.preventDefault()
        setIsSubmitted(true);
        if (ValidateForm()) {
            setFormSend(true)
            formRef.current.reset();
        } else {
            setFormSend(false)

        }
    }

    return (
        <>
            <div className="container">
                {Object.keys(errors).length > 0 ?
                    <div className="alert alert-danger" role="alert">
                        <strong>Errors</strong>
                        <ul>
                            {DisplayErrors()}
                        </ul>
                    </div> : ""
                }

                <h1 className="mt-3 mb-5">Contact Form</h1>
                {isFormSent ? <div class="alert alert-success" role="alert" >
                    <strong>Success</strong> Message Successfully!!
                </div> : ""}

                <form ref={formRef} action="" onSubmit={HandleSubmit} onChange={handleChange}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text" className={`form-control ${isSubmitted && errors.name !== undefined ? "is-invalid" : ""
                            }`} name="name" id="name" placeholder="XXXX" />
                        {DisplayError("name")}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input type="text" className={`form-control ${isSubmitted && errors.email !== undefined ? "is-invalid" : ""
                            }`} name="email" id="email" placeholder="abc@mail.com" />
                        {DisplayError("email")}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Message</label>
                        <textarea className={`form-control ${isSubmitted && errors.Message !== undefined ? "is-invalid" : ""
                            }`} name="Message" id="Message" rows="3"></textarea>
                        {DisplayError("Message")}
                    </div>
                    <input className={`form-check-input  ${isSubmitted && errors.accept !== undefined ? "is-invalid" : ""
                        }`} type="checkbox" name="accept" id="accept" />
                    <label htmlFor=""> Accepte All Condition </label>
                    {DisplayError("accept")}
                    <div className="mt-3">
                        <button className="btn btn-primary" type="submit">Send</button>
                    </div>
                </form >
            </div>
        </>
    );
}
