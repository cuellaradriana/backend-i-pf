import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, minlength: 3 },
        description: { type: String, required: true },
        code: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 6,
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= 0;
                },
                message: (props) =>
                    `El precio no puede ser un valor negativo: ${props.value}`,
            },
        },
        status: { type: Boolean, default: true },
        stock: { type: Number, required: true },
        category: { type: String, required: true },
        thumbnails: { type: [String], default: [] },
    },
    {
        timestamps: true,
    }
);
productSchema.plugin(paginate);

export const ProductsModel = mongoose.model('products', productSchema);
