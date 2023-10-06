export default class userDTO {
    constructor(user){
        this.firstName = user.firstName
        this.lastName = user.lastName? user.lastName : ""
        this.email = user.email? user.email : ""
        this.cart = user.cartId
        this.active = true
        this.role = user.role
    }
}