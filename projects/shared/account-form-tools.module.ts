import { NgModule } from '@angular/core';
import { CardAccountActModule } from './components/card-account-act/card-account-act.module';
import { PasswordFieldModule } from './components/password-field/password-field.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [CardAccountActModule, PasswordFieldModule]
})
export class AccountFormToolsModule {}
