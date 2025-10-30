import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.css']
})
export class Avatar implements OnChanges {
  @Input() name!: string;
  initials: string = '';
  bgColor: string = '';
  ngOnInit() {
    this.bgColor = this.getRandomDarkColor();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'] && this.name) {
      this.initials = this.name
        .split(' ')
        .map(part => part[0].toUpperCase())
        .join('');
    }
  }

  getRandomDarkColor(): string {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return `rgb(${r}, ${g}, ${b})`;
  }

}
