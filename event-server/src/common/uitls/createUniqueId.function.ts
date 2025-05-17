import { ulid } from 'ulid';

export function createUniqueId(): string {
  return (ulid as () => string)();
}
