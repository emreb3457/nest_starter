import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  addYear(currentDate, addYear) {
    const date = new Date(currentDate);
    date.setFullYear(date.getFullYear() + addYear);
    return date;
  }
}
