# Safe AI Prompt

![issues found](/assets/demo.gif)

## Build instructions
Generated React project using [WXT framework](https://wxt.dev/) (`npx wxt@latest init`)

1. Download the project from [GitHub](https://github.com/nvasilov/safe-ai-prompt)
2. for developer environment run in cmd `npm run dev` (Google Chrome browser will be opened automatically)
3. for production (unpacked) environment run in cmd `npm run build`
   * to install unpacked extension in your browser following the next steps:
     * open your browser
     * go to `Manage extensions`
     * enable `Developer mode`
     * click on `Load unpacked` button
     * select `chrome-mv3` folder from project `.output` (generated after run build command)
     * done! - extension is installed

## A demo image of the modal

![issues found](/assets/Screenshot_0.png)
![history](/assets/Screenshot_1.png)
![settings](/assets/Screenshot_2.png)
![prompt](/assets/Screenshot_6.png)
![prompt](/assets/Screenshot_7.png)

## Implementation / architectural notes

### Used libraries
* [Kendo React](https://www.telerik.com/kendo-react-ui) - for already designed user interface component
  * `@progress/kendo-react-all` - all UI components
  * `@progress/kendo-theme-bootstrap` - theme
  * `@progress/kendo-theme-utils` - utils classes like `k-p-2` for `padding: 0.5rem` (configurable value in theme builder)
* [Redux](https://redux.js.org/) for state management
  * `@reduxjs/toolkit` - to create APIs and SLICEs
  * `react-redux` - core
  * `redux-persist` - to persist SLICEs in the WXT storage automatically
* Other
  * `moment` - for easy work with time (instead of native Date)
  * `webext-bridge` - cross browser solution proposed by WXT to send messages between layers (!!! have an issue with firefox)
  * `zod` - to validate any data (in current case to validate and extract only necessary data from parsed request payload)
  * `eslint` - quick config to work inside IDE (at least for hook dependencies warnings)

### Implementation
* Here we have 3 layers:
  * `mainWorld.content.ts` - where we have access to main DOM and can override `window.fetch` function to sanitize payload.
  * `izolatedWorld.content.tsx` - isolated space to execute some logic related to current `state`, and at least to persist replaced emails to redux storage with automatically refresh over shadow window, and also to show respective window if it is need.
  * `background.ts` - sanitize logic
* UI
  * A modal popup (collapsible, resizable, draggable) where user can see:
    * `Issues Found` - replaced emails from last prompt
    * `History` - All replaced emails (without ability to clean)
    * `Settings` (right top icon) - where user can update dismiss time from 1 minute to 24 hours
    * `Email` (details) - a count of messages where this email was replaced, when last time email was replaced, a button to dismiss, remained time in dismiss status, and a button to expand messages with highlighted email position

### Architecture

I never used before the WXT framework and in general it is my first browser extension. 
Folder structure was inspired from [WTX documentation](https://wxt.dev/guide/essentials/project-structure.html) and my `preferences`.

## Cross-browser support notes

Tested production build in the following browsers:
* `Google Chrome`
* `Microsoft Edge`
* `Opera`

Everything was fine because all browser are based on `Chromium` and UI components were developed by Kendo React UI framework.

To support `Firefox` (`npm run build:firefox`) need to solve issue with sending synchronized message 
from `MAIN content-script` to `ISOLATED content-script` because `webext-bridge` have a `hack` only for `Chromium` based extensions,
as a quick solution we can try to use native `window.postMessage`.

### Google Chrome
![google chrome](/assets/Screenshot_3.png)

### Microsoft Edge
![history](/assets/Screenshot_4.png)

### Opera
![settings](/assets/Screenshot_2.png)