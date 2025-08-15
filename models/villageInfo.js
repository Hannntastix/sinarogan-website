import mongoose from "mongoose";

const villageInfoSchema = new mongoose.Schema({
    namaDesa: {
        type: String,
        required: true,
        trim: true,
    },
    motto: {
        type: String,
        trim: true,
    },
    deskripsi: {
        type: String,
    },
    jumlahPenduduk: {
        type: String,
    },
    luasWilayah: {
        type: Number,
    },
    jumlahRTRW: {
        rt: {
            type: Number,
            default: 0,
        },
        rw: {
            type: Number,
            default: 0,
        },
    },
    dusun: {
        type: Number,
    },
    sejarah: {
        type: String,
    },
    visi: {
        type: String,
    },
    misi: {
        type: [String],
    },
    strukturPemerintahan: [
        {
            jabatan: {
                type: String,
                required: true,
                trim: true,
            },
            nama: {
                type: String,
                required: true,
                trim: true,
            },
        }
    ],
    alamatLengkap: {
        type: String,
    },
    fasilitas: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true
});

const VillageInfo = mongoose.models.VillageInfo || mongoose.model("VillageInfo", villageInfoSchema);

export default VillageInfo;
