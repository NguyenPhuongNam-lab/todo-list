import { Injectable } from '@angular/core';
import { todoList } from '../data';
import { ITodo, StorageItemKey } from '../model';

@Injectable({
  providedIn: 'root',
})
export default class StorageService {
  /**
   * Sets the value of the pair identified by key to value,
   * creating a new key/value pair if none existed for key previously.
   *
   * @param key - The given key in the list associated with the object.
   * @param value - from the key-value pairs
   */
  public setItem(
    key: StorageItemKey,
    value: string | object | number | null | undefined
  ): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtain the current value associated with the given key in storage.
   *
   * @param key - The given key in the list associated with the object.
   * @param defaultValue - Be returned if the key does not exist in the list.
   *
   * @returns - The current value associated with the given key.
   * This value is object that parsed from a string.
   */
  public findItem<TResult, TDefaultResult>(
    key: StorageItemKey,
    defaultValue?: TDefaultResult
  ): TResult | TDefaultResult {
    const storedValue: string | null = window.localStorage.getItem(key);

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  }
}
