import { Injectable } from '@angular/core';
import { Emission } from '../models/general.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmissionService {
  private emission$ = new Subject<Emission>();

  constructor() { }

  send(type: string, transmitter: any) {
    const e: Emission = new Emission();
    e.transmitter = transmitter;
    e.type = type;
    this.emission$.next(e);
  }

  clearEmisson() {
    const e: Emission = new Emission();
    this.emission$.next(e);
  }

  getEmisson(): Observable<Emission> {
    return this.emission$.asObservable();
  }
}
