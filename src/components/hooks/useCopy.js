import { useState } from 'react';

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    if (!text) 
        return false;

    try {
      await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      return true;
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
      
        if (success) {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        }
        return success;
    }
  };

  return [isCopied, copyToClipboard];
};