import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../_models/message';

@Injectable({ providedIn: 'root' })
export class MessengerService {
  private readonly messageContainer$$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public readonly messageContainer$: Observable<Message[]> = this.messageContainer$$.asObservable();

  constructor() {}

  add(messeage: Message) {
    const messages = this.messageContainer$$.value;
    messages.push(messeage);
    this.messageContainer$$.next(messages);
  }

  next(messages: Message[]) {
    this.messageContainer$$.next(messages);
  }

  clear() {
    this.messageContainer$$.next([]);
  }

  getMessages(): Message[] {
    return this.messageContainer$$.getValue();
  }

  remove(id: string) {
    const messages = this.messageContainer$$.value;
    this.messageContainer$$.next(messages.filter((m) => m.id !== id));
  }
}
