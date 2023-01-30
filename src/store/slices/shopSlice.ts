import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { server } from "../../constants";
import { Product } from "../../types/product.type";
import { TransactionResponse } from "../../types/transaction.type";
import { httpClient } from "../../utils/HttpClient";
import { RootState } from "../store";

export interface ShopState {
  transactionAllResult: TransactionResponse[];
  mOrderLines: Product[];
  mTotalPrice: number;
  mTaxAmt: number;
  mIsPaymentMade: boolean;
  mGiven: number;
}

const initialState: ShopState = {
  transactionAllResult: [],
  mOrderLines: [],
  mTotalPrice: 0,
  mTaxAmt: 0,
  mIsPaymentMade: false,
  mGiven: 0,
};

export const getTransactions = createAsyncThunk(
  "shop/transaction",
  async (): Promise<TransactionResponse[]> => {
    const result = await httpClient.get<TransactionResponse[]>(
      server.TRANSACTION_URL
    );
    return result.data;
  }
);

const updateOrder = (state: ShopState, orderLines: any) => {
  let totalPrice = 0;
  let taxAmt = 0;
  for (let item of orderLines) {
    totalPrice += item.price * item.qty;
  }
  taxAmt = totalPrice * 0.07;
  state.mOrderLines = orderLines;
  state.mTotalPrice = totalPrice;
  state.mTaxAmt = taxAmt;
};

export const submitPayment = createAsyncThunk(
  "shop/submit",
  async (data: any) => {
    try {
      const result = await httpClient.post(server.TRANSACTION_URL, data);
      return result.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {
    togglePaymentMode: (state, action: PayloadAction<void>) => {
      state.mIsPaymentMade = !state.mIsPaymentMade;
    },
    addOrder: (state, action: PayloadAction<Product>) => {
      let product = action.payload;

      let index = state.mOrderLines.findIndex((item) => {
        return item._id === product._id;
      });

      if (index === -1) {
        state.mOrderLines.unshift({ ...product, qty: 1 });
      } else {
        state.mOrderLines[index].qty!++;
      }
      updateOrder(state, state.mOrderLines);
    },
    removeOrder: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      let orderLines = state.mOrderLines;
      var foundIndex = orderLines.indexOf(product);

      orderLines.map((item: any) => {
        if (item.product_id === product.product_id) {
          item.qty = 1;
        }
        return item;
      });
      orderLines.splice(foundIndex, 1);
      updateOrder(state, orderLines);
    },
    togglePayment: (state, action: PayloadAction<void>) => {
      state.mIsPaymentMade = !state.mIsPaymentMade;
      state.mGiven = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.transactionAllResult = action.payload;
    });
    builder.addCase(submitPayment.fulfilled, (state, action) => {
      state.mIsPaymentMade = false;
      state.mGiven = 0;
      state.mOrderLines = [];
    });
  },
});

export const { addOrder, removeOrder, togglePayment, togglePaymentMode } =
  shopSlice.actions;
export const shopSelector = (store: RootState) => store.shopReducer;
export default shopSlice.reducer;
