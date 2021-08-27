import { useEffect, useState } from "react";
import usePayMethods from "../hooks/usePayMethods";
import Button from "./Button";
import CustomInput from "./CustomInput";
import { IoClose } from "react-icons/io5";
import { isNumber, isRequired, validate } from "../helpers/formsValidations";


const PayMethodSection = ({ onChange, values, ...rest }) => {

    const [{ payMethods, error, loading }, getPayMethods] = usePayMethods();

    const [banksAccounts, setBanksAccounts] = useState([]);

    const [bankTransfers, setBankTransfers] = useState([]);

    const [bankTransfersTotal, setBankTransfersTotal] = useState(0)

    const [selectedBankAccountId, setSelectedBankAccountId] = useState("");

    const [paymentInfoForm, setPaymentInfoForm] = useState({ reference: "", amount: 0 });

    const [errorsForm, setErrorsForm] = useState({
        reference: null,
        amount: null
    });

    useEffect(() => {
        if (selectedBankAccountId) {
            setBanksAccounts((oldBanksAccounts) => {
                console.log(oldBanksAccounts.filter((account) => account.id === selectedBankAccountId));
                return oldBanksAccounts.filter((account) => account.id === selectedBankAccountId);
            })
        }
        setBankTransfers([]);
    }, [selectedBankAccountId]);

    useEffect(() => {
        onChange({ target: { name: "bankTransfers", value: bankTransfers, type: "custom" } })
    }, [bankTransfers]);

    useEffect(() => {
        console.log(bankTransfersTotal);
    }, [bankTransfersTotal])

    useEffect(() => {
        onChange({ target: { value: "", name: "bankAccountId", type: "checkbox" } });
        setSelectedBankAccountId("")
    }, [values.paymentMethodCode]);

    useEffect(() => {
        setErrorsForm({
            reference: validate(paymentInfoForm.reference, [
                { validator: isRequired, errorMessage: "La referencia es obligatoria." },
            ]),
            amount: validate(paymentInfoForm.amount, [
                { validator: isRequired, errorMessage: "El monto es obligatorio." },
            ])
        });
    }, [paymentInfoForm])

    const handleChange = (e, banksAccounts) => {
        onChange(e);
        setBanksAccounts(banksAccounts);
    }

    const handleBankAccount = (e) => {
        setSelectedBankAccountId(Number(e.target.value));
    }

    const handlePaymentChange = (e) => {
        setPaymentInfoForm((oldPaymentInfoForm) => {
            return {
                ...oldPaymentInfoForm,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let errors in errorsForm) {
            if (errorsForm[errors] != null) {
                alert(errorsForm[errors]);
                return;
            }
        }

        setBankTransfers((oldBankTransfers) => {
            return [...oldBankTransfers, { ...paymentInfoForm, bankAccountId: selectedBankAccountId }]
        })
    }

    const handleRemove = (bankTransfer) => {
        setBankTransfers((oldBankTransfers) => {
            return [...oldBankTransfers.filter(oldBankTransfers => oldBankTransfers !== bankTransfer)];
        });
    }

    return (
        <div className="my-6 border-b p-4 animate__animated animate__fadeInUp">
            <h2 className="text-2xl mb-4">
                Seleccione el metodo de pago:
            </h2>
            {
                loading ?
                    <div className="text-main text-xl">
                        Cargando...
                    </div>
                    :
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            {
                                payMethods?.map((payMethod, i) => {
                                    return (
                                        <div key={i} className="w-4/12">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    name="paymentMethodCode"
                                                    id={`payment-${payMethod.code}`}
                                                    checked={values.paymentMethodCode === payMethod.code}
                                                    value={payMethod.code}
                                                    onChange={(e) => { handleChange(e, payMethod.bankAccounts) }} />
                                                <label className="text-center space-x-4" htmlFor={`payment-${payMethod.code}`}>
                                                    {
                                                        payMethod.imgPath &&
                                                        <img className="h-12 w-16 rounded m-auto" src={`${process.env.REACT_APP_API_URL}${payMethod.imgPath}`} alt={payMethod.name} />
                                                    }
                                                    <p>{payMethod.name}</p>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {
                                values.paymentMethodCode ?
                                    banksAccounts?.length > 0 ?
                                        <div className="mt-8 animate__animated animate__fadeInUp">
                                            {
                                                !selectedBankAccountId &&
                                                <h3 className="mb-2 text-gray-500 font-bold">Por favor seleccione la cuenta a la cual va a pagar:</h3>
                                            }
                                            {
                                                banksAccounts?.map((bankAccount, i) => {
                                                    return (
                                                        <div key={i} className="mb-2 flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                name="bankAccountId"
                                                                id={`bank-account-${bankAccount.id}`}
                                                                checked={selectedBankAccountId === bankAccount.id}
                                                                value={bankAccount.id}
                                                                onChange={handleBankAccount} />
                                                            <label className="flex items-center justify-between space-x-8" htmlFor={`bank-account-${bankAccount.id}`}>
                                                                <div className="text-center">
                                                                    {
                                                                        bankAccount?.cardIssuer?.imgPath &&
                                                                        <img className="h-12 w-16 rounded" src={`${process.env.REACT_APP_API_URL}/${bankAccount?.cardIssuer?.imgPath}`} alt="" />
                                                                    }
                                                                    {bankAccount?.cardIssuer?.name}
                                                                </div>
                                                                <div className="text-center">
                                                                    <b>Alias</b>
                                                                    <p>{bankAccount.alias}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <b>Nro. de cuenta</b>
                                                                    <p>{bankAccount?.accountNumber}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <b>Oficina</b>
                                                                    <p>{bankAccount?.branchOffice}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <b>CBU</b>
                                                                    <p>{bankAccount?.cbu}</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        <div className="text-red-500 text-xl">
                                            No hay cuentas disponibles para este metodo de pago.
                                        </div>
                                    :
                                    <div>
                                        Seleccione un metodo de pago.
                                    </div>
                            }
                        </div>
                        {
                            selectedBankAccountId &&
                            <div className="mt-8">
                                <h3 className="text-lg">Agregue la información del pago</h3>
                                {
                                    bankTransfers.map((bankTransfer, i) => {
                                        return (
                                            <div className="animate__animated animate__fadeInLeft flex items-center mt-4 space-x-8">
                                                <div>
                                                    {bankTransfer.reference}
                                                </div>
                                                <div>
                                                    {bankTransfer.amount}
                                                </div>
                                                <div>
                                                    <Button type="button" onClick={(e) => { handleRemove(bankTransfer) }} className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                        <IoClose></IoClose>
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <form onSubmit={handleSubmit}>
                                    <div className="flex items-center mt-4 space-x-8">
                                        <div>
                                            <label htmlFor="reference">Referencia</label>
                                            <CustomInput
                                                id="reference"
                                                onChange={handlePaymentChange}
                                                value={paymentInfoForm.reference}
                                                placeholder="Referencia..."
                                                name="reference" />
                                            {
                                                errorsForm.reference &&
                                                <p className="text-red-500">{errorsForm.reference}</p>
                                            }
                                        </div>
                                        <div>
                                            <label htmlFor="amount">Monto</label>
                                            <CustomInput
                                                id="amount"
                                                step="0.01"
                                                type="number"
                                                onChange={handlePaymentChange}
                                                value={paymentInfoForm.amount}
                                                placeholder="Monto..."
                                                name="amount" />
                                            {
                                                errorsForm.amount &&
                                                <p className="text-red-500">{errorsForm.amount}</p>
                                            }
                                        </div>
                                        <div>
                                            <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                Agregar mas
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
            }
        </div >
    )
}

export default PayMethodSection;