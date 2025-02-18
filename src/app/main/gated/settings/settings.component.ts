import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { CryptoService } from '../../services/crypto/crypto.service';
import { SharedService } from '../../services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterContentChecked {
  userPW: string;
  userPIN: string;

  constructor(private cryptoService: CryptoService, public sharedService: SharedService, public router: Router) {
    //
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.sharedService.toggleHeader(true);
  }

  async saveMasterString(): Promise<void> {
    const theKeyBuff = await this.cryptoService.deriveKeyFromMasterString(this.userPW);
    const theKeyStr = await this.cryptoService.cryptoKey2JWK(theKeyBuff);
    const theKeyB64Str = btoa(theKeyStr);


    localStorage.setItem('master-string-encoded', theKeyB64Str);
    await this.sharedService.setMasterKey(theKeyBuff);

    // now lets redir to listing page
    this.router.navigate(['listing']);
  }

  async btnClick(): Promise<void> {
    const theKeyBuff = await this.cryptoService.deriveKeyFromMasterString(this.userPW);
    const theIV = this.cryptoService.generateRandomIV();

    const theIVstr = this.cryptoService.ab2str(theIV);

    // now lets turn the CryptoKey object into a JWK so it can be saved...
    const theKeyStr = await this.cryptoService.cryptoKey2JWK(theKeyBuff);
    const theKeyB64Str = btoa(theKeyStr);
    console.log(`str version of the random IV we generated here: ${theIVstr}`);
    console.log(`str version of the key we generated here: ${theKeyB64Str}`);

    // now lets take the json string, and try to turn it back in to a cyrptokey.
    // this will prove that we can store the key in sessionstorage, and then grab it again
    // as needed.
    const theKeyBroughtBackStr = atob(theKeyB64Str);
    const importedKey = await this.cryptoService.JWK2CryptoKey(theKeyBroughtBackStr);

    // now lets try to use the string and encrypt something...
    const stringToEncrypt = 'Gabe was here...';
    const gotEncrypted = await this.cryptoService.encryptMessage(importedKey, theIV, `${this.userPW}${this.userPW}`, stringToEncrypt);
    const gotEncrypted2string = this.cryptoService.ab2str(gotEncrypted);

    // js object to hold the iv and cypher, then gets turned in to json string, then base64
    const cipherPayload = btoa(JSON.stringify({
      iv: theIVstr,
      cipher: gotEncrypted2string
    }));

    console.log(`${stringToEncrypt} has been encrypted to this: ${cipherPayload}`);

    const gotDecrypted = await this.cryptoService.decryptMessage(importedKey, `${this.userPW}${this.userPW}`, cipherPayload );

    console.log(`${gotEncrypted2string} has been decrypted to this: ${gotDecrypted}`);

  }

}
