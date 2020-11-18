import React from 'react';
import {create} from "react-test-renderer";
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {

    test("Status from props should be in the state ", () => {
        const component = create(<ProfileStatus status="it-kama.com" />);
        const instance = component.getInstance()
        expect(instance.state.status).toBe("it-kama.com")
    })

    test("After creation <span> should be displayed ", () => {
        const component = create(<ProfileStatus status="it-kama.com" />);
        const root = component.root
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("After creation <input> shouldn't be displayed ", () => {
        const component = create(<ProfileStatus status="it-kama.com" />);
        const root = component.root
        expect(() => {
            let input = root.findByType("input")
        }).toThrow()
    })

    test("After creation <span> should contain correct status", () => {
        const component = create(<ProfileStatus status="it-kama.com" />);
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[1]).toBe("it-kama.com")
    })

    test("input should be displayed in editMode", () => {
        const component = create(<ProfileStatus status="it-kama.com" />);
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("it-kama.com")
    })

    test("Callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="it-kama.com" updateStatus={mockCallback} />);
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })

})