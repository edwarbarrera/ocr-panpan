
import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFade } from '../../animations/slidde-and-fade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(5000, [
            animateChild()
          ]),
        ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        backgroundColor: 'green',
        'z-index': 1

      })),
      state('active', style({
        transform: 'scale(1.5)',
        backgroundColor: 'rgba(201,157,242, 0.5)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('1000ms ease-in')
      ]),
      transition('active => default', [
        animate('1000ms ease-in')
      ]),
      transition('void => *', [
        query('.comment-text , .comment-date', [
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFade,
          {
            params: {
              time: '1000ms',
              slideColor:'rgb(20,157,42)'
            }
        }),
        group([
          useAnimation(flashAnimation, {
            params:{
              time: '1000ms',
              flashColor:'purple'
            }
          }),
          query('.comment-text', [
            animate('500ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('1500ms', style({
              opacity: 1
            }))
          ]),
        ])
      ]),
    ]),

  ],
})
export class CommentsComponent implements OnInit {


  @Input() comments!: Comment[];

  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  // listItemAnimationState : 'default' | 'active' = 'default';
  animationStates: { [key: number]: 'default' | 'active' } = {};




  constructor(private formBuilder: FormBuilder) { };

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }

  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }

    const maxId = this.comments.length

    this.comments.unshift({
      id: maxId,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    })

    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
