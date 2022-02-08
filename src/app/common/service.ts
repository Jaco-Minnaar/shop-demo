import {
  child,
  Database,
  list,
  object,
  push,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { from, map, Observable, of } from 'rxjs';
import { BaseModel } from '../models/BaseModel';

export abstract class Service<T extends BaseModel> {
  constructor(protected db: Database, protected path: string) {}

  getItem(id: string): Observable<T | null> {
    return object(ref(this.db, `${this.path}/${id}`)).pipe(
      map((item) => item.snapshot.val())
    );
  }

  getItems(): Observable<T[]> {
    return list(ref(this.db, this.path)).pipe(
      map((changes) => changes.map((change) => change.snapshot.val()))
    );
  }

  createItem(item: T): Observable<void> {
    const newId = push(child(ref(this.db), this.path)).key;

    if (!newId) return of();

    item.id = newId;
    return from(update(ref(this.db), { [`${this.path}/${newId}`]: item }));
  }

  updateItem(item: T): Observable<void> {
    return from(update(ref(this.db), { [`${this.path}/${item.id}`]: item }));
  }

  deleteItem(id: string): Observable<void> {
    return from(remove(ref(this.db, `${this.path}/${id}`)));
  }
}
