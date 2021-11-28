import React from 'react'

function PasswordChange() {
    return (
        <div className="passwordChange__main">
            <h1>Change Password</h1>
            <form>
            <label>Enter current password</label><br/>
            <input type="password"  /><br/>
            <hr/>
            <label>Enter New password</label><br/>
            <input type="password"  /><br/>
            <label>Confirm new password</label><br/>
            <input type="text"  /><br/>
            <button>Change</button>
            </form>            
        </div>
    )
}

export default PasswordChange
