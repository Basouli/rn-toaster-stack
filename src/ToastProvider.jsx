import React, { useState, createContext, useEffect, useRef, useCallback } from 'react';
import { /*Alert,*/ Animated } from "react-native";
import RNRestart from 'react-native-restart';
import { easeOutAnimation } from './render/ToastAnimation';
import ToastTemplate from './render/ToastTemplate';

const ToastContext = createContext();

let Template = ToastTemplate;

let TOAST_ENUMS = {
    ANIMATION_DURATION: 500,
    ONE_SECONDS: 1000, //units in milliseconds
    TOAST_DURATION: 3,
    MAX_TOAST_COUNT: 10
}

let zIndex = 100;

const setZIndex = (value) => {
    if (isNaN(zIndex)) {
        throw new Error("setAnimationDuration: value must be a number");
    }
    zIndex = value;
}

const setAnimationDuration = (milliseconds) => {
    if (isNaN(milliseconds)) {
        throw new Error("setAnimationDuration: value must be a number");
    }
    TOAST_ENUMS = {
        ...TOAST_ENUMS,
        ANIMATION_DURATION: milliseconds
    }
}

const setFallback = (newFallBack) => {
    fallback = newFallBack;
}

const setDurationToast = (seconds) => {
    if (isNaN(seconds)) {
        throw new Error("setDurationToast: value must be a number");
    }
    TOAST_ENUMS = {
        ...TOAST_ENUMS,
        TOAST_DURATION: seconds
    }
}

const setMaxToastCount = (toastAmount) => {
    if (isNaN(toastAmount)) {
        throw new Error("setMaxToastCount: value must be a number");
    }
    TOAST_ENUMS = {
        ...TOAST_ENUMS,
        MAX_TOAST_COUNT: toastAmount
    }
}

const setToastTemplate = (template) => {
    if (!React.isValidElement(template())) {
        throw new Error("setToastTemplate: value must be functionnal react component");
    }
    Template = template;
}

let fallback = () => {
    //
};

const ToastProvider = ({ children }) => {

    const VERTICAL_VISIBLE_POS = 60; //TODO: 0 when premium
    const VERTICAL_HIDDEN_POS = -100;

    const translateValue = useRef(new Animated.Value(-300)).current;

    const [maxToastReached, setMaxToastReached] = useState(false);
    const [toastStack, setToastStack] = useState([]);

    const [state, setState] = useState({
        available: true,
        count: TOAST_ENUMS.TOAST_DURATION
    });

    useEffect(() => {
        if (toastStack.length > 0 && state.available == true) {

            if (toastStack.length > TOAST_ENUMS.MAX_TOAST_COUNT) {
                setMaxToastReached((current) => {
                    return (true);
                });

                fallback();
            }

            setState((currentState) => {
                return ({
                    ...currentState,
                    available: false,
                });
            });

            toastCycle();
        }

    }, [toastStack, state.available]);

    const addToast = useCallback((toast) => {
        if (!maxToastReached) {
            setToastStack((prev) => [...prev, toast]);
        }
    }, [maxToastReached]);

    // TOAST CYCLE _______________________________________________________________________________________ TOAST CYCLE

    const toastCycle = () => {
        showToast();

        var countDownIntervalID = setInterval(() => {

            if (state.count <= 0) {
                clearInterval(countDownIntervalID);

                hideToast();
                
                setTimeout(() => {
                    shiftToastStack();

                    setState((currentState) => {
                        return ({
                            ...currentState,
                            available: true,
                            count: TOAST_ENUMS.TOAST_DURATION
                        });
                    });
                }, TOAST_ENUMS.ANIMATION_DURATION);

            } else {
                setState((currentState) => {
                    return ({
                        ...currentState,
                        available: false,
                        count: state.count--
                    });
                });
            }
        }, TOAST_ENUMS.ONE_SECONDS);
    }

    const shiftToastStack = () => {
        setToastStack((currentToastStack) => {
            let newToastStack = [...currentToastStack];
            newToastStack.shift();

            return (
                [...newToastStack]
            );
        });
    }

    const showToast = () => {
        easeOutAnimation(translateValue, TOAST_ENUMS.ANIMATION_DURATION, 0, VERTICAL_VISIBLE_POS);
    }

    const hideToast = () => {
        easeOutAnimation(translateValue, TOAST_ENUMS.ANIMATION_DURATION, 0, VERTICAL_HIDDEN_POS);
    }

    // TEMPLATE RETURN _____________________________________________________________________________________ TEMPLATE RETURN

    return(
        <ToastContext.Provider value={addToast}>
            
            {children}

            {(toastStack && toastStack.length > 0) &&
                <Template zIndex={zIndex} type={toastStack[0].type} message={toastStack[0].message} translateValue={translateValue} />
            }
            
        </ToastContext.Provider>
    );
};

export {
    ToastContext,
    ToastProvider,
    setAnimationDuration, setDurationToast, setMaxToastCount, setToastTemplate, setFallback, setZIndex
};