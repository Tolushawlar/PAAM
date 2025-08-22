import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import SelectField from "../../UI/SelectField";


function UserDonorsHub() {
    const paymentOptions = [
        { value: "card", label: "Credit/Debit Card" },
        { value: "bank", label: "Bank Transfer" },
        { value: "paypal", label: "PayPal" },
        { value: "crypto", label: "Cryptocurrency" },
    ];
    return (
        <div className="space-y-12 p-6 w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Hub</h1>
                <p className="text-gray-600">Thank you for considering a donation to PAAM Global. Your contributions help us advance our mission to empower communities and drive positive change.</p>
            </div>

            {/* Publications Section */}
            <div className="space-y-6">
                <p className="text-lg font-semibold">Giving Options</p>
                <div className="flex justify-start gap-4">
                    <Button title="One-Time Giving" />
                    <Button title="Recurring Giving" />
                    <Button title="Campaign-Based Giving" />
                </div>
            </div>

            {/* Donation Form Section*/}
            <div className="space-y-6">
                <p className="text-lg font-semibold">Donation Form</p>
                <InputField
                    label="Donation Amount"
                    placeholder="Enter  amount"
                />

                <SelectField
                    label="Payment Method"
                    placeholder="Select  payment  method"
                    options={paymentOptions}
                />

                <div>
                    <Button title="Donate Now"/>
                    <p className="text-gray-600 my-6">Your payment information is secure and protected.</p>
                </div>


            </div>





        </div>
    );
}

export default UserDonorsHub;