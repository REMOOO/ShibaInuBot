import { ICommand } from "wokcommands"

export default {
    category: 'Text',
    description: 'Replies with inu',

    slash: 'both',
    testOnly: true,

    callback: ({}) => {
        return 'inu'
    },
} as ICommand