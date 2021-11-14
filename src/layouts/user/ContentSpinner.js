import React from 'react'
import { Spinner } from 'react-bootstrap'

function ContentSpinner({variant}) {
    return (
        <div className="spinner">
            <Spinner animation="grow" variant={variant} />
        </div>
    )
}

export default ContentSpinner
