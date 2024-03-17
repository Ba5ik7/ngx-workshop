import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private voicesSubject = new BehaviorSubject<SpeechSynthesisVoice[]>([]);
  voices$ = this.voicesSubject.asObservable();

  constructor() {
    this.loadVoices();
  }

  private loadVoices() {
    // Immediate check for voices and update the BehaviorSubject
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.voicesSubject.next(voices);
    }

    // Listen for the 'voiceschanged' event to handle async voice loading
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      this.voicesSubject.next(voices);
    };
  }

  speak(text: string): void {
    this.voices$.subscribe(voices => {
      if (voices.length > 0) {
        console.log('voices:', voices);
        const utterance = new SpeechSynthesisUtterance(text);
        // Here you can select the voice as needed, for example:
        // utterance.voice = voices.find(voice => voice.lang.includes('en-US')) || voices[2]; // Default to the first voice if not found
        utterance.voice = voices[4];
        window.speechSynthesis.speak(utterance);
      }
    });
  }
}
