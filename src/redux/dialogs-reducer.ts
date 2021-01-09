//import { sendMessageCreator } from './dialogs-reducer';
//import { InitialStateType } from './auth-reducer';
const SEND_MESSAGE = 'SEND_MESSAGE'; //name of action

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogsData:    //dialogs
        [
            { id: 1, name: 'Aiya' },
            { id: 2, name: 'Kumar' },
            { id: 3, name: 'Balgyn' },
            { id: 4, name: 'Meir' },
            { id: 5, name: 'Dana' },
            { id: 6, name: 'Mura' }
        ] as Array<DialogType>,
    messageData:    //messages
        [
            { id: 1, message: "Yo" },
            { id: 2, message: "How is your IT KA project? " },
            { id: 3, message: "Hi" },
            { id: 4, message: "Hi bratishka" },
            { id: 5, message: "Hey" }
        ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any) => {
    //switch used instead of if else because we are using discrete constants.

    //    let stateCopy;

    switch (action.type) {
        case SEND_MESSAGE: {
            //explanation in profile reducer
            let body = action.newMessageBody;
            return {
                ...state,   //spread shell copy
                messageData: [...state.messageData, { id: 6, message: body }] //precise copy
                //... spread operator
            }
            //stateCopy.messageData.push();
            //return stateCopy;
        }
        //let body = state.newMessageBody;
        //state.newMessageBody = '';
        //state.messageData.push({ id: 6, message: body });
        //return state;
        //this._callSubscriber(this._state); //_callSubscriber says about changes in _state to outside of store.
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody: newMessageBody });

export default dialogsReducer;