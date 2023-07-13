import { formatDate } from '@angular/common';

export const formatter = (
  date: string | number | Date,
  format = 'yyyy/MM/dd',
  locale = 'en-US',
  timezone?: string
) => formatDate(date, format, locale, timezone);
