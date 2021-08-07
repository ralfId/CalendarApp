import { types } from "../../types/types"

describe('test in types.js', () => {
    
    test('types should be the same', () => {
        
        expect(types).toBe({

            /* UI */
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
            /* Calendar Events */
            eventLoadEvents: '[events] Load events',
            eventAddNew: '[event] Add new event',
            eventStartAddNew: '[event] Start add new event',
            eventSetActive: '[event] Set active event',
            eventCleanActive: '[event] Clean active event',
            eventUpdated: '[event] Updated event',
            eventDeleted: '[event] Deleted event',
            eventLogout: '[event] Set Initial state on logout',
        
            /* auth  */
            authChecking: '[auth] checking login state',
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStarTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        })
    })
    
})
