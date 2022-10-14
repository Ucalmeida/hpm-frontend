import React, { useState } from 'react'

export const UseVisibilityToggler = (component, visibility = false) => {

    const [visible, setVisible] = useState(() => visibility);

    return [visible ? component : null, () => setVisible(v => !v)];
}
