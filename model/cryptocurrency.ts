import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },

    dollars: {
        type: Number,
        default: 0
    },

    shibaInuCoins: {
        type: Number,
        default: 0
    },

    bitCoins: {
        type: Number,
        default: 0
    },

    weed: {
        type: Number,
        default: 0
    },

    busyHarvesting: {
        type: Boolean,
        default: false
    },

    weedBags: {
        type: Number,
        default: 0
    },

    busyCutting: {
        type: Boolean,
        default: false
    },

    busySellingWeed: {
        type: Boolean,
        default: false
    },

    daily: {
        type: Number
    }
})

export default mongoose.model('cryptocurrency', schema, 'cryptocurrency')