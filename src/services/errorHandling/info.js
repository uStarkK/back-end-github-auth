export  function getErrorCause(errorName) {
    switch (errorName) {
        case 'Cart not found':
            return 'The requested cart does not exist';
        case 'Product not found':
            return 'The requested product was not found in the database.';
        case 'Not enough stock':
            return 'The product is either unavailable or does not have enough stock remaining.';
        case 'No items available for purchase':
            return 'There are no available items in the cart for purchase.';
        case 'Ticket not found':
            return 'The requested ticket does not exist.';
            
        case "Invalid id":
            return "Invalid id"
        default:
            return 'Unknown cause';
    }
}

export  function generateUserErrorInfo(user){
            return `One or more properties were incomplete or not valid.
            List of required properties:
            * first_name: Has to be a string. Received ${user.firstName}
            * lastName: Has to be a string. Received ${user.lastName}
            * email: Has to be a string. received ${user.email}`;
}

export  function generateProductErrorInfo(product){
            return `One or more properties were incomplete or not valid.
            List of required properties:
            * title: Has to be a string. Received 
            * price: Has to be a number. Received 
            * category: Has to be a string. received 
            * description: Has to be a string. Received`;

}

