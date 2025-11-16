import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import btcIcon from './images/bitcoin-btc-logo.png'
import ethIcon from './images/ethereum-eth-logo.png'
import usdtIcon from './images/tether-usdt-logo.png'
import copyIcon from './images/copy.png'
import btcQr from './images/btc_qr.png'
import ethQr from './images/eth_qr.png'
import usdtQr from './images/usdt_qr.png'
import { useCopy } from '../hooks/useCopy'

export const CoffeeModal = ({ isOpen, onClose }) => {
  
  const modalRef = useRef();
  const [isBtcCopied, copyBtc] = useCopy();
  const [isEthCopied, copyEth] = useCopy();
  const [isUsdtCopied, copyUsdt] = useCopy();

  const outsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', outsideClick);
    }
      return () => {
        document.removeEventListener('mousedown', outsideClick);
      }
  
  },[isOpen]);


  useEffect(() => {
    if(isOpen){
      onClose()
    }  
  },[])

  
  //close by esc
  useEffect(() => {
      const closeByEscKey = (event) => {
          if (event.key === 'Escape') {
            onClose()
          }
        };

      document.addEventListener('keydown', closeByEscKey);
      
      return () => {
            document.removeEventListener('keydown', closeByEscKey)
        };
    
    }, [onClose]);   
    

  return (
    <>
    {isOpen && (
    <div className={styles.modal} onClick={onClose}>    
        <div 
            className={styles.modal_wrapper} 
            ref={modalRef}
            onClick={e => e.stopPropagation()}
        >
            <div className={styles.modal_content}>
              <div className={styles.modal_text}>
                Buy Me a Crypto Coffee ☕
              </div>
                <div className={styles.adress_container}>
                   <div className={styles.crypto_name}>
                      <img src={btcIcon} alt="BTC" className={styles.modal_icon} />
                      BTC
                   </div>
                      <div className={styles.adress_and_copy}>
                        <img src={btcQr} alt="BTC_QR" className={styles.modal_qr} />
                        <span>13fYWqji4J6rK56cMxQ61wLEPehNNFgW71</span>
                        <button
                          onClick={() => copyBtc('13fYWqji4J6rK56cMxQ61wLEPehNNFgW71')}
                          className={`${styles.clipboard_button} ${isBtcCopied ? styles.copied : ''}`}
                          src={copyIcon} 
                          alt="copy">
                          {isBtcCopied ? '✓' : '\u2398'}
                        </button>
                      </div>
                  </div>
                  <div className={styles.adress_container}>
                   <div className={styles.crypto_name}>
                      <img src={ethIcon} alt="ETH" className={styles.modal_icon} />
                      {'ETH (ERC-20)'}
                   </div>
                      <div className={styles.adress_and_copy}>
                        <img src={ethQr} alt="ETH_QR" className={styles.modal_qr} />
                        <span>0x396d63DBd8bdC442580e9925EC90756Bc2A6da6D</span>
                        <button
                          onClick={() => copyEth('0x396d63DBd8bdC442580e9925EC90756Bc2A6da6D')}
                          className={`${styles.clipboard_button} ${isEthCopied ? styles.copied : ''}`}
                          src={copyIcon} 
                          alt="copy">
                          {isEthCopied ? '✓' : '\u2398'}
                        </button>
                      </div>
                  </div>
                  <div className={styles.adress_container}>
                   <div className={styles.crypto_name}>
                      <img src={usdtIcon} alt="USDT" className={styles.modal_icon} />
                      {'USDT (TRC-20)'}
                   </div>
                      <div className={styles.adress_and_copy}>
                        <img src={usdtQr} alt="USDT_QR" className={styles.modal_qr} />
                        <span>TX8Ept84thexM7WTUJs88cxY8jTZ99mAFV</span>
                        <button
                          onClick={() => copyUsdt('TX8Ept84thexM7WTUJs88cxY8jTZ99mAFV')}
                          className={`${styles.clipboard_button} ${isUsdtCopied ? styles.copied : ''}`}
                          src={copyIcon} 
                          alt="copy">
                          {isUsdtCopied ? '✓' : '\u2398'}
                        </button>
                      </div>
                  </div>
              <button 
                className={styles.modal_close_button}
                onClick={onClose}
                aria-label='Close modal'>
                ╳ 
                </button>
              
            </div>
        </div>
    </div> 
    )}
    </>
  )
}