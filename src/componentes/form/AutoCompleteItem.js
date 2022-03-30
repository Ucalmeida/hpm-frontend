import React from 'react'

export const AutoCompleteItem = ({name, onSelectItem, isHighlighted}) => {
    return (
        <div className={`list-group-item ${isHighlighted ? 'active highlighted' : ''}`} onClick={onSelectItem}>
            <div className="col text-left">
                <p className="mb-0 font-weight-bold line-height-1">
                    {name}
                </p>
            </div>
        </div>
    )
}
