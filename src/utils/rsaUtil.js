import jsencrypt from 'jsencrypt';

function rsaUtil(data) {
    let Je = new jsencrypt({
        default_key_size: 1024
    })
    Je.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIRCkzs68c4R9uPh0Ma/19wI8uscfskeXig0okyDPDZg2r8Yw1AlWp0VLzCXIq/rez4obUWnrZOMqS85FpkC9bqL+Ls+PoGysAfPaerezBeQ8cm3LDseFQtSWKsqRRNQm7+NLbzjKPdN1N6GBykX17pEgmZ0LrMh1hKBN3G1rNRwIDAQAB')
    if (data instanceof Object) {
        data = JSON.stringify(data);
    }
    return Je.encrypt(data);
}
export default rsaUtil;