import { createSlice ,current} from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    cartPrice: [],
    totalAmount: 0,
    discount:0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addcart(state, action) {
            state.cart.push(action.payload);
     
           
        },
        remove_single_cartItem(state, action) {
           
            const index = state.cart.findIndex(item => item._id === action.payload.productID._id);
           console.log(index);
            if (index !== -1) {
                state.cart.splice(index, 1);
                
                // console.log('my qty item pr',state.cartPrice[index].Item_price);
                const og_price = action.payload.productID.sellingPrice;
                let item_price = action.payload.productID.sellingPrice * state.cartPrice[index].quantity;
                state.totalAmount -= item_price;
                state.cartPrice.splice(index, 1);
                // console.log('my total',state.totalAmount);
                let discount = action.payload.productID.originalPrice-og_price;
                state.discount -= discount;

            }
        },
        add_cart_price(state, action) {
            const { productID, quantity, price, OG_price } = action.payload;
            const discount = OG_price - price;
            const Item_price = price * quantity;
            state.cartPrice.push({ productID, Item_price ,discount,quantity}); 

            const totalAmount = state.cartPrice.reduce((acc, item) => {
                return acc + item.Item_price;
            }, 0);

            const discount_price = state.cartPrice.reduce((acc, item) => {
                return acc + item.discount;
            }, 0);
            

            state.totalAmount = totalAmount;
            state.discount = discount_price;
            
            
            
        },
        quantity_changed_price(state, action) {
            const { productId, new_quantity } = action.payload;
            const item = state.cartPrice.find(item => item.productID === productId);

            if (item) {
                let cur_price = item.Item_price;
                let cur_total_amount = state.totalAmount;
                let new_price = cur_price * new_quantity;
                let price_difference = new_price - (item.Item_price * item.quantity);
                let new_total_amount = cur_total_amount + price_difference;
                

                state.totalAmount = new_total_amount;
                item.quantity = new_quantity;
            } 
        },
        removecart(state, action) {
            state.cart = []
            state.cartPrice = []
            state.totalAmount = 0
            state.discount=0
        }
        
        
    }
})

export const {addcart,
    remove_single_cartItem,
    add_cart_price,
    cart_total_amount,
    quantity_changed_price,
removecart,} = cartSlice.actions;


export default cartSlice.reducer;