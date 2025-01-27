import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const CartsModel = mongoose.model('Carts', cartSchema);
