import { animate, animation, style } from "@angular/animations";

export const slideAndFade = animation([
  style({
    transform: 'translateX(-100%)',
    opacity: 0,
    'background-color': '{{slideColor}}',
  }),
  animate('{{time}} ease-out', style({
    transform: 'translateX(0)',
    opacity: 1,
    'background-color': 'rgb(20,157,242)',
  })),
])
