import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import {Modal, Button} from 'react-bootstrap';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

function WalletMain() {

    let {userInfo}=useSelector((state) => state.userLogin);
    let [currentBalance, setCurrentBalance]=useState(0);
    let [refeUrl, setRefUrl]=useState("");
    let copyBtnRef=useRef();

    useEffect(()=>{
        if(!userInfo.wallet) return;
        let wallet=userInfo.wallet;
        setCurrentBalance(wallet.amount);

        let refCode=`${window.location.origin}/register?refcode=${wallet.referal}`;
        setRefUrl(refCode);
    }, [JSON.stringify(userInfo)])

    let [showRefCode, setShowRefCode]=useState(false);

    function copyToClipboard(){
        window.navigator.clipboard.writeText(refeUrl);
        copyBtnRef.current.style.background="green";
        copyBtnRef.current.style.color="white";
        copyBtnRef.current.title="Copied!"
    }

    return (
        <>
        {/* Referal Modal */}
            <Modal
            show={showRefCode}
            onHide={()=>setShowRefCode(false)}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="referal__code_modal">
                <input type="text" value={refeUrl} readOnly/>
                <button onClick={copyToClipboard} ref={copyBtnRef}><FileCopyIcon/></button>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={()=>setShowRefCode(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        {/* end Referal modal */}
        <div className="wallet__main">
            <div className="wallet__totalAmount">
                <h1>Current Balance: <strong>₹{currentBalance}</strong></h1>
            </div>
            <hr/>
            <div className="referal__share">
                <h4>Refer your friend and earn!!</h4>
                <button onClick={()=>setShowRefCode(true)}>GET REFERAL LINK</button>
            </div>
        </div>
        </>
    )
}

export default WalletMain
