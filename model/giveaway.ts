import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    guildId: {
        type: String,
        required: true
    },

    channelId: {
        type: String,
        required: true
    },

    winners: {
        type: Array,
        default: []
    },

    entrants: {
        type: Array,
        default: []
    },

    end: {
        type: Date,
        required: true
    },

    isBusy: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('giveaway', schema, 'giveaway')