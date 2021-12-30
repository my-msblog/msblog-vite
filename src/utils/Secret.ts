
import CryptoJS from 'crypto-js';

// 默认的 KEY 与 iv
const KEY = '1234567890123456';
const IV = '1234567890123456';

export const Encrypt = function (word: string): string{
  return EncryptBase(word, KEY, IV);
};

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function EncryptBase(word: string, keyStr: string, ivStr: string): string {
  let key;
  let iv;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }else {
    key = CryptoJS.enc.Utf8.parse(KEY);
    iv = CryptoJS.enc.Utf8.parse(IV);
  }
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
export function Decrypt(word: string, keyStr: string, ivStr: string): string {
  const key: CryptoJS.lib.WordArray = setValue( keyStr, keyStr);
  const iv: CryptoJS.lib.WordArray =setValue( ivStr, keyStr);
  const base64 = CryptoJS.enc.Base64.parse(word);
  const src = CryptoJS.enc.Base64.stringify(base64);

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
function setValue(str: string, flag: any): CryptoJS.lib.WordArray{
  if (flag){
    return CryptoJS.enc.Utf8.parse(str);
  }else {
    return CryptoJS.enc.Utf8.parse(KEY);
  }
}
