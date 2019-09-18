import { createSelector } from 'reselect';

//input selector
//gets whole state and returns slice of it
const selectCart = state => state.cart;


//output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity , cartItem) => accumulatedQuantity + cartItem.quantity,
            0
        )
)