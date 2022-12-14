// import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id":
        "Ab75pEApBfo7em1WUlyyDx1HJsBru4zRPztdrNtRLQzASJyB7NTadveBv4wTpJeAhuUhs1zBp-uzqX8t",
    currency: "USD",
};
const temp = [1000000, 20000000, 300000, 400000];
const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
});

function SubscriptionPage() {
    return (
        <div className="w-full min-h-screen gap-4 flex-wrap flex justify-center items-center">
            <PayPalScriptProvider options={initialOptions}>
                {temp.map((value, index) => (
                    <div key={index}>
                        {/* Card */}
                        <div className="p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl w-11/12 max-w-sm sm:w-72">
                            {/* Image */}
                            <img
                                className="w-full object-cover rounded-xl"
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                                alt=""
                            />
                            <div className="p-2">
                                {/* Heading */}
                                <h2 className="font-bold text-lg mb-2 text-amber-400">
                                    Gói tháng
                                </h2>
                                <div className="grid grid-cols-2 gap-2 py-2">
                                    <div className="font-bold inline text-lg mb-2 ">
                                        {formatter.format(value)}
                                    </div>
                                    <div className="inline font-bold text-lg mb-2 text-right ">
                                        {" "}
                                        30 Ngày
                                    </div>
                                </div>
                                {/* Description */}
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Fusce eget dolor metus.
                                    Vestibulum mattis ultrices tellus at
                                    aliquam. Praesent dapibus lacus ac mi dictum
                                    feugiat. Maecenas eu felis et enim commodo
                                    venenatis dictum nec turpis. Donec non
                                    mattis neque. Duis tincidunt eleifend metus,
                                    ac facilisis felis. Etiam sed augue a.
                                </p>
                            </div>
                            {/* CTA */}
                            <div className="m-2">
                                {/* <Link
                                    role="button"
                                    href="#"
                                    className="text-white bg-sky-400 py-3 rounded-md hover:bg-sky-600 inline-block w-full px-auto text-center"
                                >
                                    Đăng ký
                                </Link> */}
                                <PayPalButtons
                                    fundingSource="paypal"
                                    createOrder={(data, actions) => {
                                        return actions.order
                                            .create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: value,
                                                        },
                                                    },
                                                ],
                                            })
                                            .then((orderId) => {
                                                // Your code here after create the order
                                                console.log(data);
                                                console.log(orderId);
                                                return orderId;
                                            });
                                    }}
                                    onApprove={function (data, actions) {
                                        return actions.order
                                            .capture()
                                            .then(function () {
                                                // Your code here after capture the order
                                                console.log(data);
                                                console.log(actions);
                                            });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </PayPalScriptProvider>
        </div>
    );
}

export default SubscriptionPage;
