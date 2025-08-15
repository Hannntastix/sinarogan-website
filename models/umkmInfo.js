import mongoose from "mongoose";

const umkmInfoSchema = new mongoose.Schema({
    namaUmkm: {
        type: String,
        required: true,
        trim: true,
    },
    deskripsi: {
        type: String,
    },
    tahunBerdiri: {
        type: Number,
    },
    mekansime: {
        type: String,
    },
    kontak: {
        type: Number,
    },
    produk: {
        type: [String],
    },
    alamatLengkap: {
        type: String,
    },
}, {
    timestamps: true
});

const UmkmInfo = mongoose.models.UmkmInfo || mongoose.model("UmkmInfo", umkmInfoSchema);

export default UmkmInfo;
