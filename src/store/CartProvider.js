import CartContext from './cart-context'
import {useReducer} from 'react'

const intialStateCart={items:[],
totalAmount:0}

function cartProviderReducer(state,action){
    if(action.type=="ADD"){
       const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount
       const existingItemId= state.items.findIndex(item=>item.id===action.item.id)
      console.log(existingItemId)
      const existingItem=state.items[existingItemId]
     let updatedItems

      

      if(existingItem){
       const updatedItem={...existingItem,amount:existingItem.amount+action.item.amount}
     updatedItems=[...state.items]
        
        updatedItems[existingItemId]=updatedItem
      }
      else{ updatedItems=state.items.concat(action.item)}

       
            return{items:updatedItems,
                    totalAmount:updatedTotalAmount}
    }

    if(action.type=="REMOVE"){
      
        const findExistingItemID= state.items.findIndex(item=>item.id===action.id)
        const itemToBeRemoved=state.items[findExistingItemID]
        const updatedTotalAmount=state.totalAmount-itemToBeRemoved.price
        let updatedItems
        if(itemToBeRemoved.amount===1){
            updatedItems=state.items.filter(item=>item.id!==action.id)
        }
        else{
            const updatedItem={...itemToBeRemoved,amount:itemToBeRemoved.amount-1}
            updatedItems=[...state.items]
            updatedItems[findExistingItemID]=updatedItem

        }
        return{items:updatedItems,
            totalAmount:updatedTotalAmount}
    }

    if(action.type=='CLEAR'){
        return intialStateCart
    }
    return intialStateCart
}

function CartProvider(props){

    const [state, dispatchAction] = useReducer(cartProviderReducer, intialStateCart);
    const addItemHandler=(item)=>{
        
        dispatchAction({type:'ADD',item:item})
    }
    const removeItemHandler=(id)=>{
        dispatchAction({type:"REMOVE",id:id})

    }
    const clearItemHandler=()=>{
        dispatchAction({type:'CLEAR'})
    }
    const Context={
        items:state.items,
        totalAmount:state.totalAmount,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
        clearItems:clearItemHandler
    }

    return<CartContext.Provider value={Context}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;