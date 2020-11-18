import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";
//import React from "react";

let state = {
    postsData: [
        { id: 1, message: "Hi, How is it going?", likesCount: 11 },
        { id: 2, message: "Hi, How r u?", likesCount: 12 }
    ]
}

it('Length of posts should be incremented', () => {
    //1. test data
    let action = addPostActionCreator("it-kama")
   
    //2. check action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.postsData.length).toBe (3);
})

it('message of new post should be it-kama ', () => {
    //1. test data
    let action = addPostActionCreator("it-kama")
   
    //2. check action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.postsData[2].message).toBe ("it-kama");
})

it('After deleting length of message should be decremented  ', () => {
    //1. test data
    let action = deletePost(1)
   
    //2. check action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.postsData.length).toBe (1);
})

it(`After deleting length of message shouldn't be decremented if id is incorrect`, () => {
    //1. test data
    let action = deletePost(1000)
   
    //2. check action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.postsData.length).toBe (2);
})