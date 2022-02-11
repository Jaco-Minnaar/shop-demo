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
  list$: Observable<T[]>;

  constructor(protected db: Database, protected path: string) {
    this.list$ = list(ref(this.db, this.path)).pipe(
      map((changes) => changes.map((change) => change.snapshot.val()))
    );
  }

  getItem(id: string): Observable<T | null> {
    return object(ref(this.db, `${this.path}/${id}`)).pipe(
      map((item) => item.snapshot.val())
    );
  }

  async createItem(item: T): Promise<string> {
    const newId = push(child(ref(this.db), this.path)).key;

    if (!newId) {
      throw new Error('Failure to create new item');
    }

    item.id = newId;

    await update(ref(this.db), { [`${this.path}/${newId}`]: item });

    return newId;
  }

  updateItem(item: T): Promise<void> {
    return update(ref(this.db), { [`${this.path}/${item.id}`]: item });
  }

  deleteItem(id: string): Observable<void> {
    return from(remove(ref(this.db, `${this.path}/${id}`)));
  }
}
