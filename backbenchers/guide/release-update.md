---
sidebar_position: 4
slug: "/new-release"
---

# Main Page Change for New Release

This is to update the links in the Main Page and show accurate version number.

#### Assuming Pre-Release...
1. Make sure you have added Release Notes in ``backbenchers/dev/release-notes/0.x.x.md``
2. Go to ``backbenchers/version.js``
3. Change the value of ``version`` to the newest release version.
4. Go to Main Page and see the correct version is displayed

#### For example, if we are changing the version to "0.0.7"

```js title="/src/version.js"
// This file is used to keep track of the latest deployed version of the app
// put the newest deployed version here
// in "0.x.x" format

const version = "0.0.7"


export default version;
```

