# ReactNative Toaster Skack
Toaster provider and tools for react native app

Git: https://github.com/Basouli/react-native-toaster
My Portoflio: [www.basilcollette.com](https://www.basilcollette.com)

# Installation
npm install --save rn-toaster-skack

# Imports
Here the list of the modules that could be imported on your react components:

ToastProvider: Provider that handle a toast stack, showing them on screen.

ToastContext: Context that return a function sending a Toast.

Toast: The Toast Class, composing of a type and a message.

ToastTypeEnum: Object containing enum of toast types.

setAnimationDuration: function to set the duration of the toast animation, sliding from the top of the screen.

setDurationToast: function to set the duration of the toast's visibility on screen.

setMaxToastCount: function to set the size of the toast stack.

setToastTemplate: function to set the template of the toast.

setFallback: function to set the function called when max Toast count is reached.

# Usage

First import the package on your app entry:
```js
import { ToastProvider } from 'rn-toaster-skack';
```

Add the ToastProvider tag inside the return of your app entry. It should be enclosing the app jsx to insure a good style management:
```js
return (
    <ToastProvider>
        ...
    </ToastProvider>
);
```

Minimal module imports needed on a react component:
```js
import { Toast, ToastContext } from 'rn-toaster-skack';
```

Initialise the context function (Need useContext that could be imported with 'react'):
```js
const addToast = useContext(ToastContext);
```
In this exemple, the const is named "addToast" because the only value given by the provider is a function, that give the toast to the provider.

Use addToast function whenever inside your component with a parameter Toast object that need a toast type and a message:
```js
addToast(new Toast(ToastTypeEnum.success, 'succeed!'));
```
The Toast will be sent to provider that will stack it. Provider automatically handle the stack by unstacking and showing toast in order of receipt.

# Exemples

Fully exemple of app entry:
```js
import Home from './home.component.jsx';
import { ToastProvider } from 'rn-toaster-skack';

export default function App() {

    return (
        <ToastProvider>
            <Home/>
        </ToastProvider>
    );
}
```

Fully exemple of a component named 'Home' using Toast:
```js
import { useEffect, useContext } from 'react';
import { Toast, ToastContext, ToastTypeEnum } from 'rn-toaster-skack';

export default function Home(props) {

    const addToast = useContext(ToastContext);

    useEffect(() => {
        addToast(new Toast(ToastTypeEnum.info, 'Welcome!'));
    }, []);

    return (
        <View>
            <Text>Home Page With A Welcome Toast</Text>
        </View>
    );
}
```

# Details of package

ToastTypeEnum:
```js
ToastTypeEnum = {
    success: "success",
    info: "info",
    error: "error"
}
```

Toast:
```js
/**
 * @param {string} type the type of toast, if null set to 'info'.
 * @param {string} message the message showed in toast.
 */
constructor(type, message){
    ...
}
```
it is advisable to use ToastTypeEnum properties for the first parameter 'type' as bellow :
```js
new Toast(ToastTypeEnum.info, 'my info message')
```
Default template will apply a special style color to the toast, depending of type value:
info: #3BCBEB
success: #46C843
error: #CC5656

setAnimationDuration:
```js
/**
 * @param {number} milliseconds : the ammount of milliseconds toast take to slide on screen. Default value 500
 */
setAnimationDuration(milliseconds) {...}
```

setDurationToast:
```js
/**
 * @param {number} seconds : the ammount of seconds toast is showed. Must be an interger. Default value 3
 */
setDurationToast(seconds) {...}
```

setMaxToastCount:
```js
/**
 * @param {number} toastAmount : the amount of toast that could be stack at the same time, before calling function fallback(). Default value 10
 */
setMaxToastCount(toastAmount) {...}
```

setToastTemplate:
```js
/**
 * @param {React element} template : the template used for toast
 */
const template: React.FC<{type: ToastTypeEnum, message: string, translateValue: number}> = (props) => {
    return <Animated.View style={[ToastStyle.toastWrapper, {transform: [{ translateY: props.translateValue }]} ]}>
        <View style={ToastStyle.toast}>
            <Text style={ToastStyle.toastMessage}>{props.message}</Text>
        </View>
    </Animated.View>
};

setToastTemplate(template);
```

setFallback:
```js
/**
 * @param {function} fallBack : function called when max amout of toast that could be staked is reached
 */
setFallback(fallBack) {...}
```

setZIndex:
```js
/**
 * @param {number} value : the new value of Toasts zIndex
 */
setZIndex(value) {...}
```

svg

