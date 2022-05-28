import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'br-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {
  readonly subscriptions: Subscription = new Subscription();
  messages: Message[] = [];
  constructor(private messengerService: MessengerService) {}

  ngOnInit(): void {
    const sub = this.messengerService.messageContainer$.subscribe((messages) => {
      this.messages = messages;

      messages.forEach((m) => {
        if (m.duration) {
          setTimeout(() => this.messengerService.remove(m.id), m.duration);
        }
      });
    });

    this.subscriptions.add(sub);
  }

  closeMessage(id: string) {
    this.messengerService.remove(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
