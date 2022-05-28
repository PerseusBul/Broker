import { NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { environment } from 'src/environments/environment';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain
  },
  palette: {
    popup: {
      background: '#F5F5F5',
      text: '#000',
      link: '#003399',
      border: 'transparent'
    },
    button: {
      background: '#003399',
      text: '#fff',
      border: 'transparent'
    }
  },
  position: 'bottom-left',
  theme: 'classic',
  type: 'opt-out',
  layout: 'my-custom-layout',
  layouts: {
    'my-custom-layout': '{{messagelink}}{{compliance}}'
  },
  elements: {
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}}
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank" rel="noopener">{{cookiePolicyLink}}</a>.
      {{messageOne}}
      <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank" rel="noopener">{{tosLink}}</a>
      {{messageAnd}}
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank" rel="noopener">{{privacyPolicyLink}}</a>
      {{messageTwo}}
    </span>
    `
  },
  content: {
    message: 'Този сайт използва ',
    messageOne: ' С влизането си в my.axiom-jsc.com Вие се съгласявате с ',
    messageAnd: 'и',
    messageTwo: 'на Застрахователна компания Аксиом АД.',
    cookiePolicyLink: 'бисквитки',
    cookiePolicyHref: 'https://axiom-jsc.com/biskvitki',
    allow: "Приемам",
    deny: "Отказ",
    privacyPolicyLink: 'Политиката за поверителност',
    privacyPolicyHref: 'https://drive.google.com/file/d/1JYnhiuGTfstT8p_rjLIgOxXp9UHztIqC/view',
    tosLink: 'Общите условия',
    tosHref: 'https://docs.google.com/document/d/1kkLMJD_iaBiUqgEM979QVZoByXWsbBCk/edit',
  }
};
