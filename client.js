const { AppStrategy, createClient } = require('@wix/sdk');
const { additionalFees } = require('@wix/ecom/service-plugins');
const { checkout }= require("@wix/ecom");
const { currentCart }= require("@wix/ecom")
const wixClient = createClient({
    auth: AppStrategy({
        appId: process.env.APP_ID,
        publicKey: process.env.PUBLIC_KEY
    }),
    modules: {
        additionalFees, checkout ,currentCart 
    }
});


wixClient.additionalFees.provideHandlers({
    calculateAdditionalFees: async (payload) => {
        console.log("triggered");
        console.log("payload", payload);


        const { request, metadata } = payload;

        const fees = [];
        const currency = 'USD';

        const checkout = request.checkout;


        console.log('Checkout payload:', request);
        console.log('Checkout payload:', request.lineItems);
        console.log('Checkout payload:', request.shippingInfo.selectedCarrierServiceOption.logistics);

        let checkoutData =await getCheckout()
        console.log("checkoutData",checkoutData);


        // Example: COD / Manual Offline Payment Fee
        // if (checkout?.paymentOption === 'MANUAL_OFFLINE') {
        fees.push({
            code: 'COD_CHARGE',
            name: 'Cash on Delivery Charge',
            price: {
                amount: '5',
                currency
            },
            taxable: false
        });
        // }

        return {
            additionalFees: [
                {
                    code: "COD",
                    name: "Cash on Delivery",
                    price: "5",
                   
                },
            ],
            currency: "USD",
        };
    }
});


async function getCheckout() {
    try {
        const response = await wixClient.currentCart.getCurrentCart()
        //const response = await wixClient.checkout.getCheckout(request.purchaseFlowId);
        return response
    } catch (error) {
        console.log(error);
        return error

    }

}

module.exports = { wixClient };
